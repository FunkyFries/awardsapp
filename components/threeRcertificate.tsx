import React from "react";
import {
  PrintDiv,
  CertDiv,
  ThreeRContainer,
  InnerBorder,
  OuterBorder,
  TitleDiv,
  ThreeRLogo,
  ThreeRCCS,
  ContentDiv,
  ThreeRSignatures,
  ThreeRTitle,
  ThreeRHR,
  ThreeRh1,
  ThreeRh2,
  ThreeRh3,
  ThreeRh4,
  ThreeRh5
} from "../styles/certstyles";

const ThreeRCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    return (
      <CertDiv key={`${student._id}threeR`}>
        <ThreeRLogo src="/static/3Rlogo.png" alt="3R logo" />
        <ThreeRContainer>
          <OuterBorder>
            <InnerBorder>
              <TitleDiv>
                <ThreeRTitle>Cougar Character</ThreeRTitle>
              </TitleDiv>
              <ContentDiv>
                <ThreeRh1>Congratulations!</ThreeRh1>
                <ThreeRh2>{student.name}</ThreeRh2>
                <ThreeRh3>
                  has displayed Respect, Responsibility and Relationship,
                </ThreeRh3>
                <ThreeRh3>the qualities of a leader.</ThreeRh3>
                <ThreeRh5>Frederickson Campus</ThreeRh5>
                <ThreeRh4>{currentQuarter} of 19-20 School Year</ThreeRh4>
                <ThreeRSignatures>
                  <ThreeRHR />
                  <ThreeRHR />
                </ThreeRSignatures>
                <ThreeRSignatures>
                  <h5>Principal</h5>
                  <h5>Teacher</h5>
                </ThreeRSignatures>
              </ContentDiv>
            </InnerBorder>
          </OuterBorder>
          <ThreeRCCS src="/static/Logo.png" alt="CCS Logo" />
        </ThreeRContainer>
      </CertDiv>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default ThreeRCertificate;
