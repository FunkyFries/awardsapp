import styled from "styled-components";

export const PrintDiv = styled.div`
  @media print {
    @page {
      size: landscape;
      margin: 0mm;
    }
  }
`;

export const CertDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

export const H1 = styled.h1`
  text-align: center;
  padding-top: 7.5rem;
  font-size: 5rem;
  font-family: "Olde English Regular";

  @font-face {
    font-family: "Olde English Regular";
    font-style: normal;
    font-weight: normal;
    src: url("/static/OldeEnglish.woff") format("woff");
  }
`;

export const H2 = styled.h2`
  text-align: center;
  font-size: 4rem;
  font-family: "Olde English Regular";
`;

export const H3 = styled.h3`
  text-align: center;
  margin: 1rem 6rem;
  font-size: 1.3rem;
  font-family: "Jomolhari", serif;
`;

export const H4 = styled.h4`
  text-align: center;
  font-family: "Jomolhari", serif;
  font-size: 1rem;
`;

export const P = styled.p`
  padding-top: 1rem;
  text-align: center;
  font-size: 1rem;
  font-family: "Jomolhari", serif;
`;

export const Img = styled.img`
  display: flex;
  margin: auto;
`;

export const Signatures = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
`;

export const HR = styled.div`
  width: 25%;
  justify-items: center;
  border: 1px solid #000000;
`;
