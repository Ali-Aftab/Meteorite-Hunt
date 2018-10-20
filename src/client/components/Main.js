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
        <div className="home-title">Current Weather</div>
        <div className="main-container">Hello Temporary Text</div>
        <Geolocation
          lazy
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) => (
            <div>
              <button onClick={getCurrentPosition}>Get Position</button>
              {error && <div>{error.message}</div>}

              <pre>
                latitude: {latitude}
                longitude: {longitude}
                <button
                  onClick={() =>
                    this.handleSumbit(
                      longitude,
                      latitude,
                      this.props.allMeteorites
                    )
                  }
                >
                  Help
                </button>
              </pre>
            </div>
          )}
        />
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
