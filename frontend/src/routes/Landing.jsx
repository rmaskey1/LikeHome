import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Element, animateScroll as scroll, scroller } from "react-scroll";
import HotelRoom from "../img/hotel-room.jpg";
import HotelBed from "../img/hotel-bed.jpeg";
import HotelMeal from "../img/hotel-dining.jpeg";
import Vacation from "../img/vacation.jpeg";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
`;

const WelcomeText = styled.div`
  position: absolute;
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const Subtext = styled.div`
    position: absolute;
    color: white;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
`;


const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookNow = styled(Link)`
    position: absolute;
    color: white;
    background-color: #CF316A;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 100px;
    border-radius: 20px;
    cursor: pointer;
`;

const WhiteBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  background-color: white;
`;

const BlueBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  background-color: #293545;
  justify-content: center;
  align-items: center;
`;

const LeftSide = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RightSide = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
`;

const LeftWhiteTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`;

const LeftWhiteText = styled.div`
  font-size: 20px;
  font-weight: normal;
  color: #fff;
  padding: 30px;
`;

const HotelBedImage = styled.img`
  width: 80%; 
  height: auto; 
`;

const HotelMealImage = styled.img`
  width: 85%; 
  height: auto; 
  margin-top: 200px;
  margin-left: 20px;
`;

const RightBlueTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #293545;
  margin-top: 200px;
`;

const RightBlueText = styled.div`
  font-size: 20px;
  font-weight: normal;
  color: #293545;
  padding: 30px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #293545;
  justify-content: space-between;
`;

const TeamName = styled.div`
  color: #fff;
  display:flex;
  margin-left: 50px;
  margin-top: 15px;
`;

const Email = styled.div`
  color: #fff;
  display:flex;
  text-align: right;
  margin-top: 15px;
  margin-right: 50px;
`;

const Dots = styled.img`
  width: 10%; 
  height: 10%; 
`;


function Landing() {
    return (
      <Container>
          <ImageContainer>
            <Image src={HotelRoom} alt="classy-room" />
            <WelcomeText>Welcome to LikeHome!</WelcomeText>
            <Subtext>Where Every Stay is An Insightful Journey</Subtext>
            <BookNow to="/login"> Book Now</BookNow>
          </ImageContainer>

          <WhiteBox>
              <LeftSide>
                <HotelMealImage src={HotelMeal} alt="hotel-meal" />
              </LeftSide>
              <RightSide>
                <RightBlueTitle>Hotel Amenities
                    <RightBlueText>Our listings include amenities such as free WiFi, free meal, 
                        free parking, and more.
                    </RightBlueText>
                </RightBlueTitle>
              </RightSide>
          </WhiteBox>


          <BlueBox>
              <LeftSide>
                <LeftWhiteTitle>Hotel Beds
                    <LeftWhiteText>Guaranteed to be clean and comfortable. Listings offer a variety of beds: King, Queen, Full, 
                          and Single that will fit your needs.
                    </LeftWhiteText>
                </LeftWhiteTitle>
              </LeftSide>
              <RightSide>
                <HotelBedImage src={HotelBed} alt="hotel bed"/>
              </RightSide>
          </BlueBox>

          <WhiteBox>
              <LeftSide>
                <HotelMealImage src={Vacation} alt="vacation-resort" />
              </LeftSide>
              <RightSide>
                <RightBlueTitle>Hotel Locations
                    <RightBlueText>We offer hotel reservations from worldwide, so you can easily find a place to 
                        stay during your visits.
                    </RightBlueText>
                </RightBlueTitle>
              </RightSide>
          </WhiteBox>

          <InfoBox>
              <TeamName>Team InnSight</TeamName>
              <Email>team-innsight@gmail.com</Email>
          </InfoBox>

      </Container>
    );
  }

export default Landing;
