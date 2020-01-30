import React from "react";
import {
  PrintDiv,
  CertDiv,
  WowH1,
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

const WowCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => (
    <CertDiv key={`${student._id}wow`}>
      <ThreeRContainer>
        <OutstandingCCS src="/static/Logo.png" alt="CCS Logo"></OutstandingCCS>
        <OutstandingOuterBorder>
          <OutstandingInnerBorder>
            <OutstandingH4>Frederickson Elementary</OutstandingH4>
            <WowH1>Wow Award</WowH1>
            <OutstandingH5>is hereby granted to</OutstandingH5>
            <OutstandingH2>{student.name}</OutstandingH2>
            <OutstandingH5>
              for the completion of their semester goal during the
            </OutstandingH5>
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
        <OutstandingStar src="/static/wowstar.png" alt="Star Logo" />
      </ThreeRContainer>
    </CertDiv>
  ));
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default WowCertificate;
