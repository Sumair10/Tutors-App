import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { tutorSigningInitiate } from "../../actions/Action";
import Loaders from "../Layout/Loaders";

function TutorSigning() {
  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    tutorEmail: "",
    tutorPassword: "",
  });

  const { currentTutor } = useSelector((state) => state.tutorReducer);

  const history = useHistory();

  useEffect(() => {
    if (currentTutor) {
      history.push("/");
      //   studentDashboard
    }
  }, [currentTutor, history]);

  const dispatch = useDispatch();

  const { tutorEmail, tutorPassword } = state;


  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault();
    if (!tutorEmail || !tutorPassword) {
      return;
    }
    dispatch(tutorSigningInitiate(tutorEmail, tutorPassword , ()=>{ history.push("/tutorDashboard") 
    setLoader(false)
  }));
    setState({ tutorEmail: "", tutorPassword: "" });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>

      {
        loader?
        <Loaders/>
        :
        <div className="container my-5">
        <form className="row g-3 container w-50 page bg-light bg-gradient border-bottom my-5 position-absolute top-50 start-50 translate-middle" onSubmit={handleSubmit}>
          <h1 className="text-center">Tutor Signin</h1>

          <div className="col-md-12">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="tutorEmail"
              name="tutorEmail"
              onChange={handleChange}
              value={tutorEmail}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="tutorPassword"
              onChange={handleChange}
              name="tutorPassword"
              value={tutorPassword}
            />
          </div>

          <div className="col-12">
            <button className="btn w-100 acceptButton text-white text-center my-4" >
                Sign in
            </button>
          </div>
          <p>
          Don't have an account ? <Link to="/tutorSignup"> Signup</Link>
        </p>
        </form>
      </div>
      }
    </div>
  );
}

export default TutorSigning;
