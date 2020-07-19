// @flow

import React, {memo} from 'react';
import CustomAlert from "../alert/CustomAlert";
import Chart from "./Chart";
import Query from "../query";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

const ENDPOINT_URL = "api/";
const ENDPOINT_METHOD = "POST";
const SYMBOL = 'BTC-USD';

type Props = {|
  startDate: number,
  endDate: number
|};

const ChartQuery = (props: Props) => {

  const payload = {...props, symbol: SYMBOL};

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

  return (
    <Query url={ENDPOINT_URL} method={ENDPOINT_METHOD} payload={payload}>
      {({error, fetching, data}) => {
        if (error) {
          return <CustomAlert message={error.message}/>;
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