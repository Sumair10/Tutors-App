import React, { useState, useEffect } from "react";
import "../../index.css";
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";
import TutorProposalForm from "./TutorProposalForm";

// const ID = null
// function StudentList({ student }) {
function StudentRequestList() {
  const [studentsRequest, setStudentsRequest] = useState([]);
  let user = firebase.auth().currentUser;
  console.log(user);
  const ref = firebase
    .firestore()
    .collection("student")
    //   .where("signedInUser" , "==" , user.uid  )
    .where("studentAccept", "==", false)
    .where("tutorProposal", "==", false);

  const ref2 = firebase.firestore().collection("student");

  function getStudents() {
    ref.onSnapshot((querySnapshot) => {
      const student = [];
      querySnapshot.forEach((doc) => {
        student.push(doc.data());
      });
      setStudentsRequest(student);
    });
  }

  useEffect(() => {
    getStudents();
  }, []);

  const applyForTution = (student) => {
    ref2
      .doc(student.id)
      .update({
        tutorProposal: true,
        // studentAccept : true
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {studentsRequest.map((student) => (
        <div
          className="card d-inline-block m-4 studentList"
          key={student.id}
          style={{ width: "18rem" }}
        >
         <div className="cardss cardsPending">
         <div className="card-header bg-dark text-white ">
            <b>
              Name : <span>{student.studentName}</span>
            </b>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Email :<span> {student.studentEmail}</span>
            </li>
            <li className="list-group-item">
              Contact :<span> {student.studentContact}</span>{" "}
            </li>
            <li className="list-group-item">
              Address :<span> {student.studentAddress}</span>{" "}
            </li>
            <li className="list-group-item">
              Class :<span> {student.studentClass}</span>{" "}
            </li>
            <li className="list-group-item">
              Subject :<span> {student.studentSubject}</span>{" "}
            </li>
            <li className="list-group-item">
              {" "}
              <Link
                to={`/tutorProposalForm/${student.id}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  className="btn w-100 acceptButton text-white text-center"
                  type="button"
                  onClick={() => applyForTution(student)}
                >
                  Apply
                </button>{" "}
              </Link>
            </li>
          </ul>
         </div>
        </div>
      ))}
    </div>
  );
}

export default StudentRequestList;
