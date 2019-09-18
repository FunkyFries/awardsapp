import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const PrimaryAwardForm: NextPage<{
  id: string;
  terrificKid: any;
  threeR: string;
  userName: string;
  terrificKidChosenBy: string;
  role: string;
  pastAwards: string[];
}> = ({
  id,
  terrificKid,
  threeR,
  userName,
  terrificKidChosenBy,
  role,
  pastAwards
}) => {
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);

  let currentQuarter;
  if (moment().isBefore("2019-11-20")) {
    currentQuarter = "First Quarter";
  } else if (moment().isBefore("2020-02-12")) {
    currentQuarter = "Second Quarter";
  } else if (moment().isBefore("2020-04-22")) {
    currentQuarter = "Third Quarter";
  } else {
    currentQuarter = "Fourth Quarter";
  }

  useEffect(() => {
    axios.put(`/students/${id}`, {
      terrificKid: terrific,
      terrificKidChosenBy: terrificChooser,
      threeR: threeRAward
    });
  }, [terrific, terrificChooser, threeRAward]);

  function handleChange() {
    if (terrificChooser === "null") {
      setTerrific(true);
      setTerrificChooser(userName);
    } else if (terrificChooser === userName) {
      setTerrific(false);
      setTerrificChooser("null");
    }
  }

  const pastAwardsList = pastAwards.map(award => <li key={award}>{award}</li>);

  return (
    <Form>
      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id="terrificKid"
        onChange={handleChange}
        checked={!!terrific}
        disabled={role === "teacher"}
      />
      <Form.Control
        style={{ marginTop: "1rem" }}
        as="select"
        id="threeR"
        value={threeRAward}
        disabled={role === "specialist"}
        onChange={(e: any) => setThreeR(e.target.value)}
      >
        <option value="none" defaultChecked>
          none
        </option>
        <option value={`Respect - ${currentQuarter}`}>Respect</option>
        <option value={`Responsibility - ${currentQuarter}`}>
          Responsibility
        </option>
        <option value={`Relationship - ${currentQuarter}`}>Relationship</option>
      </Form.Control>
      {pastAwards[0] !== "" ? (
        <>
          <h6>Past Awards:</h6>
          <ul>{pastAwardsList}</ul>
        </>
      ) : null}
    </Form>
  );
};

export default PrimaryAwardForm;
