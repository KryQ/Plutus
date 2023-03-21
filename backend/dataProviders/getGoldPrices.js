import {sub} from "date-fns";

const getGoldPrice = async (currency) => {
  if (!['USD', 'PLN', 'EUR'].includes(currency)) {
    throw new Error("Unsupported currency");
  }

  const response = await fetch(`https://market-data.tavex.pl/v1/spot-price/xignite-metals?symbol=XAU${currency}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not A(Brand\";v=\"24\", \"Chromium\";v=\"110\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://tavex.pl/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });

  return response.json();
}

const getHistoricPrice = async ({
                                  currency = 'PLN',
                                  from = new Date(),
                                  period = {months: 1},
                                  interval = 'hour'
                                }) => {
  const params = new URLSearchParams();

  params.set('symbol', 'XAU');
  params.set('currency', currency);
  params.set('priceType', 'Mid');
  params.set('from', sub(from, period).toISOString());
  params.set('to', from.toISOString());

  switch (interval) {
    case "hour":
      interval = 'PT1H';
      break;
    default:
      interval = 'P1D';
  }

  params.set('interval', interval);

  const request = await fetch(`https://market-data.tavex.pl/v1/chart-data/xignite-metals?${params.toString()}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"111\", \"Not(A:Brand\";v=\"8\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "Referer": "https://tavex.pl/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
  });

  return request.json();
};

export {getGoldPrice, getHistoricPrice};
