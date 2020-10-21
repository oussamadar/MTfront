import axios from "axios";
import { GET_COMPTES } from "./type";

export const getCompte = () => async (dispatch) => {
  const res = await axios.get("https://virementapp.herokuapp.com/api/compte");
  dispatch({
    type: GET_COMPTES,
    payload: res.data,
  });
};
