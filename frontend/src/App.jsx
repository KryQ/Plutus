import {useEffect, useState} from 'react'
import Coin from "./components/Coin.jsx";

function App() {
  const [data, setData] = useState({});

  const getCoins = async () => {
    const response = await fetch('http://localhost:3001/rest/data/newest');
    const data = await response.json();

    setData(data);
  }

  useEffect(() => {
    getCoins()
  }, []);

  return (
      <div className="p-2">
        <div className="grid grid-cols-3 gap-4">
          {data.coinPrices && data.coinPrices.map(coin =>
              <Coin name={coin.name} shopPrices={coin.prices} goldPrice={data.goldPrice} updated={data.timestamp}/>
          )}
        </div>
      </div>
  )
}

export default App
