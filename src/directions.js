import React from 'react';

import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';

const Directions = compose(
  withProps({
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default Directions;
