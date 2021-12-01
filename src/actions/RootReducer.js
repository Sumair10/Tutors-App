import { firebaseReducer, fireStoreReducer } from "react-redux-firebase";
import { combineReducers  } from "redux";
import studentReducer  from "./Reducers";
import tutorReducer from "./ReducersTutor";

const rootReducer = combineReducers({
    studentReducer ,
    tutorReducer ,
    firebase:firebaseReducer,
})

export default rootReducer