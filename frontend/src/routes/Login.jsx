import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as KeyIcon } from "../icons/key.svg";
import { useRecoilState } from "recoil";
import { isLoginAtom } from "../atom";

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
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = (loginData) => {
    console.log(loginData);
  };

  const resetFields = () => {
    resetField("username");
    resetField("password");
  };

  useEffect(() => {
    isLogin && navigate("/");
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
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter valid email",
              },
            })}
            placeholder="Enter email"
          />
        </InputContainer>
        {errors.email && (
          <ErrorMessageArea>{errors.email.message.toString()}</ErrorMessageArea>
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
          />
        </InputContainer>
        {errors.password && (
          <ErrorMessageArea>
            {errors.password.message.toString()}
          </ErrorMessageArea>
        )}
        <SubmitBtn type="submit">
          {isFetching ? "loading..." : "Login"}
        </SubmitBtn>
      </Form>
    </Container>
  );
}

export default Login;
