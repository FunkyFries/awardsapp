import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import NewStudentForm from "../components/newstudentform";
import NewUserForm from "./newuserform";

const StudentRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  background-color: #ffffff;
`;

const StudentColumn = styled.div`
  display: flex;
  width: 30%;
  font-weight: 800;
  text-align: center;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-right: 1px solid #ced4da;
`;

const StudentButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  text-align: center;
  vertical-align: middle;
  border: none;
`;

const FormHeader: React.FC<{
  heading: string;
  first: string;
  second: string;
  third: string;
  add: any;
}> = ({ heading, first, second, third, add }) => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <StudentRow
        style={{
          justifyContent: "center",
          borderBottom: "none",
          backgroundColor: "#ffffff",
          alignItems: "center"
        }}
      >
        {heading === "Students" ? (
          <>
            <h2 style={{ marginLeft: "45%", fontSize: "2.5rem" }}>{heading}</h2>
            <NewStudentForm addStudent={add} />
          </>
        ) : (
          <>
            <h2 style={{ marginLeft: "48.5%", fontSize: "2.5rem" }}>
              {heading}
            </h2>
            <NewUserForm addUser={add} />
          </>
        )}
      </StudentRow>
      <StudentRow>
        <StudentColumn>{first}</StudentColumn>
        <StudentColumn>{second}</StudentColumn>
        <StudentColumn>{third}</StudentColumn>
        <StudentButtonColumn></StudentButtonColumn>
      </StudentRow>
    </Container>
  );
};

export default FormHeader;
