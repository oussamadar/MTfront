import { GET_COMPTES } from "../actions/type";

const initialState = {
  comptes: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPTES:
      return {
        ...state,
        comptes: action.payload,
      };
    default:
      return state;
  }
}
