import React, { useState } from "react";
import styled from "styled-components";
import Rating from "../icons/rating.svg";
import Favorite from "../icons/favorite.svg";
import FavoriteFilled from "../icons/favorite-filled.svg";
import { useNavigate } from "react-router-dom";

const StyledP = styled.p`
  font-family: Rubik, sans-serif;
  color: #293545;
  font-weight: lighter;
  margin-top: 0px;
  margin-bottom: 5px;
`;

const StyledCard = styled.div`
  gap: none;
  padding: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ImgContainer = styled.div`
  position: relative;
  border: none;
  border-radius: 10px;
  width: 300px;
  height: auto;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 15px;
`;

const StyledImg = styled.img`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  height: 280px;
  object-fit: cover;
`;

const StyledCardDetails = styled.div`
  cursor: pointer;
  margin: 0px;
`;

const formatMonthAndDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SaveFavoriteIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const descArr = [
  "Ocean views",
  "Mountain views",
  "Beach and ocean views",
  "22 miles away",
  "Mountain and ocean views",
  "24 miles away",
];

function PreviewCard({ previewCard }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const { imageUrl, rid, startDate, endDate, price, city, state } = previewCard;

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  const handleCardClick = () => {
    console.log(`card ${rid} clicked`);
    navigate(`/room/${rid}`, { state: previewCard });
  };

  return (
    <StyledCard>
      <ImgContainer>
        <StyledImg src={imageUrl} alt={`Image ${rid}`} />
        {/* <SaveFavoriteIcon
          src={isFavorite ? FavoriteFilled : Favorite}
          alt="Favorite"
          onClick={toggleFavorite}
          style={{ cursor: "pointer" }}
        /> */}
      </ImgContainer>
      <StyledCardDetails className="previewCard-select" onClick={handleCardClick}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <StyledP style={{ fontWeight: "500" }}>{`${city}, ${state}`}</StyledP>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={Rating}
              style={{ width: "15px", height: "15px" }}
              alt="Rating"
            />
            <StyledP style={{ marginLeft: "3px" }}>
              {2 + Math.floor(Math.random() * 30) / 10}
            </StyledP>
          </div>
        </div>
        {/* <StyledP>{descArr[Math.floor(Math.random() * descArr.length)]}</StyledP> */}
        <StyledP>
          {formatMonthAndDate(startDate)} - {formatMonthAndDate(endDate)}
        </StyledP>
        <StyledP style={{ marginTop: "10px", fontWeight: "400" }}>
          <span style={{ fontWeight: "500" }}>${price}</span> night
        </StyledP>
      </StyledCardDetails>
    </StyledCard>
  );
}

export default PreviewCard;
