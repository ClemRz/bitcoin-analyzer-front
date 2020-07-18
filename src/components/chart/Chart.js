// @flow

import React, {memo} from 'react';
import {CanvasJSChart} from "canvasjs-react-charts";
import Alert from '../alert';

type DataPoint = {|
  x: number,
  y: number,
|};

type Props = {|
  error: ?string,
  dataPoints: ?Array<DataPoint>,
|};

/**
 * Controller in charge of setting up the CanvasJSChart view
 * */
const Chart = ({error, dataPoints}: Props) => {

  /**
   * converts Unix timestamp to milliseconds
   * */
  const transformDataPoint = (dataPoint: DataPoint): DataPoint => ({x: dataPoint.x * 1000, y: parseFloat(dataPoint.y.toFixed(3))});

  const options = {
    animationEnabled: false,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
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
      dataPoints: dataPoints?.map(transformDataPoint) || []
    }]
  };
  return (
    <>
      {error && <Alert message={error}/>}
      {!dataPoints && <Alert message="No data to display"/>}
      <CanvasJSChart options={options}/>
    </>
  );
};

export default memo<Props>(Chart);