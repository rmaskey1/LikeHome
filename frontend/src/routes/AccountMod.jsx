import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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

const Add = styled.button`
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

function AddListing() {
  const { handleSubmit, control, register, setValue } = useForm();
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    } else {
      setUploadedFileName(null);
    }
  };

  const onSubmit = (data) => {
    //Handle form submission here!! <3
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListingTitle>Add a new listing:</ListingTitle>
        <SectionTitle>Basic Information</SectionTitle>
        <div style={{ display: "flex" }}>
          <Input
            {...register("hotelName")}
            type="text"
            placeholder="Hotel Name"
            style={{ marginRight: "10px" }}
          />
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="Price"
          />
        </div>
        <Input
          {...register("hotelLocation")}
          type="text"
          placeholder="Hotel Location"
        />
        <div style={{ marginTop: "15px" }}>
          <Controller
            name="image"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <>
                <UploadButton>
                  Upload Image
                  <FileInput
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFileInputChange(e);
                    }}
                  />
                </UploadButton>
              </>
            )}
          />
        </div>
        {uploadedFileName && <FileName>{uploadedFileName}</FileName>}

        <br />

        <SectionTitle>Room Details</SectionTitle>
        <div style={{ display: "flex" }}>
          <Input
            {...register("beds", { valueAsNumber: true })}
            type="number"
            placeholder="# of Beds"
            style={{ marginRight: "10px" }}
          />
          <Input {...register("bedType")} type="text" placeholder="Bed Type" />
        </div>
        <div style={{ display: "flex" }}>
          <Input
            {...register("guests", { valueAsNumber: true })}
            type="number"
            placeholder="# of Guests"
            style={{ marginRight: "10px" }}
          />
          <Input
            {...register("bathrooms", { valueAsNumber: true })}
            type="number"
            placeholder="# of Bathrooms"
          />
        </div>

        <br />

        <SectionTitle>Amenities Offered</SectionTitle>
        <CheckboxGroup>
          <CheckboxItem>
            <Label>
              <Controller
                name="amenities[0].freeWifi"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free Wifi
            </Label>
            <Label>
              <Controller
                name="amenities[1].pool"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Pool
            </Label>
            <Label>
              <Controller
                name="amenities[2].tv"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              TV
            </Label>
            <Label>
              <Controller
                name="amenities[3].freeWasherInUnit"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free washer - In unit
            </Label>
            <Label>
              <Controller
                name="amenities[4].freeDryerInUnit"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free dryer - In unit
            </Label>
            <Label>
              <Controller
                name="amenities[5].freeParking"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free parking
            </Label>
            <Label>
              <Controller
                name="amenities[6].airConditioning"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Air conditioning
            </Label>
          </CheckboxItem>
          <CheckboxItem>
            <Label>
              <Controller
                name="amenities[7].freeBreakfast"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free Breakfast
            </Label>
            <Label>
              <Controller
                name="amenities[8].freeLunch"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free Lunch
            </Label>
            <Label>
              <Controller
                name="amenities[9].freeDinner"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Free Dinner
            </Label>
            <Label>
              <Controller
                name="amenities[10].microwave"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Microwave
            </Label>
            <Label>
              <Controller
                name="amenities[11].refrigerator"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Refrigerator
            </Label>
            <Label>
              <Controller
                name="amenities[12].petFriendly"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Pet Friendly
            </Label>
            <Label>
              <Controller
                name="amenities[13].spa"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} type="checkbox" />}
              />
              Spa
            </Label>
          </CheckboxItem>
        </CheckboxGroup>

        <CenteredButtonContainer>
          <Add type="submit">Add</Add>
        </CenteredButtonContainer>
      </form>
    </Container>
  );
}

export default AddListing;
