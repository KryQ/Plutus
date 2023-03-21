import {useEffect, useState} from 'react';
import {formatDistanceToNow, parseISO} from "date-fns";
import {pl} from 'date-fns/locale'

import {t} from "../translations.js";

const CoinCard = ({name, data, goldPrice = null}) => {
  const sortedShops = [...data.sort((a, b) => a.value > b.value ? 1 : -1)];
  const cheapestShop = sortedShops.splice(0, 1).at(0);
  const updated = parseISO(cheapestShop.createdAt);

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
  }, [updated])

  return (
      <div className="bg-white rounded-md p-4 text-sm shadow flex flex-col">
        <div className="mb-2 flex">
          <div>
            <div className="text-xl font-bold">{t(name)}</div>
            <div className="text-xs text-stone-500">{difference} temu</div>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <p className="font-light">{t(cheapestShop.shop)}</p>
            <div className="flex gap-1">
              {goldPrice !== null &&
                  <span className="text-stone-500 font-light">({(cheapestShop.value - goldPrice).toFixed(2)})</span>
              }
              <h3 className="font-bold font-mono text-2xl -mt-2">
                {cheapestShop.value}
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
                    key={`${name}-${shop.shop}`}
                    className="my-1"
                >
                  <td align="left">{t(shop.shop)}</td>
                  <td className="font-mono" align="right">{shop.value.toFixed(2)} zł</td>
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
