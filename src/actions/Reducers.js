import * as type from "./ActionTypes";

const initialState = {
  loading: false,
  currentStudent: null,
  error: null,
};

// student reducer

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.STUDENT_REGISTER_START:
    case type.STUDENT_SIGNING_START:
    case type.STUDENT_LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case type.STUDENT_LOGOUT_SUCCESS:
      return {
        ...state,
        currentStudent: null,
      };
    case type.STUDENT_REGISTER_SUCCESS:
    case type.STUDENT_SIGNING_SUCCESS:
      return {
        ...state,
        loading: false,
        currentStudent: action.payload,
      };
    case type.STUDENT_REGISTER_FAIL:
    case type.STUDENT_SIGNING_FAIL:
    case type.STUDENT_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return action;
  }
};

export default studentReducer;
