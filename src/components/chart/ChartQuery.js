// @flow

import React, {memo} from 'react';
import CustomAlert from '../alert/CustomAlert';
import Chart from './Chart';
import Query from '../query';
import Spinner from 'react-bootstrap/Spinner';

const ENDPOINT_URL = '/';
const SYMBOL = 'BTCUSD';

type Props = {|
  startDate: number,
  endDate: number
|};

const ChartQuery = (props: Props) => {

  const spinner = (
    <div>
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

  const $url = ENDPOINT_URL + SYMBOL + `/${props.startDate}/${props.endDate}.json`;

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
              <Chart datapoints={data.error ? [] : data}/>
            </>
          );
        }
      }}
    </Query>
  );
};

export default memo<Props>(ChartQuery);