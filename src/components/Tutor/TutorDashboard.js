import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { tutorLogoutInitiate } from "../../actions/Action";
import { useHistory } from "react-router-dom";
// import StudentList from "../Student/StudentList";
import StudentRequestList from "./StudentRequestList";
import TutorProposalList from "./TutorProposalList";
import '../../index.css'
import AcceptedTutionList from "./AcceptedTutionsList";

function TutorDashboard() {
  const { currentTutor } = useSelector((state) => state.tutorReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAuth = () => {
    if (!currentTutor) {
      dispatch(tutorLogoutInitiate(() => history.push("/")));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Tutor Dashboard</h1>
      <h2  className="text-center my-4">----- Available Tutions -----</h2>
      <div>
        <div className="page bg-light bg-gradient border-bottom my-5">
          <StudentRequestList />
        </div>

      <h2  className="text-center my-2"> ----- Requested -----</h2>
        
      <div className="page bg-light bg-gradient border-bottom my-5">
        <TutorProposalList/>
      </div>
      <h2  className="text-center my-2">----- Accepted -----</h2>
      <div className="page bg-light bg-gradient border-bottom my-5">
      <AcceptedTutionList/>
      </div>
        <button className="btn" onClick={handleAuth}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TutorDashboard;
