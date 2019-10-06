import styled from "styled-components";
import Container from "react-bootstrap/Container";

const phoneOnly = "@media (max-width: 599px)";
const tabletPortraitUp = "@media (min-width: 600px)";
const tabletLandscapeUp = "@media (min-width: 900px)";
const desktopUp = "@media (min-width: 1200px)";

export const FormHeaderContainer = styled(Container)`
  margin-top: 2rem;

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

export const StudentRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #ced4da;
  background-color: #ffffff;

  ${phoneOnly} {
    display: block;
  }
`;

export const HeadingRow = styled(StudentRow)`
  justify-content: center;
  border-bottom: none;
  align-items: center;

  ${phoneOnly} {
    text-align: center;
  }
`;

export const StudentColumn = styled.div`
  display: flex;
  width: 30%;
  font-weight: 800;
  text-align: center;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  border-right: 1px solid #ced4da;

  ${phoneOnly} {
    visibility: hidden;
    height: 0;
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
`;

export const StudentHeading = styled.h1`
  margin-left: 45%;
  font-size: 2.5rem;

  ${phoneOnly} {
    margin: auto;
    display: block;
  }
`;

export const UserHeading = styled.h1`
  margin-left: 48.5%;
  font-size: 2.5rem;
`;
