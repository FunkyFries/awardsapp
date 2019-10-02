import styled from "styled-components";
import Form from "react-bootstrap/Form";

export const StudentRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  border-top: 0;
  background-color: #ffffff;
  : hover {
    background-color: #f8f9fa;
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
`;

export const StudentButtonColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  text-align: center;
  vertical-align: middle;
  border: none;
`;

export const StyledForm = styled(Form)`
  width: 100%;
  border: 1px solid #ced4da;
  border-top: none;
  border-radius: 0;
`;

export const FormGroup = styled(Form.Group)`
  && {
    width: 30%;
    height: calc(1.5em + 0.75rem + 2px);
    text-align: center;
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
`;
