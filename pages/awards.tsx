import { NextPage } from "next";
import axios from "axios";
import AwardForm from "../components/awardform";
import { useEffect, useState } from "react";
import Router from "next/router";
import NavBar from "../components/navbar";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import {
  primaryTeachers,
  intermediateTeachers,
  teachers,
  specialists
} from "../components/teachers";
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
  let respectStudent = [];
  let responsibilityStudent = [];
  let relationshipStudent = [];
  let allInStudent = [];
  let outstandingStudent = [];
  let primaryCommunityServiceStudents = [];
  let intermediateCommunityServiceStudents = [];
  let primaryTerrificStudents = {};
  let intermediateTerrificStudents = [];

  // Filter students assigned to teacher
  if (role === "teacher" && students) {
    filteredStudents[user] = students.filter(
      student => student.teacher === user
    );

    respectStudent = filteredStudents[user]
      .filter(student => student.threeR.includes("Respect"))
      .map(student => student._id);
    responsibilityStudent = filteredStudents[user]
      .filter(student => student.threeR.includes("Responsibility"))
      .map(student => student._id);
    relationshipStudent = filteredStudents[user]
      .filter(student => student.threeR.includes("Relationship"))
      .map(student => student._id);
    allInStudent = filteredStudents[user]
      .filter(student => student.allInAward)
      .map(student => student._id);
    outstandingStudent = filteredStudents[user]
      .filter(student => student.outstandingAchievement)
      .map(student => student._id);
  } else if (role && students) {
    // Sort students into groups by teacher
    const sortedStudents = students.reduce((groups, student) => {
      const teacher = student.teacher;
      if (!groups[teacher]) groups[teacher] = [];

      groups[teacher].push(student);
      return groups;
    }, {});
    filteredStudents = sortedStudents;
    primaryCommunityServiceStudents = students
      .filter(
        student =>
          student.cougarCommunityService &&
          primaryTeachers.includes(student.teacher)
      )
      .map(student => student._id);
    intermediateCommunityServiceStudents = students
      .filter(
        student =>
          student.cougarCommunityService &&
          intermediateTeachers.includes(student.teacher)
      )
      .map(student => student._id);
    specialists.map(specialist => {
      primaryTerrificStudents[specialist] = students
        .filter(
          student =>
            student.terrificKid &&
            primaryTeachers.includes(student.teacher) &&
            student.terrificKidChosenBy === specialist
        )
        .map(student => student._id);

      intermediateTerrificStudents[specialist] = students
        .filter(
          student =>
            student.terrificKid &&
            primaryTeachers.indexOf(student.teacher) === -1 &&
            student.terrificKidChosenBy === specialist
        )
        .map(student => student._id);
    });
  }

  const [respectStudents, setRespectStudents] = useState(respectStudent);
  const [disableRespect, setDisableRespect] = useState(
    respectStudents.length > 0
  );

  const [responsibilityStudents, setResponsibilityStudents] = useState(
    responsibilityStudent
  );
  const [disableResponsibility, setDisableResponsibility] = useState(
    responsibilityStudents.length > 0
  );

  const [relationshipStudents, setRelationshipStudents] = useState(
    relationshipStudent
  );
  const [disableRelationship, setDisableRelationship] = useState(
    relationshipStudents.length > 0
  );

  const [allInStudents, setAllInStudents] = useState(allInStudent);
  const [disableAllIn, setDisableAllIn] = useState(allInStudents.length > 0);

  const [outstandingStudents, setOutstandingStudents] = useState(
    outstandingStudent
  );
  const [disableOutstanding, setDisableOutstanding] = useState(
    outstandingStudents.length > 0
  );

  const [primaryCommunityStudents, setPrimaryCommunityStudents] = useState(
    primaryCommunityServiceStudents
  );
  const [disablePrimaryCommunity, setDisablePrimaryCommunity] = useState(
    primaryCommunityStudents.length > 0
  );

  const [
    intermediateCommunityStudents,
    setIntermediateCommunityStudents
  ] = useState(intermediateCommunityServiceStudents);
  const [
    disableIntermediateCommunity,
    setDisableIntermediateCommunity
  ] = useState(intermediateCommunityStudents.length > 1);

  const [primaryTerrificKids, setPrimaryTerrificKids] = useState(
    primaryTerrificStudents
  );
  const [disableTerrificPrimary, setDisableTerrificPrimary] = useState(
    primaryTerrificKids[user] ? primaryTerrificKids[user].length > 1 : null
  );
  const [intermediateTerrificKids, setIntermediateTerrificKids] = useState(
    intermediateTerrificStudents
  );
  const [
    disableTerrificIntermediate,
    setDisableTerrificIntermediate
  ] = useState(
    intermediateTerrificKids[user]
      ? intermediateTerrificKids[user].length > 1
      : null
  );

  function handleRespectUpdate(id) {
    let array = respectStudents;
    let array2 = responsibilityStudents;
    let array3 = relationshipStudents;
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
    array.push(id);
    setDisableRespect(true);
    setRespectStudents(array);
  }

  function handleResponsibilityUpdate(id) {
    let array = responsibilityStudents;
    let array1 = respectStudents;
    let array3 = relationshipStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
    array.push(id);
    setDisableResponsibility(true);
    setResponsibilityStudents(array);
  }

  function handleRelationshipUpdate(id) {
    let array = relationshipStudents;
    let array1 = respectStudents;
    let array2 = responsibilityStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    array.push(id);
    setDisableRelationship(true);
    setRelationshipStudents(array);
  }

  function handleNoneUpdate(id) {
    let array1 = respectStudents;
    let array2 = responsibilityStudents;
    let array3 = relationshipStudents;
    if (array1.indexOf(id) !== -1) {
      array1.splice(0, 1);
      setDisableRespect(false);
      setRespectStudents(array1);
    }
    if (array2.indexOf(id) !== -1) {
      array2.splice(0, 1);
      setDisableResponsibility(false);
      setResponsibilityStudents(array2);
    }
    if (array3.indexOf(id) !== -1) {
      array3.splice(0, 1);
      setDisableRelationship(false);
      setRelationshipStudents(array3);
    }
  }

  function handleAllInUpdate(id) {
    let array = allInStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisableAllIn(false);
      setAllInStudents(array);
    } else {
      array.push(id);
      setDisableAllIn(true);
      setAllInStudents(array);
    }
  }

  function handleOutstandingUpdate(id) {
    let array = outstandingStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisableOutstanding(false);
      setOutstandingStudents(array);
    } else {
      array.push(id);
      setDisableOutstanding(true);
      setOutstandingStudents(array);
    }
  }

  function handlePrimaryCommunityServiceUpdate(id) {
    let array = primaryCommunityStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisablePrimaryCommunity(false);
      setPrimaryCommunityStudents(array);
    } else {
      array.push(id);
      setDisablePrimaryCommunity(true);
      setPrimaryCommunityStudents(array);
    }
  }

  function handleIntermediateCommunityServiceUpdate(id) {
    let array = intermediateCommunityStudents;
    let matchingIndex = array.indexOf(id);
    if (matchingIndex !== -1) {
      array.splice(matchingIndex, 1);
      setDisableIntermediateCommunity(false);
      setIntermediateCommunityStudents(array);
    } else {
      array.push(id);
      array.length > 1 ? setDisableIntermediateCommunity(true) : null;
      setIntermediateCommunityStudents(array);
    }
  }

  function handlePrimaryTerrificKidUpdate(id) {
    let obj = primaryTerrificKids;
    let matchingIndex = obj[user].indexOf(id);
    if (matchingIndex !== -1) {
      obj[user].splice(matchingIndex, 1);
      setDisableTerrificPrimary(false);
      setPrimaryTerrificKids(obj);
    } else {
      obj[user].push(id);
      obj[user].length > 1 ? setDisableTerrificPrimary(true) : null;
      setPrimaryTerrificKids(obj);
    }
  }

  function handleIntermediateTerrificKidUpdate(id) {
    let obj = intermediateTerrificKids;
    let matchingIndex = obj[user].indexOf(id);
    if (matchingIndex !== -1) {
      obj[user].splice(matchingIndex, 1);
      setDisableTerrificIntermediate(false);
      setIntermediateTerrificKids(obj);
    } else {
      obj[user].push(id);
      obj[user].length > 1 ? setDisableTerrificIntermediate(true) : null;
      setIntermediateTerrificKids(obj);
    }
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
              setRespectStudents={handleRespectUpdate}
              disableRespect={disableRespect}
              setResponsibilityStudents={handleResponsibilityUpdate}
              disableResponsibility={disableResponsibility}
              setRelationshipStudents={handleRelationshipUpdate}
              disableRelationship={disableRelationship}
              handleNoneUpdate={handleNoneUpdate}
              setAllInStudents={handleAllInUpdate}
              disableAllIn={disableAllIn}
              setOutstandingStudents={handleOutstandingUpdate}
              disableOutstanding={disableOutstanding}
              teacher={student.teacher}
              allInAward={student.allInAward}
              outstandingAchievement={student.outstandingAchievement}
              wowAward={student.wowAward}
              cougarCommunityService={student.cougarCommunityService}
              handlePrimaryCommunityServiceUpdate={
                handlePrimaryCommunityServiceUpdate
              }
              disablePrimaryCommunity={disablePrimaryCommunity}
              handleIntermediateCommunityServiceUpdate={
                handleIntermediateCommunityServiceUpdate
              }
              disableIntermediateCommunity={disableIntermediateCommunity}
              terrificKid={student.terrificKid}
              terrificKidChosenBy={student.terrificKidChosenBy}
              handlePrimaryTerrificKidUpdate={handlePrimaryTerrificKidUpdate}
              disableTerrificPrimary={disableTerrificPrimary}
              handleIntermediateTerrificKidUpdate={
                handleIntermediateTerrificKidUpdate
              }
              disableTerrificIntermediate={disableTerrificIntermediate}
              acceleratedReader={student.acceleratedReader}
              words={student.words}
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

  if (moment().isBefore("2020-01-27", "day") && role === "teacher") {
    Classes = <DueDate>Awards Will Open January 28th</DueDate>;
  }
  if (moment().isBefore("2020-01-30", "day") && role === "specialist") {
    Classes = <DueDate>Awards Will Open January 31st</DueDate>;
  }

  return (
    <>
      <NavBar path="/awards" role={role}></NavBar>
      {role === "teacher" && moment().isAfter("2020-01-27") ? (
        <DueDate>Due January 31st</DueDate>
      ) : null}
      {role === "specialist" && moment().isAfter("2020-01-31") ? (
        <DueDate>Due February 3rd</DueDate>
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
