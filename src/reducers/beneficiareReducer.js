import { GET_BENEFICIARES } from "../actions/type";

const initialState = {
  beneficiares: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BENEFICIARES:
      return {
        ...state,
        beneficiares: action.payload,
      };
    default:
      return state;
  }
}
