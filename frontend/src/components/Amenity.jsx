import React from "react";
import styled from "styled-components";

import { ReactComponent as SinkIcon } from "../icons/sink.svg";
import { ReactComponent as MicrowaveIcon } from "../icons/microwave.svg";

const Container = styled.div`
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

function Amenity({ item }) {
  return (
    <Container>
      {item === "freeWifi" && (
        <>
          <SinkIcon />
          <span>Free Wifi</span>
        </>
      )}
      {item === "pool" && (
        <>
          <SinkIcon />
          <span>Pool</span>
        </>
      )}
      {item === "tv" && (
        <>
          <SinkIcon />
          <span>TV</span>
        </>
      )}
      {item === "freeWasherInUnit" && (
        <>
          <SinkIcon />
          <span>Free Washer - In Unit</span>
        </>
      )}
      {item === "freeDryerInUnit" && (
        <>
          <SinkIcon />
          <span>Free Dryer - In Unit</span>
        </>
      )}
      {item === "freeParking" && (
        <>
          <SinkIcon />
          <span>Free Parking</span>
        </>
      )}
      {item === "airConditioning" && (
        <>
          <SinkIcon />
          <span>Air Conditioning</span>
        </>
      )}
      {item === "freeBreakfast" && (
        <>
          <SinkIcon />
          <span>Free Breakfast</span>
        </>
      )}
      {item === "freeLunch" && (
        <>
          <SinkIcon />
          <span>Free Lunch</span>
        </>
      )}
      {item === "freeDinner" && (
        <>
          <SinkIcon />
          <span>Free Dinner</span>
        </>
      )}
      {item === "microwave" && (
        <>
          <MicrowaveIcon />
          <span>Microwave</span>
        </>
      )}
      {item === "refrigerator" && (
        <>
          <SinkIcon />
          <span>Refrigerator</span>
        </>
      )}
      {item === "petFriendly" && (
        <>
          <SinkIcon />
          <span>Pet Friendly</span>
        </>
      )}
      {item === "spa" && (
        <>
          <SinkIcon />
          <span>Spa</span>
        </>
      )}
    </Container>
  );
}

export default Amenity;
