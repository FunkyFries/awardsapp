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

export const ThreeRContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export const InnerBorder = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(/static/InnerBorder.png);
`;

export const OuterBorder = styled.div`
  margin: 2rem 1rem;
  padding: 1rem;
  display: flex;
  width: 100%;
  border: 10px solid #398771;
`;

export const TitleDiv = styled.div`
  display: flex;
  z-index: -1;
  width: 100%;
  height: 25%;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(/static/Header.png);
`;

export const ThreeRLogo = styled.img`
  height: 25%;
  display: flex;
  position: absolute;
  margin: 1rem 6rem;
  z-index: 10;
`;

export const ThreeRCCS = styled.img`
  display: flex;
  align-self: flex-end;
  z-index: 11;
  position: absolute;
  padding-left: 1rem;
  padding-bottom: 1.5rem;
`;

export const ContentDiv = styled.div`
  text-align: center;
  z-index: -2;
  width: 100%;
  height: 75%;
`;

export const ThreeRHR = styled.hr`
  width: 30%;
  align-self: flex-end;
  margin-bottom: 0.5rem;
`;

export const ThreeRSignatures = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ThreeRTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  margin-top: 1rem;
  margin-right: 6rem;
  font-size: 5rem;
  color: #062f5f;
`;

export const ThreeRh1 = styled.h1`
  font-family: "Noto Sans", sans-serif;
  font-size: 5rem;
  font-style: italic;
  font-weight: 700;
  color: #062f5f;
`;
export const ThreeRh2 = styled.h1`
  font-family: "Noto Sans";
  font-size: 4rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
export const ThreeRh3 = styled.h1`
  font-family: "Noto Sans";
  font-style: italic;
  color: #062f5f;
  font-size: 2rem;
`;
export const ThreeRh4 = styled.h1`
  font-family: "Cormorant Garamond";
  font-size: 2rem;
  margin-bottom: 2.5rem;
`;
export const ThreeRh5 = styled.h1`
  margin-top: 2rem;
  font-weight: 700;
  font-family: "Noto Sans";
  font-size: 1rem;
`;
