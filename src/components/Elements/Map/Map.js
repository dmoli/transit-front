/* global GOOGLE_MAPS_ID */
import { compose, withProps, withState, withHandlers } from 'recompose';
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
} from 'react-google-maps';

// Google Maps v3 API Options Reference:
// https://developers.google.com/maps/documentation/javascript/3.exp/reference
const defaultOptions = {
  mapTypeControl: false,
  zoomControl: true,
  streetViewControl: true,
  fullscreenControl: false,
  scrollwheel: false,
};

const MapWithControlledZoom = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_ID}`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withState('zoom', 'onZoomChange', 15),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom());
      },
    };
  }),
  withScriptjs,
  withGoogleMap,
)(props =>
  <GoogleMap
    center={props.center}
    zoom={props.zoomCustom}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
    defaultOptions={defaultOptions}
  >
    <Polyline
      path={props.markers}
      options={{
        geodesic: true,
        strokeColor: '#e9004b',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      }}
    ></Polyline>
  </GoogleMap>,
);

/**
 * Clase contenedora de Google Maps
 */
class Map extends Component {
  render() {
    return (
      <MapWithControlledZoom
        {...this.props}
      />
    );
  }
}

export default Map;
