import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { primaryTeachers } from "./teachers";
import { ThreeRDiv, ThreeRLabel } from "../styles/awardstyles";
import axios from "axios";
import moment from "moment";

const AwardForm: NextPage<{
  id: string;
  teacher: string;
  allInAward: boolean;
  outstandingAchievement: boolean;
  wowAward: boolean;
  cougarCommunityService: boolean;
  terrificKid: boolean;
  terrificKidChosenBy: string;
  acceleratedReader: boolean;
  threeR: string;
  userName: string;
  role: string;
  pastAwards: string[];
}> = ({
  id,
  teacher,
  allInAward,
  outstandingAchievement,
  wowAward,
  cougarCommunityService,
  terrificKid,
  acceleratedReader,
  threeR,
  userName,
  terrificKidChosenBy,
  role,
  pastAwards
}) => {
  const [allIn, toggleAllIn] = useState(allInAward);
  const [outstanding, toggleOutstanding] = useState(outstandingAchievement);
  const [wow, toggleWow] = useState(wowAward);
  const [communityService, toggleCommunityService] = useState(
    cougarCommunityService
  );
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);
  const [ARaward, setARaward] = useState(acceleratedReader);
  const [disableTerrific, toggleDisableTerrific] = useState();

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
      allInAward: allIn,
      outstandingAchievement: outstanding,
      wowAward: wow,
      cougarCommunityService: communityService,
      terrificKid: terrific,
      terrificKidChosenBy: terrificChooser,
      threeR: threeRAward,
      acceleratedReader: ARaward
    });
  }, [
    allIn,
    outstanding,
    wow,
    communityService,
    terrific,
    terrificChooser,
    threeRAward,
    ARaward
  ]);

  useEffect(() => {
    if (
      (role !== "teacher" &&
        terrificKidChosenBy !== "null" &&
        userName === terrificKidChosenBy &&
        threeRAward === "none") ||
      (role !== "teacher" &&
        terrificKidChosenBy === "null" &&
        threeRAward === "none" &&
        !allIn &&
        !outstanding &&
        !communityService)
    ) {
      toggleDisableTerrific(false);
    } else {
      toggleDisableTerrific(true);
    }
  }, [allIn, outstanding, communityService, terrific, threeRAward]);

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
      {(currentQuarter === "Second Quarter" &&
        primaryTeachers.indexOf(teacher) === -1) ||
      (currentQuarter === "Fourth Quarter" &&
        primaryTeachers.indexOf(teacher) === -1) ? (
        <Form.Check
          type="checkbox"
          label="Wow Award"
          id={`wowAward-${id}`}
          onChange={() => toggleWow(!wow)}
          checked={wow}
          disabled={role === "specialist"}
        />
      ) : null}
      <Form.Check
        type="checkbox"
        label="All In Award"
        id={`AllInAward-${id}`}
        onChange={() => toggleAllIn(!allIn)}
        checked={allIn}
        disabled={
          role === "specialist" ||
          outstanding ||
          communityService ||
          terrific ||
          threeRAward !== "none"
        }
      />
      <Form.Check
        type="checkbox"
        label="Outstanding Achievement"
        id={`OutstandingAchievement-${id}`}
        onChange={() => toggleOutstanding(!outstanding)}
        checked={outstanding}
        disabled={
          role === "specialist" ||
          allIn ||
          communityService ||
          terrific ||
          threeRAward !== "none"
        }
      />
      <Form.Check
        type="checkbox"
        label="Cougar Community Service"
        id={`cougarCommunityService-${id}`}
        onChange={() => toggleCommunityService(!communityService)}
        checked={communityService}
        disabled={
          role === "teacher" ||
          allIn ||
          outstanding ||
          terrific ||
          threeRAward !== "none"
        }
      />

      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id={`TerrificKid-${id}`}
        onChange={handleChange}
        checked={!!terrific}
        disabled={disableTerrific}
      />
      <Form.Check
        type="checkbox"
        label="Reader of the Quarter"
        id={`AR-${id}`}
        onChange={() => setARaward(!ARaward)}
        checked={!!ARaward}
        disabled={role === "teacher" || role === "specialist"}
      ></Form.Check>
      <ThreeRDiv>
        <ThreeRLabel>Three R : </ThreeRLabel>
        <Form.Control
          inline="true"
          as="select"
          id={`ThreeR-${id}`}
          value={threeRAward}
          disabled={
            role === "specialist" ||
            terrific ||
            allIn ||
            outstanding ||
            communityService
          }
          onChange={(e: any) => setThreeR(e.target.value)}
        >
          <option value="none" defaultChecked>
            none
          </option>
          <option value={`Respect - ${currentQuarter}`}>Respect</option>
          <option value={`Responsibility - ${currentQuarter}`}>
            Responsibility
          </option>
          <option value={`Relationship - ${currentQuarter}`}>
            Relationship
          </option>
        </Form.Control>
      </ThreeRDiv>
      {pastAwards.length > 0 && pastAwards[0] !== "" ? (
        <>
          <h6>Past Awards:</h6>
          <ul>{pastAwardsList}</ul>
        </>
      ) : null}
    </Form>
  );
};

export default AwardForm;
