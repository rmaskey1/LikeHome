import { SERVER_URL } from "api";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 70%;
  margin-top: 36px;
  height: 100vh;
  padding: 20px;
`;

const ListingTitle = styled.div`
  font-size: 35px;
  font-weight: 700;
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-size: 26px;
  font-weight: 500;
`;

const SubTitle = styled.div`
  margin-top: 17px;
  font-size: 22px;
  font-weight: 300;
`;

const Input = styled.input`
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 50px;
  color: black;
  font-size: 18px;
  font-weight: 450;
`;

const SubmitButton = styled.button`
  margin-top: 50px;
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
  justify-content: center;
  margin-top: 20px;
`;

const LeftBox = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center; /* Center vertically */
  margin-bottom: 20px; /* Add some spacing from the form */
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 19px;
  font-weight: 500;
`;

const ErrorText = styled.div`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

function AccountMod() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const validateLettersWithSpaces = (value) => {
    if (/^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
      return true;
    }
    return "Only letters and spaces are allowed";
  };

  const isLetter = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const onSubmit = async (formData) => {
    console.log(formData);

    /* FOR HOTEL USER */
    if (userinfo.accountType === "hotel") {
      const response = await fetch(
        `${SERVER_URL}/hotel?uid=${localStorage.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Data
      const data = await response.json();
      console.log(response.status, data);

      // 200
      if (response.ok) {
        localStorage.userinfo = JSON.stringify(data);
        alert("Updated");
      } else {
        console.log("Fail");
      }
    } else {
      /* FOR GUEST, ADMIN */

      // Request
      const response = await fetch(
        `${SERVER_URL}/user?uid=${localStorage.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Data
      const userResult = await response.json();
      console.log(response.status, userResult);

      // 200
      if (response.ok) {
        localStorage.userinfo = JSON.stringify(userResult);
        navigate(location.pathname.replace("/modify", ""));
      } else {
        console.log("Fail");
      }
    }
  };

  return (
    <>
      <LeftBox>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </LeftBox>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListingTitle>Update Profile</ListingTitle>

          {userinfo.accountType === "hotel" && ( //renders only if the account is a hotel owner
            <div>
              <SectionTitle>Hotel Details</SectionTitle>
              <SubTitle>Hotel Name</SubTitle>
              <Input
                {...register("hotelName", {
                  required: "Hotel Name is required",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Hotel Name cannot be just spaces";
                    }
                    return true;
                  },
                })}
                type="text"
                defaultValue={userinfo.hotelName}
              />
              {errors.hotelName && (
                <ErrorText className="error-text">
                  <span>{errors.hotelName.message.toString()}</span>
                </ErrorText>
              )}

              <SubTitle>Street Name</SubTitle>
              <Input
                {...register("street", {
                  required: "Street Name is required",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Street Name cannot be just spaces";
                    }
                    return true;
                  },
                })}
                type="text"
                defaultValue={userinfo.street}
              />
              {errors.street && (
                <ErrorText className="error-text">
                  <span>{errors.street.message.toString()}</span>
                </ErrorText>
              )}

              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <SubTitle>City</SubTitle>
                  <Input
                    {...register("city", {
                      required: "City is required",
                      validate: validateLettersWithSpaces,
                    })}
                    type="text"
                    defaultValue={userinfo.city}
                  />
                  {errors.city && (
                    <ErrorText className="error-text">
                      <span>{errors.city.message.toString()}</span>
                    </ErrorText>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <SubTitle>Zip Code</SubTitle>
                  <Input
                    {...register("zipcode", {
                      valueAsNumber: true,
                      required: "Zip Code is required",
                    })}
                    type="number"
                    defaultValue={userinfo.zipcode}
                  />
                  {errors.zipcode && (
                    <ErrorText className="error-text">
                      <span>{errors.zipcode.message.toString()}</span>
                    </ErrorText>
                  )}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <SubTitle>State</SubTitle>
                  <Input
                    {...register("state", {
                      required: "State is required",
                      validate: {
                        validName: (value) => {
                          if (!isLetter(value)) {
                            return "Only letters are allowed";
                          }
                          return true;
                        },
                      },
                    })}
                    type="text"
                    defaultValue={userinfo.state}
                  />
                  {errors.state && (
                    <ErrorText className="error-text">
                      <span>{errors.state.message.toString()}</span>
                    </ErrorText>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <SubTitle>Country</SubTitle>
                  <Input
                    {...register("country", {
                      required: "Country is required",
                      validate: {
                        validName: (value) => {
                          if (!isLetter(value)) {
                            return "Only letters are allowed";
                          }
                          return true;
                        },
                      },
                    })}
                    type="text"
                    defaultValue={userinfo.country}
                  />
                  {errors.country && (
                    <ErrorText className="error-text">
                      <span>{errors.country.message.toString()}</span>
                    </ErrorText>
                  )}
                </div>
              </div>
            </div>
          )}

          <br />

          <SectionTitle>Profile Details</SectionTitle>

          <SubTitle>Email</SubTitle>
          <Input defaultValue={userinfo.email} readOnly />

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <SubTitle>First Name</SubTitle>
              <Input
                {...register("firstName", {
                  required: "First Name is required",
                  validate: {
                    validName: (value) => {
                      if (!isLetter(value)) {
                        return "Only letters are allowed";
                      }
                      return true;
                    },
                  },
                })}
                type="text"
                defaultValue={userinfo.firstName}
              />
              {errors.firstName && (
                <ErrorText>{errors.firstName.message.toString()}</ErrorText>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <SubTitle>Last Name</SubTitle>
              <Input
                {...register("lastName", {
                  required: "Last Name is required",
                  validate: {
                    validName: (value) => {
                      if (!isLetter(value)) {
                        return "Only letters are allowed";
                      }
                      return true;
                    },
                  },
                })}
                type="text"
                defaultValue={userinfo.lastName}
              />
              {errors.lastName && (
                <ErrorText>{errors.lastName.message.toString()}</ErrorText>
              )}
            </div>
          </div>

          <SubTitle>Password</SubTitle>
          <Input {...register("password", {})} type="password" />

          <SubTitle>Phone Number</SubTitle>
          <Input
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            defaultValue={userinfo.phone}
          />
          {errors.phoneNumber && (
            <ErrorText>{errors.phoneNumber.message.toString()}</ErrorText>
          )}

          <CenteredButtonContainer>
            <SubmitButton type="submit">Update</SubmitButton>
          </CenteredButtonContainer>
        </form>
      </Container>
    </>
  );
}

export default AccountMod;
