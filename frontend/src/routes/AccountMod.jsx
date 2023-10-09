import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  width: 100%;
  margin-bottom: 15px;
`;

const CheckboxItem = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Checkbox = styled.input`
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  height: 20px;
  color: #888888;
  margin-right: 20px;
  vertical-align: bottom;
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
    control,
    setError,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);

  const validateEmail = (value) => {
    // Use a regular expression to check the email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(value)) {
      setError("email", {
        type: "manual",
        message: "Invalid email format",
      });
    } else {
      // Clear the email error message if the email format is valid
      setError("email", null);
    }
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
          <SectionTitle>First Name</SectionTitle>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} type="text" style={{ color: "black" }} />
                {errors.firstName && (
                  <ErrorText>{errors.firstName.message}</ErrorText>
                )}
              </>
            )}
          />
          <SectionTitle>Last Name</SectionTitle>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} type="text" style={{ color: "black" }} />
                {errors.lastName && (
                  <ErrorText>{errors.lastName.message}</ErrorText>
                )}
              </>
            )}
          />
          <SectionTitle>Email</SectionTitle>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  type="text"
                  style={{ color: "black" }}
                  onBlur={(e) => validateEmail(e.target.value)}
                />
                {errors.email && (
                  <ErrorText style={{ color: "#cf316a" }}>
                    {errors.email.message}
                  </ErrorText>
                )}
              </>
            )}
          />
          <SectionTitle>Password</SectionTitle>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" style={{ color: "black" }} />
            )}
          />
          <SectionTitle>Phone Number</SectionTitle>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} type="number" style={{ color: "black" }} />
                {errors.phoneNumber && (
                  <ErrorText>{errors.phoneNumber.message}</ErrorText>
                )}
              </>
            )}
          />
          <CenteredButtonContainer>
            <SubmitButton type="submit">Update</SubmitButton>
          </CenteredButtonContainer>
        </form>
      </Container>
    </>
  );
}

export default AddListing;
