import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";

export const BackgroundDiv = styled.div`
  display: flex;
  text-align: center;
  background: rgb(0, 47, 95);
  background: linear-gradient(
    90deg,
    rgba(0, 47, 95, 0.6404936974789917) 0%,
    rgba(0, 135, 112, 1) 100%
  );
  width: 100%;
  height: 100vh;
  overflow: auto;
`;

export const WriteUpContainer = styled(Container)`
  overflow: auto;
  margin: 2rem auto;
`;

export const WriteUpHeading = styled.h1`
  color: #f7eded;
`;

export const SuccessToast = styled(Toast.Header)`
  background: #d4edda;
  color: #245824;
  display: flex;
  justify-content: space-between;
`;

export const ErrorToast = styled(Toast.Header)`
  background: #f8d7da;
  color: #721c24;
  display: flex;
  justify-content: space-between;
`;
