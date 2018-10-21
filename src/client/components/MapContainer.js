import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const API_KEY = process.env.REACT_APP_API_KEY;

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h3>Your Current Location</h3>
          </div>
        </InfoWindow>

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[0].name}
          name={this.props.results[0].name}
          position={{
            lat: this.props.results[0].geolocation.latitude,
            lng: this.props.results[0].geolocation.longitude
          }}
          visibility={"true"}
        />

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[0].name}
          name={this.props.results[0].name}
          position={{
            lat: this.props.results[0].geolocation.latitude,
            lng: this.props.results[0].geolocation.longitude
          }}
          visibility={"true"}
        />

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[1].name}
          name={this.props.results[1].name}
          position={{
            lat: this.props.results[1].geolocation.latitude,
            lng: this.props.results[1].geolocation.longitude
          }}
          visibility={"true"}
        />

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[2].name}
          name={this.props.results[2].name}
          position={{
            lat: this.props.results[2].geolocation.latitude,
            lng: this.props.results[2].geolocation.longitude
          }}
          visibility={"true"}
        />

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[3].name}
          name={this.props.results[3].name}
          position={{
            lat: this.props.results[3].geolocation.latitude,
            lng: this.props.results[3].geolocation.longitude
          }}
          visibility={"true"}
        />

        <Marker
          onClick={this.onMarkerClick}
          title={this.props.results[4].name}
          name={this.props.results[4].name}
          position={{
            lat: this.props.results[4].geolocation.latitude,
            lng: this.props.results[4].geolocation.longitude
          }}
          visibility={"true"}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
