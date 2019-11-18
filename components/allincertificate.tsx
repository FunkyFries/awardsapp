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
  AllInCCS,
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

const AllInCertificate: React.FC<{
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
      <div key={`${student._id}allin`}>
        <CertDiv>
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
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src="/static/Logo.png" alt="CCS Logo" />
            </ThreeRLogoContainer>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <ThreeRWriteupTitle style={{ width: "100%" }}>
                All In Award
              </ThreeRWriteupTitle>
              <ThreeRh3 style={{ width: "100%" }}>{student.name}</ThreeRh3>
              <ThreeRWriteup>{student.threeRwriteUp}</ThreeRWriteup>
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

export default AllInCertificate;
