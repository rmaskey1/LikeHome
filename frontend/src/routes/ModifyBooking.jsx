import { SERVER_URL, getUserInfo, getMyBooking } from "api";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";
import { useQuery } from "react-query";
import { ConsoleLogEntry } from "selenium-webdriver/bidi/logEntries";

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

const getBookingData = async (bookingId) => {
  // Use Firestore API or your preferred method to fetch booking data
  // For example:
  const bookingDoc = await getMyBooking;
  const bookingData = bookingDoc;
  return bookingData;
};

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
  const rid = useParams().id;
  const roominfo = location.state;
  const [isFetching, setIsFetching] = useState(false);
  const { roomData, numGuests } = location.state;
  const [bookingDataInfo, setBookingDataInfo] = useState(null);
  const gid = localStorage.uid;
  const { state: stateData } = useLocation();
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

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  const checkAvailability = (formToDate, roomData) => {
    /*
    if (!formToDate || !bookingData) {
      return false;
    }
    */

    //converting form's toDate to a date
    const selectedEndDate = new Date(formToDate);
    const bookingStartDate = new Date(roomData.startDate);
    //console.log("Start Date", bookingStartDate);
    const bookingEndDate = new Date(roomData.endDate);

    //if selectedEndDate is before the bookingStartDate or after the bookingEndDate
    if (
      selectedEndDate < bookingStartDate ||
      selectedEndDate > bookingEndDate
    ) {
      return false;
    }
    // The listing is available on the selected date
    return true;
  };

  console.log("roomData", roomData);
  //console.log("roomEnd", roomData.endDate);
  //console.log("roomStart", roomData.startDate);

  const onSubmit = async (formData) => {
    const { guests } = formData;

    const datesAvailable = checkAvailability(formData.endDate, roomData);
    console.log("dates avail", datesAvailable);
    console.log("form end", formData.endDate);

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
      navigate("/mybooking", {
        state: { roomData, numGuests },
      });
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
          <Input
            {...register("endDate", {
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
                  if (new Date(value) <= new Date(roomData.checkinDate))
                    return "Date must be after Check-in Date";
                  //return true;
                },
              },
            })}
            type="text"
            placeholder="mm/dd/yyyy"
            style={{ color: "black" }}
            defaultValue={new Date(roomData.checkoutDate).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "2-digit", day: "2-digit" }
            )}
          />
          {errors.endDate && (
            <ErrorMessage className="error-text">
              <span>{errors.endDate.message.toString()}</span>
            </ErrorMessage>
          )}

          <br />

          <SectionTitle>Number of Guests:</SectionTitle>
          <Input
            {...register("guests", {
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Number of Guests must be greater than 0",
              },
              validate: {
                maxGuests: (value) => {
                  const parsedValue = parseInt(value, 10);
                  return (
                    parsedValue <= maxRoomGuests ||
                    `Exceeds the room maximum of ${maxRoomGuests} guests`
                  );
                },
              },
              required: "Number of Guests is required",
            })}
            type="number"
            style={{ color: "black" }}
            defaultValue={roomData.reserved_guests}
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