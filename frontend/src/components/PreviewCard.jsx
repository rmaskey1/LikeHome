import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Rating from "../icons/rating.svg";
import Favorite from "../icons/favorite.svg";
import FavoriteFilled from "../icons/favorite-filled.svg";

const StyledP = styled.p`
  font-family: Rubik, sans-serif;
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
  max-width: 400px;
  height: auto;
`;

const StyledCardDetails = styled.div`
  cursor: pointer;
  margin: 0px;
`;

const formatMonthAndDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const includeYear = date.getFullYear() !== currentYear;

  if (includeYear) {
    options.year = "numeric";
  }
  return date.toLocaleDateString(undefined, options);
};

const SliderNavsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
`;

const SliderNav = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #c1bebe;
  margin: 0 5px;
  transition: transform 0.2s, width 0.2s, height 0.2s;
  cursor: pointer;

  &.active {
    width: 7px;
    height: 7px;
    background-color: #f8f9fa;
  }
`;

const SaveFavoriteIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

function PreviewCard({ previewCard, onClick }) {
  const {
    location,
    rating,
    description,
    startDate,
    endDate,
    price,
    imageUrls,
  } = previewCard;
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrl = imageUrls[currentIndex];

  useEffect(() => {
    // Automatically switch images at regular intervals
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, [imageUrls.length]);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <StyledCard>
      <ImgContainer>
        <StyledImg src={imageUrl} alt={`Image ${currentIndex + 1}`} />
        <SaveFavoriteIcon
          src={isFavorite ? FavoriteFilled : Favorite}
          alt="Favorite"
          onClick={toggleFavorite}
          style={{ cursor: "pointer" }}
        />
        <SliderNavsContainer>
          {imageUrls.map((_, index) => (
            <SliderNav
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => setCurrentIndex(index)}
            ></SliderNav>
          ))}
        </SliderNavsContainer>
      </ImgContainer>
      <StyledCardDetails onClick={onClick}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
          }}
        >
          <StyledP style={{ fontWeight: "bold" }}>{location}</StyledP>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={Rating}
              style={{ width: "15px", height: "15px" }}
              alt="Rating"
            />
            <StyledP style={{ marginLeft: "3px" }}>{rating}</StyledP>
          </div>
        </div>
        <StyledP>{description}</StyledP>
        <StyledP>
          {formatMonthAndDate(startDate)} - {formatMonthAndDate(endDate)}
        </StyledP>
        <StyledP style={{ fontWeight: "bold", marginTop: "10px" }}>
          ${price} night
        </StyledP>
      </StyledCardDetails>
    </StyledCard>
  );
}

export default PreviewCard;
