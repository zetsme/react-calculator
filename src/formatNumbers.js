const INTEGER_FORMATTER = new Intl.NumberFormat('en-us');

export const formatNumbers = (num) => {
  if (num === null) return;
  if (num === '-') return '-';
  const [integer, decimal] = num.split('.');
  if (decimal === undefined) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};
