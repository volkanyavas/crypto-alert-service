export const shouldTrigger = (
  direction: string,
  targetPrice: number,
  currentPrice: number
): boolean => {
  if (direction === 'ABOVE') return currentPrice >= targetPrice;
  if (direction === 'BELOW') return currentPrice <= targetPrice;
  return false;
};
