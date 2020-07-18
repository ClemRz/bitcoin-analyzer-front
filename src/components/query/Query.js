import {useEffect, useState} from 'react';

type Props = {|
  url: string,
  children: any,
  startDate: number,
  endDate: number,
  method: ?string,
|};

const Query = (props: Props) => {
  const [error, setError] = useState(null);
  const [fetching, setIsFetching] = useState(true);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const data = {startDate: props.startDate, endDate: props.endDate};
    console.log('Fetching', props.url, data);
    fetch(props.url, {
      method: props.method || 'GET',
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
  }, [props]);
  return props.children({error, fetching, data: response});
};

export default Query;