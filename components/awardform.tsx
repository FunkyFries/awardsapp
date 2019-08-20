import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

const IntermediateAwardForm: NextPage<{
  id: string;
  aHonorRoll: boolean;
  abHonorRoll: boolean;
  terrificKid: boolean;
  threeR: string;
}> = ({ id, aHonorRoll, abHonorRoll, terrificKid, threeR }) => {
  const [aRoll, toggleAHonorRoll] = useState(aHonorRoll);
  const [abRoll, toggleABHonorRoll] = useState(abHonorRoll);
  const [terrific, toggleTerrific] = useState(terrificKid);
  const [threeRAward, setThreeR] = useState(threeR);

  useEffect(() => {
    axios.put(`/students/${id}`, {
      aHonorRoll: aRoll,
      abHonorRoll: abRoll,
      terrificKid: terrific,
      threeR: threeRAward
    });
  }, [aRoll, abRoll, terrific, threeRAward]);

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
        onChange={() => toggleTerrific(!terrific)}
        checked={!!terrific}
      />
      <Form.Label>3R Award</Form.Label>
      <Form.Control
        as="select"
        id="threeR"
        value={threeRAward}
        onChange={(e: any) => setThreeR(e.target.value)}
      >
        <option value="none" defaultChecked>
          None
        </option>
        <option value="respect">Respect</option>
        <option value="responsibility">Responsibility</option>
        <option value="relationship">Relationship</option>
      </Form.Control>
    </Form>
  );
};

export default IntermediateAwardForm;
