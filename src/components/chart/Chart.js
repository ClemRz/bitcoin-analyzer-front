// @flow

import React, {memo} from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';
import moment from 'moment';

type DataPoint = {|
  x: Date,    // Date of the data-point
  y: number,  // Value of the data-point
|};

type Props = {|
  dataPoints: Array<DataPoint>, // Values for the chart to display
|};

/**
 * Wrapper for the CanvasJSChart view
 * */
const Chart = ({dataPoints}: Props) => {

  const DT_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

  const options = {
    animationEnabled: false,
    exportEnabled: true,
    theme: 'light2',
    axisY: {
      title: 'Bitcoin close value (USD)',
      includeZero: false,
      prefix: '$'
    },
    axisX: {
      title: 'Local date and time',
      labelAngle: -45
    },
    toolTip: {
      contentFormatter: (e) => {
        const dp = e.entries[0].dataPoint;
        const dt = moment(dp.x).format(DT_FORMAT);
        return `${dt}: USD${dp.y}`;
      }
    },
    data: [{
      color: '#f7921b',
      type: 'line',
      dataPoints: dataPoints
    }]
  };
  return <CanvasJSChart options={options}/>;
};

export default memo<Props>(Chart);