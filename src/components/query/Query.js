import React, {useEffect, useState} from 'react';

type Props = {|
  url: string,
  children: any,
  payload?: ?any,
  method?: ?string,
|};

const Query = React.memo((props: Props) => {
  const [error, setError] = useState(null);
  const [fetching, setIsFetching] = useState(true);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const abortController = new AbortController(); // For in-flight abortion, solves race-conditions related issues

    setIsFetching(true);

    fetch(props.url, {
      method: props.method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: props.payload ? JSON.stringify(props.payload) : null,
      signal: abortController.signal
    })
      .then(res => res.json())
      .then(
        (response) => {
          if (abortController.signal.aborted) {
            return;
          }
          setIsFetching(false);
          setResponse(response);
        },
        (error) => {
          if (abortController.signal.aborted) {
            return;
          }
          setIsFetching(false);
          setError(error);
        }
      );

    return () => {
      abortController.abort();
    };
  }, [props]);
  return props.children({error, fetching, data: response});
});

export default Query;