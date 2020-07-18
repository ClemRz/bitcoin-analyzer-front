import React, {useEffect, useState} from 'react';
import moment from 'moment';

type Props = {|
  url: string,
  children: any,
  startDate: Date,
  endDate: Date,
  method: ?string,
|};

const shouldSkipUpdate = (props: Props, nextProps: Props) => {
  if (!nextProps.startDate || !nextProps.endDate) {
    return true;
  }
  const sameStartDate = props.startDate.getTime() === nextProps.startDate.getTime();
  const sameEndDate = props.endDate.getTime() === nextProps.endDate.getTime();
  return sameStartDate && sameEndDate;
};

const SYMBOL = 'BTC-USD';

const Query = React.memo((props: Props) => {
  const [error, setError] = useState(null);
  const [fetching, setIsFetching] = useState(true);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    if (props.startDate && props.endDate) {
      const data = {
        startDate: moment.utc(props.startDate).unix(),
        endDate: moment.utc(props.endDate).unix(),
        symbol: SYMBOL
      };
      setIsFetching(true);
      fetch(props.url, {
        method: props.method || 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(
          (response) => {
            setIsFetching(false);
            setResponse(response);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsFetching(false);
            setError(error);
          }
        );
    }
  }, [props]);
  return props.children({error, fetching, data: response});
}, shouldSkipUpdate);

export default Query;