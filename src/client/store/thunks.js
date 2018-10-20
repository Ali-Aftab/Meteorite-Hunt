import axios from "axios";
import geolib from "geolib";
import { GET_METEORITES, TOP_FIVE } from "./index";

const allMeteorites = payload => ({
  type: GET_METEORITES,
  payload
});
const topFive = payload => ({
  type: TOP_FIVE,
  payload
});

export const gettingAllMeteorites = async dispatch => {
  try {
    const meteoriteInfo = await axios.get(
      "https://data.nasa.gov/resource/gh4g-9sfh.json"
    );
    dispatch(allMeteorites(meteoriteInfo.data));
  } catch (error) {
    console.log(error);
  }
};
export const fetchTopFive = (long, lat, allMeteors) => dispatch => {
  try {
  } catch (error) {
    console.log(error);
  }
};
