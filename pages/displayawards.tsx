import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import NavBar from "../components/navbar";
import ArCertificate from "../components/arcertificate";
import ThreeRCertificate from "../components/threeRcertificate";
import OutstandingCertificate from "../components/outstandingcertificate";
import CommunityServiceCertificate from "../components/communityservicecertificate";
import AllInCertificate from "../components/allincertificate";
import WowCertificate from "../components/wowcertificate";
import TerrificKidCertificate from "../components/terrifickidcertificate";
import Button from "react-bootstrap/Button";
import {
  teachers,
  specialists,
  primaryTeachers,
  intermediateTeachers,
  recessSpecialists,
} from "../components/teachers";
import moment from "moment";
import {
  BackgroundDiv,
  DisplayAwardsContainer,
  StyledTable,
  TopTableHeader,
  TableHeader,
  ArAwardsHeader,
  PageBreak,
  PrintFormContainer,
} from "../styles/displayawardstyles";
import Form from "react-bootstrap/Form";

let currentQuarter;
if (moment().isBefore("2020-11-20")) {
  currentQuarter = "First Quarter";
} else if (moment().isBefore("2021-02-12")) {
  currentQuarter = "Second Quarter";
} else if (moment().isBefore("2021-04-22")) {
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
    if (!user || !students) {
      Router.push("/auth");
    }
  }, []);

  const [printThreeR, setPrintThreeR] = useState(true);
  const [printAllIn, setPrintAllIn] = useState(true);
  const [printOutstanding, setPrintOutstanding] = useState(true);
  const [printWow, setPrintWow] = useState(true);
  const [printCommunityService, setPrintCommunityService] = useState(true);
  const [printTerrific, setPrintTerrific] = useState(true);
  const [printAR, setPrintAR] = useState(true);
  const [printAwardsTable, setPrintAwardsTable] = useState(false);

  try {
    const compare = (sortProperty) => (a, b) => {
      if (a[sortProperty] < b[sortProperty]) {
        return -1;
      }
      if (a[sortProperty] > b[sortProperty]) {
        return 1;
      }
      return 0;
    };

    const threeRstudents = students
      .filter((student) => student.threeR !== "none")
      .sort(compare("teacher"));

    const terrificStudents = students
      .filter((student) => student.terrificKid)
      .sort(compare("terrificKidChosenBy"));

    const ARstudents = students.filter((student) => student.acceleratedReader);

    const allInStudents = students.filter((student) => student.allInAward);

    const outstandingStudents = students.filter(
      (student) => student.outstandingAchievement
    );

    const communityServiceStudents = students.filter(
      (student) => student.cougarCommunityService
    );

    const wowStudents = students
      .filter((student) => student.wowAward)
      .sort(compare("teacher"));

    // Create Cougar Awards Table
    const teacherRows = teachers.map((teacher) => {
      let relationshipStudent = threeRstudents.find(
        (student) =>
          student.teacher === teacher &&
          student.threeR === `Relationship - ${currentQuarter}`
      );
      let relationship;
      if (relationshipStudent) {
        relationship = relationshipStudent.name;
      }

      let respectStudent = threeRstudents.find(
        (student) =>
          student.teacher === teacher &&
          student.threeR === `Respect - ${currentQuarter}`
      );
      let respect;
      if (respectStudent) {
        respect = respectStudent.name;
      }

      let responsibilityStudent = threeRstudents.find(
        (student) =>
          student.teacher === teacher &&
          student.threeR === `Responsibility - ${currentQuarter}`
      );
      let responsibility;
      if (responsibilityStudent) {
        responsibility = responsibilityStudent.name;
      }

      let allInStudent = allInStudents.find(
        (student) => student.teacher === teacher && student.allInAward
      );
      let allIn;
      if (allInStudent) {
        allIn = allInStudent.name;
      }

      let oustandingStudent = outstandingStudents.find(
        (student) =>
          student.teacher === teacher && student.outstandingAchievement
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
    const specialistRows = specialists.map((specialist) => {
      let terrificKids = terrificStudents.filter(
        (student) => student.terrificKidChosenBy === specialist
      );
      let primary;
      if (terrificKids) {
        primary = terrificKids.filter((student) =>
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
        intermediate = terrificKids.filter((student) =>
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
    const communityServiceRows = recessSpecialists.map((specialist) => {
      let ccsKids = communityServiceStudents.filter(
        (student) => student.communityServiceChosenBy === specialist
      );
      let primary;
      let intermediate;
      if (ccsKids) {
        primary = ccsKids.filter((student) =>
          primaryTeachers.includes(student.teacher)
        );
        intermediate = ccsKids.filter((student) =>
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

      let intermediateColumn = (
        <>
          <td></td>
        </>
      );
      if (intermediate.length === 1) {
        intermediateColumn = (
          <>
            <td>{intermediate[0].name}</td>
          </>
        );
      }

      return (
        <tr key={specialist}>
          <td>{specialist}</td>
          {primaryColumn}
          {intermediateColumn}
        </tr>
      );
    });

    // Create AR Awards Table
    const ARhonorsRows = teachers.map((teacher) => {
      let ARbyTeacher = ARstudents.filter(
        (student) => student.teacher === teacher
      );
      if (ARbyTeacher.length > 0) {
        let grade;
        if (
          teacher === "Mrs. Martin" ||
          teacher === "Mrs. Johnson" ||
          teacher === "Ms. Nathanson"
        ) {
          grade = "Kindergarten";
        } else if (teacher === "Mrs. Dilley" || teacher === "Mrs. Estep") {
          grade = "First Grade";
        } else if (teacher === "Ms. Terpstra" || teacher === "Mrs. Brar") {
          grade = "Second Grade";
        } else if (teacher === "Mrs. Haberman" || teacher === "Mrs. Carroll") {
          grade = "Third Grade";
        } else if (teacher === "Mr. Kranik") {
          grade = "Fourth Grade";
        } else if (teacher === "Mrs. Kasemeier") {
          grade = "Fifth Grade";
        } else if (teacher === "Mrs. Kidd" || teacher === "Mrs. Helle") {
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
    const wowAwardsRows = intermediateTeachers.map((teacher) => {
      let wowAwardsByTeacher = wowStudents.filter(
        (student) => student.teacher === teacher
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
        {printThreeR ? (
          <ThreeRCertificate
            currentQuarter={currentQuarter}
            students={threeRstudents}
          />
        ) : null}
        {printAllIn ? (
          <AllInCertificate
            currentQuarter={currentQuarter}
            students={allInStudents}
          ></AllInCertificate>
        ) : null}
        {printOutstanding ? (
          <OutstandingCertificate
            students={outstandingStudents}
            currentQuarter={currentQuarter}
          />
        ) : null}
        {printTerrific ? (
          <TerrificKidCertificate
            students={terrificStudents}
            currentQuarter={currentQuarter}
          ></TerrificKidCertificate>
        ) : null}
        {printCommunityService ? (
          <CommunityServiceCertificate
            students={communityServiceStudents}
            currentQuarter={currentQuarter}
          />
        ) : null}
        {printWow ? (
          <WowCertificate
            students={wowStudents}
            currentQuarter={currentQuarter}
          />
        ) : null}
        {printAR ? (
          <ArCertificate
            students={ARstudents}
            currentQuarter={currentQuarter}
          />
        ) : null}
        <BackgroundDiv className={printAwardsTable ? "" : "d-print-none"}>
          <DisplayAwardsContainer>
            {role === "admin" ? (
              <PrintFormContainer>
                <Form
                  style={{
                    margin: "1rem auto",
                    textAlign: "left",
                    fontFamily: "Noto Sans",
                  }}
                  className="d-print-none"
                >
                  <Form.Check
                    type="checkbox"
                    label="Three R Certificates"
                    id="printThreeRCertificates"
                    onChange={() => setPrintThreeR(!printThreeR)}
                    checked={printThreeR}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Living Free Certificates"
                    id="printAllInCertificates"
                    onChange={() => setPrintAllIn(!printAllIn)}
                    checked={printAllIn}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Outstanding Certificates"
                    id="printOutstandingCertificates"
                    onChange={() => setPrintOutstanding(!printOutstanding)}
                    checked={printOutstanding}
                  />
                  {wowStudents.length > 0 ? (
                    <Form.Check
                      type="checkbox"
                      label="Wow Certificates"
                      id="printWowCertificates"
                      onChange={() => setPrintWow(!printWow)}
                      checked={printWow}
                    />
                  ) : null}
                  <Form.Check
                    type="checkbox"
                    label="Terrific Kid Certificates"
                    id="printTerrificKidCertificates"
                    onChange={() => setPrintTerrific(!printTerrific)}
                    checked={printTerrific}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Community Service Certificates"
                    id="printCommunityServiceCertificates"
                    onChange={() =>
                      setPrintCommunityService(!printCommunityService)
                    }
                    checked={printCommunityService}
                  />
                  <Form.Check
                    type="checkbox"
                    label="AR Certificates"
                    id="printArCertificates"
                    onChange={() => setPrintAR(!printAR)}
                    checked={printAR}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Awards Table"
                    id="printAwardsTable"
                    onChange={() => setPrintAwardsTable(!printAwardsTable)}
                    checked={printAwardsTable}
                  />
                </Form>
                <Button
                  style={{
                    margin: "0 auto",
                    width: "16rem",
                    fontFamily: "Calligraffitti",
                  }}
                  variant="info"
                  className="d-print-none"
                  onClick={() => window.print()}
                >
                  Print
                </Button>
              </PrintFormContainer>
            ) : null}
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
                  <th>Living Free</th>
                  <th>Oustanding Achievement</th>
                </tr>
              </thead>
              <tbody>{teacherRows}</tbody>
            </StyledTable>
            <PageBreak></PageBreak>
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
              <tbody>{communityServiceRows}</tbody>
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
              <>
                <PageBreak></PageBreak>
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
              </>
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
  if (req && req.headers.cookie !== undefined) {
    obj = await axios.get(`${process.env.HTTP}/students`, {
      headers: {
        cookie: req.headers.cookie,
      },
      withCredentials: true,
    });
    students = { students: obj.data.students };
    return students;
  } else {
    obj = await axios.get(`${process.env.HTTP}/students`, {
      withCredentials: true,
    });
    students = { students: obj.data.students };
    return students;
  }
};

export default DisplayAwards;
