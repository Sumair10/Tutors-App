import auth from "../firebase";
import * as types from "./ActionTypes";
// import { auth } from "../firebase";
import firebase from "firebase";

const ref = firebase.firestore().collection("signInStudents");


// student register
const studentSignupStart = () => ({
  type: types.STUDENT_REGISTER_START,
});

const studentSignupSuccess = (student) => ({
  type: types.STUDENT_REGISTER_SUCCESS,
  payload: student,
});

const studentSignupFail = (error) => ({
  type: types.STUDENT_REGISTER_FAIL,
  payload: error,
});

// student signin

const studentSigningStart = () => ({
  type: types.STUDENT_SIGNING_START,
});

const studentSigningSuccess = (student) => ({
  type: types.STUDENT_SIGNING_SUCCESS,
  payload: student,
});

const studentSigningFail = (error) => ({
  type: types.STUDENT_SIGNING_FAIL,
  payload: error,
});

// tutor register

const tutorSignupStart = () => ({
  type: types.TUTOR_REGISTER_START,
});

const tutorSignupSuccess = (tutor) => ({
  type: types.TUTOR_REGISTER_SUCCESS,
  payload: tutor,
});

const tutorSignupFail = (error) => ({
  type: types.TUTOR_REGISTER_FAIL,
  payload: error,
});

// tutor signing

const tutorSigningStart = () => ({
  type: types.TUTOR_SIGNING_START,
});

const tutorSigningSuccess = (tutor) => ({
  type: types.TUTOR_SIGNING_SUCCESS,
  payload: tutor,
});

const tutorSigningFail = (error) => ({
  type: types.TUTOR_SIGNING_FAIL,
  payload: error,
});

// student logout

const studentLogoutStart = () => ({
  type: types.STUDENT_LOGOUT_START,
});

const studentLogoutSuccess = () => ({
  type: types.STUDENT_LOGOUT_SUCCESS,
});

const studentLogoutFail = (error) => ({
  type: types.STUDENT_LOGOUT_FAIL,
  payload: error,
});

// tutor logout

const tutorLogoutStart = () => ({
  type: types.TUTOR_LOGOUT_START,
});

const tutorLogoutSuccess = () => ({
  type: types.TUTOR_LOGOUT_SUCCESS,
});

const tutorLogoutFail = (error) => ({
  type: types.TUTOR_LOGOUT_FAIL,
  payload: error,
});



// student signup initializer
export const studentSignupInitiate = (
  studentEmail,
  studentPassword,
  callBack,
  studentFirstName,
  studentLastName,
  role
) => {
  return function (dispatch) {
    //thunk concept
    dispatch(studentSignupStart());
    auth
      .createUserWithEmailAndPassword(studentEmail, studentPassword)
      .then(({ student }) => {
        console.log(student);
        callBack();

        dispatch(studentSignupSuccess(student));
        // addStudent(studentEmail,studentFirstName,studentLastName,role)

      })
      // .then(()=>{
      // })
      .catch((error) => dispatch(studentSignupFail(error.message)));
  };
};

// student signing initializer
export const studentSigningInitiate = (
  studentEmail,
  studentPassword,
  callBack
) => {
  return function (dispatch) {
    //thunk concept
    dispatch(studentSigningStart());
    auth
      .signInWithEmailAndPassword(studentEmail, studentPassword)
      .then(({ student }) => {
        // console.log(student);

        callBack();

        dispatch(studentSigningSuccess(student));
      })
      .catch((error) => dispatch(studentSigningFail(error.message)));
  };
};

// tutor signup initializer

export const tutorSignupInitiate = (tutorEmail, tutorPassword, callBack) => {
  return function (dispatch) {
    //thunk concept
    dispatch(tutorSignupStart());
    auth
      .createUserWithEmailAndPassword(tutorEmail, tutorPassword)
      .then(({ tutor }) => {
        console.log(tutor);
        callBack();

        dispatch(tutorSignupSuccess(tutor));
      })
      .catch((error) => dispatch(tutorSignupFail(error.message)));
  };
};

//tutor signing initializer

export const tutorSigningInitiate = (tutorEmail, tutorPassword, callBack) => {
  return function (dispatch) {
    //thunk concept
    dispatch(tutorSigningStart());
    auth
      .signInWithEmailAndPassword(tutorEmail, tutorPassword)
      .then(({ tutor }) => {
        // console.log(student);

        callBack();

        dispatch(tutorSigningSuccess(tutor));
      })
      .catch((error) => dispatch(tutorSigningFail(error.message)));
  };
};

// student logout initializer

export const studentLogoutInitiate = (callBack) => {
  return function (dispatch) {
    //thunk concept
    dispatch(studentLogoutStart());
    auth
      .signOut()
      .then((res) => {
        callBack();
        dispatch(studentLogoutSuccess());
      })
      .catch((error) => dispatch(studentLogoutFail(error.message)));
  };
};

// tutor logout initializer

export const tutorLogoutInitiate = (callBack) => {
  return function (dispatch) {
    //thunk concept
    dispatch(tutorLogoutStart());
    auth
      .signOut()
      .then((res) => {
        callBack();
        dispatch(tutorLogoutSuccess());
      })
      .catch((error) => dispatch(tutorLogoutFail(error.message)));
  };
};
