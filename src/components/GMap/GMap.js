import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'

import './GMap.scss';

class GMap extends React.Component {
  static defaultProps = {
    zoom: 15,
    fixedMarker: true,
    drag: false,
    center: {
      lat: 13.7563,
      lng: 100.5018
    }
  };

  componentDidMount() {
    if (!window) return console.warn('window could not be found');

    if (window.google && window.google.maps) {
      this.renderGoogleMap();
    } else {
      window.renderGoogleMap = this.renderGoogleMap.bind(this);
    }
  }

  shouldComponentUpdate(prevProps) {
    return (
      prevProps.center.lat !== this.props.center.lat ||
      prevProps.center.lng !== this.props.center.lng
    );
  }

  componentDidUpdate(prevProps) {
    const { center } = this.props;

    this.map &&
      this.map.setCenter({
        lat: center.lat,
        lng: center.lng
      });
  }

  renderGoogleMap() {
    const { center, drag, onCenterChanged } = this.props;

    const geocoder = new window.google.maps.Geocoder();

    const map = new window.google.maps.Map(this.refs.map, {
      center: {
        lat: center.lat,
        lng: center.lng
      },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    map.setOptions({ draggable: drag });

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(
      this.refs.inputContainer
    );

    let autocomplete = new window.google.maps.places.Autocomplete(
      this.refs.input
    );

    autocomplete.bindTo('bounds', map);
    autocomplete.setOptions({strictBounds: true})

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const { location } = place.geometry;

      if (!place.geometry) {
        window.alert('No details available for input: "" + place.name + ""');
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(location);
      }

      onCenterChanged &&
        onCenterChanged({
          location_lat: location.lat(),
          location_lng: location.lng(),
          location_name: place.name
        });
    });

    this.geocoder = geocoder;
    this.map = map;
  }

  preventSubmitOnEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      return false;
    }
  }

  render() {
    return (
      <div className="google-map-container">
        <div className="google-map" ref="map" />

        {this.props.fixedMarker && <FaMapMarkerAlt className="google-map-marker" />}

        {this.props.place && (
          <div className="google-map-places-container" ref="inputContainer">
            <input
              className="google-map-places-input"
              type="text"
              placeholder="Search..."
              ref="input"
              onKeyPress={this.preventSubmitOnEnter}
              onKeyDown={this.preventSubmitOnEnter}
            />
          </div>
        )}
      </div>
    );
  }
}

export default GMap;
