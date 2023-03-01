import ShopChojnackiKwiecien from "./shops/ShopChojnackiKwiecien.js";

const main = async () => {
  const shop = new ShopChojnackiKwiecien();
  console.log(await shop.getAllHandledCoinPrices());
}

main().then(() => process.exit(0)).catch((e) => {
  console.log(e);
  process.exit(1);
})
