import { NextPage } from "next";
import { useState } from "react";
import { teachers } from "../components/teachers";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import uuid from "uuid/v1";

const NewStudentForm: NextPage<{ addStudent: any }> = ({ addStudent }) => {
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
      let newId = uuid();
      evt.preventDefault();
      evt.stopPropagation();
      addStudent({
        key: newId,
        name: newStudentName,
        teacher: newStudentTeacher,
        image: newStudentImage,
        _id: newId,
      });
      axios.post("/students/", {
        name: newStudentName,
        teacher: newStudentTeacher,
        image: newStudentImage,
        id: newId,
      });
      setValidated(false);
      setNewStudentName("");
      setNewStudentTeacher("");
      setNewStudentImage("");
      setCreatingStudent(false);
    }
  }

  return (
    <>
      <Button
        variant="light"
        onClick={() => setCreatingStudent(true)}
        style={{ margin: "1rem .5rem 1rem auto" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Add New Student
      </Button>

      <Modal
        size="lg"
        aria-labelledby="add-new-student-modal"
        centered
        show={creatingStudent}
        onHide={() => setCreatingStudent(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-new-student-modal">
            Add A New Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={newStudentSubmit} validated={validated}>
            <Form.Group controlId="newStudentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
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
                onChange={(e: any) => setNewStudentTeacher(e.target.value)}
              >
                <option value="" defaultChecked></option>
                {options}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a teacher.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                id="newStudentImage"
                value={newStudentImage}
                onChange={(e) => setNewStudentImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="info">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewStudentForm;
