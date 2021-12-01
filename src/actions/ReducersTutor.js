import * as type from "./ActionTypes";

const initialState = {
  loading: false,
  currentStudent: null,
  error: null,
};

// tutor reducer

const tutorReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.TUTOR_REGISTER_START:
    case type.TUTOR_SIGNING_START:
    case type.TUTOR_LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case type.TUTOR_LOGOUT_SUCCESS:
      return {
        ...state,
        currentTutor: null,
      };
    case type.TUTOR_REGISTER_SUCCESS:
    case type.TUTOR_SIGNING_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTutor: action.payload,
      };
    case type.TUTOR_REGISTER_FAIL:
    case type.TUTOR_SIGNING_FAIL:
    case type.TUTOR_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return action;
  }
};

export default tutorReducer;
