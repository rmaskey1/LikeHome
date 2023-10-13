import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
  color: #888888;
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

function AddListing() {

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const [isHotelOwner, setIsHotelOwner] = useState(false);
  useEffect(() => {
    //INTEGRATIONS!! Check the account type if it is a hotel owner HERE!
    const isHotelOwnerAccount = true; //temporarily set to true for testing, fix later!
    setIsHotelOwner(isHotelOwnerAccount);
  }, []);

  const validateLettersWithSpaces = (value) => {
    if (/^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(value)) {
      return true;
    }
    return "Only letters and spaces are allowed";
  };

  const isLetter = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  //INTEGRATIONS!! somehow get the user's existing data :D
  const existingData = {
    //if account is hotel user, get their exsiting address:
    hotelName: "Sad Hotel",
    streetName: "1st Depression Ave",
    city: "San Jose",
    zipCode: 95122,
    state: "CA",
    country: "USA",

    //load exiting user data
    firstName: "SampleFirst",
    lastName: "SampleLast",
    email: "sampleemail@gmail.com",
    phoneNumber: +1234567809,
  };

  const onSubmit = (data) => {
    //INTEGRATIONS! Make error msgs for setting first and last names with numbers?

    //email is already taken
    //INTEGRATIONS! Please check through the email database and ensure that the email they
    //want to change is unique
    if (data.email === "taken@gmail.com") {
      setError("email", {
        type: "manual",
        message: "Email is already taken",
      });
    }

    //phone number is already taken
    //INTEGRATIONS! Please check through the phonenumber database and ensure that the number they
    //want to change is unique
    if (data.phoneNumber === "1234567890") {
      setError("phoneNumber", {
        type: "manual",
        message: "Phone number is already taken",
      });
    }

    console.log(data);
  };

  return (
    <>
      <LeftBox>
        <Button onClick={() => window.history.back()}>Back</Button>
      </LeftBox>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListingTitle>Update Profile</ListingTitle>

          {isHotelOwner && ( //renders only if the account is a hotel owner
            <div>
              <SectionTitle>Hotel Details</SectionTitle>
              <SubTitle>Hotel Name</SubTitle>
              <Input
                {...register("hotelName", {
                  required: "Hotel Name is required",
                  validate: validateLettersWithSpaces,
                })}
                type="text"
                style={{ color: "black" }}
                defaultValue={existingData.hotelName}
              />
              {errors.hotelName && (
                <ErrorText className="error-text">
                  <span>{errors.hotelName.message.toString()}</span>
                </ErrorText>
              )}

              <SubTitle>Street Name</SubTitle>
              <Input
                {...register("streetName", {
                  required: "Street Name is required",
                })}
                type="text"
                style={{ color: "black" }}
                defaultValue={existingData.streetName}
              />
              {errors.streetName && (
                <ErrorText className="error-text">
                  <span>{errors.streetName.message.toString()}</span>
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
                    style={{ color: "black" }}
                    defaultValue={existingData.city}
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
                    {...register("zipCode", {
                      valueAsNumber: true,
                      required: "Zip Code is required",
                    })}
                    type="number"
                    style={{ color: "black" }}
                    defaultValue={existingData.zipCode}
                  />
                  {errors.zipCode && (
                    <ErrorText className="error-text">
                      <span>{errors.zipCode.message.toString()}</span>
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
                    style={{ color: "black" }}
                    defaultValue={existingData.state}
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
                    style={{ color: "black" }}
                    defaultValue={existingData.country}
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
                style={{ color: "black" }}
                defaultValue={existingData.firstName}
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
                style={{ color: "black" }}
                defaultValue={existingData.lastName}
              />
              {errors.lastName && (
                <ErrorText>{errors.lastName.message.toString()}</ErrorText>
              )}
            </div>
          </div>

          <SubTitle>Email</SubTitle>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            type="text"
            style={{ color: "black" }}
            //onBlur={(e) => validateEmail(e.target.value)}
            defaultValue={existingData.email}
          />
          {errors.email && (
            <ErrorText>{errors.email.message.toString()}</ErrorText>
          )}

          <SubTitle>Password</SubTitle>
          <Input
            {...register("password", {})}
            type="password"
            style={{ color: "black" }}
          />

          <SubTitle>Phone Number</SubTitle>
          <Input
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            type="number"
            style={{ color: "black" }}
            defaultValue={existingData.phoneNumber}
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

export default AddListing;
