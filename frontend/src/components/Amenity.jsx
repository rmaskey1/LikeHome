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
          <span className="amenities-descr">Free Wifi</span>
        </>
      )}
      {item === "pool" && (
        <>
          <PoolIcon />
          <span className="amenities-descr">Pool</span>
        </>
      )}
      {item === "tv" && (
        <>
          <TvIcon />
          <span className="amenities-descr">TV</span>
        </>
      )}
      {item === "freewasherinunit" && (
        <>
          <LaundryIcon />
          <span className="amenities-descr">Free Washer - In Unit</span>
        </>
      )}
      {item === "freedryerinunit" && (
        <>
          <LaundryIcon />
          <span className="amenities-descr">Free Dryer - In Unit</span>
        </>
      )}
      {item === "freeparking" && (
        <>
          <ParkingIcon />
          <span className="amenities-descr">Free Parking</span>
        </>
      )}
      {item === "airconditioning" && (
        <>
          <AirConIcon />
          <span className="amenities-descr">Air Conditioning</span>
        </>
      )}
      {item === "freebreakfast" && (
        <>
          <FoodIcon />
          <span className="amenities-descr">Free Breakfast</span>
        </>
      )}
      {item === "freelunch" && (
        <>
          <FoodIcon />
          <span className="amenities-descr">Free Lunch</span>
        </>
      )}
      {item === "freedinner" && (
        <>
          <FoodIcon />
          <span className="amenities-descr">Free Dinner</span>
        </>
      )}
      {item === "microwave" && (
        <>
          <MicrowaveIcon />
          <span className="amenities-descr">Microwave</span>
        </>
      )}
      {item === "refrigerator" && (
        <>
          <FridgeIcon />
          <span className="amenities-descr">Refrigerator</span>
        </>
      )}
      {item === "petfriendly" && (
        <>
          <PetIcon />
          <span className="amenities-descr">Pet Friendly</span>
        </>
      )}
      {item === "spa" && (
        <>
          <SpaIcon />
          <span className="amenities-descr">Spa</span>
        </>
      )}
    </Container>
  );
}

export default Amenity;
