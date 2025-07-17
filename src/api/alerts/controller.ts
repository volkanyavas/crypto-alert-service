import { Response } from 'express';
import prisma from '../../db/prisma';
import { AuthRequest } from '../../middleware/auth';

export const createAlert = async (req: AuthRequest, res: Response) => {
  const { symbol, targetPrice, direction } = req.body;
  const userId = req.userId;

  if (!userId || !symbol || !targetPrice || !direction) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const alert = await prisma.alert.create({
    data: {
      userId,
      symbol: symbol.toUpperCase(),
      targetPrice: parseFloat(targetPrice),
      direction,
    },
  });

  return res.status(201).json(alert);
};

export const getAlerts = async (req: AuthRequest, res: Response) => {
  const alerts = await prisma.alert.findMany({
    where: { userId: req.userId },
  });

  return res.status(200).json(alerts);
};
