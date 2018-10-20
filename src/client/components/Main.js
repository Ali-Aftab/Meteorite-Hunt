import React, { Component } from "react";
import { connect } from "react-redux";

export default class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <React.Fragment>
        <div className="home-title">Current Weather</div>
        <div className="main-container">Hello Temporary Text</div>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     cities: state.cities,
//     city: state.city,
//     cityForecast: state.cityForecast
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   fetchFiveCities: () => gettingFiveCities(dispatch),
//   fetchAnyCity: id => dispatch(gettingAnyCity(id))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Main);
