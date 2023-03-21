import React, {useEffect, useState} from "react";
import {Responsive} from '@visx/visx';
import origin from "../origin.js";
import LineChart from "./LineChart.jsx";
import {format} from "date-fns";
import {shortDateTime} from "../dateFormats.js";

const CurrencyCard = ({from, to}) => {
  const [exchanges, setExchanges] = useState([])

  const getExchange = async () => {
    const response = await fetch(`${origin}/rest/currency?from=${from}&to=${to}`);
    const data = await response.json();

    if (data)
      setExchanges(data);
  }

  useEffect(() => {
    getExchange();
  }, [])

  if (exchanges.length === 0) return null;

  const currentExchange = exchanges.at(-1);
  return (
      <div className="bg-white rounded-md overflow-hidden shadow grow">
        {exchanges && exchanges.length !== 0 && <>
          <div className="flex gap-1 p-2 items-end w-full">
            <span className="ml-auto">{from} -> {to}: </span>
            <h2 className="font-bold font-mono">{currentExchange.currency.toFixed(2)}</h2>
          </div>
          <div className="h-60">
            <Responsive.ParentSize>
              {({width, height}) =>
                  <LineChart
                      data={exchanges.map(ex => ({timestamp: ex.dateTime, value: ex.currency}))}
                      width={width}
                      height={height}
                      tooltip={(x, y) =>
                          <>
                            <p>{`Kurs wymiany: ${x.toFixed(2)}`}</p>
                            <p>{`Data: ${format(y, shortDateTime)}`}</p>
                          </>
                      }
                  />}
            </Responsive.ParentSize>
          </div>
        </>}
      </div>
  )
}

export default CurrencyCard
