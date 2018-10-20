import React, { Component } from "react";
import { connect } from "react-redux";
import Geolocation from "react-geolocation";
import { gettingAllMeteorites, fetchTopFive } from "../store/thunks";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0
    };
    this.state.handleSumbit = this.handleSumbit.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllMeteorites();
  }
  handleSumbit(longitude, latitude, meteors) {
    const top5 = this.props.fetchFive(longitude, latitude, meteors);
    console.log(top5);
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
