import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const ForegroundContainer = styled(Container)`
  width: 50%;
`;

export const BackgroundDiv = styled.div`
  display: flex;
  text-align: center;
  background-image: url("https://lh3.googleusercontent.com/COjYCOyD2ly2Np0c1Dd1tvttZGf84cOSmN1QXoNZlDIQfesXqh-FQLMRHFGvRjc059ESdNUbRkao0xDMgaxzKxeZIb7_61mHoJRV8NTOg2mq550zAVJNb-gIyVSpcpQ-PovwlhSWog=w2400");
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

export const Heading = styled(Container)`
  font-size: 3.4rem;
  width: 100%;
  margin-top: 20vh;
  color: #444444;
`;

export const LoginButton = styled(Button)`
  display: block;
  margin: auto;
  font-size: 2rem;
  padding: 0.5rem 3rem;
  margin-top: 5rem;
`;
