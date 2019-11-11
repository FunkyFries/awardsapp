import React from "react";
import {
  PrintDiv,
  CertDiv,
  OutstandingH1,
  OutstandingOuterBorder,
  OutstandingInnerBorder,
  ThreeRContainer,
  OutstandingCCS,
  OutstandingH2,
  OutstandingH3,
  OutstandingH4,
  OutstandingH5,
  OutstandingH6,
  OutstandingSignatures,
  ThreeRHR,
  OutstandingStar
} from "../styles/certstyles";

const CommunityServiceCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    return (
      <CertDiv key={`${student._id}communityservice`}>
        <ThreeRContainer>
          <OutstandingCCS
            src="/static/Logo.png"
            alt="CCS Logo"
          ></OutstandingCCS>
          <OutstandingOuterBorder>
            <OutstandingInnerBorder>
              <OutstandingH4>Frederickson Elementary</OutstandingH4>
              <OutstandingH1>Cougar Community Service Award</OutstandingH1>
              <OutstandingH5>is hereby granted to</OutstandingH5>
              <OutstandingH2>{student.name}</OutstandingH2>
              <OutstandingH5>For community service during the</OutstandingH5>
              <OutstandingH3>
                {currentQuarter} of the 2019-2020 School Year
              </OutstandingH3>
              <OutstandingSignatures>
                <ThreeRHR />
                <ThreeRHR />
              </OutstandingSignatures>
              <OutstandingSignatures>
                <OutstandingH6>Principal</OutstandingH6>
                <OutstandingH6>Teacher</OutstandingH6>
              </OutstandingSignatures>
            </OutstandingInnerBorder>
          </OutstandingOuterBorder>
          <OutstandingStar src="/static/goldstar.png" alt="CCS Logo" />
        </ThreeRContainer>
      </CertDiv>
    );
  });
  return <PrintDiv>{certs}</PrintDiv>;
};

export default CommunityServiceCertificate;
