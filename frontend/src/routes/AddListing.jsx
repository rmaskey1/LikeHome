import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

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
  margin-top: 20px;
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

const ErrorMessage = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

function AddListing() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const location = useLocation();
  const [listing, setListing] = useState("");

  useEffect(() => {
    setListing(location.pathname.substring(1));
    console.log(listing);
  }, [listing, location.pathname]);

  const isLetter = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  const onSubmit = (data) => {
    //Handle form submission here!! <3
    console.log(data);
    fetch("http://127.0.0.1:5000/addRoomListing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListingTitle>Add a new listing:</ListingTitle>
        <SectionTitle>Basic Information</SectionTitle>
        <Input
          {...register("price", {
            valueAsNumber: true,
            min: { value: 0, message: "Price must be non-negative" },
            required: "Price is required",
          })}
          type="number"
          placeholder="Price"
          style={{ color: "black" }}
        />
        {errors.price && (
          <ErrorMessage className="error-text">
            <span>{errors.price.message.toString()}</span>
          </ErrorMessage>
        )}
        <br />
        <br />
        <SectionTitle>Available Dates</SectionTitle>
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
        <SectionTitle>Room Details</SectionTitle>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
            <Input
              {...register("beds", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Number of Beds must be non-negative",
                },
                required: "Number of Beds is required",
              })}
              type="number"
              placeholder="# of Beds"
              style={{ color: "black" }}
            />
            {errors.beds && (
              <ErrorMessage className="error-text">
                <span>{errors.beds.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <Input
              {...register("bedType", {
                required: "Bed Type is required",
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
              placeholder="Bed Type"
              style={{ color: "black" }}
            />
            {errors.bedType && (
              <ErrorMessage className="error-text">
                <span>{errors.bedType.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
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
              placeholder="# of Guests"
              style={{ color: "black" }}
            />
            {errors.guests && (
              <ErrorMessage className="error-text">
                <span>{errors.guests.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <Input
              {...register("bathrooms", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Number of Bathrooms must be non-negative",
                },
                required: "Number of Bathrooms is required",
              })}
              type="number"
              placeholder="# of Bathrooms"
              style={{ color: "black" }}
            />
            {errors.bathrooms && (
              <ErrorMessage className="error-text">
                <span>{errors.bathrooms.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
        </div>

        <Input
          {...register("image", {
            required: "Image URL is required",
          })}
          type="url"
          placeholder="URL of Image"
          style={{ color: "black" }}
        />
        {errors.image && (
          <ErrorMessage>{errors.image.message.toString()}</ErrorMessage>
        )}

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
          <SubmitButton type="submit">Add</SubmitButton>
        </CenteredButtonContainer>
      </form>
    </Container>
  );
}

export default AddListing;
