import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import WriteUpForm from "../components/writeUpForm";
import { teachers } from "../components/teachers";
import moment from "moment";

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

    return (
      <>
        <Table>
          <thead>
            <tr>
              <th col-span="4">Cougar Awards</th>
            </tr>
            <tr>
              <th>Teacher</th>
              <th>Relationship</th>
              <th>Respect</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>{teacherRows}</tbody>
        </Table>
      </>
    );
  } catch {
    return <h1>Everything broke.</h1>;
  }
};

DisplayAwards.getInitialProps = async ({ req, res }) => {
  let obj;
  let students = { students: [] };
  if (req.user && req.user.role !== "admin") {
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
