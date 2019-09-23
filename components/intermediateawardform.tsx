import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const IntermediateAwardForm: NextPage<{
  id: string;
  aHonorRoll: boolean;
  abHonorRoll: boolean;
  terrificKid: boolean;
  terrificKidChosenBy: string;
  acceleratedReader: boolean;
  threeR: string;
  userName: string;
  role: string;
  pastAwards: string[];
}> = ({
  id,
  aHonorRoll,
  abHonorRoll,
  terrificKid,
  acceleratedReader,
  threeR,
  userName,
  terrificKidChosenBy,
  role,
  pastAwards
}) => {
  const [aRoll, toggleAHonorRoll] = useState(aHonorRoll);
  const [abRoll, toggleABHonorRoll] = useState(abHonorRoll);
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);
  const [ARaward, setARaward] = useState(acceleratedReader);

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
      aHonorRoll: aRoll,
      abHonorRoll: abRoll,
      terrificKid: terrific,
      terrificKidChosenBy: terrificChooser,
      threeR: threeRAward,
      acceleratedReader: ARaward
    });
  }, [aRoll, abRoll, terrific, terrificChooser, threeRAward, ARaward]);

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

  let disableTerrific;
  if (
    (role !== "teacher" &&
      terrificKidChosenBy !== "null" &&
      userName === terrificKidChosenBy &&
      threeR === "none") ||
    (role !== "teacher" && terrificKidChosenBy === "null" && threeR === "none")
  ) {
    disableTerrific = false;
  } else {
    disableTerrific = true;
  }

  return (
    <Form>
      <Form.Check
        type="checkbox"
        label="A Honor Roll"
        id={`AHonorRoll-${id}`}
        onChange={() => toggleAHonorRoll(!aRoll)}
        checked={aRoll}
        disabled={role === "specialist"}
      />
      <Form.Check
        type="checkbox"
        label="A/B Honor Roll"
        id={`ABHonorRoll-${id}`}
        onChange={() => toggleABHonorRoll(!abRoll)}
        checked={!!abRoll}
        disabled={role === "specialist"}
      />
      <Form.Check
        type="checkbox"
        label="Reader of the Quarter"
        id={`AR-${id}`}
        onChange={() => setARaward(!ARaward)}
        checked={!!ARaward}
        disabled={role === "teacher" || role === "specialist"}
      ></Form.Check>
      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id={`TerrificKid-${id}`}
        onChange={handleChange}
        checked={!!terrific}
        disabled={disableTerrific}
      />
      <Form.Control
        inline="true"
        as="select"
        id={`ThreeR-${id}`}
        value={threeRAward}
        disabled={role === "specialist" || terrificKid}
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
      {pastAwards.length > 0 && pastAwards[0] !== "" ? (
        <>
          <h6>Past Awards:</h6>
          <ul>{pastAwardsList}</ul>
        </>
      ) : null}
    </Form>
  );
};

export default IntermediateAwardForm;
