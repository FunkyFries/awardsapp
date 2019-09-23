import { NextPage } from "next";
import { useEffect, useState } from "react";
import { teachers } from "../components/teachers";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewStudentForm: NextPage<{}> = () => {
  const options = teachers.map((teacher, idx) => {
    return (
      <option key={`${teacher}-${idx}`} value={teacher}>
        {teacher}
      </option>
    );
  });

  const [creatingStudent, setCreatingStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentTeacher, setNewStudentTeacher] = useState("");
  const [newStudentImage, setNewStudentImage] = useState("");
  const [validated, setValidated] = useState(false);

  function newStudentSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      evt.preventDefault();
      axios.post("/students/", {
        name: newStudentName,
        teacher: newStudentTeacher,
        image: newStudentImage
      });
      setValidated(false);
      // setCreatingStudent(false);
      setNewStudentName("");
      setNewStudentTeacher("");
      setNewStudentImage("");
    }
  }

  let newStudentForm = creatingStudent ? (
    <Form noValidate onSubmit={newStudentSubmit} validated={validated}>
      <Form.Group controlId="newStudentName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          value={newStudentName}
          onChange={e => setNewStudentName(e.target.value)}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          Student name required.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="newStudentTeacher">
        <Form.Label>Teacher</Form.Label>
        <Form.Control
          required
          as="select"
          value={newStudentTeacher}
          min="2"
          onChange={(e: any) => setNewStudentTeacher(e.target.value)}
        >
          <option value="" defaultChecked></option>
          {options}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please select a teacher.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Label>Image</Form.Label>
      <Form.Control
        id="newStudentImage"
        value={newStudentImage}
        onChange={e => setNewStudentImage(e.target.value)}
      ></Form.Control>
      <Button type="submit">Submit</Button>
    </Form>
  ) : (
    <button onClick={() => setCreatingStudent(true)}>Add New Student</button>
  );
  return newStudentForm;
};

export default NewStudentForm;
