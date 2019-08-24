import { NextPage } from "next";
import axios from "axios";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { teachers, primaryTeachers } from "../components/teachers";
import IntermediateAwardForm from "../components/intermediateawardform";
import PrimaryAwardForm from "../components/primaryawardform";
import { useEffect } from "react";
import Router from "next/router";

const CardImg = styled.img`
  width: 150px;
  border-radius: 50%;
  display: flex;
  align-self: center;
  margin-top: 1rem;
`;

type Data = {
  students: any;
  userName: any;
  role: any;
};

const Awards: NextPage<Data> = data => {
  useEffect(() => {
    if (!data.students) {
      Router.push("/auth/outlook");
    }
  });

  let StudentCards = {};
  let filteredStudents = {};

  // Filter students assigned to teacher
  if (data.role === "teacher") {
    filteredStudents[data.userName] = data.students.filter(
      student => student.teacher === data.userName
    );
  } else {
    // Sort students into groups by teacher
    const sortedStudents = data.students.reduce((groups, student) => {
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
        <Card
          key={student._id}
          style={{ width: "18rem", display: "inline-flex", margin: "1rem" }}
        >
          <CardImg src={student.image} />
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            {primaryTeachers.indexOf(teacher) > -1 ? (
              <PrimaryAwardForm
                id={student._id}
                terrificKid={student.terrificKid}
                terrificKidChosenBy={student.terrificKidChosenBy}
                threeR={student.threeR}
                userName={data.userName}
                role={data.role}
              />
            ) : (
              <IntermediateAwardForm
                id={student._id}
                aHonorRoll={student.aHonorRoll}
                abHonorRoll={student.abHonorRoll}
                terrificKid={student.terrificKid}
                terrificKidChosenBy={student.terrificKidChosenBy}
                threeR={student.threeR}
                userName={data.userName}
                role={data.role}
              />
            )}
          </Card.Body>
        </Card>
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
      <h1>{data.userName}</h1>
      {StudentCards[data.userName]}
    </div>
  );

  const Students = data.role === "teacher" ? SingleClass : AllClasses;

  return <>{Students}</>;
};

Awards.getInitialProps = async ({ req }) => {
  const res: any = await axios.get("http://localhost:8080/students", {
    headers: req.headers,
    withCredentials: true
  });
  const students = res.data.students;
  let data;
  if (req.user) {
    const userName = req.user.name;
    const role = req.user.role;
    data = { students, userName, role };
    return data;
  }
  return (data = {});
};

export default Awards;
