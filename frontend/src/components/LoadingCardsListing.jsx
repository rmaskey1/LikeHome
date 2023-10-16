import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const StyledCardsListing = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 50px;
  gap: 25px;
`;
const Card = styled.div``;
const Image = styled.div`
  position: relative;
  border: none;
  border-radius: 10px;
  width: 300px;
  height: 270px;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 15px;
  background-color: #d5d5d56c;
  border-radius: 5px;
`;

const Stick = styled.div`
  background-color: #d5d5d56c;
  height: 16px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

function LoadingCardsListing({ numCard }) {
  const array = [];
  for (let i = 0; i < numCard; i++) {
    array.push(i);
  }
  return (
    <Container>
      <StyledCardsListing>
        {array.map((item, i) => (
          <Card key={i}>
            <Image />
            <Stick style={{ width: "200px" }} />
            <Stick style={{ width: "100px" }} />
            <Stick style={{ width: "80px" }} />
            <Stick style={{ width: "60px" }} />
          </Card>
        ))}
      </StyledCardsListing>
    </Container>
  );
}

export default LoadingCardsListing;
