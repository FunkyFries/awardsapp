import React from "react";
import {
  PrintDiv,
  CertDiv,
  H1,
  H2,
  H3,
  H4,
  P,
  Img,
  Signatures,
  HR
} from "../styles/certstyles";

const ArCertificate: React.FC<{ students: any; currentQuarter: string }> = ({
  students,
  currentQuarter
}) => {
  const certs = students.map(student => {
    let grade;
    if (
      student.teacher === "Mrs. Martin" ||
      student.teacher === "Mrs. Johnson"
    ) {
      grade = "kindergarten";
    } else if (
      student.teacher === "Mrs. Alfaro" ||
      student.teacher === "Mrs. Estep"
    ) {
      grade = "first grade";
    } else if (
      student.teacher === "Mrs. Broberg" ||
      student.teacher === "Mrs. Brar"
    ) {
      grade = "second grade";
    } else if (
      student.teacher === "Mrs. Chavez" ||
      student.teacher === "Mrs. Carroll"
    ) {
      grade = "third grade";
    } else if (student.teacher === "Mr. Kranik") {
      grade = "fourth grade";
    } else if (
      student.teacher === "Mrs. Helle" ||
      student.teacher === "Mrs. Kasemeier"
    ) {
      grade = "fifth grade";
    } else if (student.teacher === "Mrs. Kidd") {
      grade = "sixth grade";
    }
    const formattedWords = student.words
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <CertDiv key={student._id}>
        <H1>AR Reader of the Quarter</H1>
        <H4>presented to</H4>
        <H2>{student.name}</H2>
        <H3>
          on this 12th day of February, 2020 for reading {formattedWords} words
          in the {currentQuarter.toLowerCase()}!
        </H3>
        <H3>The most in {grade}!</H3>
        <Img src="/static/Logo.png" alt="CCS Logo" />
        <Img src="/static/FredericksonText.png" alt="CCS Logo" />
        <Signatures>
          <HR></HR>
          <HR></HR>
        </Signatures>
        <P>
          <q>
            There is more treasure in books, than in all the pirate's loot on
            Treasure Island.
          </q>{" "}
          - Walt Disney
        </P>
      </CertDiv>
    );
  });
  return <PrintDiv className="d-none d-print-block">{certs}</PrintDiv>;
};

export default ArCertificate;
