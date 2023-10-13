import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PreviewCardsListing from "../components/PreviewCardsListing";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

const Welcome = styled.div`
  color: #293545;
  font-size: 30px;
  font-weight: bold;
  margin-left: 50px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Start = styled.div`
  color: #293545;
  font-size: 20px;
  font-weight: bold;
  margin-left: 50px;
`;

const Mylisting = styled.div`
  color: #293545;
  font-size: 30px;
  font-weight: bold;
  margin-left: 50px;
  margin-bottom: 50px;
  margin-top: 50px;
`;

const Addbutton = styled.button`
  display: inline-block;
  color: #293545;
  font-size: 16px;
  font-weight: bold;
  margin-left: 1000px;
  background-color: #cf316a;
  color: white;
  padding: 10px 32px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgb(226, 99, 146);
  }
`;

function Home() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.accessToken === undefined) {
  //     navigate("welcome");
  //   }
  // }, [navigate]);

  const [isHotelOwner, setIsHotelOwner] = useState(false);

  //check if hotel owner
  useEffect(() => {
    const isHotelOwnerAccount = true;
    setIsHotelOwner(isHotelOwnerAccount);
  }, []);

  return (
    <Container>
      {isHotelOwner && ( //Render if hotel owner
        <>
          <Mylisting>
            My listings:
            <Link to="/room/add">
              <Addbutton>Add +</Addbutton>
            </Link>
          </Mylisting>
          <PreviewCardsListing />
        </>
      )}

      <Welcome>Welcome, Bob!</Welcome>
      <Start>Start your journey here:</Start>

      <PreviewCardsListing />
    </Container>
  );
}

export default Home;
