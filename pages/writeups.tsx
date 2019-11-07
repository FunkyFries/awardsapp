import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import NavBar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import WriteUpForm from "../components/writeUpForm";
import {
  BackgroundDiv,
  WriteUpContainer,
  WriteUpHeading
} from "../styles/writeupstyles";

const WriteUps: NextPage<{ students: any; user: string; role: string }> = ({
  students,
  user,
  role
}) => {
  useEffect(() => {
    if (!user || !students) {
      Router.push("/auth");
    }
  });

  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  let message;

  const errMessage = (
    <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
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
      if (e.target[i].value.length > 0) {
        if (role === "teacher") {
          axios
            .put(`/students/${e.target[i].id}`, {
              threeRwriteUp: e.target[i].value
            })
            .then(res => setShowSuccess(true))
            .catch(err => setShowErr(true));
        } else if (user === "Mrs. Plummer") {
          axios
            .put(`/students/${e.target[i].id}`, {
              ccsWriteup: e.target[i].value
            })
            .then(res => setShowSuccess(true))
            .catch(err => setShowErr(true));
        } else {
          axios
            .put(`/students/${e.target[i].id}`, {
              terrificKidWriteUp: e.target[i].value
            })
            .then(res => setShowSuccess(true))
            .catch(err => setShowErr(true));
        }
      }
    }
  };

  let filteredStudents;
  let writeUpForm;

  // Filter students assigned to teacher
  if (role === "teacher" && students) {
    filteredStudents = students.filter(
      student => student.teacher === user && student.threeR !== "none"
    );
  } else if (user === "Mrs. Plummer") {
    filteredStudents = students.filter(
      student => student.cougarCommunityService
    );
  } else if (role === "specialist") {
    filteredStudents = students.filter(
      student => student.terrificKidChosenBy === user
    );
  } else if (role === "admin") {
    filteredStudents = students
      .filter(
        student =>
          student.terrificKid ||
          student.threeR !== "none" ||
          student.cougarCommunityService
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  if (filteredStudents.length > 0) {
    writeUpForm = filteredStudents.map(student => {
      let writeUp;
      if (role === "teacher") {
        writeUp = student.threeRwriteUp;
      } else if (user === "Mrs. Plummer") {
        writeUp = student.ccsWriteup;
      } else if (role === "admin") {
        if (student.terrificKid) {
          writeUp = student.terrificKidWriteUp;
        } else if (student.cougarCommunityService) {
          writeUp = student.ccsWriteup;
        } else {
          writeUp = student.threeRwriteUp;
        }
      } else {
        writeUp = student.terrificKidWriteUp;
      }
      return (
        <WriteUpForm
          {...student}
          writeUp={writeUp}
          role={role}
          key={student._id}
        />
      );
    });
  } else if (role === "admin" && filteredStudents.length > 0) {
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
        <WriteUpContainer>
          {message}
          <WriteUpHeading>Writeups</WriteUpHeading>
          <Form onSubmit={handleSubmit}>
            {writeUpForm}
            {role === "admin" || filteredStudents.length === 0 ? null : (
              <Button type="submit" size="lg" variant="dark">
                Submit
              </Button>
            )}
          </Form>
        </WriteUpContainer>
      </BackgroundDiv>
    </>
  );
};

WriteUps.getInitialProps = async ({ req }) => {
  let res;
  let students;
  if (req && req.headers.cookie !== undefined) {
    res = await axios.get(`${process.env.HTTP}/students`, {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students = { students: res.data.students };
    return students;
  } else {
    res = await axios.get(`${process.env.HTTP}/students`, {
      withCredentials: true
    });
    students = { students: res.data.students };
    return students;
  }
};

export default WriteUps;
