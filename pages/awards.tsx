import { NextPage } from "next";
import axios from "axios";
import { teachers } from "../components/teachers";
import AwardForm from "../components/awardform";
import { useEffect } from "react";
import Router from "next/router";
import NavBar from "../components/navbar";
import {
  StyledCard,
  CardImg,
  CardBody,
  CardTitle,
  TeacherHeading,
  StyledHr,
  BackgroundDiv,
  DueDate
} from "../styles/awardstyles";

const Awards: NextPage<{ students: any; role: any; user: any }> = ({
  students,
  role,
  user
}) => {
  useEffect(() => {
    if (!user || !students) {
      Router.push("/auth");
    }
  });

  let StudentCards = {};
  let filteredStudents = {};

  // Filter students assigned to teacher
  if (role === "teacher" && students) {
    filteredStudents[user] = students.filter(
      student => student.teacher === user
    );
  } else if (role && students) {
    // Sort students into groups by teacher
    const sortedStudents = students.reduce((groups, student) => {
      const teacher = student.teacher;
      if (!groups[teacher]) groups[teacher] = [];

      groups[teacher].push(student);
      return groups;
    }, {});
    filteredStudents = sortedStudents;
  }

  // Generate StudentCards for each teacher
  for (const teacher in filteredStudents) {
    StudentCards[teacher] = filteredStudents[teacher].map(student => {
      return (
        <StyledCard key={student._id}>
          <CardImg src={student.image} />
          <CardBody>
            <CardTitle>{student.name}</CardTitle>
            <AwardForm
              id={student._id}
              teacher={student.teacher}
              allInAward={student.allInAward}
              outstandingAchievement={student.outstandingAchievement}
              wowAward={student.wowAward}
              cougarCommunityService={student.cougarCommunityService}
              terrificKid={student.terrificKid}
              terrificKidChosenBy={student.terrificKidChosenBy}
              acceleratedReader={student.acceleratedReader}
              threeR={student.threeR}
              userName={user}
              role={role}
              pastAwards={student.pastAwards}
            />
          </CardBody>
        </StyledCard>
      );
    });
  }

  const AllClasses = teachers.map(teacher => {
    return (
      <div key={teacher}>
        <TeacherHeading>{teacher}</TeacherHeading>
        <StyledHr />
        {StudentCards[teacher]}
      </div>
    );
  });

  const SingleClass = (
    <div>
      <TeacherHeading>{user}</TeacherHeading>
      {StudentCards[user]}
    </div>
  );

  const Classes = role === "teacher" ? SingleClass : AllClasses;

  return (
    <>
      <NavBar path="/awards" role={role}></NavBar>
      {role === "teacher" ? <DueDate>Due November 12th</DueDate> : null}
      {role === "specialist" ? <DueDate>Due November 15th</DueDate> : null}
      <BackgroundDiv>{Classes}</BackgroundDiv>
    </>
  );
};

Awards.getInitialProps = async ({ req }) => {
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

export default Awards;
