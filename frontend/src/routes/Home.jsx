import React from "react";
import styled from "styled-components";
import TestCardList from "components/TestCardList";


const Container = styled.main`
width: 100vw;
height: 100vh;
padding: 20px;
`;


function Home() {
    return (
      <Container>
          <div>
            <h1>Start your journey here:</h1>
            <TestCardList />
          </div>
      </Container>
  );
}


export default Home;
