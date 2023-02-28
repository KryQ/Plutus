import {useEffect, useState} from 'preact/hooks';
import Coin from "./components/Coin.jsx";

export function App() {
  const [coinPrices, setCoinPrices] = useState([]);

  const getCoins = async () => {
    const response = await fetch('http://localhost:3001/rest/coins');
    const data = await response.json();

    setCoinPrices(data);
  }

  useEffect(() => {
    getCoins()
  }, []);

  return (
      <>
        {coinPrices.map(coin => <Coin {...coin} />)}
      </>
  )
}
