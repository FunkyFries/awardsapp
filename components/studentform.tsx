import { NextPage } from "next";
import { useState } from "react";
import { teachers } from "../components/teachers";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const StudentRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  border-top: 0;
  background-color: #ffffff;
  : hover {
    background-color: #f8f9fa;
  }
`;

const StudentColumn = styled.div`
  display: flex;
  width: 30%;
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

const StyledForm = styled(Form)`
  width: 100%;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0;
`;

const FormGroup = styled(Form.Group)`
  && {
    width: 30%;
    height: calc(1.5em + 0.75rem + 2px);
    text-align: center;
  }
`;

const FormControl = styled(Form.Control)`
  && {
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    text-align: center;
    padding-left: 2rem;
    background-color: #fff;
    color: #495057;
    border-right: 1px solid #ced4da;
    border-top: none;
    border-left: none;
    border-bottom: none;
    border-radius: 0;
    outline: 0;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  background-color: #ffffff;
`;

const StudentForm: NextPage<{
  id: string;
  name: string;
  teacher: string;
  image: string;
  handleDelete: any;
  updateStudent: any;
}> = ({ id, name, teacher, image, handleDelete, updateStudent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState(name);
  const [studentTeacher, setStudentTeacher] = useState(teacher);
  const [studentImage, setStudentImage] = useState(image);
  const [validated, setValidated] = useState(false);

  function handleSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      updateStudent({
        name: studentName,
        teacher: studentTeacher,
        image: studentImage,
        id: id
      });
      axios.put(`/students/${id}`, {
        name: studentName,
        teacher: studentTeacher,
        image: studentImage
      });
      setValidated(false);
      setIsEditing(false);
    }
  }

  const options = teachers.map(teacher => {
    return (
      <option key={`${teacher}-${id}`} value={teacher}>
        {teacher}
      </option>
    );
  });

  let display = isEditing ? (
    <Container>
      <StyledForm
        noValidate
        inline
        onSubmit={handleSubmit}
        validated={validated}
      >
        <FormGroup>
          <FormControl
            id={`name-${id}`}
            required
            onChange={e => setStudentName(e.target.value)}
            value={studentName}
          ></FormControl>
          <Form.Control.Feedback type="invalid">
            Student name required.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControl
            id={`teacher-${id}`}
            as="select"
            min="2"
            required
            onChange={(e: any) => setStudentTeacher(e.target.value)}
            value={studentTeacher}
          >
            <option value="" defaultChecked></option>
            {options}
          </FormControl>
          <Form.Control.Feedback type="invalid">
            Please select a teacher.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControl
            placeholder="Image URL"
            id={`image-${id}`}
            onChange={e => setStudentImage(e.target.value)}
            value={studentImage}
          ></FormControl>
        </FormGroup>
        <BtnContainer>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`save-student-tooltip-top`}>Save</Tooltip>}
          >
            <Button type="submit">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        </BtnContainer>
      </StyledForm>
    </Container>
  ) : (
    <Container>
      <StudentRow>
        <StudentColumn>{studentName}</StudentColumn>
        <StudentColumn>{studentTeacher}</StudentColumn>
        <StudentColumn>{image}</StudentColumn>
        <StudentButtonColumn>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`edit-student-tooltip-top`}>Edit</Tooltip>}
          >
            <Button variant="light" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={
              <Tooltip id={`delete-student-tooltip-top`}>Delete</Tooltip>
            }
          >
            <Button variant="danger" onClick={() => handleDelete(id)}>
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        </StudentButtonColumn>
      </StudentRow>
    </Container>
  );

  return display;
};

export default StudentForm;
