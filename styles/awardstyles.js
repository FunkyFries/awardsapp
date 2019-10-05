import styled from "styled-components";
import Card from "react-bootstrap/Card";

const phoneOnly = "@media (max-width: 599px)";
const tabletPortraitUp = "@media (min-width: 600px)";
const tabletLandscapeUp = "@media (min-width: 900px)";
const desktopUp = "@media (min-width: 1200px)";

export const BackgroundDiv = styled.div`
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

export const CardImg = styled.img`
  width: 150px;
  border-radius: 50%;
  display: flex;
  align-self: center;
  margin-top: 1rem;
`;

export const StyledCard = styled(Card)`
  width: 15rem;
  display: inline-flex;
  margin: 1rem;

  ${phoneOnly} {
    width: 80%;
    display: flex;
    margin: 1rem auto;
  }
`;

export const CardBody = styled(Card.Body)`
  padding: 1rem;
`;

export const CardTitle = styled(Card.Title)`
  text-align: center;
`;

export const TeacherHeading = styled.h1`
  color: rgb(247, 237, 237);
  margin: 0 1rem;

  ${phoneOnly} {
    text-align: center;
  }
`;

export const StyledHr = styled.hr`
  margin: 0.5rem 1rem;
`;
