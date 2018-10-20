import React, { Component } from "react";
import { connect } from "react-redux";

class Main extends Component {
  constructor() {
    super();
    this.pageChange = this.pageChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchFiveCities();
  }
  pageChange(id) {
    this.props.fetchAnyCity(id);
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
