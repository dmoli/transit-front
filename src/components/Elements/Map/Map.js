/* global google */
import { compose, withProps, withState, withHandlers } from 'recompose';
import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
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
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBHuWJr1YBzsCg5Mc7sTzU8gSXNh_-VDcs',
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
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={{ lat: parseFloat(marker.shape_pt_lat), lng: parseFloat(marker.shape_pt_lon) }}
        icon={
          new google.maps.MarkerImage(
          '/static/marker.svg',
          null,
          null,
          null,
          new google.maps.Size(20.2, 23.8),
        )
        }
        title={(index + 1).toString()}
        zIndex={99999999}
        // onClick={() => props.onMapClick(index)}
      />
    ))}
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
