import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import firebase from "firebase";
import '../../index.css'

import firebase from "firebase/app";
import "firebase/auth";
import Loaders from "../Layout/Loaders";

function PostTitionRequest() {
  let user = firebase.auth().currentUser;
  const [loader, setLoader] = useState(false);

  const [studentName, setStudentName] = useState("");
  // const [studentEmail, setStudentEmail] = useState("");
  const [studentContact, setStudentContact] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentSubject, setStudentSubject] = useState("");
  const [studentAccept, setStudentAccept] = useState(false);
  const [tutorProposal, setTutorProposal] = useState(false);

  const [students, setStudents] = useState([]);

  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const ref = firebase.firestore().collection("student");
  // const ref1 = firebase.firestore().collection("signInStudents");

  function getStudents() {
    ref.onSnapshot((querySnapshot) => {
      const students = [];
      querySnapshot.forEach((doc) => {
        students.push(doc.data());
      });
      setStudents(students);
    });
  }
  useEffect(() => {
    getStudents();
  }, []);

  function addStudent(newStudent) {
    setLoader(true)
    ref
      .doc(newStudent.id)
      .set(newStudent)
      .catch((err) => {
        console.log(err);
      });
     
    history.push("/studentDashboard");
    setLoader(false)
  }



  return (
    <div className="container">

     {
       loader ? 
          <Loaders/>
       :
       <div className="container my-5">
        {/* <form className="row g-3" onSubmit={handleSubmit}> */}
        <form className="row g-3 container  page bg-light bg-gradient border-bottom my-5">
          <h1 className="text-center">Need a tutor at your doorstep</h1>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          {/* <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            />
          </div> */}
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="studentContact"
              value={studentContact}
              onChange={(e) => setStudentContact(e.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="studentAddress"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Class (for which tutor is required)
            </label>
            <input
              type="text"
              className="form-control"
              id="studentClass"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Subjects (for which tutor is required)
            </label>
            <input
              type="text"
              className="form-control"
              id="studentSubject"
              value={studentSubject}
              onChange={(e) => setStudentSubject(e.target.value)}
            />
          </div>

          <div className="col-12">
            {!isPending && (
              <button
              className="btn w-100 acceptButton text-white text-center my-5"
                type="button"
                onClick={() =>
                  addStudent({
                    studentName,
                    studentEmail : user.email,
                    studentContact,
                    studentAddress,
                    studentClass,
                    studentSubject,
                    id: uuidv4(),
                    signedInUser : user.uid,
                    tutorProposal,
                    studentAccept
                  })
                }
                // className="btn btn-primary"
              >
                Add details
              </button>
            )}
            {isPending && (
              <button className="btn btn-primary">Adding....</button>
            )}
          </div>
        </form>
      </div>
     }
    </div>
  );
}

export default PostTitionRequest;
