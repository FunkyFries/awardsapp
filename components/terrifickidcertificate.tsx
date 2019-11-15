import React from "react";
import {
  PrintDiv,
  CertDiv,
  ThreeRWriteupContainer,
  ThreeRWriteupTitle,
  ThreeRh3,
  ThreeRWriteup,
  ThreeRWriteupSignature,
  ThreeRWriteupTeacherDiv,
  ThreeRh5,
  TerrificH1
} from "../styles/certstyles";

const TerrificKidCertificate: React.FC<{
  students: any;
  currentQuarter: string;
}> = ({ students, currentQuarter }) => {
  const certs = students.map(student => {
    return (
      <div key={`${student._id}terrifickid`}>
        <CertDiv style={{ display: "flex" }}>
          <TerrificH1>{student.name}</TerrificH1>
        </CertDiv>
        <CertDiv>
          <ThreeRWriteupContainer>
            <img
              style={{ height: "30%", margin: "0 auto" }}
              src="/static/terrifickidlogo.png"
              alt="Terrific Kid Logo"
            />
            <ThreeRWriteupTitle style={{ width: "100%", fontSize: "3rem" }}>
              {currentQuarter} 2019 - 2020
            </ThreeRWriteupTitle>
            <ThreeRh3>{student.name}</ThreeRh3>
            <ThreeRWriteup>{student.terrificKidWriteUp}</ThreeRWriteup>
            <ThreeRWriteupSignature>
              <ThreeRWriteupTeacherDiv>
                <ThreeRh5 style={{ marginTop: "1rem" }}>
                  {student.terrificKidChosenBy}
                </ThreeRh5>
              </ThreeRWriteupTeacherDiv>
            </ThreeRWriteupSignature>
          </ThreeRWriteupContainer>
        </CertDiv>
      </div>
    );
  });
  // className="d-none d-print-block"
  return <PrintDiv>{certs}</PrintDiv>;
};

export default TerrificKidCertificate;
