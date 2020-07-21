// @flow

import React, {memo} from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';
import moment from 'moment';

type DataPoint = {|
  x: Date,
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

  const DT_FORMAT = 'MMMM Do YYYY, h:mm:ss a';

  /**
   * converts Unix timestamp to local dateTime object
   * */
  const transformDataPoint = (dataPoint: DbDataPoint): DataPoint => ({
    x: moment.unix(dataPoint.timestamp).local().toDate(),
    y: parseFloat(dataPoint.close)
  });

  const options = {
    animationEnabled: false,
    exportEnabled: true,
    theme: 'light2',
    axisY: {
      title: 'Bitcoin value (USD)',
      includeZero: false,
      prefix: '$'
    },
    axisX: {
      title: `Date (local time)`,
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
      // eslint-disable-next-line
      //toolTipContent: '{x}: ${y}',
      dataPoints: datapoints.map(transformDataPoint)
    }]
  };
  return <CanvasJSChart options={options}/>;
};

export default memo<Props>(Chart);