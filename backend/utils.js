const calculateRatios = ({from, to, exchange}) => {
  if (from === to) return 1;

  let multiplier = 1;
  if (from.toUpperCase() !== ECurrencies.USD) {
    multiplier = 1 / exchange[from];
  }

  return to.toLowerCase() === 'usd' ? multiplier : exchange[to] * multiplier;
}

export {calculateRatios}
