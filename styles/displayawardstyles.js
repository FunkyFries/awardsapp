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
  @media print {
    height: auto;
  }
`;

export const DisplayAwardsContainer = styled(Container)`
  background-color: #ffffff;
  overflow: auto;
  @media print {
    margin-left: 1cm;
    margin-right: 1cm;
    margin-top: 0.5cm;
    margin-bottom: 0.5cm;
  }
`;

export const PrintFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageBreak = styled.div`
  @media print {
    page-break-after: always;
  }
`;

export const StyledTable = styled(Table)`
  margin-top: 1rem;
  @media print {
    font-size: 10pt;
  }
`;

export const TopTableHeader = styled.th`
  border-top: none;
  font-size: 2rem;
  @media print {
    font-size: 14pt;
    text-align: center;
  }
`;

export const TableHeader = styled.th`
  font-size: 2rem;
  @media print {
    font-size: 10pt;
    text-align: center;
  }
`;

export const ArAwardsHeader = styled.th`
  width: 50%;
`;
