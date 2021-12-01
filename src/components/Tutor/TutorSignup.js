import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { tutorSignupInitiate } from "../../actions/Action";
import Loaders from "../Layout/Loaders";
function TutorSignup() {
  const [loader, setLoader] = useState(false);
  
  const [state, setState] = useState({
    tutorFirstName: "",
    tutorLastName: "",
    tutorEmail: "",
    tutorPassword: "",
    tutorConfirmPassword: "",
  });

  const { currentTutor } = useSelector((state) => state.tutorReducer);

  const history = useHistory();

  useEffect(() => {
    if (currentTutor) {
      history.push("/");
    }
  }, [currentTutor, history]);

  const dispatch = useDispatch();

  const {
    tutorFirstName,
    tutorLastName,
    tutorEmail,
    tutorPassword,
    tutorConfirmPassword,
  } = state;

  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault();
    if (tutorPassword !== tutorConfirmPassword) {
      return;
    }
    dispatch(
      
      tutorSignupInitiate(tutorEmail, tutorPassword, () => {
        
        history.push("/tutorDashboard");
        setLoader(false)
      })
      
    );
    setState({
      tutorFirstName: "",
      tutorLastName: "",
      tutorEmail: "",
      tutorPassword: "",
      tutorConfirmPassword: "",
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container my-5">
    
    {
      loader ?
      <Loaders/>
      :
      <form
        className="row g-3 container w-50 page bg-light bg-gradient border-bottom my-5 position-absolute top-50 start-50 translate-middle"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Tutor Signup</h1>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="tutorFirstName"
            name="tutorFirstName"
            onChange={handleChange}
            value={tutorFirstName}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="tutorLastName"
            id="tutorLastName"
            onChange={handleChange}
            value={tutorLastName}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="tutorEmail"
            name="tutorEmail"
            onChange={handleChange}
            value={tutorEmail}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="tutorPassword"
            name="tutorPassword"
            onChange={handleChange}
            value={tutorPassword}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="tutorConfirmPassword"
            name="tutorConfirmPassword"
            onChange={handleChange}
            value={tutorConfirmPassword}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn w-100 acceptButton text-white text-center my-4"
          >
            Sign up
          </button>
        </div>
        <p>
          Already have an account ? <Link to="/tutorSignin"> Signin</Link>
        </p>
      </form>
    }
    </div>
  );
}

export default TutorSignup;
