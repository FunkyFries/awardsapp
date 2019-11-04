import { NextPage } from "next";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import FormHeader from "../components/formheader";
import StudentForm from "../components/studentform";
import UserForm from "../components/userform";
import axios from "axios";
import Router from "next/router";
import { BackgroundDiv, FooterDiv } from "../styles/manageusersstyles.js";

const ManageUsers: NextPage<{
  students: any;
  user: string;
  role: string;
  users: any;
}> = ({ students, user, role, users }) => {
  useEffect(() => {
    if (!user || !students || role !== "admin") {
      Router.push("/auth");
    }
  });

  function compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  const [allStudents, setAllStudents] = useState(students);
  const [allUsers, setAllUsers] = useState(users);

  function addStudent(student) {
    let newStudentArray = [...allStudents, student].sort(compare);
    setAllStudents(newStudentArray);
  }

  function addUser(user) {
    let newUserArray = [...allUsers, user].sort(compare);
    setAllUsers(newUserArray);
  }

  function updateStudent(student) {
    const updatedStudents = allStudents.map(s =>
      s._id === student.id
        ? {
            _id: student.id,
            name: student.name,
            teacher: student.teacher,
            image: student.image
          }
        : s
    );
    setAllStudents(updatedStudents);
  }

  function updateUser(user) {
    const updatedUsers = allUsers.map(u =>
      u._id === user.id
        ? {
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        : u
    );
    setAllUsers(updatedUsers);
  }

  function deleteStudent(id) {
    let newStudentArray = allStudents.filter(student => {
      return student._id !== id;
    });
    setAllStudents(newStudentArray);
    axios.delete(`/students/${id}`);
  }

  function deleteUser(id) {
    let newUserArray = allUsers.filter(user => {
      return user._id !== id;
    });
    setAllUsers(newUserArray);
    axios.delete(`/users/${id}`);
  }
  try {
    let studentForms = allStudents.map(student => {
      return (
        <StudentForm
          key={student._id}
          id={student._id}
          name={student.name}
          teacher={student.teacher}
          image={student.image}
          handleDelete={deleteStudent}
          updateStudent={updateStudent}
        ></StudentForm>
      );
    });

    let userForms = allUsers.map(user => {
      return (
        <UserForm
          key={user._id}
          id={user._id}
          name={user.name}
          email={user.email}
          role={user.role}
          handleDelete={deleteUser}
          updateUser={updateUser}
        ></UserForm>
      );
    });

    return (
      <>
        <NavBar role={role} path="/manageusers"></NavBar>
        <BackgroundDiv>
          <FormHeader
            heading="Students"
            first="Name"
            second="Teacher"
            third="Image URL"
            add={addStudent}
          ></FormHeader>
          {studentForms}
          <FormHeader
            heading="Users"
            first="Name"
            second="Email"
            third="Role"
            add={addUser}
          ></FormHeader>
          {userForms}
          <FooterDiv />
        </BackgroundDiv>
      </>
    );
  } catch {
    return <h1>Everything broke.</h1>;
  }
};

ManageUsers.getInitialProps = async ({ req, res }) => {
  let obj;
  let obj2;
  let students;
  if (req && req.headers.cookie !== undefined && req.user.role === "admin") {
    obj = await axios.get(`${process.env.HTTP}/students`, {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    obj2 = await axios.get(`${process.env.HTTP}/users`, {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students = { students: obj.data.students, users: obj2.data.users };
    return students;
  } else {
    obj = await axios.get(`${process.env.HTTP}/students`, {
      withCredentials: true
    });
    obj2 = await axios.get(`${process.env.HTTP}/users`, {
      withCredentials: true
    });
    students = { students: obj.data.students, users: obj2.data.users };
    return students;
  }
};

export default ManageUsers;
