import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import NavBar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import WriteUpForm from "../components/writeUpForm";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  text-align: center;
  background: rgb(0, 47, 95);
  background: linear-gradient(
    90deg,
    rgba(0, 47, 95, 0.6404936974789917) 0%,
    rgba(0, 135, 112, 1) 100%
  );
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

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

  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  let message;

  const errMessage = (
    <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        Change this and that and try again. Duis mollis, est non commodo luctus,
        nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
        consectetur purus sit amet fermentum.
      </p>
    </Alert>
  );

  const successMessage = (
    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
      <Alert.Heading>
        You did it! Student successfully updated! Go you!
      </Alert.Heading>
    </Alert>
  );

  if (showErr) {
    message = errMessage;
  } else if (showSuccess) {
    message = successMessage;
  } else {
    message = null;
  }

  const handleSubmit = e => {
    e.preventDefault();
    for (let i = 0; i < e.target.length - 1; i++) {
      role === "teacher"
        ? axios
            .put(`/students/${e.target[i].id}`, {
              threeRwriteUp: e.target[i].value
            })
            .then(res => setShowSuccess(true))
            .catch(err => setShowErr(true))
        : axios
            .put(`/students/${e.target[i].id}`, {
              terrificKidWriteUp: e.target[i].value
            })
            .then(res => setShowSuccess(true))
            .catch(err => setShowErr(true));
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
  } else if (role === "admin") {
    filteredStudents = students
      .filter(student => student.terrificKid || student.threeR !== "none")
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  if ((role === "teacher" || role === "specialist") && students) {
    writeUpForm = filteredStudents.map(student => {
      let writeUp =
        role === "teacher" ? student.threeRwriteUp : student.terrificKidWriteUp;
      return (
        <WriteUpForm
          {...student}
          writeUp={writeUp}
          role={role}
          key={student._id}
        />
      );
    });
  } else if (role === "admin") {
    writeUpForm = filteredStudents.map(student => {
      let writeUp = student.terrificKid
        ? student.terrificKidWriteUp
        : student.threeRwriteUp;
      return (
        <WriteUpForm
          {...student}
          writeUp={writeUp}
          key={student._id}
          role={role}
        ></WriteUpForm>
      );
    });
  }

  return (
    <>
      <NavBar role={role} path="/writeups"></NavBar>
      <BackgroundDiv>
        <Container style={{ overflow: "auto", margin: "2rem auto" }}>
          {message}
          <h1 style={{ color: "#f7eded" }}>Writeups</h1>
          <Form onSubmit={handleSubmit}>
            {writeUpForm}
            {role === "admin" ? null : <button>Submit</button>}
          </Form>
        </Container>
      </BackgroundDiv>
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
