import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as KeyIcon } from "../icons/key.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoginAtom } from "../atom";
import { SERVER_URL } from "api";
import { Ellipsis } from "react-spinners-css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 500px;
  margin: 100px auto;
  padding: 0 40px;
  border: 1px solid rgba(41, 53, 69, 0.5);
  border-radius: 20px;
`;

const FormTitle = styled.div`
  margin-top: 30px;
  font-size: 35px;
  font-weight: 700;
  color: #293545;
`;

const NoAccount = styled.span`
  margin-top: 20px;
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
  margin-top: 30px;
  margin-bottom: 2px;
`;

const InputContainer = styled.div`
  display: flex;
  border: 1px solid rgba(41, 53, 69, 0.5);
  border-radius: 20px;
  padding: 8px 10px;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
`;

const Input = styled.input`
  all: unset;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.9rem;
  outline: none;
  transition: all 200ms linear;

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

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState({ status: 0, message: "" });
  const isLogin = useRecoilValue(isLoginAtom);

  const handleLogin = async (loginData) => {
    setIsFetching(true);
    const response = await fetch(`${SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log(response.status, data);
    setServerError({ status: response.status, message: data.message });

    // Login Success
    if (response.ok) {
      // Save tokens
      localStorage.setItem("accessToken", data.idToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("uid", data.localId);
      localStorage.setItem("userinfo", JSON.stringify(data.info));

      setIsLogin(true);
      navigate("/home");
    } else {
      // Login Fail
      setIsLogin(false);
    }
    resetFields();
    setIsFetching(false);
  };

  const resetFields = () => {
    // resetField("email");
    resetField("password");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/home");
    }
  }, [isLogin, navigate]);

  return (
    <Container>
      <FormTitle>Log In</FormTitle>
      <NoAccount>
        <span>Don't have an account? </span>
        <Link to={"/register"}>
          <u>Sign Up</u>
        </Link>
      </NoAccount>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Label>Email</Label>
        <InputContainer>
          <PersonIcon />
          <Input
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter valid email",
              },
            })}
            placeholder="Enter email"
            id="email-input"
          />
        </InputContainer>
        {errors.email && (
          <ErrorMessageArea id="email-validation-error">{errors.email.message.toString()}</ErrorMessageArea>
        )}
        {serverError.status === 404 && (
          <ErrorMessageArea id="error-message">{serverError.message}</ErrorMessageArea>
        )}
        <Label>Password</Label>
        <InputContainer>
          <KeyIcon />
          <Input
            {...register("password", {
              required: "Please enter password",
            })}
            type="password"
            placeholder="Enter password"
            id="password-input"
          />
        </InputContainer>
        {errors.password && (
          <ErrorMessageArea>
            {errors.password.message.toString()}
          </ErrorMessageArea>
        )}
        {serverError.status === 401 && (
          <ErrorMessageArea id="password-error-message">{serverError.message}</ErrorMessageArea>
        )}
        <SubmitBtn type="submit" id="submit-btn">
          {isFetching ? <Ellipsis color="white" size={30} /> : "Login"}
        </SubmitBtn>
      </Form>
    </Container>
  );
}

export default Login;
