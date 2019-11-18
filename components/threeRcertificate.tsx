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
  ThreeRh5,
  ThreeRWriteupContainer,
  ThreeRLogoContainer,
  ThreeRLogoImage,
  ThreeRWriteup,
  ThreeRWriteupTitle,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  OutstandingInnerBorder
} from "../styles/certstyles";

const ThreeRCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    let awardName = student.threeR.substr(0, student.threeR.indexOf(" "));

    let definition;
    if (awardName === "Respect") {
      definition =
        "Respect is serving God by choosing to think, act and speak in a way that honors God, others, self and property.";
    } else if (awardName === "Relationship") {
      definition =
        "Relationship is serving God by choosing to understand, accept, and show concern for others and oneself.";
    } else if (awardName === "Responsibility") {
      definition =
        "Responsibility is being trustworthy, self-monitored, and accountable for one’s choices and accepting all consequences for one’s actions.";
    }

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
      <div key={`${student._id}threeR`}>
        <CertDiv>
          <ThreeRLogo src="/static/3Rlogo.png" alt="3R logo" />
          <ThreeRContainer>
            <OuterBorder>
              <OutstandingInnerBorder style={{ margin: ".5rem" }}>
                <TitleDiv>
                  <img
                    src="/static/Header.png"
                    alt="Header Background"
                    style={{
                      zIndex: -20,
                      height: "100%",
                      width: "100%"
                    }}
                  />
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
              </OutstandingInnerBorder>
            </OuterBorder>
            <ThreeRCCS src="/static/Logo.png" alt="CCS Logo" />
          </ThreeRContainer>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <ThreeRLogoContainer>
              <ThreeRLogoImage src="/static/Logo.png" alt="CCS Logo" />
            </ThreeRLogoContainer>
            <ThreeRWriteupTitle>{awardName} Cougar Award</ThreeRWriteupTitle>
            <ThreeRh4 style={{ fontStyle: "italic" }}>{definition}</ThreeRh4>
            <ThreeRh3>{student.name}</ThreeRh3>
            <ThreeRWriteup>{student.threeRwriteUp}</ThreeRWriteup>
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

export default ThreeRCertificate;
