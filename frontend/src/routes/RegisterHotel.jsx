import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 100px auto;
  padding: 0 40px;
  border: 1px solid rgba(41, 53, 69, 0.5);
  border-radius: 20px;
`;

const FormTitle = styled.div`
  font-size: 35px;
  font-weight: 700;
  color: #293545;
  margin-top: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  transition: all 0.2s linear;
`;

const Label = styled.label`
  color: #293545;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  border: 1px solid rgba(41, 53, 69, 0.5);
  border-radius: 20px;
  height: 32px;
`;

const Input = styled.input`
  all: unset;
  color: #293545;
  font-size: 0.9rem;
  outline: none;
  transition: all 200ms linear;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  border-radius: 20px;

  &::placeholder {
    font-weight: 100;
    transition: all 0.2s linear;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const SubmitBtn = styled.button`
  width: 177px;
  height: 42px;
  margin: 0 auto;
  margin-top: 25px;
  margin-bottom: 30px;
  background: rgb(207, 49, 106);
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: 0.1s background-color;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  &:hover {
    background-color: rgb(226, 99, 146);
  }
`;

const ErrorMessageArea = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(207, 49, 106, 1);
  margin-left: 5px;
  margin-top: 2px;
`;

function RegisterHotel() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const uid = location.state.uid;
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSignupHotel = async (hotelData) => {
    // Request
    const response = await fetch(SERVER_URL + `/hotel_signup?uid=${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hotelData),
    });

    // Data
    const data = await response.json();
    console.log(response.status, data);

    /* If successfully signed up */
    if (response.ok) {
      console.log("User registered successfully");
      navigate("/login");
    } else {
      /* If sign up failed */
      console.log("Registration failed");
      setServerError(data.message);
    }

    setIsFetching(false);
    resetFields();
  };

  const resetFields = () => {
    resetField("username");
    resetField("password");
  };

  return (
    <Container>
      <FormTitle>Please fill in the information</FormTitle>
      <Form onSubmit={handleSubmit(handleSignupHotel)}>
        <Label>Hotel Name</Label>
        <InputContainer>
          <Input
            {...register("hotelName", {
              required: "Please enter hotel name",
            })}
          />
        </InputContainer>
        {errors.email && (
          <ErrorMessageArea>{errors.email.message.toString()}</ErrorMessageArea>
        )}

        <Label>Street</Label>
        <InputContainer>
          <Input
            {...register("street", {
              required: "Please enter street",
            })}
            type="street"
          />
        </InputContainer>
        {errors.street && (
          <ErrorMessageArea>
            {errors.street.message.toString()}
          </ErrorMessageArea>
        )}
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <div>
            <Label>City</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("city", {
                  required: "Please enter city",
                })}
              />
            </InputContainer>
            {errors.city && (
              <ErrorMessageArea>
                {errors.city.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
          <div>
            <Label>Zip code</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("zipcode", {
                  required: "Please enter zip code",
                })}
              />
            </InputContainer>
            {errors.zipcode && (
              <ErrorMessageArea>
                {errors.zipcode.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <div>
            <Label>State</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("state", {
                  required: "Please enter state",
                })}
              />
            </InputContainer>
            {errors.state && (
              <ErrorMessageArea>
                {errors.state.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
          <div>
            <Label>Country</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("country", {
                  required: "Please enter country",
                })}
              />
            </InputContainer>
            {errors.country && (
              <ErrorMessageArea>
                {errors.country.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
        </div>
        <SubmitBtn type="submit">
          {isFetching ? (
            <Ellipsis color="white" size={30} />
          ) : (
            <span>Sign Up</span>
          )}
        </SubmitBtn>
      </Form>
    </Container>
  );
}

export default RegisterHotel;
