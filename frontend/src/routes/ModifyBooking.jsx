import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";

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

function ModifyBooking() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    getValues,
  } = useForm();

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  const existingData = {
    fromDate: "12/13/2024",
    toDate: "01/14/2025",
    guests: 3,
  };

  //INTEGRATIONS!! replace with availability check logic??
  const checkAvailability = (fromDate, toDate) => {
    return false; //made it false so I can check if it works LOL
  };

  const onSubmit = (data) => {
    //handle form submission here

    const datesAvailable = checkAvailability(data.fromDate, data.toDate);

    if (!datesAvailable) {
      setError("datesAvailable", {
        type: "manual",
        message: "The listing is not available on the dates you've selected.",
      });
      return;
    }

    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListingTitle>Modify Booking:</ListingTitle>
        <br />
        <SectionTitle>Dates: </SectionTitle>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
            <SubTitle>From:</SubTitle>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <Input
                  {...register("fromDate", {
                    required: "Date is required",
                    validate: {
                      validDate: (value) => {
                        if (!value) return "Date is required";

                        //check if the date is in the "mm/dd/yyyy" format
                        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                          return "Invalid date format (mm/dd/yyyy)";
                        }
                        if (!isDateValid(value)) return "Invalid date";
                        // Check if it's in the future
                        //if (new Date(value) <= new Date())
                        //  return "Date must be in the future";
                        return true;
                      },
                    },
                  })}
                  type="text"
                  placeholder="mm/dd/yyyy"
                  style={{ color: "black" }}
                  defaultValue={existingData.fromDate}
                />
                {errors.fromDate && (
                  <ErrorMessage className="error-text">
                    <span>{errors.fromDate.message.toString()}</span>
                  </ErrorMessage>
                )}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <SubTitle>To:</SubTitle>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
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
                  defaultValue={existingData.toDate}
                />
                {errors.toDate && (
                  <ErrorMessage className="error-text">
                    <span>{errors.toDate.message.toString()}</span>
                  </ErrorMessage>
                )}
              </div>
            </div>
          </div>
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
          defaultValue={existingData.guests}
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
          <SubmitButton type="submit">Update</SubmitButton>
        </CenteredButtonContainer>
      </form>
    </Container>
  );
}

export default ModifyBooking;
