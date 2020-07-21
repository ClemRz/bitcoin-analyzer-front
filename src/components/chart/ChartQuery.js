// @flow

import React, {memo} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import moment from "moment";
import CustomAlert from '../alert/CustomAlert';
import Chart from './Chart';
import Query from '../query';

import './ChartQuery.css';

const SYMBOL = 'BTCUSD';

type Props = {|
  startDate: number,  // Start unix timestamp
  endDate: number     // End unix timestamp
|};

type ApiDataPoint = {|
  timestamp: number,  // Unix timestamp received from the API
  close: string,      // Value received from the API
|};

/**
 * Controller in charge of launching the query to the API and displaying the proper information during and in return.
 * */
const ChartQuery = (props: Props) => {
  if (isNaN(props.startDate) || isNaN(props.endDate)) {
    return <CustomAlert message="Incorrect dates" code={21}/>;
  }

  const spinner = (
    <div className="spinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  const hasValues = (data) => {
    return data?.length && !data.every((dataPoint) => {
      return !dataPoint.close;
    });
  };

  /**
   * converts Unix timestamp to local dateTime object and parses the value.
   * */
  const transformDataPoint = (dataPoint: ApiDataPoint): DataPoint => ({
    x: moment.unix(dataPoint.timestamp).local().toDate(),
    y: parseFloat(dataPoint.close)
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl) {
    throw new Error('Environment variable REACT_APP_API_URL is not set.');
  }
  const $url = apiUrl + SYMBOL + `/${props.startDate}/${props.endDate}.json`;

  return (
    <Query url={$url}>
      {({error, fetching, data}) => {
        if (error) {
          return <CustomAlert message={error.message} code={0}/>;
        } else if (fetching) {
          return spinner;
        } else {
          return (
            <>
              {data.error && <CustomAlert {...data.error}/>}
              {!hasValues(data) && !data.error && <CustomAlert code={-1} message="No data to display for the selected dates." variant="info"/>}
              <Chart dataPoints={data.error ? [] : data.map(transformDataPoint)}/>
            </>
          );
        }
      }}
    </Query>
  );
};

export default memo<Props>(ChartQuery);