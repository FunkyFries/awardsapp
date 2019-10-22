import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const phoneOnly = "@media (max-width: 599px)";
const tabletPortraitUp = "@media (min-width: 600px)";
const tabletLandscapeUp = "@media (min-width: 900px)";
const desktopUp = "@media (min-width: 1200px)";

export const StudentRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  border-top: 0;
  background-color: #ffffff;
  : hover {
    background-color: #f8f9fa;
  }

  ${phoneOnly} {
    display: inline-block;
  }
`;

export const StudentColumn = styled.div`
  display: flex;
  width: 30%;
  text-align: center;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-right: 1px solid #ced4da;

  ${phoneOnly} {
    height: calc(1.5em + 0.75rem + 2px);
    width: 100%;
    &:first-child {
      font-weight: 800;
    }
  }
`;

export const StudentButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  text-align: center;
  vertical-align: middle;
  border: none;

  ${phoneOnly} {
    visibility: ${props => (props.buttonVisible ? "visible" : "hidden")};
    margin-right: 1rem;
    position: absolute;
    width: ${props => (props.buttonVisible ? "50%" : "0")};
    transition: visibility 0.3s ease 0.3s, width 1s;
    height: 100%;
    top: 0;
    right: 0;
  }
`;

export const StyledForm = styled(Form)`
  width: 100%;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0;
  background: #ffffff;

  ${phoneOnly} {
    display: block;
  }
`;

export const FormGroup = styled(Form.Group)`
  && {
    width: 30%;
    height: calc(1.5em + 0.75rem + 2px);
    text-align: center;
    background-color: #ffffff;
  }

  ${phoneOnly} {
    && {
      height: calc(1.5em + 0.75rem + 2px);
      width: 100%;
      margin: 0;
      text-align-last: center;
    }
  }
`;

export const FormControl = styled(Form.Control)`
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

export const BtnContainer = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  background-color: #ffffff;

  ${phoneOnly} {
    width: 100%;
  }
`;

export const StudentContainer = styled(Container)`
  ${phoneOnly} {
    position: relative;
  }

  ${tabletPortraitUp} {
    max-width: 100%;
  }
  ${tabletLandscapeUp} {
    max-width: 960px;
  }
  ${desktopUp} {
    max-width: 1140px;
  }
`;

export const SwipeContainer = styled.div`
  visibility: hidden;

  ${phoneOnly} {
    visibility: visible;
    height: calc((1.5em + 0.75rem + 2px) * 3);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

export const StudentButton = styled(Button)`
  width: 50%;
  border-radius: 0;

  ${phoneOnly} {
    width: 100%;
    height: 100%;
  }
`;

export const SaveButton = styled(Button)`
  ${phoneOnly} {
    width: 100%;
    border-radius: 0;
  }
`;

export const ModalBody = styled(Modal.Body)`
  text-align: center;
`;
