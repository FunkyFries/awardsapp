import { NextPage } from "next";
import axios from "axios";

const Awards: NextPage<{ students: any }> = students => {
  return <div />;
};

Awards.getInitialProps = async ({ req }) => {
  const res = await axios.get("http://localhost:8080/students", {
    headers: req.headers,
    withCredentials: true
  });
  const students = res.data;
  return { students: students };
};

export default Awards;
