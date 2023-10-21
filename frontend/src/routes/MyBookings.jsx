import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";

import { ReactComponent as CalendarIcon } from "../icons/calendar.svg";
import { ReactComponent as MoonIcon } from "../icons/moon.svg";
import { ReactComponent as MoneyIcon } from "../icons/money.svg";

const Container = styled.main`
  display: center;
  margin: auto;
  width: 70%;
  margin-top: 36px;
  height: 100vh;
  padding: 20px;
`;

const ListingTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 500;
`;

const SubTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 300;
`;

function MyBookings() {
  return (
    <Container>
      <ListingTitle>MyBookings:</ListingTitle>
    </Container>
  );
}

export default MyBookings;
