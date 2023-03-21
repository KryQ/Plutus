import React, {useEffect, useState} from "react";
import {Responsive} from '@visx/visx';
import host from "../origin.js";
import LineChart from "./LineChart.jsx";
import {format} from "date-fns";
import {shortDateTime} from "../dateFormats.js";

const GoldCard = () => {
  const [data, setData] = useState([]);

  const getGoldPrices = async () => {
    const response = await fetch(`${host}/rest/gold?currency=PLN`);
    const data = await response.json();

    setData(data.data);
  }

  useEffect(() => {
    getGoldPrices()
  }, [])


  const goldPrice = data.length > 0 && data.at(-1).mid;
  return (
      <div className="bg-white rounded-md overflow-hidden shadow">
        {data.length > 0 && <div className="flex gap-1 p-2 items-end w-full">
          <span className="ml-auto">Aktualna cena złota: </span>
          <h2 className="font-mono font-bold">{(goldPrice).toFixed(2)}</h2>
        </div>}
        {data.length !== 0 && <div className="h-60">
          <Responsive.ParentSize>
            {({width, height}) =>
                <LineChart
                    data={data.map(ex => ({timestamp: ex.dateTime, value: ex.mid}))}
                    width={width}
                    height={height}
                    tooltip={(x, y) =>
                        <>
                          <p>{`Cena złota: ${x}`}</p>
                          <p>{`Data: ${format(y, shortDateTime)}`}</p>
                        </>
                    }
                />}
          </Responsive.ParentSize>
        </div>}
      </div>
  )
}

export default GoldCard
