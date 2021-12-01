import React, { useState, useEffect, Fragment } from "react";
import firebase from "firebase";
import { v4 } from "uuid";

function SnapshotFirebaseStudent() {
  const [students, setStudents] = useState([]);

  const ref = firebase.firestore().collection("student");

  function getStudents() {
    ref.onSnapshot((querySnapshot) => {
      const student = [];
      querySnapshot.forEach((doc) => {
        student.push(doc.data());
      });
      setStudents(student);
    });
  }

  useEffect(() => {
    getStudents();
  }, []);

  function addStudent(newStudent) {
    ref
      .doc(newStudent.id)
      .set(newStudent)
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteStudent(student) {
    ref
      .doc(student.id)
      .delete()
      .catch((err) => {
        console.log(err);
      });
  }

  function editStudent(updateStudent) {
    ref
      .doc(updateStudent.if)
      .update(updateStudent)
      .catch((err) => {
        console.log(err);
      });
  }

  return <div></div>;
}

export default SnapshotFirebaseStudent;
