// @flow

import * as React from 'react';

type Props = {|
  message: string,
|};

const Alert = ({message}: Props) => (
  <div>{message}</div>
);

export default Alert;