import { NextPage } from "next";
import axios from "axios";
import { teachers, primaryTeachers } from "../components/teachers";
import IntermediateAwardForm from "../components/intermediateawardform";
import PrimaryAwardForm from "../components/primaryawardform";
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
  BackgroundDiv
} from "../styles/awardstyles";

const Awards: NextPage<{ students: any; role: any; user: any }> = ({
  students,
  role,
  user
}) => {
  useEffect(() => {
    if (!user || !students) {
      Router.push("/auth/outlook");
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
            {primaryTeachers.indexOf(teacher) > -1 ? (
              <PrimaryAwardForm
                id={student._id}
                terrificKid={student.terrificKid}
                terrificKidChosenBy={student.terrificKidChosenBy}
                threeR={student.threeR}
                userName={user}
                role={role}
                acceleratedReader={student.acceleratedReader}
                pastAwards={student.pastAwards}
              />
            ) : (
              <IntermediateAwardForm
                id={student._id}
                aHonorRoll={student.aHonorRoll}
                abHonorRoll={student.abHonorRoll}
                terrificKid={student.terrificKid}
                terrificKidChosenBy={student.terrificKidChosenBy}
                acceleratedReader={student.acceleratedReader}
                threeR={student.threeR}
                userName={user}
                role={role}
                pastAwards={student.pastAwards}
              />
            )}
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
      <h1>{user}</h1>
      {StudentCards[user]}
    </div>
  );

  const Classes = role === "teacher" ? SingleClass : AllClasses;

  return (
    <>
      <NavBar path="/awards" role={role}></NavBar>
      <BackgroundDiv>{Classes}</BackgroundDiv>
    </>
  );
};

Awards.getInitialProps = async ({ req }) => {
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

export default Awards;
