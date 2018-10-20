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
    console.log(allMeteors);
    const currentLocation = { latitude: lat, longitude: long };
    let array = new Array(5).fill({ distance: Infinity });
    for (let i = 0; i < allMeteors.length; i++) {
      const curMet = allMeteors[i];
      if (!curMet.geolocation) {
        continue;
      }
      const coord = {
        longitude: curMet.geolocation.longitude,
        latitude: curMet.geolocation.latitude
      };
      const coordDistance = geolib.getDistance(currentLocation, coord);
      curMet.distance = coordDistance;
      if (curMet.distance < array[4].distance) {
        array[0] = array[1];
        array[1] = array[2];
        array[2] = array[3];
        array[3] = array[4];
        array[4] = curMet;
      } else if (curMet.distance < array[3].distance) {
        array[0] = array[1];
        array[1] = array[2];
        array[2] = array[3];
        array[3] = curMet;
      } else if (curMet.distance < array[2].distance) {
        array[0] = array[1];
        array[1] = array[2];
        array[2] = curMet;
      } else if (curMet.distance < array[1].distance) {
        array[0] = array[1];
        array[1] = curMet;
      } else if (curMet.distance < array[0].distance) {
        array[0] = curMet;
      }
    }
    return array;
  } catch (error) {
    console.log(error);
  }
};
