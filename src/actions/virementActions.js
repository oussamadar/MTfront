import axios from "axios";
import { GET_ERRORS, GET_VIREMENT } from "./type";

export const postVirement = (VirementRequest) => async (dispatch) => {
  try {
    // post => Virement Request
    const res = await axios.post(
      "https://virementapp.herokuapp.com/api/virement",
      VirementRequest
    );
    dispatch({
      type: GET_ERRORS,
      payload: { show: true },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const postPass = (password) => async (dispatch) => {
  console.log(password);
  try {
    const res = await axios.post(
      "https://virementapp.herokuapp.com/api/virement/verification",
      password
    );
    dispatch({
      type: GET_ERRORS,
      payload: { show: false },
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
export const getVirement = () => async (dispatch) => {
  const res = await axios.get("https://virementapp.herokuapp.com/api/virement");
  dispatch({
    type: GET_VIREMENT,
    payload: res.data,
  });
};
