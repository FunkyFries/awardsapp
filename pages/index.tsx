import { NextPage } from "next";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const BackgroundDiv = styled.div`
  display: flex;
  text-align: center;
  background-image: url("https://lh3.googleusercontent.com/mEiupYlELyftp7qjytMuukQI3rCCRZKmpyokjoqObAW0xKv_rgJFuK4BUwF7B-cvDbVXo7Nm5iViS8oMvBcXxhKGmlloeMKzQ216TP2Dg_gW1vlt5Q2hXDFjNgk7QL2YEdZ1amlCtYrQRFHdoh5YeuAwFN9JkPpATdvu5v1kRqcknpzpEvrgrb2cG3jx6VN-2LxE5la3YyaVCAhh25duoab7u_7EBKGf-mscW_PgCp-jmC04riKE_iGbjGb74IXE9aYcRZ5jyWqXpYo-Ur2i6szP_ItyHB4V2F7Nt1NGvfd3WNtFRhbQWb2alfrE9vIxPHYfoAjvfcThxwFCGiduJ56Dnei9ZAsU-IracQV-j9kXtxp9AZfme8jBiCxkbjGp0NW_NyZQAKQeziUe5OBFZf3bN7hrdaEVWDWYvQf5Fjp-iht6l5NkEm0u_S6G69Pcya7rc-nyRqUAbTyhje3bBXnbcwKuzuYbLkf5krJDWoMCIUWJC5texnw7CFUB5gNQ1QmjTq7lEHfmHA1d0eq8seo_40rCQisB03OOCA9K2DDJbRPs6JfXtG5AU2wsKLJ1rb8TBUdxDOn5WbE0AhM8efTvZQyXqYQvoQpLLu-ZA9Rhb6rfjBNYY0eVmfrBZ5saFTOw1zpEn_nguwEXkIRvS1mDkJYu78_KUXeJIl8J_vpP5t8TI7pQkg=w1073-h715-no");
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const ForegroundContainer = styled(Container)`
  width: 50%;
`;

const Index: NextPage = () => {
  return (
    <BackgroundDiv>
      <ForegroundContainer>
        <h2
          style={{
            fontSize: "3.4rem",
            width: "100%",
            marginTop: "20vh",
            color: "#444444"
          }}
        >
          CCS Honors Awards
        </h2>

        <Link href="/auth/outlook">
          <Button
            size="lg"
            style={{
              display: "block",
              margin: "auto",
              fontSize: "2rem",
              padding: ".5rem 3rem",
              marginTop: "5rem"
            }}
            variant="info"
          >
            Login
          </Button>
        </Link>
      </ForegroundContainer>
    </BackgroundDiv>
  );
};

export default Index;
