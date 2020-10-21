import { GET_VIREMENT } from "../actions/type";

const initialState = {
  virements: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VIREMENT:
      return {
        ...state,
        virements: action.payload,
      };
    default:
      return state;
  }
}
