import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import NavBar from "../components/navbar";
import {
  teachers,
  specialists,
  primaryTeachers,
  intermediateTeachers
} from "../components/teachers";
import moment from "moment";
import {
  BackgroundDiv,
  DisplayAwardsContainer,
  StyledTable,
  TopTableHeader,
  TableHeader,
  ArAwardsHeader
} from "../styles/displayawardstyles";

let currentQuarter;
if (moment().isBefore("2019-11-20")) {
  currentQuarter = "First Quarter";
} else if (moment().isBefore("2020-02-12")) {
  currentQuarter = "Second Quarter";
} else if (moment().isBefore("2020-04-22")) {
  currentQuarter = "Third Quarter";
} else {
  currentQuarter = "Fourth Quarter";
}

const DisplayAwards: NextPage<{
  students: any;
  user: string;
  role: string;
}> = ({ students, user, role }) => {
  useEffect(() => {
    if (!user || !students || role !== "admin") {
      Router.push("/auth/outlook");
    }
  });

  try {
    const threeRstudents = students.filter(
      student => student.threeR !== "none"
    );

    const terrificStudents = students.filter(student => student.terrificKid);

    const ARstudents = students.filter(student => student.acceleratedReader);

    const straightAStudents = students.filter(student => student.aHonorRoll);

    const ABstudents = students.filter(student => student.abHonorRoll);

    // Create Cougar Awards Table
    const teacherRows = teachers.map(teacher => {
      let relationshipStudent = threeRstudents.find(
        student =>
          student.teacher === teacher &&
          student.threeR === `Relationship - ${currentQuarter}`
      );
      let relationship;
      if (relationshipStudent) {
        relationship = relationshipStudent.name;
      }

      let respectStudent = threeRstudents.find(
        student =>
          student.teacher === teacher &&
          student.threeR === `Respect - ${currentQuarter}`
      );
      let respect;
      if (respectStudent) {
        respect = respectStudent.name;
      }

      let responsibilityStudent = threeRstudents.find(
        student =>
          student.teacher === teacher &&
          student.threeR === `Responsibility - ${currentQuarter}`
      );
      let responsibility;
      if (responsibilityStudent) {
        responsibility = responsibilityStudent.name;
      }
      return (
        <tr key={teacher}>
          <td>{teacher}</td>
          <td>{relationship}</td>
          <td>{respect}</td>
          <td>{responsibility}</td>
        </tr>
      );
    });

    // Create Terrific Kid Table
    const specialistRows = specialists.map(specialist => {
      let terrificKids = terrificStudents.filter(
        student => student.terrificKidChosenBy === specialist
      );
      let primary;
      if (terrificKids) {
        primary = terrificKids.filter(student =>
          primaryTeachers.includes(student.teacher)
        );
      }
      let primaryColumns = (
        <>
          <td></td>
          <td></td>
        </>
      );
      if (primary.length === 2) {
        primaryColumns = (
          <>
            <td>{primary[0].name}</td>
            <td>{primary[1].name}</td>
          </>
        );
      }
      if (primary.length === 1) {
        primaryColumns = (
          <>
            <td>{primary[0].name}</td>
            <td></td>
          </>
        );
      }

      let intermediate;
      if (terrificKids) {
        intermediate = terrificKids.filter(student =>
          intermediateTeachers.includes(student.teacher)
        );
      }

      let intermediateColumns = (
        <>
          <td></td>
          <td></td>
        </>
      );
      if (intermediate.length === 2) {
        intermediateColumns = (
          <>
            <td>{intermediate[0].name}</td>
            <td>{intermediate[1].name}</td>
          </>
        );
      }
      if (intermediate.length === 1) {
        intermediateColumns = (
          <>
            <td>{intermediate[0].name}</td>
            <td></td>
          </>
        );
      }

      return (
        <tr key={specialist}>
          <td>{specialist}</td>
          {primaryColumns}
          {intermediateColumns}
        </tr>
      );
    });

    // Create AR Awards Table
    const ARhonorsRows = teachers.map(teacher => {
      let ARbyTeacher = ARstudents.filter(
        student => student.teacher === teacher
      );
      if (ARbyTeacher.length > 0) {
        let grade;
        if (teacher === "Mrs. Martin" || teacher === "Mrs. Johnson") {
          grade = "Kindergarten";
        } else if (teacher === "Mrs. Alfaro" || teacher === "Mrs. Estep") {
          grade = "First Grade";
        } else if (teacher === "Mrs. Broberg" || teacher === "Mrs. Brar") {
          grade = "Second Grade";
        } else if (teacher === "Mrs. Chavez" || teacher === "Mrs. Carroll") {
          grade = "Third Grade";
        } else if (teacher === "Mr. Kranik") {
          grade = "Fourth Grade";
        } else if (teacher === "Mrs. Helle" || teacher === "Mrs. Kasemeier") {
          grade = "Fifth Grade";
        } else if (teacher === "Mrs. Kidd") {
          grade = "Sixth Grade";
        }
        return (
          <tr key={grade}>
            <td>{grade}</td>
            <td>{ARbyTeacher[0].name}</td>
          </tr>
        );
      }
    });

    // Create All A Table
    const straightArows = intermediateTeachers.map(teacher => {
      let straightAbyTeacher = straightAStudents.filter(
        student => student.teacher === teacher
      );
      let rows = [];
      if (straightAbyTeacher.length > 0) {
        let numRows = Math.ceil(straightAbyTeacher.length / 4);
        for (let i = 0; i < numRows * 4; i += 4) {
          rows.push(
            <tr key={`${teacher}, ${i}`}>
              <td>{i > 0 ? null : teacher}</td>
              <td>{straightAbyTeacher[i].name}</td>
              <td>
                {straightAbyTeacher[i + 1]
                  ? straightAbyTeacher[i + 1].name
                  : null}
              </td>
              <td>
                {straightAbyTeacher[i + 2]
                  ? straightAbyTeacher[i + 2].name
                  : null}
              </td>
              <td>
                {straightAbyTeacher[i + 3]
                  ? straightAbyTeacher[i + 3].name
                  : null}
              </td>
            </tr>
          );
        }
      }
      return rows;
    });

    // Create AB Table
    const ABhonorsRows = intermediateTeachers.map(teacher => {
      let ABbyTeacher = ABstudents.filter(
        student => student.teacher === teacher
      );
      let rows = [];
      if (ABbyTeacher.length > 0) {
        let numRows = Math.ceil(ABbyTeacher.length / 4);
        for (let i = 0; i < numRows * 4; i += 4) {
          rows.push(
            <tr key={`${teacher}, ${i}`}>
              <td>{i > 0 ? null : teacher}</td>
              <td>{ABbyTeacher[i].name}</td>
              <td>{ABbyTeacher[i + 1] ? ABbyTeacher[i + 1].name : null}</td>
              <td>{ABbyTeacher[i + 2] ? ABbyTeacher[i + 2].name : null}</td>
              <td>{ABbyTeacher[i + 3] ? ABbyTeacher[i + 3].name : null}</td>
            </tr>
          );
        }
      }
      return rows;
    });

    return (
      <>
        <NavBar role={role} path="/displayawards"></NavBar>
        <BackgroundDiv>
          <DisplayAwardsContainer>
            <StyledTable striped>
              <thead>
                <tr>
                  <TopTableHeader colSpan={4}>Cougar Awards</TopTableHeader>
                </tr>
                <tr>
                  <th>Teacher</th>
                  <th>Relationship</th>
                  <th>Respect</th>
                  <th>Responsibility</th>
                </tr>
              </thead>
              <tbody>{teacherRows}</tbody>
            </StyledTable>
            <StyledTable striped>
              <thead>
                <tr>
                  <TableHeader colSpan={5}>Terrific Kid Award</TableHeader>
                </tr>
                <tr>
                  <th>Teacher</th>
                  <th colSpan={2}>Primary Recipient</th>
                  <th colSpan={2}>Intermediate Recipient</th>
                </tr>
              </thead>
              <tbody>{specialistRows}</tbody>
            </StyledTable>
            <StyledTable striped>
              <thead>
                <tr>
                  <TableHeader colSpan={2}>AR Awards</TableHeader>
                </tr>
                <tr>
                  <ArAwardsHeader>Grade</ArAwardsHeader>
                  <ArAwardsHeader>Recipient</ArAwardsHeader>
                </tr>
              </thead>
              <tbody>{ARhonorsRows}</tbody>
            </StyledTable>
            <StyledTable striped>
              <thead>
                <tr>
                  <TableHeader colSpan={5}>Straight A Honors Award</TableHeader>
                </tr>
                <tr>
                  <th colSpan={1}>Teacher</th>
                  <th colSpan={4}>Recipients</th>
                </tr>
              </thead>
              <tbody>{straightArows}</tbody>
            </StyledTable>
            <StyledTable striped>
              <thead>
                <tr>
                  <TableHeader colSpan={5}>A/B Honors Award</TableHeader>
                </tr>
                <tr>
                  <th colSpan={1}>Teacher</th>
                  <th colSpan={4}>Recipients</th>
                </tr>
              </thead>
              <tbody>{ABhonorsRows}</tbody>
            </StyledTable>
          </DisplayAwardsContainer>
        </BackgroundDiv>
      </>
    );
  } catch {
    return <h1>Everything broke.</h1>;
  }
};

DisplayAwards.getInitialProps = async ({ req, res }) => {
  let obj;
  let students = { students: [] };
  if (req && req.user.role !== "admin") {
    res.writeHead(302, {
      Location: "http://localhost:8080/awards"
    });
    res.end();
  }
  if (req && req.headers.cookie !== undefined) {
    obj = await axios.get("http://localhost:8080/students", {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students.students = obj.data.students;
    return students;
  } else {
    obj = await axios.get("http://localhost:8080/students", {
      withCredentials: true
    });
    students.students = obj.data.students;
    return students;
  }
};

export default DisplayAwards;
