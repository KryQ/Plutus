import './Coin.css';

const CoinCard = ({name, prices}) => {
  return (
      <div>
        <h1>{name}</h1>
        {prices.map(price => <ul>{price.name} - {price.price}</ul>)}
      </div>
  )
}

export default CoinCard
