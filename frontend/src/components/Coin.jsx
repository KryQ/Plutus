import {useEffect, useState} from 'react';
import {t} from "../translations.js";
import {formatDistanceToNow} from "date-fns";
import {pl} from 'date-fns/locale'

const CoinCard = ({name, shopPrices, goldPrice, updated}) => {
  const sortedShops = [...shopPrices.sort((a, b) => a.price > b.price ? 1 : -1)];
  const cheapestShop = sortedShops.splice(0, 1).at(0);

  const [difference, setDifference] = useState('');
  const [showDetails, setDetailsVisibility] = useState(false);

  useEffect(() => {
    setDifference(formatDistanceToNow(updated, {locale: pl}));
    const timeHandle = setInterval(() => {
      setDifference(formatDistanceToNow(updated, {locale: pl}));
    }, 10000)
    return () => {
      clearInterval(timeHandle);
    }
  }, [])

  return (
      <div className="bg-white rounded-md p-4 text-sm shadow flex flex-col">
        <div className="mb-2 flex">
          <div>
            <div className="text-xl font-bold">{t(name)}</div>
            <div className="text-xs text-stone-500">{difference} temu</div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <p className="font-light">{t(cheapestShop.name)}</p>
            <div className="flex gap-1">
              <span className="text-stone-500 font-light">({(cheapestShop.price - goldPrice).toFixed(2)})</span>
              <h3 className="font-bold font-mono text-2xl -mt-2">
                {cheapestShop.price}
              </h3>
            </div>
          </div>
        </div>
        {showDetails && <div className="card-body">
          <table className="w-full">
            <thead>
            <tr>
              <th align="left">Nazwa</th>
              <th align="right">Cena</th>
            </tr>
            </thead>
            <tbody>
            {sortedShops.map(shop =>
                <tr
                    key={`${name}-${shop.name}`}
                    className="my-1"
                >
                  <td align="left">{t(shop.name)}</td>
                  <td className="font-mono" align="right">{shop.price.toFixed(2)} zł</td>
                </tr>)}
            </tbody>
          </table>
        </div>}
        <div className="mt-auto self-end">
          <button
              className="px-3 py-2 bg-amber-400/20 text-amber-500 font-bold rounded"
              onClick={() => {
                setDetailsVisibility(!showDetails)
              }}
          >
            {showDetails ? 'MNIEJ' : 'WIECEJ'}
          </button>
        </div>
      </div>
  )
}

export default CoinCard
