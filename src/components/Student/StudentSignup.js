import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { studentSignupInitiate } from "../../actions/Action";
import firebase from "firebase";
import { v4 as uuidv4 } from "uuid";
import Loaders from "../Layout/Loaders";

const ref = firebase.firestore().collection("signInStudents");

function StudentSignup() {
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    studentPassword: "",
    studentConfirmPassword: "",
    role: "student",
  });

  const { currentStudent } = useSelector((state) => state.studentReducer);

  const history = useHistory();

  useEffect(() => {
    if (currentStudent) {
      history.push("/");
    }
  }, [currentStudent, history]);

  const dispatch = useDispatch();

  const {
    studentFirstName,
    studentLastName,
    studentEmail,
    studentPassword,
    studentConfirmPassword,
    role,
  } = state;

  function addStudent(newSignInStudent) {
    console.log();
    ref
      .doc(newSignInStudent.id)
      .set(newSignInStudent)
      .catch((err) => {
        console.log(err);
      });
    // history.push("/studentDashboard")
  }

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (studentPassword !== studentConfirmPassword) {
      setLoader(false);
      return;
    } else if (studentPassword === "") {
      console.log("please neter field");
      setLoader(false);
    }

    dispatch(
      studentSignupInitiate(
        studentEmail,
        studentPassword,
        () => {
          history.push("/studentDashboard");
          setLoader(false);
        },
        studentFirstName,
        studentLastName,
        role
      )
    );

    setState({
      studentFirstName: "",
      studentLastName: "",
      studentEmail: "",
      studentPassword: "",
      studentConfirmPassword: "",
      role: "student",
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container ">
      {loader ? (
        <Loaders />
      ) : (
        <form
          className="needs-validation row g-3 container w-50 page bg-light bg-gradient border-bottom my-5 position-absolute top-50 start-50 translate-middle"
          onSubmit={handleSubmit}
          novalidate>
          <h1 className="text-center">Student Signup</h1>
          <div className="col-md-6">
            <label htmlFor="validationCustom01" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentFirstName"
              name="studentFirstName"
              onChange={handleChange}
              value={studentFirstName}
              required
            />
            <div className="valid-feedback"></div>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="studentLastName"
              id="studentLastName"
              onChange={handleChange}
              value={studentLastName}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              name="studentEmail"
              onChange={handleChange}
              value={studentEmail}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="studentPassword"
              name="studentPassword"
              onChange={handleChange}
              value={studentPassword}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="studentConfirmPassword"
              name="studentConfirmPassword"
              onChange={handleChange}
              value={studentConfirmPassword}
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn w-100 acceptButton text-white text-center my-4"
              onClick={() =>
                addStudent({
                  studentEmail,
                  studentFirstName,
                  studentLastName,
                  role,
                  id: uuidv4(),
                })
              }
            >
              Sign up
            </button>
          </div>
          <p style={{ textDecoration: "none" }}>
            Already have an account ? <Link to="/studentSignin"> Signin</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default StudentSignup;
