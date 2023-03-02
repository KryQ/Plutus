import {useEffect, useState} from 'react'
import Coin from "./components/Coin.jsx";
import {parseISO} from "date-fns";
import GoldCard from "./components/Gold.jsx";

function App() {
  const [currentGoldPrice, setCurrentGoldPrice] = useState(0.0);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [coins, updateCoins] = useState([]);

  const getCoins = async () => {
    const response = await fetch('http://localhost:3001/rest/data/newest');
    const {goldPrice, timestamp, coinPrices} = await response.json();

    setCurrentGoldPrice(goldPrice);
    setLastUpdateTime(parseISO(timestamp));
    updateCoins(coinPrices);
  }

  useEffect(() => {
    getCoins()
    const fetchInterval = setInterval(getCoins, 1 * 60 * 1000);

    return () => {
      clearInterval(fetchInterval)
    };
  }, []);

  return (
      <div className="p-2 flex flex-col gap-2">
        <GoldCard goldPrice={currentGoldPrice}/>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 items-start">
          {coins.map(coin =>
              <Coin
                  key={coin.name}
                  name={coin.name}
                  shopPrices={coin.prices}
                  goldPrice={currentGoldPrice}
                  updated={lastUpdateTime}
              />
          )}
        </div>
      </div>
  )
}

export default App
