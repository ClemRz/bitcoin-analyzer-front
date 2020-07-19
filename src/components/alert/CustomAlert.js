// @flow

import * as React from 'react';
import Alert from 'react-bootstrap/Alert';

import './CustomAlert.css';
import MoreInfo from "./MoreInfo";

type Props = {|
  message: string,
  variant?: ?string,
  code?: ?number,
|};

/**
 * Map between backend errors and human-readable text.
 * This also allow to filter the errors we want to display on the UI.
 * */
const ERROR_MAP = {
  '22': {message: 'Invalid dates.', info: 'Please make sure that the start date is not older than the end date.\nEnd date can\'t be in the future.\nStart date can\'t be before first data point (Sep. 16 2014).'}
};

const CustomAlert = ({message, code, variant}: Props) => {
    const generic = (info) => {
      return {
        message: 'An unexpected error occurred.',
        info
      };
    };
    const nicerMessage = ({message, info}: {| message: string, info?: ?string |}) => (
      <>
        {message}
        {info && <MoreInfo info={info}/>}
      </>
    );
    return (
      <div className="customAlert">
        <Alert key={1} variant={variant || 'danger'}>
          {code === -1 ? message : nicerMessage(ERROR_MAP[code] || generic(message))}
        </Alert>
      </div>
    );
  }
;

export default CustomAlert;