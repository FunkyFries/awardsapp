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
  role: string;
  teacher: string;
};

const WriteUpForm: React.FC<Student> = student => {
  const [textValue, setTextValue] = useState(student.writeUp);
  const handleChange = e => {
    setTextValue(e.target.value);
  };
  let awardName;
  student.terrificKid
    ? (awardName = `Terrific Kid by ${student.terrificKidChosenBy}`)
    : (awardName = `${student.threeR.substr(
        0,
        student.threeR.indexOf(" ")
      )} by ${student.teacher}`);

  if (student.role !== "admin") {
    return (
      <Form.Group>
        <Form.Label>
          {student.name}: {awardName}
        </Form.Label>
        <Form.Control
          id={student._id}
          as="textarea"
          rows="3"
          value={textValue}
          onChange={handleChange}
        />
      </Form.Group>
    );
  } else {
    return (
      <Card>
        <Card.Title>{student.name}</Card.Title>
        <Card.Subtitle>{awardName}</Card.Subtitle>
        <Card.Text>{textValue}</Card.Text>
      </Card>
    );
  }
};

export default WriteUpForm;
