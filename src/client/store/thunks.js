import axios from "axios";
import { GET_METEORITES } from "./index";

const allMeteorites = payload => ({
  type: GET_METEORITES,
  payload: payload
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
