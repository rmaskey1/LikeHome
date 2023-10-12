import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.accessToken === undefined) {
      navigate("welcome");
    }
  }, [navigate]);

  return <Container>Home</Container>;
}

export default Home;
