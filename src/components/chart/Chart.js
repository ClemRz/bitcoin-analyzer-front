// @flow

import React, {memo} from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';

type DataPoint = {|
  x: number,
  y: number,
|};

type DbDataPoint = {|
  timestamp: number,
  close: string,
|};

type Props = {|
  datapoints: Array<DbDataPoint>,
|};

/**
 * Controller in charge of setting up the CanvasJSChart view
 * */
const Chart = ({datapoints}: Props) => {

  /**
   * converts Unix timestamp to milliseconds
   * */
  const transformDataPoint = (dataPoint: DbDataPoint): DataPoint => ({x: dataPoint.timestamp * 1000, y: parseFloat(dataPoint.close)});

  const options = {
    animationEnabled: false,
    exportEnabled: true,
    theme: "light2",
    axisY: {
      title: "Bitcoin value (USD)",
      includeZero: false,
      prefix: "$"
    },
    axisX: {
      title: "Date"
    },
    data: [{
      color: "#f7921b",
      type: "line",
      toolTipContent: "{x}: ${y}",
      xValueType: "dateTime",
      dataPoints: datapoints.map(transformDataPoint)
    }]
  };
  return <CanvasJSChart options={options}/>;
};

export default memo<Props>(Chart);