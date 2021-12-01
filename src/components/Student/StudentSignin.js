import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { studentSigningInitiate } from "../../actions/Action";
import "../../index.css";
import Loaders from "../Layout/Loaders";

function StudentSigning() {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    studentEmail: "",
    studentPassword: "",
  });

  const { currentStudent } = useSelector((state) => state.studentReducer);

  const history = useHistory();

  useEffect(() => {
    if (currentStudent) {
      history.push("/");
    }
  
  },[currentStudent, history])

  const dispatch = useDispatch();

  const { studentEmail, studentPassword } = state;

  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault();
    if (!studentEmail || !studentPassword) {
      setLoader(false)
      return;
      
    }
    dispatch(
      studentSigningInitiate(studentEmail, studentPassword, () => {
        history.push("/studentDashboard");
        setLoader(false)
      })
    );
    setState({ studentEmail: "", studentPassword: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // useEffect(() => {
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
     
  //   }, 2000);
  // }, []);
  return (
    <div>
      {loader ? (
        <Loaders />
      ) : (
        <div className="container ">
          <form
            className="row g-3 container w-50 page bg-light bg-gradient border-bottom my-5 position-absolute top-50 start-50 translate-middle"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Student Signin</h1>

            <div className="col-md-12">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="studentEmail"
                name="studentEmail"
                onChange={handleChange}
                value={studentEmail}
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="studentPassword"
                onChange={handleChange}
                name="studentPassword"
                value={studentPassword}
              />
            </div>

            <div className="col-12">
              <button className="btn w-100 acceptButton text-white text-center my-4">
                Sign in
              </button>
            </div>
            <p>
              Don't have an account ? <Link to="/studentSignup"> Signup</Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentSigning;
