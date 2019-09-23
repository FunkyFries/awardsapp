import { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";
import StudentForm from "../components/studentform";
import NewStudentForm from "../components/newstudentform";
import axios from "axios";
import Router from "next/router";

const ManageUsers: NextPage<{
  students: any;
  user: string;
  role: string;
}> = ({ students, user, role }) => {
  useEffect(() => {
    if (!user || !students || role !== "admin") {
      Router.push("/auth/outlook");
    }
  });

  let studentForms = students.map(student => {
    return (
      <StudentForm
        key={student._id}
        id={student._id}
        name={student.name}
        teacher={student.teacher}
        image={student.image}
      ></StudentForm>
    );
  });

  return (
    <>
      <NewStudentForm />
      {studentForms}
    </>
  );
};

ManageUsers.getInitialProps = async ({ req, res }) => {
  let obj;
  let students = { students: [] };
  if (req && req.user.role !== "admin") {
    res.writeHead(302, {
      Location: "http://localhost:8080/awards"
    });
    res.end();
  }
  if (req && req.headers.cookie !== undefined && req.user.role === "admin") {
    obj = await axios.get("http://localhost:8080/students", {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students.students = obj.data.students;
    return students;
  } else {
    obj = await axios.get("http://localhost:8080/students", {
      withCredentials: true
    });
    students.students = obj.data.students;
    return students;
  }
};

export default ManageUsers;
