export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return Math.floor(num).toString();
};

export const calculateCost = (baseCost: number, count: number): number => {
  return Math.ceil(baseCost * Math.pow(1.15, count));
};
