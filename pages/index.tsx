import { NextPage } from "next";
import Link from "next/link";
import {
  ForegroundContainer,
  BackgroundDiv,
  Heading,
  LoginButton
} from "../styles/indexstyles";

const Index: NextPage = () => {
  return (
    <BackgroundDiv>
      <ForegroundContainer>
        <Heading>CCS Honors Awards</Heading>
        <Link href="/auth/outlook">
          <LoginButton size="lg" variant="info">
            Login
          </LoginButton>
        </Link>
      </ForegroundContainer>
    </BackgroundDiv>
  );
};

export default Index;
