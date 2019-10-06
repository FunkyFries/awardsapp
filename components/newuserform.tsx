import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import uuid from "uuid/v1";

const NewUserForm: NextPage<{ addUser: any }> = ({ addUser }) => {
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [validated, setValidated] = useState(false);

  function newUserSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      let newId = uuid();
      evt.preventDefault();
      evt.stopPropagation();
      addUser({
        key: newId,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        _id: newId
      });
      axios.post("/users/", {
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        id: newId
      });
      setValidated(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserRole("");
      setCreatingUser(false);
    }
  }

  return (
    <>
      <Button
        variant="light"
        onClick={() => setCreatingUser(true)}
        style={{ margin: "1rem .5rem 1rem auto" }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: ".5rem" }}
        ></FontAwesomeIcon>
        Add New User
      </Button>

      <Modal
        size="lg"
        aria-labelledby="add-new-user-modal"
        centered
        show={creatingUser}
        onHide={() => setCreatingUser(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-new-user-modal">Add A New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={newUserSubmit} validated={validated}>
            <Form.Group controlId="newUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Name is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                value={newUserEmail}
                type="email"
                onChange={(e: any) => setNewUserEmail(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                value={newUserRole}
                as="select"
                min="2"
                onChange={(e: any) => setNewUserRole(e.target.value)}
              >
                <option value="" defaultChecked></option>
                <option value="teacher">Teacher</option>
                <option value="specialist">Specialist</option>
                <option value="admin">Admin</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a role.
              </Form.Control.Feedback>
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

export default NewUserForm;
