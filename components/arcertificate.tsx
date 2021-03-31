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
  HR,
} from "../styles/certstyles";
import { determineGrade } from "./teachers";

const ArCertificate: React.FC<{ students: any; currentQuarter: string }> = ({
  students,
  currentQuarter,
}) => {
  const certs = students.map((student) => {
    let grade = determineGrade(student.teacher);

    const formattedWords = student.words
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
      <CertDiv key={student._id}>
        <H1>AR Reader of the Quarter</H1>
        <H4>presented to</H4>
        <H2>{student.name}</H2>
        <H3>
          on this 21st day of April, 2021 for reading {formattedWords} words in
          the {currentQuarter.toLowerCase()}!
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
