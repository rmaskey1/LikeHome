import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../img/hotel-room.jpg";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Back = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 50px 25px;
  color: #293545;
`;

const BookingRequest = styled.div`
  font-size: 26px;
  font-weight: bold;
  padding: 20px 200px;
  color: #293545;
`;

const InfoTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 200px;
  color: #293545;
`;

const InfoText = styled.div`
  font-size: 16px;
  font-weight: normal;
  padding: 10px 200px;
  color: #293545;
`;

const Payment = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 50px 200px 10px;
  color: #293545;
`;

const ErrorText = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  margin-left: 200px;
`;

const ErrorText2 = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
`;

const FieldName = styled.div`
  font-size: 16px;
  font-weight: normal;
  margin-left: 200px;
  margin-top: 20px;
  color: #293545;
`;

const Input1 = styled.input`
  margin-top: 15px;
  margin-left: 200px;
  width: 500px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 50px;
  color: #888888;
  font-size: 18px;
  font-weight: 400;
`;

const Input2 = styled.input`
  margin-top: 15px;
  margin-left: 200px;
  width: 250px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 50px;
  color: #888888;
  font-size: 18px;
  font-weight: 400;
`;

const Input3 = styled.input`
  margin-top: 15px;
  margin-left: 0px;
  width: 240px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 50px;
  color: #888888;
  font-size: 18px;
  font-weight: 400;
`;

const CVC = styled.div`
  font-size: 16px;
  font-weight: normal;
  margin-top: 20px;
  margin-right: 200px;
  color: #293545;
`;

const SubmitButton = styled.button`
  margin-top: 50px;
  margin-left: 200px;
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

const Card = styled.div`
  border: 1px solid #293545;
  border-radius: 10px;
  padding: 10px;
  color: #293545;
  height: 490px;
  width: 390px;
  display: block;
  margin-right: 200px;
  margin-top: 150px;
`;

const LeftSide = styled.div`
  border-style: solid;
  border-radius: 10px;
  color: #293545;
  margin-right: 100px;
`;

const RightSide = styled.div`
  border-style: solid;
  border-radius: 10px;
  color: #293545;
`;

const Image = styled.div`
  padding: 15px;
  height: 250px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const Pricing = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const CostAndAmount = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Amount = styled.div`
  margin-right: 20px;
  font-size: 16px;
  font-weight: normal;
`;

const Total = styled.div`
  margin-top: 60px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TotalCost = styled.div`
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
`;

function BookingForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (formData) => {
    setIsFetching(true);
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

    if (response.ok) {
      alert("Booking created!");
      navigate("/room/:id/book/success");
    }
    setIsFetching(false);
  };

  return (
    <Container>
      <LeftSide>
        <div>
          <Back onClick={() => navigate(-1)}>Back</Back>
          <BookingRequest>Booking Request</BookingRequest>

          <InfoTitle>Location:</InfoTitle>
          <InfoText>123 Street, San Jose, California</InfoText>

          <InfoTitle>Dates:</InfoTitle>
          <InfoText>10/01/23 - 10/03/23</InfoText>

          <InfoTitle>Number of Guests:</InfoTitle>
          <InfoText>4</InfoText>
        </div>

        <div>
          <Payment>Payment</Payment>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldName>Card Number</FieldName>
            <Input1
              {...register("cardNumber", {
                required: "Card Number is required",
                valueAsNumber: true,
              })}
              type="number"
              style={{ color: "black" }}
            />
            {errors.cardNumber && (
              <ErrorText className="error-text">
                <span>{errors.cardNumber.message.toString()}</span>
              </ErrorText>
            )}

            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <FieldName>Expiration Date</FieldName>
                <Input2
                  {...register("expirationDate", {
                    required: "Expiration date is required",
                    validate: {
                      validName: (value) => {
                        // Check if the date is in the "mm/yy" format
                        if (!/^\d{2}\/\d{2}$/.test(value)) {
                          return "Invalid date format (mm/yy)";
                        }
                      },
                    },
                  })}
                  type="text"
                  style={{ color: "black" }}
                />
                {errors.expirationDate && (
                  <ErrorText className="error-text">
                    <span>{errors.expirationDate.message.toString()}</span>
                  </ErrorText>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <CVC>CVC</CVC>
                <Input3
                  {...register("cvc", {
                    valueAsNumber: true,
                    required: "CVC is required",
                    validate: {
                      validName: (value) => {
                        // Check if CVC has between 3 and 4 digits
                        if (!/^\d{3,4}$/.test(value)) {
                          return "Input must be between 3 and 4 digits.";
                        }
                      },
                    },
                  })}
                  type="number"
                  style={{ color: "black" }}
                />
                {errors.cvc && (
                  <ErrorText2 className="error-text">
                    <span>{errors.cvc.message.toString()}</span>
                  </ErrorText2>
                )}
              </div>
            </div>

            <SubmitButton type="submit">Pay & Reserve</SubmitButton>
          </form>
        </div>
      </LeftSide>

      <RightSide>
        <Card>
          <Image>
            <img src={background} alt="hotel-room" />
          </Image>
          <Pricing>Pricing:</Pricing>
          <CostAndAmount>
            <div>$100 x 3 nights</div>
            <Amount>$300</Amount>
          </CostAndAmount>

          <CostAndAmount>
            <div>Tax (8%)</div>
            <Amount>$24</Amount>
          </CostAndAmount>

          <Total>
            <div>Total (USD):</div>
            <TotalCost>$324</TotalCost>
          </Total>
        </Card>
      </RightSide>
    </Container>
  );
}

export default BookingForm;
