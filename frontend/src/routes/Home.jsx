import {Link, useLocation} from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PreviewCardsListing from "../components/PreviewCardsListing";
import { getAllListings, getMyListings } from "api";
import { useQuery } from "react-query";
import LoadingCardsListing from "components/LoadingCardsListing";
import SearchBar from "../components/SearchBar";
import FilterForm from "../components/FilterForm";
import filterIcon from "../icons/filter.svg";
import { SERVER_URL } from "api";

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

const FilterButton = styled.button`
  display: flex;
  padding: 10px 20px;
  border-radius: 20px;
  color: black;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  border: 1px solid black;

  &:hover {
    background-color: #f0f0f0;
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
  // const [displayListings, setDisplayListings] = useState(allListings);

  /* Search Function Section Start */
  const [searchedListings, setSearchedListings] = useState([]);
  // const [searchCriteria, setSearchCriteria] = useState({
  //   location: "",
  //   guests: 1,
  //   dateFrom: "",
  //   dateTo: "",
  // });

  const handleSearch = (formData) => {
    console.log("Searching");
    // e.preventDefault();
    const searchedListings = allListings.filter((listing) => {
      const { location, guests, dateFrom, dateTo } = formData;
      const dateStart = dateFrom ? new Date(dateFrom) : null;
      const dateEnd = dateTo ? new Date(dateTo) : null;
      const { city, state, startDate, endDate, numberGuests } = listing;

      const isLocationMatch =
        !location ||
        `${city}, ${state}`.toLowerCase().includes(location.toLowerCase());

      const isGuestMatch = numberGuests >= guests;

      const isDateMatch =
        !dateStart ||
        !dateEnd || // No date range specified, or
        (dateStart >= new Date(startDate) && dateEnd <= new Date(endDate));

      return isLocationMatch && isDateMatch && isGuestMatch;
    });
    setSearchedListings(searchedListings);
    // setSearchCriteria({
    //   location: "",
    //   guests: 1,
    //   dateFrom: "",
    //   dateTo: "",
    // });
  };

  useEffect(() => {}, [searchedListings]);

  /* Search Function Section End */

  // useEffect(() => {
  //   handleSearch();
  // }, [searchCriteria]);

  /* Filter Function Section Start */
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [filteredListings, setFilteredListings] = useState([]);

  const handleFilterClick = () => {
    setShowFilterForm(true);
  };

  const handleCancelFilter = () => {
    setShowFilterForm(false);
  };

  const handleFilter = async (formData) => {
    console.log("Filtering");
    console.log(formData);
    // try {
    //   const response = await fetch(`${SERVER_URL}/endpointOfFilter`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setSearchedListings(data);
    //     // Update filteredListings
    //   } else {
    //     // Handle errors
    //     console.log(response.status, data);
    //   }
    // } catch (error) {
    //   console.error("Filter request failed:", error);
    // }
  };

  /* Filter Function Section Start */

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
      <Welcome id="welcome-message">Welcome, {userinfo.firstName}!</Welcome>
      <Start>Start your journey here:</Start>
      {allListingsIsLoading ? null : (
        <SearchBar
          // searchCriteria={searchCriteria}
          // setSearchCriteria={setSearchCriteria}
          handleSearch={handleSearch}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "250px",
          paddingBottom: "20px",
        }}
      >
        <Start>Available Rooms:</Start>
        <FilterButton onClick={handleFilterClick}>
          <div style={{ display: "flex" }}>
            <img src={filterIcon} alt="" />
            Filters
          </div>
        </FilterButton>
        {showFilterForm && (
          <FilterForm onClose={handleCancelFilter} onFilter={handleFilter} />
        )}
      </div>

      {allListingsIsLoading ? (
        <LoadingCardsListing numCard={20} />
      ) : (
        <PreviewCardsListing
          listings={
            searchedListings.length > 0 ? searchedListings : allListings
          }
        />
      )}

        <input type="hidden" id="home-response-code" value={state.state}/>
    </Container>
  );
}

export default Home;
