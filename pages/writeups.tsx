import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import NavBar from "../components/navbar";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import WriteUpForm from "../components/writeUpForm";
import {
  BackgroundDiv,
  WriteUpContainer,
  WriteUpHeading,
  SuccessToast,
  ErrorToast,
} from "../styles/writeupstyles";
import { recessSpecialists } from "../components/teachers";

const WriteUps: NextPage<{ students: any; user: string; role: string }> = ({
  students,
  user,
  role,
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
    <Toast
      delay={5000}
      autohide
      onClose={() => setShowErr(false)}
      style={{ maxWidth: "25%", position: "fixed", bottom: "0" }}
    >
      <ErrorToast>Error... something broke.</ErrorToast>
    </Toast>
  );

  const successMessage = (
    <Toast
      delay={5000}
      autohide
      onClose={() => setShowSuccess(false)}
      style={{ maxWidth: "25%", position: "fixed", bottom: "0" }}
    >
      <SuccessToast>Successfully updated!</SuccessToast>
    </Toast>
  );

  if (showErr) {
    message = errMessage;
  } else if (showSuccess) {
    message = successMessage;
  } else {
    message = null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.length - 1; i++) {
      if (e.target[i].value.length > 0) {
        if (role === "teacher") {
          axios
            .put(`/students/${e.target[i].id}`, {
              threeRwriteUp: e.target[i].value,
            })
            .then((res) => setShowSuccess(true))
            .catch((err) => setShowErr(true));
        } else if (recessSpecialists.includes(user)) {
          axios
            .put(`/students/${e.target[i].id}`, {
              ccsWriteup: e.target[i].value,
            })
            .then((res) => setShowSuccess(true))
            .catch((err) => setShowErr(true));
        } else {
          axios
            .put(`/students/${e.target[i].id}`, {
              terrificKidWriteUp: e.target[i].value,
            })
            .then((res) => setShowSuccess(true))
            .catch((err) => setShowErr(true));
        }
      }
    }
  };

  let filteredStudents;
  let writeUpForm;

  // Filter students assigned to teacher
  if (role === "teacher" && students) {
    filteredStudents = students.filter(
      (student) =>
        (student.teacher === user && student.threeR !== "none") ||
        (student.teacher === user && student.allInAward) ||
        (student.teacher === user && student.outstandingAchievement)
    );
  } else if (recessSpecialists.includes(user)) {
    filteredStudents = students.filter(
      (student) => student.communityServiceChosenBy === user
    );
  } else if (role === "specialist") {
    filteredStudents = students.filter(
      (student) => student.terrificKidChosenBy === user
    );
  } else if (role === "admin") {
    filteredStudents = students
      .filter(
        (student) =>
          student.terrificKid ||
          student.threeR !== "none" ||
          student.cougarCommunityService ||
          student.allInAward ||
          student.outstandingAchievement
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }

  //Fix this!!! Create additional filters for Outstanding and All In and generate separate Write Up forms

  if (filteredStudents.length > 0) {
    writeUpForm = filteredStudents.map((student) => {
      let writeUp;
      let allInWriteup;
      let outstandingWriteup;
      if (role === "teacher") {
        // if (student.allInAward) {
        //   writeUp = student.allInWriteup;
        // } else if (student.outstandingAchievement) {
        //   writeUp = student.outstandingWriteup;
        // } else {
        writeUp = student.threeRwriteUp;
        // }
      } else if (recessSpecialists.includes(user)) {
        writeUp = student.ccsWriteup;
      } else if (role === "admin") {
        if (student.terrificKid) {
          writeUp = student.terrificKidWriteUp;
        } else if (student.cougarCommunityService) {
          writeUp = student.ccsWriteup;
        } else if (student.allInAward) {
          writeUp = student.threeRwriteUp;
        } else if (student.outstandingAchievement) {
          writeUp = student.threeRwriteUp;
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
  }
  // } else if (role === "admin" && filteredStudents.length > 0) {
  //   writeUpForm = filteredStudents.map((student) => {
  //     let writeUp = student.terrificKid
  //       ? student.terrificKidWriteUp
  //       : student.threeRwriteUp;
  //   return (
  //     <WriteUpForm
  //       {...student}
  //       writeUp={writeUp}
  //       key={student._id}
  //       role={role}
  //     ></WriteUpForm>
  //   );
  // });
  // }

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
        cookie: req.headers.cookie,
      },
      withCredentials: true,
    });
    students = { students: res.data.students };
    return students;
  } else {
    res = await axios.get(`${process.env.HTTP}/students`, {
      withCredentials: true,
    });
    students = { students: res.data.students };
    return students;
  }
};

export default WriteUps;
