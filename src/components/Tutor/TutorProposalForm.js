import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import firebase from "firebase";
import "../../index.css";

import firebase from "firebase/app";
import "firebase/auth";

// import { ID } from "./StudentRequestList";

function TutorProposalForm() {
  let user = firebase.auth().currentUser;

  const { id } = useParams();
  console.log(id);

  // console.log(ID)
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSubject, setStudentSubject] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [tutorContact, setTutorContact] = useState("");
  const [tutorAge, setTutorAge] = useState("");
  const [tutorGender, setTutorGender] = useState("");
  const [tutorFee, setTutorFee] = useState("");
  const [tutorQualification, setTutorQualification] = useState("");
  const [tutorAddress, setTutorAddress] = useState("");
  const [tutorExperience, setTutorExperience] = useState("");
  const [tutorProposal, setTutorProposal] = useState(false);
  const [studentAccept, setStudentAccept] = useState(false);

  const [tutors, setTutors] = useState([]);
  const [studentsRequest, setStudentsRequest] = useState([]);

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const ref = firebase.firestore().collection("tutorRequest");
  const ref2 = firebase.firestore().collection("student").where("id", "==", id);

  function getTutors() {
    ref.onSnapshot((querySnapshot) => {
      const tutors = [];
      querySnapshot.forEach((doc) => {
        tutors.push(doc.data());
      });
      setTutors(tutors);
    });
  }

  function getStudents() {
    ref2.onSnapshot((querySnapshot) => {
      let studentsRequest = null;
      querySnapshot.forEach((doc) => {
        studentsRequest = doc.data();
      });
      setStudentsRequest(studentsRequest);
    });
  }

  useEffect(() => {
    getTutors();
    getStudents();
  }, []);

  const addTutor = (newTutor) => {
    ref
      .doc(newTutor.id)
      .set(newTutor)
      .catch((err) => {
        console.log(err);
      });
    ref
      .doc(newTutor.id)
      .update({
        tutorProposal: true,
      })
      .catch((err) => {
        console.log(err);
      });

    history.push("/tutorDashboard");
  };

  return (
    <div>
      <div className="container my-5">
      <h1 className="text-center">----- Apply for a Tution -----</h1>
        {/* <form className="row g-3" onSubmit={handleSubmit}> */}
        <form className="row g-3 container  page bg-light bg-gradient border-bottom my-5">
          
          <h2 className="my-3 mt-4">Student Information</h2>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Student name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentsRequest.studentName}
              onChange={(e) => setStudentName(studentsRequest.studentName)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Class
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentsRequest.studentClass}
              onChange={(e) => setStudentClass(studentsRequest.studentClass)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentsRequest.studentSubject}
              onChange={(e) =>
                setStudentSubject(studentsRequest.studentSubject)
              }
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentsRequest.studentContact}
              onChange={(e) =>
                setStudentContact(studentsRequest.studentContact)
              }
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentsRequest.studentAddress}
              onChange={(e) =>
                setStudentAddress(studentsRequest.studentAddress)
              }
            />
          </div>
          <h2 className="mt-5">Tutor Information</h2>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Tutor Name
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorName"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Fee
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorFee"
              value={tutorFee}
              onChange={(e) => setTutorFee(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorGender"
              value={tutorGender}
              onChange={(e) => setTutorGender(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorContact"
              value={tutorContact}
              onChange={(e) => setTutorContact(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Age
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorAge"
              value={tutorAge}
              onChange={(e) => setTutorAge(e.target.value)}
            />
          </div>

        
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorAddress"
              value={tutorAddress}
              onChange={(e) => setTutorAddress(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Qualification
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorQualification"
              value={tutorQualification}
              onChange={(e) => setTutorQualification(e.target.value)}
            />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="tutorExperience"
              value={tutorExperience}
              onChange={(e) => setTutorExperience(e.target.value)}
            />
          </div>

          <div className="col-12">
            {!isPending && (
              <button
                type="button"
                onClick={() =>
                  addTutor({
                    tutorName,
                    tutorEmail: user.email,
                    tutorContact,
                    tutorGender,
                    tutorAge,
                    tutorFee,
                    tutorQualification,
                    tutorAddress,
                    tutorExperience,
                    id: uuidv4(),
                    signedInTutor: user.uid,
                    tutorProposal,
                    studentName: studentsRequest.studentName,
                    studentContact: studentsRequest.studentContact,
                    studentClass: studentsRequest.studentClass,
                    studentAddress: studentsRequest.studentAddress,
                    studentSubject: studentsRequest.studentSubject,
                    studentID: id,
                    tutorProposal,
                    studentAccept,
                    studentEmail: studentsRequest.studentEmail,
                  })
                }
                className="btn w-100 acceptButton text-white text-center my-4"
              >
                Post Request
              </button>
            )}
            {isPending && (
              <button className="btn btn-primary">Adding....</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TutorProposalForm;
