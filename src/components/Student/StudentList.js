import React, { useState, useEffect } from "react";
import "../../index.css";
import firebase from "firebase/app";
import "firebase/auth";

// function StudentList({ student }) {
function StudentList(props) {
  const [students, setStudents] = useState([]);
  let user = firebase.auth().currentUser;

  // console.log(user.email);
  const ref = firebase
    .firestore()
    .collection("student")
    .where("signedInUser" , "==" , user.uid  )
    .where( "tutorProposal" , "==" , false)
  // console.log(ref )

  const ref2 = firebase
    .firestore()
    .collection("student")

  function getStudents() {
    ref.onSnapshot((querySnapshot) => {
      const student = [];
      querySnapshot.forEach((doc) => {
        student.push(doc.data());
      });
      setStudents(student);
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

  const deleteStudent = (delStudent) => {
    ref2
      .doc(delStudent.id)
      .delete()
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div >
      {/* <p> I'm the current user: {user.email} </p> */}
      {students.map((student) => (
        <div
          className="card d-inline-block m-4 studentList"
          key={student.id}
          style={{ width: "18rem" }}
        >
          <div className="cardss ">
          <div className="card-header bg-dark text-white">
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
              <button
                className="btn w-100 delButton text-white text-center align-bottom"
                type="button"
                onClick={() => deleteStudent(student)}
              >
                Delete
              </button>{" "}
            </li>
          </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;
