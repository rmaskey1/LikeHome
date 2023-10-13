import React from "react";
import PreviewCard from "./PreviewCard";
import styled from "styled-components";

const StyledCardsListing = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px 50px;
  gap: 25px;
`;

function PreviewCardsListing() {
  // example previewCards
  const previewCards = [
    {
      id: 1,
      location: "Santa Cruz, California",
      rating: 4.81,
      description: "Ocean views",
      startDate: "2023-10-22",
      endDate: "2023-11-27",
      price: 1325,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
      ],
    },
    {
      id: 2,
      location: "Half Moon Bay, California",
      rating: 4.98,
      description: "Beach and ocean views",
      startDate: "2023-10-29",
      endDate: "2023-11-3",
      price: 354,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
      ],
    },
    {
      id: 3,
      location: "Los Gatos, California",
      rating: 4.93,
      description: "Mountain and ocean views",
      startDate: "2023-10-22",
      endDate: "2023-10-27",
      price: 231,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
      ],
    },
    {
      id: 4,
      location: "Half Moon Bay, California",
      rating: 4.98,
      description: "Beach and ocean views",
      startDate: "2023-10-29",
      endDate: "2023-11-3",
      price: 354,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
      ],
    },
    {
      id: 5,
      location: "Half Moon Bay, California",
      rating: 4.98,
      description: "Beach and ocean views",
      startDate: "2023-10-29",
      endDate: "2023-11-3",
      price: 354,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
      ],
    },
    {
      id: 6,
      location: "Half Moon Bay, California",
      rating: 4.98,
      description: "Beach and ocean views",
      startDate: "2023-10-29",
      endDate: "2023-11-3",
      price: 354,
      imageUrls: [
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
        "https://hips.hearstapps.com/hmg-prod/images/saint-james-paris-worlds-most-beautiful-hotels-veranda-1665421945.jpeg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
        "https://static.independent.co.uk/2023/03/24/09/Best%20New%20York%20boutique%20hotels.jpg?width=1200",
      ],
    },
  ];

  const handleCardClick = (cardID) => {
    console.log(`card ${cardID} clicked`);
  };

  return (
    <div>
      {/* <h1
        style={{
          padding: "10px 50px",
          fontWeight: "bold",
          fontSize: "26px",
          marginTop: "20px",
          color: "#293545",
        }}
      >
        Start your journey here.
      </h1> */}
      <StyledCardsListing>
        {previewCards.map((previewCard) => (
          <PreviewCard
            key={previewCard.id}
            previewCard={previewCard}
            onClick={() => handleCardClick(previewCard.id)}
          />
        ))}
      </StyledCardsListing>
    </div>
  );
}

export default PreviewCardsListing;
