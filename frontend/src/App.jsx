import {useEffect, useState} from 'react'
import Coin from "./components/Coin.jsx";
import host from "./origin.js";
import GoldCard from "./components/GoldCard.jsx";
import CurrencyCard from "./components/CurrencyCard.jsx";

function App() {
  const [currentGoldPrice, setCurrentGoldPrice] = useState(null);
  const [coins, updateCoins] = useState([]);

  const getCoins = async () => {
    const response = await fetch(`${host}/rest/investments`);
    return response.json();
  }

  const getCurrentGoldPrice = async () => {
    const response = await fetch(`${host}/rest/gold/current?currency=PLN`);
    return response.json();
  }

  const getAllData = async () => {
    const [coinsResponse, goldPrices] = await Promise.allSettled([
      getCoins(),
      getCurrentGoldPrice()
    ]);

    if (coinsResponse.status === 'fulfilled') {
      updateCoins(coinsResponse.value);
    }

    if (goldPrices.status === 'fulfilled') {
      const currentGoldPrice = goldPrices.value;
      setCurrentGoldPrice(currentGoldPrice.mid);
    }
  }

  useEffect(() => {
    getAllData()
    const fetchInterval = setInterval(getAllData, 60 * 1000);

    return () => {
      clearInterval(fetchInterval)
    };
  }, []);

  return (
      <div className="p-2 flex flex-col gap-2">
        <p className="fixed text-sm font-mono bottom-1 right-1 opacity-30 pointer-events-none">0.1.2</p>
        <GoldCard/>
        <div className="flex gap-2">
          <div className="basis-1/2"><CurrencyCard from="USD" to="PLN"/></div>
          <div className="basis-1/2"><CurrencyCard from="EUR" to="PLN"/></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {Object.keys(coins).map(coinName => (
                  <Coin
                      key={coinName}
                      name={coinName}
                      data={coins[coinName]}
                      goldPrice={currentGoldPrice}
                  />
              )
          )}
        </div>
      </div>
  )
}

export default App
