import React, {useEffect, useState} from 'react';

type Props = {|
  url: string,      // URL for the resource to fetch
  children: any,    // Nodes to display
  payload?: ?any,   // Payload to pass to the query
  method?: ?string, // HTTP method
|};

/**
 * Fetches a resource.
 * The children must be set up to receive 3 parameters:
 *   - error: when the request returned an error object
 *   - fetching: is true while the promise is being resolved, false once it is resolved
 *   - data: the response returned by the resource when succeeded
 * */
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
      abortController.abort(); // For in-flight abortion, solves race-conditions related issues
    };
  }, [props]);
  return props.children({error, fetching, data: response});
});

export default Query;