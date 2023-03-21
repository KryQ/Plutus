const coins = {
  KANGAROO: 'Australijski Kangur',
  KRUGERRAND: 'Krugerrand',
  CANADIAN_LEAF: 'Kanadyjski Liść',
  BRITANNIA: 'Britannia',
  VIENNA_PHILHARMONICS: 'Wiedeńscy Filharmonicy',
  AMERICAN_EAGLE: 'Amerykański Złoty Orzeł',
  AMERICAN_BUFFALO: 'Amerykański Bizon',
  METAL_MARKET: 'Metal Market',
  COININVEST: 'Coininvest',
  APART_MINT: 'Mennica Apart',
  NOBLE_INVESTMENTS: 'Szlachetne Inwestycje',
  FLYING_ATOM: 'Flying Atom',
  GOLDENMARK: 'Goldenmark',
  TREASURY_MINT: 'Mennica Skarbowa',
  ELEMENT_79: '79 Element',
  SILVER_MINT: 'Srebrna Mennica',
  POLISH_MINT: 'Polska Mennica',
  MINT_OF_GDANSK: "Mennica Gdańsk",
  GOLDON: 'Goldon'
}

const t = (id) => {
  if (coins[id]) {
    return coins[id]
  }

  console.warn(`No translation found for ${id}`)
  return id;
}

export {t};
