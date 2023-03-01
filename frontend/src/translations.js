const coins = {
  KANGAROO: 'Australijski Kangur',
  KRUGERRAND: 'Krugerrand',
  CANADIAN_LEAF: 'Kanadyjski Liść',
}

const t = (id) => {
  if (coins[id]) {
    return coins[id]
  }

  console.warn(`No translation found for ${id}`)
  return id;
}

export {t};
