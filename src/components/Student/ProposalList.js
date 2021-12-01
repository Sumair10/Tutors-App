import React, { useState, useEffect } from "react";
import "../../index.css";
import firebase from "firebase/app";
import "firebase/auth";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";

// function StudentList({ student }) {
function ProposalList(props) {
  const { id } = useParams();
  console.log(id);
  const [acceptTutors, setAcceptTutors] = useState([]);
  let user = firebase.auth().currentUser;
  console.log(user);
  const ref = firebase
    .firestore()
    .collection("tutorRequest")
    .where("studentEmail", "==", user.email)
    .where("tutorProposal", "==", true)
    .where("studentAccept", "==", false);
  // console.log(ref )

  const ref2 = firebase.firestore().collection("tutorRequest");

  function getStudents() {
    ref.onSnapshot((querySnapshot) => {
      const tutor = [];
      querySnapshot.forEach((doc) => {
        tutor.push(doc.data());
      });
      setAcceptTutors(tutor);
    });
  }

  //   function getStudents2() {
  //     ref.get().then((student) => {
  //       const students = student.docs.map((doc) => doc.data());
  //       setStudents(students);
  //     });
  //   }

  useEffect(() => {
    getStudents();
  }, []);

  const acceptTutor = (tutor) => {
    ref2
      .doc(tutor.id)
      .update({
        studentAccept: true,
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* <p> I'm the current user: {user.email} </p> */}
      {acceptTutors.map((tutor) => (
        <div
          className="card d-inline-block m-4 tutor "
          key={tutor.id}
          style={{ width: "18rem" }}
        >
          <div className="card-header bg-dark text-white text-center fs-5 ">
            Student Data
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Student Name : <span>{tutor.studentName}</span>
            </li>
            <li className="list-group-item">
              Contact :<span> {tutor.studentContact}</span>{" "}
            </li>
            <li className="list-group-item">
              Address :<span> {tutor.studentAddress}</span>{" "}
            </li>
            <li className="list-group-item">
              Class :<span> {tutor.studentClass}</span>{" "}
            </li>
            <li className="list-group-item">
              Subject :<span> {tutor.studentSubject}</span>{" "}
            </li>

            <div className="card-header bg-dark text-white text-center fs-5  ">
              Tutor Proposal
            </div>

            <li className="list-group-item">
              Tutor Name :<span> {tutor.tutorName}</span>
            </li>
            <li className="list-group-item">
              Contact :<span> {tutor.tutorContact}</span>{" "}
            </li>
            <li className="list-group-item">
              Address :<span> {tutor.tutorAddress}</span>{" "}
            </li>
            <li className="list-group-item">
              Tution Fee :<span> {tutor.tutorFee}</span>{" "}
            </li>
            <li className="list-group-item">
              Gender :<span> {tutor.tutorGender}</span>{" "}
            </li>
            <li className="list-group-item">
              Age :<span> {tutor.tutorAge}</span>{" "}
            </li>
            <li className="list-group-item">
              Qualification :<span> {tutor.tutorQualification}</span>{" "}
            </li>
            <li className="list-group-item">
              {" "}
              <Link to="/studentDashBoard">
                <button
                  className="btn w-100 acceptButton text-white text-center "
                  type="button"
                  onClick={() => acceptTutor(tutor)}
                >
                  Accept
                </button>{" "}
              </Link>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ProposalList;
