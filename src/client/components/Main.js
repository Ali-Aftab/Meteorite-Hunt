import React, { Component } from "react";
import { connect } from "react-redux";
import { gettingAllMeteorites, fetchTopFive } from "../store/thunks";
import ResultCard from "./ResultCard";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      latitude: "",
      longitude: "",
      disabled: false,
      color: "",
      btnText: "Get Current Location"
    };
    this.state.handleSumbit = this.handleSumbit.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllMeteorites();
  }
  async handleSumbit(longitude, latitude, meteors) {
    const top5 = await this.props.fetchFive(longitude, latitude, meteors);
    console.log(top5);
    this.setState({
      results: top5
    });
    console.log(this.state.results);
  }
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        disabled: true,
        color: "grey",
        btnText: "Location Acquired"
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="logo-meteorite">
          <img src="logo.png" alt="Meet Your Meteorite" />
        </div>
        <div className="title">Find some meteorites!</div>
        <div className="main-container">
          <div className="btn-container">
            <button
              className={`current-location-btn ${this.state.color}`}
              onClick={() => this.getCurrentPosition()}
              disabled={this.state.disabled}
            >
              {this.state.btnText}
            </button>
            {this.state.latitude !== "" && this.state.longitude !== "" ? (
              <button
                className="current-location-btn"
                onClick={() =>
                  this.handleSumbit(
                    this.state.longitude,
                    this.state.latitude,
                    this.props.allMeteorites
                  )
                }
              >
                Go!
              </button>
            ) : null}
          </div>
          {this.state.results.length
            ? this.state.results.map((site, idx) => {
                return (
                  <ResultCard
                    key={idx}
                    name={site.name}
                    mass={site.mass}
                    distance={site.distance}
                    longitude={site.geolocation.longitude}
                    latitude={site.geolocation.latitude}
                  />
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMeteorites: state.allMeteorites
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAllMeteorites: () => gettingAllMeteorites(dispatch),
  fetchFive: (longitude, latitude, meteors) =>
    dispatch(fetchTopFive(longitude, latitude, meteors))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
