// @flow

import React, {useReducer} from 'react';
import {DateRangeInput} from '@datepicker-react/styled'
import moment from 'moment';
import Query from '../query';
import Chart from '../chart';
import Alert from '../alert';

import './Main.css';

const Main = () => {
  const initialState = {
    startDate: moment().subtract(1, 'days').toDate(),
    endDate: moment().toDate(),
    focusedInput: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'focusChange':
        return {...state, focusedInput: action.payload};
      case 'dateChange':
        return action.payload;
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="main">{/*TODO clement maybe I was happier with the previous yet simple date picker*/}
        <DateRangeInput
          onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
          onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
          startDate={state.startDate}
          endDate={state.endDate}
          maxBookingDate={moment().toDate()}
          focusedInput={state.focusedInput}
          minBookingDays={2}
        />
      </div>
      <div>
        <Query url="api/" method="POST" startDate={state.startDate} endDate={state.endDate}>
          {({error, fetching, data}) => {
            if (error) {
              return <Alert message={error.message}/>;
            } else if (fetching) {
              return <div>Please wait...</div>;
            } else {
              return <Chart {...data}/>;
            }
          }}
        </Query>
      </div>
    </>
  );
};

export default Main;
