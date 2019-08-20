import { NextPage } from "next";
import axios from "axios";
import IntermediateAwardForm from "../components/awardform";
import { useEffect } from "react";
import Router from "next/router";

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

  let StudentCards;

  if (data.students) {
    let filteredStudents;

    if (data.role !== "admin") {
      filteredStudents = data.students.filter(
        student => student.teacher === data.userName
      );
    } else {
      filteredStudents = data.students;
    }

    StudentCards = filteredStudents.map(student => {
      return (
        <div key={student._id}>
          <h1>{student.name}</h1>
          <IntermediateAwardForm
            id={student._id}
            aHonorRoll={student.aHonorRoll}
            abHonorRoll={student.abHonorRoll}
            terrificKid={student.terrificKid}
            threeR={student.threeR}
          />
        </div>
      );
    });
  }

  return <>{StudentCards}</>;
};

Awards.getInitialProps = async ({ req }) => {
  const res = await axios.get("http://localhost:8080/students", {
    headers: req.headers,
    withCredentials: true
  });
  const students = res.data.students;
  const userName = req.user.name;
  const role = req.user.role;
  const data = { students, userName, role };
  return data;
};

export default Awards;
