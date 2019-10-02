import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

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

export const DisplayAwardsContainer = styled(Container)`
  background-color: #ffffff;
  overflow: auto;
`;

export const StyledTable = styled(Table)`
  margin-top: 1rem;
`;

export const TopTableHeader = styled.th`
  border-top: none;
  font-size: 2rem;
`;

export const TableHeader = styled.th`
  font-size: 2rem;
`;

export const ArAwardsHeader = styled.th`
  width: 50%;
`;
