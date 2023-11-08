import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "api";

const Container = styled.main`
  display: center;
  margin: auto;
  width: 70%;
  margin-top: 36px;
  height: 100vh;
  padding: 20px;
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
  font-size: 16px;
  font-weight: bold;
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
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ErrorMessage = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

function ModifyListing() {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const rid = useParams().id;
  const roominfo = location.state;

  const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Ensure two-digit month
    const day = d.getDate().toString().padStart(2, "0"); // Ensure two-digit day
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  //INTEGRATIONS!! get the listings's existing data :D
  const existingData = {
    price: roominfo.price,
    fromDate: formatDate(roominfo.startDate), // Format the "fromDate"
    toDate: formatDate(roominfo.endDate),
    //fromDate: new Date(roominfo.startDate).toLocaleDateString(),
    //toDate: new Date(roominfo.endDate).toLocaleDateString(),
    beds: roominfo.numberOfBeds,
    guests: roominfo.numberGuests,
    bathrooms: roominfo.numberOfBathrooms,
    bedType: roominfo.bedType,
    image: roominfo.imageUrl,
    amenities: [
      { freeWifi: roominfo.Amenities.includes("freeWifi") },
      { pool: roominfo.Amenities.includes("pool") },
      { tv: roominfo.Amenities.includes("tv") },
      { freeWasherInUnit: roominfo.Amenities.includes("freeWasherInUnit") },
      { freeDryerInUnit: roominfo.Amenities.includes("freeDryerInUnit") },
      { freeParking: roominfo.Amenities.includes("freeParking") },
      { airConditioning: roominfo.Amenities.includes("airConditioning") },
      { freeBreakfast: roominfo.Amenities.includes("freeBreakfast") },
      { freeLunch: roominfo.Amenities.includes("freeLunch") },
      { freeDinner: roominfo.Amenities.includes("freeDinner") },
      { microwave: roominfo.Amenities.includes("microwave") },
      { refrigerator: roominfo.Amenities.includes("refrigerator") },
      { petFriendly: roominfo.Amenities.includes("petFriendly") },
      { spa: roominfo.Amenities.includes("spa") },
    ],
  };
  const isLetter = (str) => {
    return /^[A-Za-z]+$/.test(str);
  };

  const isDateValid = (date) => {
    const parsedDate = Date.parse(date); // Try to parse the date string
    return !isNaN(parsedDate); // Check if it's a valid date
  };

  const onSubmit = async (formData) => {
    console.log(formData);
    const response = await fetch(
      `${SERVER_URL}/listing/${rid}?uid=${localStorage.uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log(response.status, data);

    if (response.ok) {
      navigate(location.pathname.replace("/modify", ""), {
        state: response.status,
      });
    }
  };

  return (
    <>
      <LeftBox>
        <Button onClick={() => navigate(-1)} id="back-btn">
          Back
        </Button>
      </LeftBox>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ListingTitle>Modify listing</ListingTitle>
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
            defaultValue={existingData.price}
            id="price-field"
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
                    defaultValue={existingData.fromDate}
                    id="fromDate-field"
                  />
                  {errors.fromDate && (
                    <ErrorMessage className="error-text">
                      <span id="fromDate-error">
                        {errors.fromDate.message.toString()}
                      </span>
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
                          if (
                            new Date(value) <= new Date(getValues("fromDate"))
                          )
                            return "Date must be after From Date";
                          return true;
                        },
                      },
                    })}
                    type="text"
                    placeholder="mm/dd/yyyy"
                    style={{ color: "black" }}
                    defaultValue={existingData.toDate}
                    id="toDate-field"
                  />
                  {errors.toDate && (
                    <ErrorMessage className="error-text">
                      <span id="toDate-error">
                        {errors.toDate.message.toString()}
                      </span>
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
                defaultValue={existingData.beds}
                id="beds-field"
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
                defaultValue={existingData.bedType}
                id="bedType-field"
              />
              {errors.bedType && (
                <ErrorMessage className="error-text">
                  <span id="bedType-error">
                    {errors.bedType.message.toString()}
                  </span>
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
                defaultValue={existingData.guests}
                id="guests-field"
              />
              {errors.guests && (
                <ErrorMessage className="error-text">
                  <span id="guests-error">
                    {errors.guests.message.toString()}
                  </span>
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
                defaultValue={existingData.bathrooms}
                id="bathrooms-field"
              />
              {errors.bathrooms && (
                <ErrorMessage className="error-text">
                  <span id="bathrooms-error">
                    {errors.bathrooms.message.toString()}
                  </span>
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
            defaultValue={existingData.image}
            id="imageUrl-field"
          />
          {errors.image && (
            <ErrorMessage id="image-error">
              {errors.image.message.toString()}
            </ErrorMessage>
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
                  defaultValue={existingData.amenities[0].freeWifi}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[0].freeWifi}
                    />
                  )}
                />
                Free Wifi
              </Label>
              <Label>
                <Controller
                  id="pool-box"
                  name="amenities[1].pool"
                  control={control}
                  defaultValue={existingData.amenities[1].pool}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[1].pool}
                    />
                  )}
                />
                Pool
              </Label>
              <Label>
                <Controller
                  id="tv-box"
                  name="amenities[2].tv"
                  control={control}
                  defaultValue={existingData.amenities[2].tv}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[2].tv}
                    />
                  )}
                />
                TV
              </Label>
              <Label>
                <Controller
                  id="washer-box"
                  name="amenities[3].freeWasherInUnit"
                  control={control}
                  defaultValue={existingData.amenities[3].freeWasherInUnit}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={
                        existingData.amenities[3].freeWasherInUnit
                      }
                    />
                  )}
                />
                Free washer - In unit
              </Label>
              <Label>
                <Controller
                  id="dryer-box"
                  name="amenities[4].freeDryerInUnit"
                  control={control}
                  defaultValue={existingData.amenities[4].freeDryerInUnit}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[4].freeDryerInUnit}
                    />
                  )}
                />
                Free dryer - In unit
              </Label>
              <Label>
                <Controller
                  id="parking-box"
                  name="amenities[5].freeParking"
                  control={control}
                  defaultValue={existingData.amenities[5].freeParking}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[5].freeParking}
                    />
                  )}
                />
                Free parking
              </Label>
              <Label>
                <Controller
                  id="ac-box"
                  name="amenities[6].airConditioning"
                  control={control}
                  defaultValue={existingData.amenities[6].airConditioning}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[6].airConditioning}
                    />
                  )}
                />
                Air conditioning
              </Label>
            </CheckboxItem>
            <CheckboxItem>
              <Label>
                <Controller
                  id="breakfast-box"
                  name="amenities[7].freeBreakfast"
                  control={control}
                  defaultValue={existingData.amenities[7].freeBreakfast}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[7].freeBreakfast}
                    />
                  )}
                />
                Free Breakfast
              </Label>
              <Label>
                <Controller
                  id="lunch-box"
                  name="amenities[8].freeLunch"
                  control={control}
                  defaultValue={existingData.amenities[8].freeLunch}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[8].freeLunch}
                    />
                  )}
                />
                Free Lunch
              </Label>
              <Label>
                <Controller
                  id="dinner-box"
                  name="amenities[9].freeDinner"
                  control={control}
                  defaultValue={existingData.amenities[9].freeDinner}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[9].freeDinner}
                    />
                  )}
                />
                Free Dinner
              </Label>
              <Label>
                <Controller
                  id="microwave-box"
                  name="amenities[10].microwave"
                  control={control}
                  defaultValue={existingData.amenities[10].microwave}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[10].microwave}
                    />
                  )}
                />
                Microwave
              </Label>
              <Label>
                <Controller
                  id="refrigerator-box"
                  name="amenities[11].refrigerator"
                  control={control}
                  defaultValue={existingData.amenities[11].refrigerator}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[11].refrigerator}
                    />
                  )}
                />
                Refrigerator
              </Label>
              <Label>
                <Controller
                  id="pet-box"
                  name="amenities[12].petFriendly"
                  control={control}
                  defaultValue={existingData.amenities[12].petFriendly}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[12].petFriendly}
                    />
                  )}
                />
                Pet Friendly
              </Label>
              <Label>
                <Controller
                  id="spa-box"
                  name="amenities[13].spa"
                  control={control}
                  defaultValue={existingData.amenities[13].spa}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      type="checkbox"
                      defaultChecked={existingData.amenities[13].spa}
                    />
                  )}
                />
                Spa
              </Label>
            </CheckboxItem>
          </CheckboxGroup>
          <CenteredButtonContainer>
            <SubmitButton id="submit-btn" type="submit">
              Save
            </SubmitButton>
          </CenteredButtonContainer>
        </form>
      </Container>
    </>
  );
}

export default ModifyListing;
