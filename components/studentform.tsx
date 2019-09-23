import { NextPage } from "next";
import { useEffect, useState } from "react";
import { teachers } from "../components/teachers";
import axios from "axios";
import Form from "react-bootstrap/Form";

const StudentForm: NextPage<{
  id: string;
  name: string;
  teacher: string;
  image: string;
}> = ({ id, name, teacher, image }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState(name);
  const [studentTeacher, setStudentTeacher] = useState(teacher);
  const [studentImage, setStudentImage] = useState(image);

  function handleSubmit(evt) {
    evt.preventDefault();
    axios.put(`/students/${id}`, {
      name: studentName,
      teacher: studentTeacher,
      image: studentImage
    });
    setIsEditing(false);
  }

  const options = teachers.map(teacher => {
    return (
      <option key={`${teacher}-${id}`} value={teacher}>
        {teacher}
      </option>
    );
  });

  let display = isEditing ? (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        id={`name-${id}`}
        onChange={e => setStudentName(e.target.value)}
        value={studentName}
      ></Form.Control>
      <Form.Control
        id={`teacher-${id}`}
        as="select"
        onChange={(e: any) => setStudentTeacher(e.target.value)}
        value={studentTeacher}
      >
        <option value="none" defaultChecked></option>
        {options}
      </Form.Control>
      <Form.Control
        id={`image-${id}`}
        onChange={e => setStudentImage(e.target.value)}
        value={studentImage}
      ></Form.Control>
      <button>Save</button>
    </Form>
  ) : (
    <div>
      <li>{studentName}</li>
      <li>{studentTeacher}</li>
      <li>{image}</li>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </div>
  );

  return display;
};

export default StudentForm;
