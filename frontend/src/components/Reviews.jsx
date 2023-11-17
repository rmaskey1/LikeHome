import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 74px;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
const RatingBox = styled.div`
  display: grid;
  place-content: center;
  flex-direction: column;
  gap: 5px;
  width: 213px;
  height: 132px;
  font-size: 20px;
  font-weight: 400;
  border: 1px solid rgba(136, 136, 136, 1);
  border-radius: 20px;
`;
const OverallRating = styled.div`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
`;
const WriteBtn = styled.button`
  width: 206px;
  height: 44px;
  background: rgba(207, 49, 106, 1);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 20px;
  cursor: pointer;
`;
const Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(136, 136, 136, 1);
`;
const Title = styled.div`
  font-weight: 700;
`;
const Rating = styled.div``;
const Description = styled.div``;
const Info = styled.div``;

const temporaryReviews = [
  {
    title: "Best Stay!",
    rating: 5,
    description:
      "Loved the stay at this hotel! The staff and service was quick. The view from the room is amazing too! Would stay here again.",
    writer: "Susan",
    date: new Date("Dec 13, 2023"),
  },
  {
    title: "It was ok...",
    rating: 3,
    description:
      "The room was nice but felt that there can be more to it. The service was not bad.",
    writer: "John",
    date: new Date("Dec 15, 2023"),
  },
  {
    title: "Would book again",
    rating: 5,
    description:
      "The staff was very nice and offered an upgrade for us for free! Which we gladly took the offer. The breakfast was delicious as well.",
    writer: "Bob",
    date: new Date("Dec 23, 2023"),
  },
];

function Reviews() {
  const navigate = useNavigate();
  const formatDate = (date) => date.toLocaleDateString("en-US");
  return (
    <Container>
      <Left>
        <RatingBox>
          <OverallRating>4.5/5</OverallRating>
          <span>Overall Rating</span>
        </RatingBox>
        <WriteBtn onClick={() => navigate("review")}>Write a Review</WriteBtn>
      </Left>
      <Right>
        {temporaryReviews.map(
          ({ title, writer, description, date, rating }, i) => (
            <Review>
              <Title>{title}</Title>
              <Rating>Rating: {rating}/5</Rating>
              <Description>{description}</Description>
              <Info>
                By {writer}, {formatDate(date)}
              </Info>
            </Review>
          )
        )}
      </Right>
    </Container>
  );
}

export default Reviews;
