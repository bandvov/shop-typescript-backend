export const skuGenerator = (args) => args
  .map((value) => value
    .replace(/[\s\d\/]/gi, '')
    .slice(0, 3)
    .toUpperCase())
  .join('-');
