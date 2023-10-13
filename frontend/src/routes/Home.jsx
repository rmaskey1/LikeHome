import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  padding: 10px 32px;
  border-radius: 10px;
`;

const ButtonLink = styled.a`
  text-decoration: none; 
  color: inherit; 
  display: block;
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
        <div>
          <Mylisting>
            My listings:
            <Addbutton>
              <ButtonLink href = "/room/add">
                <button type="button">Add +</button>
              </ButtonLink>
            </Addbutton>
          </Mylisting>
        </div>
        <PreviewCardsListing />
      </>
    )}

    <Welcome>Welcome, Bob!</Welcome>
    <Start>Start your journey here:</Start>

    <PreviewCardsListing />

  </Container>);
}

export default Home;
