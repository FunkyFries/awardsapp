import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState } from "react";

type Student = {
  name: string;
  threeR: string;
  _id: string;
  writeUp: string;
  terrificKid: boolean;
  terrificKidChosenBy: string;
  cougarCommunityService: boolean;
  role: string;
  teacher: string;
};

const WriteUpForm: React.FC<Student> = student => {
  const [textValue, setTextValue] = useState(student.writeUp);
  const handleChange = e => {
    setTextValue(e.target.value);
  };
  let awardName;
  if (student.terrificKid) {
    awardName = `Terrific Kid chosen by ${student.terrificKidChosenBy}`;
  } else if (student.cougarCommunityService) {
    awardName = "Cougar Community Service chosen by Mrs. Plummer";
  } else {
    awardName = `${student.threeR.substr(
      0,
      student.threeR.indexOf(" ")
    )} chosen by ${student.teacher}`;
  }

  if (student.role !== "admin") {
    return (
      <Form.Group>
        <Form.Label style={{ color: "#f7eded" }}>
          {student.name}: {awardName}
        </Form.Label>
        <Form.Control
          id={student._id}
          as="textarea"
          rows="3"
          placeholder="Write those super words here!"
          value={textValue}
          onChange={handleChange}
        />
      </Form.Group>
    );
  } else {
    return (
      <Card style={{ padding: "1rem", margin: ".5rem" }}>
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle>{awardName}</Card.Subtitle>
        <hr />
        <Card.Text>{textValue}</Card.Text>
      </Card>
    );
  }
};

export default WriteUpForm;
