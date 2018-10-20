import React, { Component } from "react";
import { connect } from "react-redux";
import Geolocation from "react-geolocation";
import { gettingAllMeteorites, fetchTopFive } from "../store/thunks";
import ResultCard from "./ResultCard";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };
    this.state.handleSumbit = this.handleSumbit.bind(this);
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
  render() {
    return (
      <React.Fragment>
        <div className="logo-meteorite">
          <img src="logo.png" alt="Meet Your Meteorite" />
        </div>
        <div className="title">Find some meteorites!</div>
        <div className="main-container">
          <Geolocation
            lazy
            render={({
              fetchingPosition,
              position: { coords: { latitude, longitude } = {} } = {},
              error,
              getCurrentPosition
            }) => (
              <div>
                <button
                  className="current-location-btn"
                  onClick={getCurrentPosition}
                >
                  Get Current Location
                </button>
                {error && <div>{error.message}</div>}
                <pre>
                  <table className="long-lat-table">
                    <tbody>
                      <tr>
                        <td className="table-label">Latitude:</td>
                        <td className="table-result">{latitude}</td>
                      </tr>
                      <tr>
                        <td className="table-label">Longitude:</td>
                        <td className="table-result">{longitude}</td>
                      </tr>
                    </tbody>
                  </table>
                </pre>
                <button
                  className="current-location-btn"
                  onClick={() =>
                    this.handleSumbit(
                      longitude,
                      latitude,
                      this.props.allMeteorites
                    )
                  }
                >
                  Go!
                </button>
                <div className="line">
                  <div className="line-box" />
                </div>
              </div>
            )}
          />
          {this.state.results.length
            ? this.state.results.map(site => {
                return (
                  <ResultCard
                    name={site.name}
                    mass={site.mass}
                    distance={site.distance}
                    longitude={site.geolocation.longitude}
                    latitude={site.geolocation.latitude}
                  />
                );
              })
            : null}
          {/* <div className="card">
            <div className="card-left">
              <span className="field-name">Meteorite Name</span>
              <br />
              <span className="field-left">MASS:</span> 300000 grams
            </div>
            <div className="card-right">
              <span className="field-right">DISTANCE:</span> 2.1 miles <br />
              <a
                className="google-maps"
                href="http://www.google.com/maps/place/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Location
              </a>
            </div>
            <div className="clear" />
          </div> */}
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
