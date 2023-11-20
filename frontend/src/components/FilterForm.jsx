import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Container = styled.div`
  background: #ffffff;
  overflow-y: scroll;
  max-height: 80%;
  display: center;
  margin: auto;
  width: 40%;
  margin-top: 100px;
  height: 100vh;
  padding: 40px;
  border: 1px solid black;
`;

const Section = styled.div`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 500;
`;

const Title = styled.div`
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

const BoxGroup = styled.div`
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
  font-weight: 400;
  width: 100%;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff457b;
  }
`;

const ClButton = styled.button`
  cursor: pointer;
  background: transparent;
  &:hover {
    color: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ErrorMessage = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

function FilterForm({ onClose, onFilter }) {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const bedTypesOptions = ["King", "Queen", "Double", "Single", "Twin"];
  const amenitiesOptions = [
    "Free Wifi",
    "Pool",
    "TV",
    "Free washer - In unit",
    "Free dryer - In unit",
    "Free parking",
    "Air conditioning",
    "Free Breakfast",
    "Free Lunch",
    "Free Dinner",
    "Microwave",
    "Refrigerator",
    "Pet Friendly",
    "Spa",
  ];

  const amenities = [
    "freeWifi",
    "pool",
    "tv",
    "freeWasherInUnit",
    "freeDryerInUnit",
    "freeParking",
    "airConditioning",
    "freeBreakfast",
    "freeLunch",
    "freeDinner",
    "microwave",
    "refrigerator",
    "petFriendly",
    "spa",
  ];

  const onSubmit = (data) => {
    onFilter(data);
    onClose();
  };

  const handleClear = () => {
    reset(); // Clear the form fields
  };

  return (
    <Dimmed>
      <Container>
        <ClButton type="button" onClick={onClose}>
          X
        </ClButton>
        <Section style={{ fontSize: "20px" }}>Filter</Section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Section>Price Range</Section>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Title>Min</Title>
              <Input
                {...register("minPrice", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be non-negative" },
                  //   required: "Price is required",
                  validate: (value) => {
                    if (getValues("maxPrice") && !value) {
                      return "Min price is required";
                    }
                    return true;
                  },
                })}
                type="number"
                style={{ color: "black" }}
                id = "min-input"
              />
              {errors.minPrice && (
                <ErrorMessage className="error-text" id='min-message'>
                  <span>{errors.minPrice.message.toString()}</span>
                </ErrorMessage>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <Title>Max</Title>
              <Input
                {...register("maxPrice", {
                  valueAsNumber: true,
                  min: {
                    value: getValues("minPrice") || 0,
                    message: "Must be non-negative and Min price is required",
                  },
                  //   required: "Price is required",
                  validate: (value) => {
                    if (getValues("minPrice") && !value) {
                      return "Max price is required";
                    }
                    if (value <= getValues("minPrice")) {
                      return "Max price must be greater than min price";
                    }
                    return true;
                  },
                })}
                type="number"
                style={{ color: "black" }}
                id = "max-input"
              />
              {errors.maxPrice && (
                <ErrorMessage className="error-text" id='max-message'>
                  <span>{errors.maxPrice.message.toString()}</span>
                </ErrorMessage>
              )}
            </div>
          </div>

          <br />
          <hr
            style={{
              width: "90%",
              borderBottom: "2px solid #ccc",
              margin: "10px auto",
            }}
          />

          <div style={{ flex: 1, marginRight: "10px" }}>
            <Section>Number of Beds:</Section>
            <Input
              {...register("beds", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Number of Beds must be non-negative",
                },
                // required: "Number of Beds is required",
              })}
              type="number"
              style={{ color: "black" }}
              id = "bed-input"
            />
            {errors.beds && (
              <ErrorMessage className="error-text" id='beds-message'>
                <span>{errors.beds.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>

          <div style={{ flex: 1, marginRight: "10px" }}>
            <Section>Number of Guests:</Section>
            <Input
              {...register("guests", {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Number of Guests must be greater than 0",
                },
                // required: "Number of Guests is required",
              })}
              type="number"
              style={{ color: "black" }}
              id = "guests-input"
            />
            {errors.guests && (
              <ErrorMessage className="error-text" id='guests-error'>
                <span>{errors.guests.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <Section>Number of Bathrooms:</Section>
            <Input
              {...register("bathrooms", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Number of Bathrooms must be non-negative",
                },
                // required: "Number of Bathrooms is required",
              })}
              type="number"
              style={{ color: "black" }}
              id = "bathrooms-input"
            />
            {errors.bathrooms && (
              <ErrorMessage className="error-text" id='baths-error'>
                <span>{errors.bathrooms.message.toString()}</span>
              </ErrorMessage>
            )}
          </div>

          <br />
          <hr
            style={{
              width: "90%",
              borderBottom: "2px solid #ccc",
              margin: "10px auto",
            }}
          />

          <div>
            <Section>Bed Types</Section>
            {bedTypesOptions.map((option) => (
              <BoxGroup key={option}>
                <Label style={{ marginLeft: "50px" }}>
                  <Controller
                    name="bedType"
                    control={control}
                    defaultValue={NaN}
                    render={({ field }) => (
                      <input {...field} type="radio" value={option} id={`bedType_${option}`}/>
                    )}
                  />
                  <div style={{ marginLeft: "10px" }}>{option}</div>
                </Label>
              </BoxGroup>
            ))}
          </div>

          <br />
          <hr
            style={{
              width: "90%",
              borderBottom: "2px solid #ccc",
              margin: "10px auto",
            }}
          />

          <div>
            <Section>Amenities</Section>
            <BoxGroup>
              {amenitiesOptions.map((amenity, index) => (
                <Label style={{ marginLeft: "50px" }} key={index}>
                  <Controller
                    name={`amenities[${index}.${amenity}]`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => <input {...field} type="checkbox" id={`amenityCheckbox_${index}`}/>}
                  />
                  <div style={{ marginLeft: "10px" }}>{amenity}</div>
                </Label>
              ))}
            </BoxGroup>
          </div>

          <br />
          <hr
            style={{
              width: "100%",
              borderBottom: "3px solid #ccc",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />

          <ButtonContainer>
            <ClButton type="button" onClick={handleClear}>
              Clear All
            </ClButton>
            <SubmitButton type="submit" id='start-filter-btn'>Filter</SubmitButton>
          </ButtonContainer>
        </form>
      </Container>
    </Dimmed>
  );
}

export default FilterForm;
