import React from "react";
import styled from "styled-components";

import { ReactComponent as WifiIcon } from "../icons/wifi.svg";
import { ReactComponent as PoolIcon } from "../icons/pool.svg";
import { ReactComponent as TvIcon } from "../icons/tv.svg";
import { ReactComponent as LaundryIcon } from "../icons/laundry.svg";
import { ReactComponent as ParkingIcon } from "../icons/parking.svg";
import { ReactComponent as AirConIcon } from "../icons/aircon.svg";
import { ReactComponent as FoodIcon } from "../icons/food.svg";
import { ReactComponent as MicrowaveIcon } from "../icons/microwave.svg";
import { ReactComponent as FridgeIcon } from "../icons/fridge.svg";
import { ReactComponent as PetIcon } from "../icons/pet.svg";
import { ReactComponent as SpaIcon } from "../icons/spa.svg";

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
      {item === "freewifi" && (
        <>
          <WifiIcon />
          <span>Free Wifi</span>
        </>
      )}
      {item === "pool" && (
        <>
          <PoolIcon />
          <span>Pool</span>
        </>
      )}
      {item === "tv" && (
        <>
          <TvIcon />
          <span>TV</span>
        </>
      )}
      {item === "freewasherinunit" && (
        <>
          <LaundryIcon />
          <span>Free Washer - In Unit</span>
        </>
      )}
      {item === "freedryerinunit" && (
        <>
          <LaundryIcon />
          <span>Free Dryer - In Unit</span>
        </>
      )}
      {item === "freeparking" && (
        <>
          <ParkingIcon />
          <span>Free Parking</span>
        </>
      )}
      {item === "airconditioning" && (
        <>
          <AirConIcon />
          <span>Air Conditioning</span>
        </>
      )}
      {item === "freebreakfast" && (
        <>
          <FoodIcon />
          <span>Free Breakfast</span>
        </>
      )}
      {item === "freelunch" && (
        <>
          <FoodIcon />
          <span>Free Lunch</span>
        </>
      )}
      {item === "freedinner" && (
        <>
          <FoodIcon />
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
          <FridgeIcon />
          <span>Refrigerator</span>
        </>
      )}
      {item === "petfriendly" && (
        <>
          <PetIcon />
          <span>Pet Friendly</span>
        </>
      )}
      {item === "spa" && (
        <>
          <SpaIcon />
          <span>Spa</span>
        </>
      )}
    </Container>
  );
}

export default Amenity;
