import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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

const NoAccount = styled.span`
  margin-top: 0px;
  font-size: 16px;
  font-weight: 400;
  color: #293545;
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

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  color: #293545;

  span {
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
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

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const [isFetching, setIsFetching] = useState(false);

  const handleSignup = async (signupData) => {
    /* HOTEL Sign up */
    if (signupData.usertype === "hotel") {
      navigate("hotel", {
        state: signupData,
      });
    } else {
      /* GUEST, ADMIN Sign up */
      setIsFetching(true);

      fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsFetching(false);
          resetFields();
        });
    }
  };

  const resetFields = () => {
    resetField("username");
    resetField("password");
  };

  return (
    <Container>
      <FormTitle>Sign Up</FormTitle>
      <NoAccount>
        <span>Already have an account? </span>
        <Link to={"/login"}>
          <u>Login</u>
        </Link>
      </NoAccount>
      <Form onSubmit={handleSubmit(handleSignup)}>
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <div>
            <Label>First Name</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("firstName", {
                  required: "Please enter first name",
                })}
              />
            </InputContainer>
            {errors.firstName && (
              <ErrorMessageArea>
                {errors.firstName.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
          <div>
            <Label>Last Name</Label>
            <InputContainer style={{ width: "160px" }}>
              <Input
                {...register("lastName", {
                  required: "Please enter last name",
                })}
              />
            </InputContainer>
            {errors.lastName && (
              <ErrorMessageArea>
                {errors.lastName.message.toString()}
              </ErrorMessageArea>
            )}
          </div>
        </div>

        <Label>Email</Label>
        <InputContainer>
          <Input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter valid email",
              },
            })}
          />
        </InputContainer>
        {errors.email && (
          <ErrorMessageArea>{errors.email.message.toString()}</ErrorMessageArea>
        )}

        <Label>Password</Label>
        <InputContainer>
          <Input
            {...register("password", {
              required: "Please enter password",
            })}
            type="password"
          />
        </InputContainer>
        {errors.password && (
          <ErrorMessageArea>
            {errors.password.message.toString()}
          </ErrorMessageArea>
        )}

        <Label>Phone Number</Label>
        <InputContainer>
          <Input
            {...register("phone", {
              required: "Please enter phone number",
              // pattern: { value: /^[0-9]/, message: "Please enter numbers" },
            })}
          />
        </InputContainer>
        {errors.phone && (
          <ErrorMessageArea>{errors.phone.message.toString()}</ErrorMessageArea>
        )}

        <Label>Who are you?</Label>
        {errors.usertype && (
          <ErrorMessageArea>
            {errors.usertype.message.toString()}
          </ErrorMessageArea>
        )}
        <RadioContainer>
          <input
            {...register("usertype", { required: "Please select who you are" })}
            type="radio"
            value="guest"
          />
          <span>Guest</span>
        </RadioContainer>
        <RadioContainer>
          <input
            {...register("usertype", { required: "Please select who you are" })}
            type="radio"
            value="hotel"
          />
          <span>Hotel</span>
        </RadioContainer>
        <RadioContainer>
          <input
            {...register("usertype", { required: "Please select who you are" })}
            type="radio"
            value="admin"
          />
          <span>Admin</span>
        </RadioContainer>
        <SubmitBtn type="submit">
          {isFetching ? "loading..." : "Sign Up"}
        </SubmitBtn>
      </Form>
    </Container>
  );
}

export default Register;
