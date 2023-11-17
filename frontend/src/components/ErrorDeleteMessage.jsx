import React from "react";
import styled from "styled-components";

const StyledP = styled.p`
  font-family: Rubik, sans-serif;
  color: #293545;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 20px;
  padding: 0px 50px;
`;

const Button = styled.button`
  background-color: #cf316a;
  width: 126px;
  height: 31px;
  font-size: 16px;
  color: #ffffff;
  padding: 5px 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    border: 2px solid #cf316a;
    color: #cf316a;
    background-color: #ffffff;
  }
`;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Container = styled.div`
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 419px;
  height: 239px;
  padding: 20px;
`;

const ErrorDeleteMessage = ({ message, onClose }) => {
  return (
    <Dimmed>
      <Container>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StyledP style={{ fontSize: "20px", fontWeight: "700" }}>
              {message}
            </StyledP>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={onClose} id="confirm-button">
              Ok
            </Button>
            <div style={{ width: "30px" }}></div>
          </div>
        </div>
      </Container>
    </Dimmed>
  );
};

export default ErrorDeleteMessage;
