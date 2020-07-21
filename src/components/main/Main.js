// @flow

import React, {useReducer, useState} from 'react';
import {DateRangeInput} from '@datepicker-react/styled'
import moment from 'moment';
import ChartQuery from '../chart/ChartQuery';
import CustomAlert from "../alert/CustomAlert";

import './Main.css';

const ORIGIN_OF_TIME = 1410908400; // Unix timestamp, Sep. 16 2014

const initialState = {
  startDate: moment().subtract(1, 'days').toDate(),
  endDate: moment().toDate(),
  focusedInput: null,
};

/**
 * State management
 * */
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

/**
 * Displays the main section of the page.
 * Manages the user interaction state.
 * */
const Main = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);

  /**
   * This is a temporary fix for https://github.com/tresko/react-datepicker/issues/99
   * */
  const handleKeyUp = (event) => {
    if (event.isComposing || event.keyCode === 229) { // FF65 compatibility
      return;
    }
    const id = event.target.id;
    setError((id === 'startDate' || id === 'endDate') && !moment(event.target.value).isValid());
  };

  return (
    <main>
      <section className="filter" onKeyUp={handleKeyUp}>
        <DateRangeInput
          onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
          onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
          startDate={state.startDate}
          endDate={state.endDate}
          minBookingDate={moment.unix(ORIGIN_OF_TIME).toDate()}
          maxBookingDate={moment().toDate()}
          focusedInput={state.focusedInput}
          minBookingDays={1}
          startDateInputId="startDate"
          endDateInputId="endDate"
        />
      </section>
      <section>
        {error ?
          <CustomAlert message="Incorrect dates" code={21}/> :
          <ChartQuery startDate={moment(state.startDate).unix()} endDate={moment(state.endDate).unix()}/>
        }
      </section>
    </main>
  );
};

export default Main;
