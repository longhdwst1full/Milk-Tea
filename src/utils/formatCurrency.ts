export const formatCurrency = (price: number) => {
  const formatCurrency = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return formatCurrency;
};
