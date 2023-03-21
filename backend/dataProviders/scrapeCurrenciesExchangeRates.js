const scrapeExchanges = async () => {
  const response = await fetch("https://www.xe.com/api/protected/midmarket-converter/", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Basic bG9kZXN0YXI6REdPTEV4MGNOTzVXTk96NTNFVGc2aWhtY2g5OE1sMkU=",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"111\", \"Not(A:Brand\";v=\"8\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      //"cookie": "lastConversion={%22amount%22:1%2C%22fromCurrency%22:%22USD%22%2C%22toCurrency%22:%22PLN%22}; dashboardInverseMode=false",
      "Referer": "https://www.xe.com/currencyconverter/convert/?Amount=1&From=EUR&To=PLN",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  const {rates, timestamp} = await response.json()

  return {
    rates: {USD: rates.USD, EUR: rates.EUR, CHF: rates.CHF, PLN: rates.PLN},
    timestamp: new Date(timestamp).toISOString()
  }
}

export default scrapeExchanges;
