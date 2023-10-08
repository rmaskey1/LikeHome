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

const FileInput = styled.input`
  display: none; /* Hide the file input */
`;

const UploadButton = styled.label`
  margin-top: 15px;
  margin-bottom: 10px;
  width: 200px;
  height: 60px;
  padding: 10px;
  border-radius: 20px;
  background-color: #ffffff;
  color: #cf316a;
  border: 1px solid;
  border-color: #cf316a;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cf316a;
    color: #ffffff;
  }
`;

const FileName = styled.span`
  margin-top: 10px;
  margin-left: 5px;
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

function AddListing() {
  const { handleSubmit, control, register, setValue } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    //Handle form submission here!! <3
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
            render={({ field }) => <Input {...field} type="text" />}
          />
          <SectionTitle>Last Name</SectionTitle>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => <Input {...field} type="text" />}
          />
          <SectionTitle>Email</SectionTitle>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} type="text" />}
          />
          <SectionTitle>Password</SectionTitle>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input {...field} type="text" />}
          />
          <SectionTitle>Phone Number</SectionTitle>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => <Input {...field} type="text" />}
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
