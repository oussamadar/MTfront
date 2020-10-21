import axios from "axios";
import { GET_BENEFICIARES } from "./type";

export const getBenef = () => async (dispatch) => {
  const res = await axios.get(
    "https://virementapp.herokuapp.com/api/beneficiare"
  );

  dispatch({
    type: GET_BENEFICIARES,
    payload: res.data,
  });
};
