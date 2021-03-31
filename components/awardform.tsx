import { NextPage } from "next";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { primaryTeachers, recessSpecialists } from "./teachers";
import { ThreeRDiv, ThreeRLabel } from "../styles/awardstyles";
import axios from "axios";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AwardForm: NextPage<{
  id: string;
  teacher: string;
  allInAward: boolean;
  outstandingAchievement: boolean;
  wowAward: boolean;
  cougarCommunityService: boolean;
  handlePrimaryCommunityServiceUpdate: any;
  communityServiceChosenBy: string;
  disablePrimaryCommunity: boolean;
  handleIntermediateCommunityServiceUpdate: any;
  disableIntermediateCommunity: boolean;
  terrificKid: boolean;
  terrificKidChosenBy: string;
  handlePrimaryTerrificKidUpdate: any;
  disableTerrificPrimary: boolean;
  handleIntermediateTerrificKidUpdate: any;
  disableTerrificIntermediate: boolean;
  acceleratedReader: boolean;
  words: number;
  threeR: string;
  userName: string;
  role: string;
  pastAwards: string[];
  setRespectStudents: any;
  disableRespect: boolean;
  setResponsibilityStudents: any;
  disableResponsibility: boolean;
  setRelationshipStudents: any;
  disableRelationship: boolean;
  handleNoneUpdate: any;
  setAllInStudents: any;
  disableAllIn: boolean;
  setOutstandingStudents: any;
  disableOutstanding: boolean;
}> = ({
  id,
  teacher,
  allInAward,
  outstandingAchievement,
  wowAward,
  cougarCommunityService,
  communityServiceChosenBy,
  handlePrimaryCommunityServiceUpdate,
  disablePrimaryCommunity,
  handleIntermediateCommunityServiceUpdate,
  disableIntermediateCommunity,
  terrificKid,
  handlePrimaryTerrificKidUpdate,
  disableTerrificPrimary,
  handleIntermediateTerrificKidUpdate,
  disableTerrificIntermediate,
  acceleratedReader,
  words,
  threeR,
  userName,
  terrificKidChosenBy,
  role,
  pastAwards,
  setRespectStudents,
  disableRespect,
  setResponsibilityStudents,
  disableResponsibility,
  setRelationshipStudents,
  disableRelationship,
  handleNoneUpdate,
  setAllInStudents,
  disableAllIn,
  setOutstandingStudents,
  disableOutstanding,
}) => {
  const [allIn, toggleAllIn] = useState(allInAward);
  const [outstanding, toggleOutstanding] = useState(outstandingAchievement);
  const [wow, toggleWow] = useState(wowAward);
  const [communityService, toggleCommunityService] = useState(
    cougarCommunityService
  );
  const [communityServiceChooser, setCommunityServiceChooser] = useState(
    communityServiceChosenBy
  );
  const [terrific, setTerrific] = useState(terrificKid);
  const [terrificChooser, setTerrificChooser] = useState(terrificKidChosenBy);
  const [threeRAward, setThreeR] = useState(threeR);
  const [ARaward, setARaward] = useState(acceleratedReader);
  const [showARModal, setShowARModal] = useState(false);
  const [arWords, setWords] = useState(words);
  const [disableTerrific, toggleDisableTerrific] = useState(null);

  let currentQuarter;
  if (moment().isBefore("2020-11-20")) {
    currentQuarter = "First Quarter";
  } else if (moment().isBefore("2021-02-12")) {
    currentQuarter = "Second Quarter";
  } else if (moment().isBefore("2021-04-22")) {
    currentQuarter = "Third Quarter";
  } else {
    currentQuarter = "Fourth Quarter";
  }

  useEffect(() => {
    if (
      (role !== "teacher" &&
        !recessSpecialists.includes(userName) &&
        terrificKidChosenBy !== "null" &&
        userName === terrificKidChosenBy &&
        threeRAward === "none") ||
      (role !== "teacher" &&
        !recessSpecialists.includes(userName) &&
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

  function updateWowAward() {
    axios
      .put(`students/${id}`, {
        wowAward: !wow,
      })
      .then(() => toggleWow(!wow));
  }

  function updateAllInAward() {
    setAllInStudents(id);
    axios
      .put(`students/${id}`, {
        allInAward: !allIn,
      })
      .then(() => toggleAllIn(!allIn));
  }

  function updateOutstandingAchievement() {
    setOutstandingStudents(id);
    axios
      .put(`students/${id}`, {
        outstandingAchievement: !outstanding,
      })
      .then(() => toggleOutstanding(!outstanding));
  }

  function updateThreeR(e) {
    if (e.target.value === `Respect - ${currentQuarter}`) {
      setRespectStudents(id);
    } else if (e.target.value === `Responsibility - ${currentQuarter}`) {
      setResponsibilityStudents(id);
    } else if (e.target.value === `Relationship - ${currentQuarter}`) {
      setRelationshipStudents(id);
    } else if (e.target.value === "none") {
      handleNoneUpdate(id);
    }
    axios.put(`students/${id}`, {
      threeR: e.target.value,
    });
    setThreeR(e.target.value);
  }

  function updateAcceleratedReader() {
    if (ARaward) {
      axios
        .put(`students/${id}`, {
          acceleratedReader: false,
          words: 0,
        })
        .then(() => setARaward(false));
    } else {
      setShowARModal(true);
    }
  }

  function submitARreader() {
    setARaward(true);
    axios
      .put(`students/${id}`, {
        acceleratedReader: true,
        words: arWords,
      })
      .then(() => setShowARModal(false));
  }

  function handleChange() {
    if (primaryTeachers.includes(teacher) && role !== "admin") {
      handlePrimaryTerrificKidUpdate(id);
    }
    if (primaryTeachers.indexOf(teacher) === -1 && role !== "admin") {
      handleIntermediateTerrificKidUpdate(id);
    }

    if (terrificChooser === "null") {
      axios.put(`students/${id}`, {
        terrificKid: true,
        terrificKidChosenBy: userName,
      });
      setTerrific(true);
      setTerrificChooser(userName);
    } else if (terrificChooser === userName || role === "admin") {
      axios.put(`students/${id}`, {
        terrificKid: false,
        terrificKidChosenBy: "null",
      });
      setTerrific(false);
      setTerrificChooser("null");
    }
  }

  function handleCommunityChange() {
    if (primaryTeachers.includes(teacher) && role !== "admin") {
      handlePrimaryCommunityServiceUpdate(id);
    }
    if (primaryTeachers.indexOf(teacher) === -1 && role !== "admin") {
      handleIntermediateCommunityServiceUpdate(id);
    }

    if (communityServiceChooser === "null") {
      axios.put(`students/${id}`, {
        cougarCommunityService: true,
        communityServiceChosenBy: userName,
      });
      toggleCommunityService(true);
      setCommunityServiceChooser(userName);
    } else if (communityServiceChooser === userName || role === "admin") {
      axios.put(`students/${id}`, {
        cougarCommunityService: false,
        communityServiceChosenBy: "null",
      });
      toggleCommunityService(false);
      setCommunityServiceChooser("null");
    }
  }

  const pastAwardsList = pastAwards.map((award) => (
    <li key={award}>{award}</li>
  ));

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
          onChange={updateWowAward}
          checked={wow}
          disabled={role === "specialist"}
        />
      ) : null}
      <Form.Check
        type="checkbox"
        label="Living Free Award"
        id={`AllInAward-${id}`}
        onChange={updateAllInAward}
        checked={allIn}
        disabled={
          role === "specialist" ||
          outstanding ||
          communityService ||
          terrific ||
          threeRAward !== "none" ||
          (disableAllIn && allIn === false && role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Outstanding Achievement"
        id={`OutstandingAchievement-${id}`}
        onChange={updateOutstandingAchievement}
        checked={outstanding}
        disabled={
          role === "specialist" ||
          allIn ||
          communityService ||
          terrific ||
          threeRAward !== "none" ||
          (disableOutstanding && outstanding === false && role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Cougar Community Service"
        id={`cougarCommunityService-${id}`}
        onChange={handleCommunityChange}
        checked={communityService}
        disabled={
          (role !== "admin" && !recessSpecialists.includes(userName)) ||
          allIn ||
          outstanding ||
          terrific ||
          threeRAward !== "none" ||
          (primaryTeachers.includes(teacher) &&
            disablePrimaryCommunity &&
            communityService === false &&
            role !== "admin") ||
          (primaryTeachers.indexOf(teacher) === -1 &&
            disableIntermediateCommunity &&
            communityService === false &&
            role !== "admin")
        }
      />

      <Form.Check
        type="checkbox"
        label="Terrific Kid"
        id={`TerrificKid-${id}`}
        onChange={handleChange}
        checked={!!terrific}
        disabled={
          (disableTerrific && role !== "admin") ||
          (primaryTeachers.indexOf(teacher) !== -1 &&
            disableTerrificPrimary &&
            terrific === false &&
            role !== "admin") ||
          (primaryTeachers.indexOf(teacher) === -1 &&
            disableTerrificIntermediate &&
            terrific === false &&
            role !== "admin")
        }
      />
      <Form.Check
        type="checkbox"
        label="Reader of the Quarter"
        id={`AR-${id}`}
        onChange={updateAcceleratedReader}
        checked={!!ARaward}
        disabled={role === "teacher" || role === "specialist"}
      ></Form.Check>
      <Modal
        show={showARModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowARModal(false)}
      >
        <Modal.Header translate="no" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Accelerated Reader Words
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            onChange={(e) => setWords(parseInt(e.target.value))}
            type="number"
            placeholder="Words"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitARreader}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <ThreeRDiv>
        <ThreeRLabel>Three R : </ThreeRLabel>
        <Form.Control
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
          onChange={updateThreeR}
        >
          <option value="none" defaultChecked>
            none
          </option>
          <option
            disabled={disableRespect && role !== "admin"}
            value={`Respect - ${currentQuarter}`}
          >
            Respect
          </option>
          <option
            disabled={disableResponsibility && role !== "admin"}
            value={`Responsibility - ${currentQuarter}`}
          >
            Responsibility
          </option>
          <option
            disabled={disableRelationship && role !== "admin"}
            value={`Relationship - ${currentQuarter}`}
          >
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
