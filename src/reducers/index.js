import { combineReducers } from "redux";
import beneficiareReducer from "./beneficiareReducer";
import errorsReducer from "./errorsReducer";
import compteReducer from "./compteReducer";
import virementReducer from "./virementReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorsReducer,
  beneficiare: beneficiareReducer,
  compte: compteReducer,
  virement: virementReducer,
  security: securityReducer,
});
