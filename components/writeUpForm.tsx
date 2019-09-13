import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

type Student = {
  name: string;
  threeR: string;
  _id: string;
  writeUp: string;
};

const WriteUpForm: React.FC<Student> = student => {
  const [textValue, setTextValue] = useState(student.writeUp);
  const handleChange = e => {
    setTextValue(e.target.value);
  };

  return (
    <Form.Group>
      <Form.Label>
        {student.name}: {student.threeR}
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
};

export default WriteUpForm;
