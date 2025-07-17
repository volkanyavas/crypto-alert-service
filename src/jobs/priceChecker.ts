import cron from 'node-cron';
import axios from 'axios';
import prisma from '../db/prisma';

type PriceMap = Record<string, number>;

const COINS = ['bitcoin', 'ethereum', 'dogecoin'];

const fetchPrices = async (): Promise<PriceMap> => {
  const ids = COINS.join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  const res = await axios.get(url);
  const data = res.data;

  const prices: PriceMap = {
    BTC: data.bitcoin.usd,
    ETH: data.ethereum.usd,
    DOGE: data.dogecoin.usd,
  };

  return prices;
};

const checkAlerts = async () => {
  try {
    const prices = await fetchPrices();

    const alerts = await prisma.alert.findMany({
      where: { triggered: false },
    });

    for (const alert of alerts) {
      const currentPrice = prices[alert.symbol];
      if (!currentPrice) continue;

      let shouldTrigger = false;

      if (alert.direction === 'ABOVE' && currentPrice >= alert.targetPrice) {
        shouldTrigger = true;
      }

      if (alert.direction === 'BELOW' && currentPrice <= alert.targetPrice) {
        shouldTrigger = true;
      }

      if (shouldTrigger) {
        await prisma.alert.update({
          where: { id: alert.id },
          data: { triggered: true },
        });

        const user = await prisma.user.findUnique({
          where: { id: alert.userId },
        });

        console.log(
          `🚨 Alert triggered for ${alert.symbol}: ${alert.direction} ${alert.targetPrice} (Current: ${currentPrice}) [User: ${user?.email}]`,
        );

        if (user?.webhookUrl) {
          try {
            await axios.post(user.webhookUrl, {
              symbol: alert.symbol,
              price: currentPrice,
              direction: alert.direction,
              targetPrice: alert.targetPrice,
              message: `Your alert for ${alert.symbol} has been triggered.`,
            });
            console.log(`✅ Webhook sent to ${user.webhookUrl}`);
          } catch (err: any) {
            console.error(
              `❌ Failed to send webhook to ${user.webhookUrl}:`,
              err.message,
            );
          }
        }
      }
    }
  } catch (err) {
    console.error('❌ Error checking alerts:', err);
  }
};

export const startPriceChecker = () => {
  cron.schedule('* * * * *', () => {
    console.log('🔁 Running price check...');
    checkAlerts();
  });
};
