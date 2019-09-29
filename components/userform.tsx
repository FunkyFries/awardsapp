import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const UserRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  border-top: 0;
  background-color: #ffffff;
  : hover {
    background-color: #f8f9fa;
  }
`;

const UserColumnRightBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  text-align: center;
  vertical-align: middle;
  border-right: 1px solid #ced4da;
`;

const UserButtonColumn = styled.div`
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

const FormControlText = styled(Form.Control)`
  && {
    width: 100%;
    text-align: center;
    border-right: 1px solid #ced4da;
    border-top: none;
    border-left: none;
    border-bottom: none;
    border-radius: 0;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  background-color: #ffffff;
`;

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
    }
  }

  let display = isEditing ? (
    <Container>
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
            <Button type="submit">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        </BtnContainer>
      </StyledForm>
    </Container>
  ) : (
    <Container>
      <UserRow>
        <UserColumnRightBorder>{userName}</UserColumnRightBorder>
        <UserColumnRightBorder>{userEmail}</UserColumnRightBorder>
        <UserColumnRightBorder>{userRole}</UserColumnRightBorder>
        <UserButtonColumn>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`edit-user-tooltip-top`}>Edit</Tooltip>}
          >
            <Button variant="light" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 100 }}
            overlay={<Tooltip id={`delete-user-tooltip-top`}>Delete</Tooltip>}
          >
            <Button variant="danger" onClick={() => handleDelete(id)}>
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </Button>
          </OverlayTrigger>
        </UserButtonColumn>
      </UserRow>
    </Container>
  );

  return display;
};

export default UserForm;
