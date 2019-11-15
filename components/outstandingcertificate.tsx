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
  OutstandingStar,
  ThreeRWriteupContainer,
  ThreeRLogoContainer,
  ThreeRLogoImage,
  ThreeRWriteupTitle,
  ThreeRh3,
  ThreeRWriteup,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  ThreeRh5
} from "../styles/certstyles";

const OutstandingCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    let grade;
    if (
      student.teacher === "Mrs. Martin" ||
      student.teacher === "Mrs. Johnson"
    ) {
      grade = "Kindergarten";
    } else if (
      student.teacher === "Mrs. Alfaro" ||
      student.teacher === "Mrs. Estep"
    ) {
      grade = "First Grade";
    } else if (
      student.teacher === "Mrs. Broberg" ||
      student.teacher === "Mrs. Brar"
    ) {
      grade = "Second Grade";
    } else if (
      student.teacher === "Mrs. Chavez" ||
      student.teacher === "Mrs. Carroll"
    ) {
      grade = "Third Grade";
    } else if (student.teacher === "Mr. Kranik") {
      grade = "Fourth Grade";
    } else if (
      student.teacher === "Mrs. Helle" ||
      student.teacher === "Mrs. Kasemeier"
    ) {
      grade = "Fifth Grade";
    } else if (student.teacher === "Mrs. Kidd") {
      grade = "Sixth Grade";
    }
    return (
      <div key={`${student._id}outstanding`}>
        <CertDiv>
          <ThreeRContainer>
            <OutstandingCCS
              src="/static/Logo.png"
              alt="CCS Logo"
            ></OutstandingCCS>
            <OutstandingOuterBorder>
              <OutstandingInnerBorder>
                <OutstandingH4>Frederickson Elementary</OutstandingH4>
                <OutstandingH1>Outstanding Achievement Award</OutstandingH1>
                <OutstandingH5>is hereby granted to</OutstandingH5>
                <OutstandingH2>{student.name}</OutstandingH2>
                <OutstandingH5>
                  For outstanding achievement during the
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
            <OutstandingStar src="/static/star.png" alt="CCS Logo" />
          </ThreeRContainer>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src="/static/Logo.png" alt="CCS Logo" />
            </ThreeRLogoContainer>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <ThreeRWriteupTitle style={{ width: "100%" }}>
                Outstanding Achievement Award
              </ThreeRWriteupTitle>
              <ThreeRh3 style={{ width: "100%" }}>{student.name}</ThreeRh3>
              <ThreeRWriteup>{student.outstandingWriteup}</ThreeRWriteup>
            </div>
            <ThreeRWriteupSignature>
              <ThreeRWriteupTeacherDiv>
                <ThreeRh5 style={{ marginTop: "1rem" }}>
                  {student.teacher}, {grade} Teacher
                </ThreeRh5>
              </ThreeRWriteupTeacherDiv>
            </ThreeRWriteupSignature>
          </ThreeRWriteupContainer>
        </CertDiv>
      </div>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default OutstandingCertificate;
