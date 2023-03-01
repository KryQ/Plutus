import {t} from "../translations.js";
import {formatDistanceToNow, parseISO} from "date-fns";

const CoinCard = ({name, shopPrices, goldPrice, updated}) => {
  const cheapestShop = shopPrices.reduce((lowest, current) => current.price < lowest.price ? current : lowest, {price: Infinity});
  const expensiveShop = shopPrices.reduce((highest, current) => current.price > highest.price ? current : highest, {price: 0});

  const updatedDate = parseISO(updated);

  return (
      <div className="bg-white rounded-md p-2 text-sm">
        <div className="card-header">
          <div className="text-xl">{t(name)}</div>
          <div className="text-sm text-stone-500">Zaaktualizowano {formatDistanceToNow(updatedDate)} temu</div>
        </div>
        <div className="card-body">
          <p>Najtańszy sklep: {cheapestShop.name}</p>
          <p>Marża: {(cheapestShop.price - goldPrice).toFixed(2)}</p>
          {shopPrices.map(price => <p className="block">{price.name} - {price.price} zł</p>)}
        </div>
      </div>
  )
}

export default CoinCard
