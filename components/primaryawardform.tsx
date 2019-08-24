import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";

const PrimaryAwardForm: NextPage<{
  id: string;
  terrificKid: any;
  threeR: string;
  userName: string;
  terrificKidChosenBy: string;
  role: string;
}> = ({ id, terrificKid, threeR, userName, terrificKidChosenBy, role }) => {
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);

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
      <Form.Label>3R Award</Form.Label>
      <Form.Control
        as="select"
        id="threeR"
        value={threeRAward}
        disabled={role === "specialist"}
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

export default PrimaryAwardForm;
