import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  flex-direction: column;
  place-content: center;
  text-align: center;
  width: 100vw;
  height: 80vh;
  color: rgba(41, 53, 69, 1);
`;

const ErrorTitle = styled.div`
  font-size: 25em;
  font-weight: 700;
  color: #e0e0e0;
  text-transform: uppercase;
`;

const ErrorText = styled.div`
  font-size: 4em;
  font-weight: 700;
  color: #e0e0e0;
`;

const GoBackBtn = styled.button`
  width: 500px;
  height: 36px;
  margin: 20px auto;
  background-color: transparent;
  color: #a4a4a4;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #a4a4a4;
  }
`;

function NotFound() {
  const navigate = useNavigate();
  const goback = () => {
    navigate(-1);
  };
  return (
    <Container>
      <ErrorTitle>404</ErrorTitle>
      <ErrorText>This page is not avaiable</ErrorText>
      <GoBackBtn onClick={goback}>Go Back</GoBackBtn>
    </Container>
  );
}

export default NotFound;
