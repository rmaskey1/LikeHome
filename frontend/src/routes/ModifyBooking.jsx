import { SERVER_URL, getUserInfo } from "api";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";
import { useQuery } from "react-query";

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
  margin-top: 10px;
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 50px;
  color: #888888;
  font-size: 18px;
  font-weight: 450;
`;

const ErrorMessage = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 500px;
  height: 60px;
  padding: 15px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff457b;
  }
`;

const CenteredButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const LeftBox = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  display: flex;
  justify-content: flex-start; //align items to the left
  align-items: center; //center vertically
  margin-bottom: 20px; //add spacing form form
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

function ModifyBooking() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  //const rid = useParams().id;
  //const roominfo = location.state;
  const [isFetching, setIsFetching] = useState(false);
  const { roomData, bookingData, numGuests } = location.state;
  const rid = useParams().id;
  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const { isLoading: isUserInfoLoading, data: userInfo } = useQuery(
    ["userinfo"],
    getUserInfo
  );

  const roomStart = roomData.startDate;
  const roomEnd = roomData.endDate;
  const maxRoomGuests = roomData.numberGuests;

  console.log("roomStart", roomStart);
  console.log("roomEnd", roomEnd);
  console.log("maxRoomGuests", maxRoomGuests);
  console.log("rid", roomData.rid);
  console.log("gid", bookingData.gid);
  console.log("guests", bookingData.numGuest);

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  //INTEGRATIONS!! replace with availability check logic??
  const checkAvailability = (formFromDate, formToDate) => {
    return false; //made it false so I can check if it works LOL
  };

  const onSubmit = async (formData) => {
    const { guests } = formData;

    //check if the number of guests exceeds the maximum allowed
    if (guests > maxRoomGuests) {
      setError("guests", {
        type: "manual",
        message: "The number exceeds the maximum amount of guests allowed.",
      });
      return;
    }

    const datesAvailable = checkAvailability(formData.toDate);

    if (!datesAvailable) {
      setError("datesAvailable", {
        type: "manual",
        message: "The listing is not available on the dates you've selected.",
      });
      return;
    }

    setIsFetching(true);
    console.log(formData);
    const response = await fetch(`${SERVER_URL}/bookings/${roomData.rid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(response.status, data);

    if (response.ok) {
      navigate("/mybooking");
    }
    //setIsFetching(false);
  };

  return (
    <>
      <LeftBox>
        <Button onClick={() => navigate(-1)} id="back-btn">
          Back
        </Button>
      </LeftBox>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListingTitle>Modify Booking:</ListingTitle>
          <br />
          <SectionTitle>Check-out Date: </SectionTitle>
          <div style={{ display: "flex" }}>
            <Input
              {...register("toDate", {
                required: "Date is required",
                validate: {
                  validDate: (value) => {
                    if (!value) return "Date is required";

                    //check if the date is in the "mm/dd/yyyy" format
                    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                      return "Invalid date format (mm/dd/yyyy)";
                    }
                    // Check if it's a valid date
                    if (!isDateValid(value)) return "Invalid date";
                    // Check if it's in the future
                    if (new Date(value) <= new Date())
                      return "Date must be in the future";
                    // Check if it's after fromDate
                    if (new Date(value) <= new Date(getValues("fromDate")))
                      return "Date must be after From Date";
                    return true;
                  },
                },
              })}
              type="text"
              placeholder="mm/dd/yyyy"
              style={{ color: "black" }}
              defaultValue={new Date(roomData.endDate).toLocaleDateString(
                "en-US",
                { year: "numeric", month: "2-digit", day: "2-digit" }
              )}
            />
            {errors.toDate && (
              <ErrorMessage className="error-text">
                <span>{errors.toDate.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>

          <br />

          <SectionTitle>Number of Guests:</SectionTitle>
          <Input
            {...register("guests", {
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Number of Guests must be greater than 0",
              },
              required: "Number of Guests is required",
            })}
            type="number"
            style={{ color: "black" }}
            defaultValue={bookingData.numGuests}
          />
          {errors.guests && (
            <ErrorMessage className="error-text">
              <span>{errors.guests.message.toString()}</span>
            </ErrorMessage>
          )}

          <br />
          <br />

          <CenteredButtonContainer>
            {errors.datesAvailable && (
              <ErrorMessage className="error-text">
                <span>{errors.datesAvailable.message.toString()}</span>
              </ErrorMessage>
            )}
            <SubmitButton type="submit">
              {isFetching ? <Ellipsis color="white" size={30} /> : "Update"}
            </SubmitButton>
          </CenteredButtonContainer>
        </form>
      </Container>
    </>
  );
}

export default ModifyBooking;
