// SearchBar.jsx
import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";

const SearchForm = styled.form`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  /* text-align: center; */
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 50px;
  padding-right: 250px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border: 1px solid #293545;
  border-radius: 15px;
  padding: 10px;
  margin: 5px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 1px; /* Add some spacing between the label and input */
`;

const Input = styled.input`
  width: 100%;
  /* max-width: 300px; */
  /* padding: 5px; */
`;

const Button = styled.button`
  /* background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex; */
  padding: 15px 30px;
  margin-left: 5px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff457b;
  }
`;

const ErrorMessage = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
`;

function SearchBar({ handleSearch }) {
  //searchCriteria, setSearchCriteria,
  // const handleGuestsChange = (e) => {
  //   const inputText = e.target.value;
  //   // Remove any negative signs from the input
  //   const sanitizedInput = inputText.replace(/-/g, "");
  //   // Parse the sanitized input as an integer
  //   const numGuests = parseInt(sanitizedInput);
  //   if (!isNaN(numGuests) && numGuests > 0) {
  //     setSearchCriteria({ ...searchCriteria, guests: numGuests });
  //   }
  // };

  // return (
  //   <SearchForm>
  //     <InputContainer>
  //       <Label htmlFor="location">Location</Label>
  //       <Input
  //         type="text"
  //         id="location"
  //         placeholder="City, State"
  //         value={searchCriteria.location}
  //         onChange={(e) =>
  //           setSearchCriteria({ ...searchCriteria, location: e.target.value })
  //         }
  //       />
  //     </InputContainer>

  //     <InputContainer style={{ width: "600px" }}>
  //       <Label htmlFor="guests">Guests</Label>
  //       <Input
  //         type="number"
  //         id="guests"
  //         placeholder="Number of guests"
  //         value={searchCriteria.guests}
  //         onChange={(e) => setSearchCriteria({ handleGuestsChange })}
  //         onKeyDown={(e) => {
  //           if (e.key === "-" || e.key === "0") {
  //             e.preventDefault(); // Prevent the '-' and '0' key from being entered
  //           }
  //         }}
  //       />
  //       {/* ...searchCriteria,
  //     guests: parseInt(e.target.value), */}
  //     </InputContainer>

  //     <InputContainer>
  //       <Label htmlFor="startDate">Date From</Label>
  //       <Input
  //         type="Date"
  //         id="startDate"
  //         placeholder="Date"
  //         value={searchCriteria.date}
  //         onChange={(e) =>
  //           setSearchCriteria({ ...searchCriteria, dateFrom: e.target.value })
  //         }
  //       />
  //     </InputContainer>

  //     <InputContainer>
  //       <Label htmlFor="endDate">Date To</Label>
  //       <Input
  //         type="Date"
  //         id="endDate"
  //         placeholder="Date"
  //         value={searchCriteria.date}
  //         onChange={(e) =>
  //           setSearchCriteria({ ...searchCriteria, dateTo: e.target.value })
  //         }
  //       />
  //     </InputContainer>

  //     <Button onClick={handleSearch}>Search</Button>
  //   </SearchForm>
  // );
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    handleSearch(formData);
    console.log(formData);
    reset();
  };

  return (
    <SearchForm onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          placeholder="City, State"
          id="location"
          {...register("location", {})}
        />
        {errors.location && (
          <ErrorMessage className="error-text">
            <span>{errors.location.message.toString()}</span>
          </ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <label htmlFor="guests">Guests</label>
        <input
          type="number"
          placeholder="Number of guests"
          id="guests"
          {...register("guests", {
            min: {
              value: 1,
              message: "Number of guests must be greater than 0",
            },
          })}
        />
        {errors.guests && (
          <ErrorMessage className="error-text">
            <span>{errors.guests.message.toString()}</span>
          </ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <label htmlFor="startDate">Date From</label>
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          id="startDate"
          {...register("dateFrom", {
            validate: {
              validDate: (value) => {
                if (getValues("dateTo") && !value) {
                  return "dateFrom is required";
                }
                if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                  return "Invalid date format (mm/dd/yyyy)";
                }
                return true;
              },
            },
          })}
        />
        {errors.dateFrom && (
          <ErrorMessage className="error-text">
            <span>{errors.dateFrom.message.toString()}</span>
          </ErrorMessage>
        )}
      </InputContainer>

      <InputContainer>
        <label htmlFor="endDate">Date To</label>
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          id="endDate"
          {...register("dateTo", {
            validate: {
              validDate: (value) => {
                if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                  return "Invalid date format (mm/dd/yyyy)";
                }
                if (getValues("dateFrom") && !value) {
                  return "dateTo is required";
                }
                if (new Date(value) <= new Date())
                  return "Date must be in the future";
                if (new Date(value) <= new Date(getValues("dateFrom")))
                  return "Date must be after From Date";
                return true;
              },
            },
          })}
        />
        {errors.dateTo && (
          <ErrorMessage className="error-text">
            <span>{errors.dateTo.message.toString()}</span>
          </ErrorMessage>
        )}
      </InputContainer>

      <Button type="submit">Search</Button>
    </SearchForm>
  );
}

export default SearchBar;
