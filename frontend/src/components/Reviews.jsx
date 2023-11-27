import { SERVER_URL, getReviews } from "api";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../atom";

const Container = styled.div`
  display: flex;
  gap: 74px;
  margin-bottom: 50px;
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
  position: relative;
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
const NoReview = styled.div`
  display: grid;
  place-content: center;
  width: 422px;
  height: 206px;
  border-radius: 20px;
  background: rgba(243, 243, 243, 1);
  font-size: 20px;
  font-weight: 400;
`;
const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 20px;
  transition: none;
  cursor: pointer;

  &:hover {
    color: #616161;
  }

  svg {
    transition: none;
  }
`;

function Reviews({ isBookedByMe }) {
  const params = useParams();
  const navigate = useNavigate();

  const rid = params.id;
  const { isLoading, data } = useQuery(["reviews"], () => getReviews(rid));

  const [sum, setSum] = useState(0);
  const [average, setAverage] = useState(0);
  const [noReview, setNoReview] = useState(false);
  const setIsLogin = useSetRecoilState(isLoginAtom);

  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");
  const deleteReview = async () => {
    fetch(`${SERVER_URL}/review/${rid}`, { method: "DELETE" });
    navigate(0);
  };

  useEffect(() => {
    if (!isLoading) {
      if (data.message) {
        return;
      }
      setSum(data.reduce((acc, obj) => acc + obj.rating, 0));
      setAverage(data && Math.round((sum / data.length) * 10) / 10);
      setNoReview(data.length === 0);
    }
  }, [data, isLoading, navigate, setIsLogin, sum]);

  return (
    !isLoading && (
      <Container>
        <Left>
          <RatingBox>
            <OverallRating>{noReview ? "N/A" : `${average}/5`}</OverallRating>
            <span>Overall Rating</span>
          </RatingBox>
          {isBookedByMe && (
            <WriteBtn onClick={() => navigate("review")}>
              Write a Review
            </WriteBtn>
          )}
        </Left>
        {noReview ? (
          <NoReview>No reviews at the moment</NoReview>
        ) : (
          <Right>
            {data.map(
              ({ title, gid, name, text, rating, lastModifiedTime, id }) => (
                <Review key={id}>
                  <Title>{title}</Title>
                  <Rating>Rating: {rating}/5</Rating>
                  <Description>{text}</Description>
                  <Info>
                    By {name}, {formatDate(lastModifiedTime)}
                  </Info>
                  {gid === localStorage.uid && (
                    <DeleteIcon onClick={deleteReview}>
                      <TrashIcon width={20} />
                    </DeleteIcon>
                  )}
                </Review>
              )
            )}
          </Right>
        )}
      </Container>
    )
  );
}

export default Reviews;
