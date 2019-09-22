import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

const IntermediateAwardForm: NextPage<{
  id: string;
  aHonorRoll: boolean;
  abHonorRoll: boolean;
  terrificKid: boolean;
  terrificKidChosenBy: string;
  threeR: string;
  userName: string;
  role: string;
}> = ({
  id,
  aHonorRoll,
  abHonorRoll,
  terrificKid,
  threeR,
  userName,
  terrificKidChosenBy,
  role
}) => {
  const [aRoll, toggleAHonorRoll] = useState(aHonorRoll);
  const [abRoll, toggleABHonorRoll] = useState(abHonorRoll);
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);

  useEffect(() => {
    axios.put(`/students/${id}`, {
      aHonorRoll: aRoll,
      abHonorRoll: abRoll,
      terrificKid: terrific,
      terrificKidChosenBy: terrificChooser,
      threeR: threeRAward
    });
  }, [aRoll, abRoll, terrific, terrificChooser, threeRAward]);

  function handleChange() {
    if (terrificChooser === "null") {
      setTerrific(true);
      setTerrificChooser(userName);
    } else if (terrificChooser === userName) {
      setTerrific(false);
      setTerrificChooser("null");
    }
  }

  return (
    <Form>
      <Form.Check
        type="checkbox"
        label="A Honor Roll"
        id="aHonorRoll"
        onChange={() => toggleAHonorRoll(!aRoll)}
        checked={aRoll}
      />
      <Form.Check
        type="checkbox"
        label="A/B Honor Roll"
        id="abHonorRoll"
        onChange={() => toggleABHonorRoll(!abRoll)}
        checked={!!abRoll}
      />
      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id="terrificKid"
        onChange={handleChange}
        checked={!!terrific}
        disabled={role === "teacher"}
      />
      <Form.Label>3R Award</Form.Label>
      <Form.Control
        inline="true"
        as="select"
        id="threeR"
        value={threeRAward}
        onChange={(e: any) => setThreeR(e.target.value)}
      >
        <option value="none" defaultChecked>
          none
        </option>
        <option value="respect">Respect</option>
        <option value="responsibility">Responsibility</option>
        <option value="relationship">Relationship</option>
      </Form.Control>
    </Form>
  );
};

export default IntermediateAwardForm;
