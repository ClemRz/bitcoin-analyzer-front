// @flow

import React, {useReducer} from 'react';
import {DateRangeInput} from '@datepicker-react/styled'
import ChartQuery from "../chart/ChartQuery";
import moment from 'moment';

import './Main.css';

const ORIGIN_OF_TIME = 1410868800000; // Unix timestamp in milliseconds, Sep. 16 2014

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
    <main>
      <section className="filter">
        <DateRangeInput
          onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
          onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
          startDate={state.startDate}
          endDate={state.endDate}
          minBookingDate={moment(ORIGIN_OF_TIME).toDate()}
          maxBookingDate={moment().toDate()}
          focusedInput={state.focusedInput}
          minBookingDays={2}
        />
      </section>
      <section>
        <ChartQuery
          startDate={moment.utc(state.startDate).startOf('day').unix()}
          endDate={moment.utc(state.endDate).endOf('day').unix()}
        />
      </section>
    </main>
  );
};

export default Main;
