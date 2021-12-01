import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentLogoutInitiate } from "../../actions/Action";
import { useHistory } from "react-router-dom";
import StudentList from "./StudentList";
import useFetch from "./UseFetchHookStudent";
import "../../index.css";
import ProposalList from "./ProposalList";
import AcceptedList from "./AcceptedList";

function StudentDashBoard() {
  // const { id } = useParams();
  // console.log(id)

  const { currentStudent } = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  //   const {student  ,isPending ,error} =useFetch(" http://localhost:8000/student")

  const handleAuth = () => {
    if (!currentStudent) {
      dispatch(studentLogoutInitiate(() => history.push("/")));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Student Dashboard</h1>
      <div className="post d-block my-3 p-2 bg-primary text-white text-center">
        <Link to="/postTutionRequest" style={{ textDecoration: "none", color: "white" }}>
          Post a Tution Request
        </Link>
      </div>
      <div className="page bg-light bg-gradient border-bottom my-5">{<StudentList delete="Delete" />}</div>

      {/* ------------------conditional error message -------------------- */}
      {/* {error && <div>Could not fetch the data</div> } */}
      {/* ------------------conditional loading message -------------------- */}
      {/* {isPending && <div>Loading....</div>} */}
      {/* {student && <StudentList student={student} delete="Delete"/>} */}

      <h1 className="text-center my-2">----- Tutor Proposals -----</h1>
      <div className="page bg-light bg-gradient border-bottom my-5">
        <ProposalList />
      </div>
      <h1 className="text-center my-2">----- Accepted -----</h1>
      <div className="page bg-light bg-gradient border-bottom my-5">
        <AcceptedList />
      </div>
      <button className="btn btn-primary" onClick={handleAuth}>
        Logout
      </button>
    </div>
  );
}

export default StudentDashBoard;
