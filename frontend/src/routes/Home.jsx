import React, {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import PreviewCardsListing from "../components/PreviewCardsListing";
import { getAllListings, getMyListings } from "api";
import { useQuery } from "react-query";
import LoadingCardsListing from "components/LoadingCardsListing";

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
  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const { isLoading: allListingsIsLoading, data: allListings } = useQuery(
    ["listings", "allListings"],
    getAllListings
  );

  const { isLoading: myListingsIsLoading, data: myListings } = useQuery(
    ["listings", "myListings"],
    () => getMyListings(localStorage.uid),
    {
      enabled: userinfo.accountType === "hotel",
    }
  );

    const state = useLocation();

  return (
    <Container>
      {userinfo.accountType === "hotel" && ( //Render if hotel owner
        <>
          <Mylisting>
            My listings:
            <Link to="/room/add">
              <Addbutton id="add-btn" >Add +</Addbutton>
            </Link>
          </Mylisting>
          {myListingsIsLoading ? (
            <LoadingCardsListing numCard={1} />
          ) : (
            <PreviewCardsListing listings={myListings} />
          )}
        </>
      )}

      <Welcome>Welcome, {userinfo.firstName}!</Welcome>
      <Start>Start your journey here:</Start>

      {allListingsIsLoading ? (
        <LoadingCardsListing numCard={20} />
      ) : (
        <PreviewCardsListing listings={allListings} />
      )}

        <input type="hidden" id="home-response-code" value={state.state}/>
    </Container>
  );
}

export default Home;
