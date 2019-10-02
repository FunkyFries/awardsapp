import React from "react";
import NewStudentForm from "../components/newstudentform";
import NewUserForm from "./newuserform";
import {
  FormHeaderContainer,
  HeadingRow,
  StudentHeading,
  UserHeading,
  StudentRow,
  StudentColumn,
  StudentButtonColumn
} from "../styles/formheaderstyles";

const FormHeader: React.FC<{
  heading: string;
  first: string;
  second: string;
  third: string;
  add: any;
}> = ({ heading, first, second, third, add }) => {
  return (
    <FormHeaderContainer>
      <HeadingRow>
        {heading === "Students" ? (
          <>
            <StudentHeading>{heading}</StudentHeading>
            <NewStudentForm addStudent={add} />
          </>
        ) : (
          <>
            <UserHeading>{heading}</UserHeading>
            <NewUserForm addUser={add} />
          </>
        )}
      </HeadingRow>
      <StudentRow>
        <StudentColumn>{first}</StudentColumn>
        <StudentColumn>{second}</StudentColumn>
        <StudentColumn>{third}</StudentColumn>
        <StudentButtonColumn></StudentButtonColumn>
      </StudentRow>
    </FormHeaderContainer>
  );
};

export default FormHeader;
