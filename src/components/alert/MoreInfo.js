// @flow

import * as React from 'react';
import {Accordion, Alert} from 'react-bootstrap'

import './MoreInfo.css';

type Props = {|
  info: string, // Information to be displayed inside the accordion
|};

/**
 * Displays an accordion
 * */
const MoreInfo = ({info}: Props) => (
  <Accordion>
      <Accordion.Toggle as={Alert.Link} variant="link" eventKey="0">
        More info...
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <pre>{info}</pre>
      </Accordion.Collapse>
  </Accordion>
);

export default MoreInfo;