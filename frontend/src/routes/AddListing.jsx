import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
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
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [responseCode, setResponseCode] = useState(0);

  const isLetter = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  const onSubmit = async (formData) => {
    setIsFetching(true);
    //Handle form submission here!! <3
    console.log(formData);
    const response = await fetch(
      `${SERVER_URL}/listing?uid=${localStorage.uid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(response.status, data);
    setResponseCode(response.status);

    if (response.ok) {
    //   // alert("Listing created!");
      navigate("/home", {state: response.status});
    }
    setIsFetching(false);
  };



  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ListingTitle>Add a new listing:</ListingTitle>
        <SectionTitle>Basic Information</SectionTitle>
        <SubTitle>Price:</SubTitle>
        <Input 
          {...register("price", {
            valueAsNumber: true,
            min: { value: 0, message: "Price must be non-negative" },
            required: "Price is required",
          })}
          type="number"
          style={{ color: "black" }}
          id="price-input"
        />
        {errors.price && (
          <ErrorMessage className="error-text">
            <span id="price-error">{errors.price.message.toString()}</span>
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
                  id="fromDate-input"
                />
                {errors.fromDate && (
                  <ErrorMessage className="error-text">
                    <span id="fromDate-error">{errors.fromDate.message.toString()}</span>
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
                  id="toDate-input"
                />
                {errors.toDate && (
                  <ErrorMessage className="error-text">
                    <span id="toDate-error">{errors.toDate.message.toString()}</span>
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
            <SubTitle>Number of Beds:</SubTitle>
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
              style={{ color: "black" }}
              id="beds-input"
            />
            {errors.beds && (
              <ErrorMessage className="error-text">
                <span id="beds-error">{errors.beds.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <SubTitle>Bed Type:</SubTitle>
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
              style={{ color: "black" }}
              id="bedType-input"
            />
            {errors.bedType && (
              <ErrorMessage className="error-text">
                <span id="bedType-error">{errors.bedType.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "10px" }}>
            <SubTitle>Number of Guests:</SubTitle>
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
              style={{ color: "black" }}
              id="guests-input"
            />
            {errors.guests && (
              <ErrorMessage className="error-text">
                <span id="guests-error">{errors.guests.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <SubTitle>Number of Bathrooms:</SubTitle>
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
              style={{ color: "black" }}
              id="bathrooms-input"
            />
            {errors.bathrooms && (
              <ErrorMessage className="error-text">
                <span id="bathrooms-error">{errors.bathrooms.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>
        </div>

        <SubTitle>URL of Image:</SubTitle>
        <Input
          {...register("image", {
            required: "Image URL is required",
          })}
          type="url"
          style={{ color: "black" }}
          id="image-input"
        />
        {errors.image && (
          <ErrorMessage id="image-error">{errors.image.message.toString()}</ErrorMessage>
        )}

        <br />
        <br />
        <SectionTitle>Amenities Offered</SectionTitle>
        <CheckboxGroup>
          <CheckboxItem>
            <Label>
              <Controller
                
                name="amenities[0].freeWifi"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="freeWifi-box" type="checkbox" />}
              />
              Free Wifi
            </Label>
            <Label>
              <Controller
                name="amenities[1].pool"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="pool-box" type="checkbox" />}
              />
              Pool
            </Label>
            <Label>
              <Controller
                name="amenities[2].tv"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="tv-box" type="checkbox" />}
              />
              TV
            </Label>
            <Label>
              <Controller
                name="amenities[3].freeWasherInUnit"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="washer-box" type="checkbox" />}
              />
              Free washer - In unit
            </Label>
            <Label>
              <Controller
                name="amenities[4].freeDryerInUnit"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="dryer-box" type="checkbox" />}
              />
              Free dryer - In unit
            </Label>
            <Label>
              <Controller
                name="amenities[5].freeParking"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field}  id="parking-box" type="checkbox" />}
              />
              Free parking
            </Label>
            <Label>
              <Controller
                name="amenities[6].airConditioning"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="ac-box" type="checkbox" />}
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
                render={({ field }) => <Checkbox {...field} id="breakfast-box" type="checkbox" />}
              />
              Free Breakfast
            </Label>
            <Label>
              <Controller
                name="amenities[8].freeLunch"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="lunch-box" type="checkbox" />}
              />
              Free Lunch
            </Label>
            <Label>
              <Controller
                name="amenities[9].freeDinner"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="dinner-box" type="checkbox" />}
              />
              Free Dinner
            </Label>
            <Label>
              <Controller
                name="amenities[10].microwave"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="microwave-box" type="checkbox" />}
              />
              Microwave
            </Label>
            <Label>
              <Controller
                name="amenities[11].refrigerator"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="refrigerator-box" type="checkbox" />}
              />
              Refrigerator
            </Label>
            <Label>
              <Controller
                name="amenities[12].petFriendly"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="pet-box" type="checkbox" />}
              />
              Pet Friendly
            </Label>
            <Label>
              <Controller
                name="amenities[13].spa"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} id="spa-box" type="checkbox" />}
              />
              Spa
            </Label>
          </CheckboxItem>
        </CheckboxGroup>
        <CenteredButtonContainer>
          <SubmitButton type="submit" id="submit-btn"> 
            {isFetching ? <Ellipsis color="white" size={30} /> : "Add"}
          </SubmitButton>
        </CenteredButtonContainer>
      </form>

      <input type="hidden" id="add-listing-response-code" value={responseCode}/>
    </Container>
  );
}

export default AddListing;
