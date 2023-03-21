import React, {useCallback, useEffect, useState} from "react";
import {Event, Glyph, Group, Responsive, Scale, Shape, Tooltip} from '@visx/visx';
import {bisector, extent} from "d3-array";
import {format, parseISO} from "date-fns";
import {shortDateTime} from "../dateFormats.js";
import origin from "../origin.js";

const LineChart = ({data, width, height}) => {
  // tooltip parameters
  const {tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip} = Tooltip.useTooltip();

  // Defining selector functions
  const getRD = (d) => d?.currency || 0;
  const getDate = (d) => parseISO(d.dateTime) || 0;
  const bisectDate = bisector((d) => parseISO(d.dateTime)).left;

  // get data from a year
  const getD = (dateTime) => {
    const output = data.filter(function (el) {
      return el.dateTime === dateTime
    })
    return output
  }

  // Defining scales
  // horizontal, x scale
  const timeScale = Scale.scaleTime({
    range: [0, width],
    domain: extent(data, getDate),
  })

  // vertical, y scale
  const rdScale = Scale.scaleLinear({
    range: [height, 0],
    domain: extent(data, getRD),
    nice: true,
  });

  // defining tooltip styles
  const tooltipStyles = {
    ...Tooltip.defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
  };

  const handleTooltip = useCallback((event) => {
    const {x} = Event.localPoint(event) || {x: 0};

    const x0 = timeScale.invert(x);
    const index = bisectDate(data, x0, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let d = d0;

    if (d1 && getDate(d1)) {
      d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
    }

    showTooltip({
      tooltipData: getD(d.dateTime),
      tooltipLeft: x,
      tooltipTop: rdScale(getRD(d))
    })
  }, [showTooltip, timeScale, rdScale])

  return (
      <div style={{position: 'relative'}}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={'transparent'}/>
          <Group.Group left={0} top={0}>
            <Shape.AreaClosed
                fill="rgb(245 158 11)"
                fillOpacity="0.3"
                data={data}
                x={(d) => timeScale(getDate(d)) ?? 0}
                y={(d) => rdScale(getRD(d)) ?? 0}
                yScale={rdScale}
            />
            {tooltipData && (
                <g>
                  <Shape.Line
                      from={{x: tooltipLeft, y: 0}}
                      to={{x: tooltipLeft, y: height}}
                      stroke={'#EDF2F7'}
                      strokeWidth={2}
                      pointerEvents="none"
                      strokeDasharray="4,2"
                  />
                  <Shape.Line
                      from={{x: 0, y: tooltipTop}}
                      to={{x: width, y: tooltipTop}}
                      stroke={'#EDF2F7'}
                      strokeWidth={2}
                      pointerEvents="none"
                      strokeDasharray="4,2"
                  />
                </g>
            )}
            {tooltipData && tooltipData.map((d) => (<g>
              <Glyph.GlyphCircle
                  left={tooltipLeft}
                  top={rdScale(d.currency) + 2}
                  size={110}
                  fill={"#cbb"}
                  stroke={'white'}
                  strokeWidth={2}/>
            </g>))}
            <rect x={0} y={0} width={width} height={height} onTouchStart={handleTooltip} fill={'transparent'}
                  onTouchMove={handleTooltip}
                  onMouseMove={handleTooltip}
                  onMouseLeave={() => hideTooltip()}
            />
          </Group.Group>
        </svg>
        {/* render a tooltip */}
        {tooltipData ? (
            <Tooltip.TooltipWithBounds
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
                style={tooltipStyles}
            >
              <p>{`Cena złota: $${getRD(tooltipData[0]).toFixed(3)}`}</p>
              <p>{`Data: ${format(getDate(tooltipData[0]), shortDateTime)}`}</p>
            </Tooltip.TooltipWithBounds>
        ) : null}
      </div>
  )
}

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
  console.log(currentExchange)
  return (
      <div className="bg-white rounded-md overflow-hidden shadow grow">
        {exchanges && exchanges.length !== 0 && <>
          <div className="flex gap-1 p-2 items-end w-full">
            <span className="ml-auto">{from}->{to}</span>
            <h2 className="font-mono">{currentExchange.currency.toFixed(2)}</h2>
          </div>
          <div className="h-60">
            <Responsive.ParentSize>
              {({width, height}) =>
                  <LineChart data={exchanges} width={width} height={height}/>}
            </Responsive.ParentSize>
          </div>
        </>}
      </div>
  )
}

export default CurrencyCard
