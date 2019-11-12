import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

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
  width: 18%;
  display: inline-flex;
  margin: 1%;

  ${phoneOnly} {
    width: 80%;
    display: flex;
    margin: 1rem auto;
  }

  ${tabletPortraitUp} {
    width: 31%;
    margin: 1.166666%;
  }

  ${tabletLandscapeUp} {
    width: 24%;
    margin: 0.5%;
  }

  ${desktopUp} {
    width: 19%;
    margin: 0.5%;
  }
`;

export const CardBody = styled(Card.Body)`
  padding: 1rem;
`;

export const CardTitle = styled(Card.Title)`
  text-align: center;
`;

export const TeacherHeading = styled.h1`
  margin: 0 1rem;
  color: rgb(247, 237, 237);

  ${phoneOnly} {
    text-align: center;
  }
`;

export const TeacherHeadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 1rem;
  color: rgb(247, 237, 237);
`;

export const StyledHr = styled.hr`
  margin: 0.5rem 1rem;
`;

export const ThreeRDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

export const ThreeRLabel = styled(Form.Label)`
  font-weight: 500;
  width: 60%;
  margin: 0;
`;

export const DueDate = styled.h1`
  background: #f8f9fa;
  text-align: center;
`;
