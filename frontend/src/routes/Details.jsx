import React from "react";
import styled from "styled-components";

import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as BedIcon } from "../icons/bed.svg";
import { ReactComponent as LaundryIcon } from "../icons/laundry.svg";
import { ReactComponent as SinkIcon } from "../icons/sink.svg";
import { ReactComponent as MicrowaveIcon } from "../icons/microwave.svg";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 36px;
  width: fit-content;
  height: 100vh;
  padding: 20px;
`;

const HotelName = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Location = styled.div`
  margin-top: 12px;
  font-size: 26px;
  font-weight: 400;
`;

const Summary = styled.div`
  margin-top: 7px;
  font-size: 20px;
`;

const Board = styled.div`
  display: flex;
  margin-top: 19px;
  gap: 32px;

  div {
    width: 385px;
    height: 310px;
    border: 1px solid #888888;
  }
  div img {
    width: 100%;
    height: 100%;
  }
`;

const Reserve = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 46px;
  width: 356px;
  border-radius: 15px;

  span {
    font-size: 30px;
    font-weight: 500;
  }
  button {
    width: 229px;
    height: 54px;
    border-radius: 20px;
    background-color: #cf316a;
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
  }
`;

const Divider = styled.div`
  width: 744px;
  height: 1px;
  background-color: #888888;
  margin: 30px 0;
`;

const Detail = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 33px;

  svg {
    width: 30px;
    height: 30px;
    stroke-width: 3px;
  }

  span {
    font-size: 24px;
    font-weight: 400;
  }
`;

function Details() {
  return (
    <Container>
      <HotelName>Hotel Room</HotelName>
      <Location>123 Street, San Jose, California</Location>
      <Summary>4 Guests - 2 Beds - 1 Bath</Summary>
      <Board>
        <div>
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-17826786/original/d40f0877-fa17-44fc-ba4f-71a9cf205ce2.jpeg?im_w=960"
            alt="example"
          />
        </div>
        <Reserve>
          <span>$100 per night</span>
          <button>Reserve</button>
        </Reserve>
      </Board>
      <Divider />
      <Detail>
        <h1>Room Details</h1>
        <DetailItem>
          <PersonIcon />
          <span>4 Guests</span>
        </DetailItem>
        <DetailItem>
          <BedIcon />
          <span>2 Beds / 2 Queen-sized Beds</span>
        </DetailItem>
        <DetailItem>
          <SinkIcon />
          <span>1 Bath</span>
        </DetailItem>
      </Detail>
      <Divider />
      <Detail>
        <h1>Ammenities</h1>
        <DetailItem>
          <LaundryIcon />
          <span>Free washer - In Unit</span>
        </DetailItem>
        <DetailItem>
          <LaundryIcon />
          <span>Free dryer - In Unit</span>
        </DetailItem>
        <DetailItem>
          <MicrowaveIcon />
          <span>Microwave</span>
        </DetailItem>
      </Detail>
    </Container>
  );
}

export default Details;
