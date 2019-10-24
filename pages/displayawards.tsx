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

    const allInStudents = students.filter(student => student.allInAward);

    const outstandingStudents = students.filter(
      student => student.outstandingAchievement
    );

    const communityServiceStudents = students.filter(
      student => student.cougarCommunityService
    );

    const wowStudents = students.filter(student => student.wowAward);

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

      let allInStudent = allInStudents.find(
        student => student.teacher === teacher && student.allInAward
      );
      let allIn;
      if (allInStudent) {
        allIn = allInStudent.name;
      }

      let oustandingStudent = outstandingStudents.find(
        student => student.teacher === teacher && student.outstandingAchievement
      );
      let outstanding;
      if (oustandingStudent) {
        outstanding = oustandingStudent.name;
      }

      return (
        <tr key={teacher}>
          <td>{teacher}</td>
          <td>{relationship}</td>
          <td>{respect}</td>
          <td>{responsibility}</td>
          <td>{allIn}</td>
          <td>{outstanding}</td>
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

    // Create Community Service Table
    const communityServiceRows = () => {
      let primary;
      let intermediate;
      if (communityServiceStudents) {
        primary = communityServiceStudents.filter(student =>
          primaryTeachers.includes(student.teacher)
        );
        intermediate = communityServiceStudents.filter(student =>
          intermediateTeachers.includes(student.teacher)
        );
      }
      let primaryColumn = (
        <>
          <td></td>
        </>
      );
      if (primary.length === 1) {
        primaryColumn = (
          <>
            <td>{primary[0].name}</td>
          </>
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
        <tr>
          <td>Mrs. Plummer</td>
          {primaryColumn}
          {intermediateColumns}
        </tr>
      );
    };

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

    // Create Wow Awards Table
    const wowAwardsRows = intermediateTeachers.map(teacher => {
      let wowAwardsByTeacher = wowStudents.filter(
        student => student.teacher === teacher
      );
      let rows = [];
      if (wowAwardsByTeacher.length > 0) {
        let numRows = Math.ceil(wowAwardsByTeacher.length / 4);
        for (let i = 0; i < numRows * 4; i += 4) {
          rows.push(
            <tr key={`${teacher}, ${i}`}>
              <td>{i > 0 ? null : teacher}</td>
              <td>{wowAwardsByTeacher[i].name}</td>
              <td>
                {wowAwardsByTeacher[i + 1]
                  ? wowAwardsByTeacher[i + 1].name
                  : null}
              </td>
              <td>
                {wowAwardsByTeacher[i + 2]
                  ? wowAwardsByTeacher[i + 2].name
                  : null}
              </td>
              <td>
                {wowAwardsByTeacher[i + 3]
                  ? wowAwardsByTeacher[i + 3].name
                  : null}
              </td>
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
                  <TopTableHeader colSpan={6}>Cougar Awards</TopTableHeader>
                </tr>
                <tr>
                  <th>Teacher</th>
                  <th>Relationship</th>
                  <th>Respect</th>
                  <th>Responsibility</th>
                  <th>All In</th>
                  <th>Oustanding Achievement</th>
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
                  <TableHeader colSpan={4}>Community Service Award</TableHeader>
                </tr>
                <tr>
                  <th>Teacher</th>
                  <th colSpan={1}>Primary Recipient</th>
                  <th colSpan={2}>Intermediate Recipient</th>
                </tr>
              </thead>
              <tbody>{communityServiceRows()}</tbody>
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
            {wowStudents.length > 0 ? (
              <StyledTable striped>
                <thead>
                  <tr>
                    <TableHeader colSpan={5}>Wow Awards</TableHeader>
                  </tr>
                  <tr>
                    <th colSpan={1}>Teacher</th>
                    <th colSpan={4}>Recipients</th>
                  </tr>
                </thead>
                <tbody>{wowAwardsRows}</tbody>
              </StyledTable>
            ) : null}
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
  let students;
  if (req && req.user) {
    if (req.user.role !== "admin") {
      res.writeHead(302, {
        Location: "https://ccsawardsapp.herokuapp.com/awards"
      });
      res.end();
    }
  }
  if (req && req.headers.cookie !== undefined) {
    obj = await axios.get("https://ccsawardsapp.herokuapp.com/students", {
      headers: {
        cookie: req.headers.cookie
      },
      withCredentials: true
    });
    students.students = [obj.data.students];
    return students;
  } else {
    obj = await axios.get("https://ccsawardsapp.herokuapp.com/students", {
      withCredentials: true
    });
    students.students = [obj.data.students];
    return students;
  }
};

export default DisplayAwards;
