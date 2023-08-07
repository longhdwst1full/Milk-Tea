export const saleCaculator = (price: number, sale: number) => {
  const percent = (sale / price) * 100;
  return Math.round(percent);
};
