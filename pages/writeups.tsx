import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import Form from "react-bootstrap/Form";
import WriteUpForm from "../components/writeUpForm";

const WriteUps: NextPage<{ students: any; user: string; role: string }> = ({
  students,
  user,
  role
}) => {
  useEffect(() => {
    if (!user || !students) {
      Router.push("/auth/outlook");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    for (let i = 0; i < e.target.length - 1; i++) {
      axios.put(`/students/${e.target[i].id}`, {
        threeRwriteUp: e.target[i].value
      });
    }
  };

  let filteredStudents;
  let writeUpForm;

  // Filter students assigned to teacher
  if (role === "teacher" && students) {
    filteredStudents = students.filter(
      student => student.teacher === user && student.threeR !== "none"
    );
  } else if (role === "specialist") {
    filteredStudents = students.filter(
      student => student.terrificKidChosenBy === user
    );
  }

  if ((role === "teacher" || role === "specialist") && students) {
    writeUpForm = filteredStudents.map(student => {
      let writeUp =
        role === "teacher" ? student.threeRwriteUp : student.terrificKidWriteUp;
      return <WriteUpForm {...student} writeUp={writeUp} key={student._id} />;
    });
  }

  return (
    <>
      <h1>Writeups</h1>
      <Link href="/awards">
        <a>Awards</a>
      </Link>
      <Form onSubmit={handleSubmit}>
        {writeUpForm}
        <button>Submit</button>
      </Form>
    </>
  );
};

WriteUps.getInitialProps = async ({ req }) => {
  let res;
  let students = { students: [] };
  if (req && req.headers.cookie !== undefined) {
    res = await axios.get("http://localhost:8080/students", {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students.students = res.data.students;
    return students;
  } else {
    res = await axios.get("http://localhost:8080/students", {
      withCredentials: true
    });
    students.students = res.data.students;
    return students;
  }
};

export default WriteUps;
