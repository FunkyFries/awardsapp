import { NextPage } from "next";
import axios from "axios";
import { teachers } from "../components/teachers";
import AwardForm from "../components/awardform";
import { useEffect, useState } from "react";
import Router from "next/router";
import NavBar from "../components/navbar";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  StyledCard,
  CardImg,
  CardBody,
  CardTitle,
  TeacherHeading,
  TeacherHeadingDiv,
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
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div key={teacher}>
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle
            as={TeacherHeadingDiv}
            eventKey="0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <TeacherHeading>{teacher}</TeacherHeading>
            {collapsed ? (
              <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            )}
          </Accordion.Toggle>
          <StyledHr />
          <Accordion.Collapse eventKey="0">
            <>{StudentCards[teacher]}</>
          </Accordion.Collapse>
        </Accordion>
      </div>
    );
  });

  const SingleClass = (
    <div>
      <TeacherHeading>{user}</TeacherHeading>
      {StudentCards[user]}
    </div>
  );

  let Classes = role === "teacher" ? SingleClass : AllClasses;

  if (moment().isBefore("2019-11-07", "day") && role === "teacher") {
    Classes = <DueDate>Awards Will Open November 8th</DueDate>;
  }
  if (moment().isBefore("2019-11-12", "day") && role === "specialist") {
    Classes = <DueDate>Awards Will Open November 13th</DueDate>;
  }

  return (
    <>
      <NavBar path="/awards" role={role}></NavBar>
      {role === "teacher" && moment().isAfter("2019-11-07") ? (
        <DueDate>Due November 12th</DueDate>
      ) : null}
      {role === "specialist" && moment().isAfter("2019-11-12") ? (
        <DueDate>Due November 15th</DueDate>
      ) : null}
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
