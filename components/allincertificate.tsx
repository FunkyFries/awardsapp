import React from "react";
import {
  CertDiv,
  PrintDiv,
  AllInH1,
  ThreeRh4,
  AllInH5,
  ThreeRh2,
  ThreeRSignatures,
  ThreeRHR,
  OutstandingInnerBorder,
  OutstandingOuterBorder,
  AllInLogo,
  AllInContainer,
  ThreeRContainer,
  AllInCCS
} from "../styles/certstyles";

const AllInCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    return (
      <CertDiv key={`${student._id}allin`}>
        <ThreeRContainer style={{ flexWrap: "wrap" }}>
          <OutstandingOuterBorder>
            <OutstandingInnerBorder>
              <AllInLogo src="/static/allinlogo.png" alt="All In Logo" />
              <AllInContainer>
                <AllInH5 style={{ color: "#000" }}>
                  Frederickson Elementary
                </AllInH5>
                <AllInH1 style={{ padding: "1rem 0" }}>All In Award</AllInH1>
                <AllInH5>is hereby granted to</AllInH5>
                <ThreeRh2>{student.name}</ThreeRh2>
                <AllInH5>
                  for exemplifying the CCS Spiritual Theme during the
                </AllInH5>
                <ThreeRh4 style={{ paddingTop: "2rem" }}>
                  {currentQuarter} of the 2019-2020 School Year
                </ThreeRh4>
              </AllInContainer>
              <ThreeRSignatures style={{ width: "100%" }}>
                <ThreeRHR />
                <ThreeRHR />
              </ThreeRSignatures>
              <ThreeRSignatures style={{ width: "100%" }}>
                <h6>Principal</h6>
                <h6>Teacher</h6>
              </ThreeRSignatures>
            </OutstandingInnerBorder>
          </OutstandingOuterBorder>
          <AllInCCS src="/static/Logo.png" alt="CCS Logo" />
        </ThreeRContainer>
      </CertDiv>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default AllInCertificate;
