import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import { useSwipeable } from "react-swipeable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import {
  StyledForm,
  FormGroup,
  FormControl,
  FormControlText,
  BtnContainer,
  UserRow,
  UserColumnRightBorder,
  UserButtonColumn,
  UserContainer,
  SwipeContainer,
  UserButton,
  SaveButton,
  ModalBody
} from "../styles/userformstyles";

const UserForm: NextPage<{
  id: string;
  name: string;
  email: string;
  role: string;
  handleDelete: any;
  updateUser: any;
}> = ({ id, name, email, role, handleDelete, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userRole, setUserRole] = useState(role);
  const [validated, setValidated] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setButtonVisible(true),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  function onClick() {
    if (buttonVisible) {
      setButtonVisible(false);
    }
  }

  function handleSubmit(evt) {
    if (evt.target.checkValidity() === false) {
      evt.preventDefault();
      evt.stopPropagation();
      setValidated(true);
    } else {
      evt.preventDefault();
      evt.stopPropagation();
      updateUser({
        name: userName,
        email: userEmail,
        role: userRole,
        id: id
      });
      axios.put(`/users/${id}`, {
        name: userName,
        email: userEmail,
        role: userRole
      });
      setIsEditing(false);
      setValidated(false);
      setButtonVisible(false);
    }
  }

  let display = isEditing ? (
    <UserContainer>
      <StyledForm
        noValidate
        inline
        onSubmit={handleSubmit}
        validated={validated}
      >
        <FormGroup>
          <FormControlText
            id={`username-${id}`}
            onChange={e => setUserName(e.target.value)}
            value={userName}
            required
          ></FormControlText>
          <Form.Control.Feedback type="invalid">
            User name required.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControlText
            id={`email-${id}`}
            type="email"
            required
            onChange={e => setUserEmail(e.target.value)}
            value={userEmail}
          ></FormControlText>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </FormGroup>
        <FormGroup>
          <FormControl
            id={`role-${id}`}
            as="select"
            onChange={(e: any) => setUserRole(e.target.value)}
            value={userRole}
          >
            <option value="teacher">Teacher</option>
            <option value="specialist">Specialist</option>
            <option value="admin">Admin</option>
          </FormControl>
        </FormGroup>
        <BtnContainer>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`save-user-tooltip-top`}>Save</Tooltip>}
          >
            <SaveButton type="submit">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
            </SaveButton>
          </OverlayTrigger>
        </BtnContainer>
      </StyledForm>
    </UserContainer>
  ) : (
    <UserContainer>
      <SwipeContainer onClick={onClick} {...handlers}></SwipeContainer>
      <UserRow>
        <UserColumnRightBorder>{userName}</UserColumnRightBorder>
        <UserColumnRightBorder>{userEmail}</UserColumnRightBorder>
        <UserColumnRightBorder>{userRole}</UserColumnRightBorder>
        <UserButtonColumn buttonVisible={buttonVisible}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`edit-user-tooltip-top`}>Edit</Tooltip>}
          >
            <UserButton variant="light" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </UserButton>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`delete-user-tooltip-top`}>Delete</Tooltip>}
          >
            <UserButton
              variant="danger"
              onClick={() => setConfirmingDelete(true)}
            >
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </UserButton>
          </OverlayTrigger>

          <Modal
            size="sm"
            aria-labelledby="confirm-delete"
            centered
            show={confirmingDelete}
            onHide={() => setConfirmingDelete(false)}
          >
            <Modal.Header closeButton>Delete User</Modal.Header>
            <ModalBody>Are you sure? This cannot be undone!</ModalBody>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setConfirmingDelete(false)}
              >
                Close
              </Button>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </UserButtonColumn>
      </UserRow>
    </UserContainer>
  );

  return display;
};

export default UserForm;
