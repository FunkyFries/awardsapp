import { NextPage } from "next";
import axios from "axios";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { teachers, primaryTeachers } from "../components/teachers";
import IntermediateAwardForm from "../components/intermediateawardform";
import PrimaryAwardForm from "../components/primaryawardform";
import { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

const CardImg = styled.img`
  width: 150px;
  border-radius: 50%;
  display: flex;
  align-self: center;
  margin-top: 1rem;
`;

const StyledCard = styled(Card)`
  width: 15rem;
  display: inline-flex;
  margin: 1rem;
`;

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
          <Card.Body style={{ padding: "1rem" }}>
            <Card.Title style={{ textAlign: "center" }}>
              {student.name}
            </Card.Title>
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
                threeR={student.threeR}
                userName={user}
                role={role}
              />
            )}
          </Card.Body>
        </StyledCard>
      );
    });
  }

  const AllClasses = teachers.map(teacher => {
    return (
      <div key={teacher}>
        <h1>{teacher}</h1>
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
      {Classes}
      <Link href="/writeups">
        <a>To Writeups</a>
      </Link>
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
