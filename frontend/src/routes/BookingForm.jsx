import styled from "styled-components";
import { useForm } from "react-hook-form";
import { SERVER_URL } from "api";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";

const Container = styled.main`
  width: 100vw;
  height: 110vh;
  display: flex;
  justify-content: center;
  margin-left: 200px;
`;

const Back = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 50px 0;
  color: #293545;
  cursor: pointer;
`;

const BookingRequest = styled.div`
  font-size: 26px;
  font-weight: bold;
  padding: 20px 0;
  color: #293545;
`;

const InfoTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
  color: #293545;
`;

const InfoText = styled.div`
  font-size: 16px;
  font-weight: normal;
  padding: 10px 0;
  color: #293545;
`;

const NoFee = styled.div`
  font-size: 16px;
  font-weight: normal;
  padding: 10px 0;
  color: #293545;
  margin-top: 30px;
`;

const Payment = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 50px 0 10px;
  color: #293545;
`;

const ErrorText = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
`;

const ErrorText2 = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
`;

const CheckInWarning = styled.span`
  color: #cf316a;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
`;

const FieldName = styled.div`
  font-size: 16px;
  font-weight: normal;
  margin-top: 20px;
  color: #293545;
`;

const Input1 = styled.input`
  margin-top: 15px;
  width: 500px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 37px;
  color: #888888;
  font-size: 16px;
  font-weight: 400;
`;

const Input2 = styled.input`
  margin-top: 15px;
  width: 250px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 37px;
  color: #888888;
  font-size: 16px;
  font-weight: 400;
`;

const Input3 = styled.input`
  margin-top: 15px;
  margin-left: 0px;
  width: 240px;
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 20px;
  height: 37px;
  color: #888888;
  font-size: 16px;
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
  margin-top: 30px;
  width: 500px;
  height: 44px;
  padding: 15px;
  margin-bottom: 100px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-size: 16px;
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
  border: 1px solid #293545;
  border-radius: 10px;
  padding: 10px;
  color: #293545;
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
  margin-bottom: 20px;
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

const ErrorMessageArea = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(207, 49, 106, 1);
  margin-left: 200px;
`;

function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const pointsUsed = 100; //temp variable for points used
  const isCancelRoute = window.location.pathname.includes("/cancel");
  const { roomData, numGuests } = location.state;
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState({ status: 0, message: "" });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const nights = Math.floor(
    (new Date(roomData.endDate).getTime() -
      new Date(roomData.startDate).getTime()) /
      (24 * 3600 * 1000)
  );
  const subtotal = roomData.price * nights;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  let dollarString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  //you can play with the date to see different cancellation fee msgs!! <3
  const checkInDate = new Date("2023-10-29"); //INTEGRATIONS!! replace with actual check-in date
  const currentDate = new Date(); //today's date

  const isWithin24Hours = (date1, date2) => {
    const hoursDifference = Math.abs(date1 - date2) / 36e5;
    return hoursDifference <= 24;
  };

  const getCancellationFee = () => {
    if (isCancelRoute && isWithin24Hours(currentDate, checkInDate)) {
      return 50; //cancellation fee applies!! INTEGRATIONS please put fee here
    } else {
      return 0; //no cancellation fee
    }
  };

  const onSubmit = async (formData) => {
    if (isCancelRoute) {
      setIsFetching(true);
      const response = await fetch(`${SERVER_URL}/bookings/${roomData.rid}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(response.status, data);

      if (response.ok) {
        navigate("success");
      }

      setIsFetching(false);
    } else {
      const body = {
        ...formData,
        startDate: roomData.startDate,
        endDate: roomData.endDate,
        numGuest: numGuests,
        totalPrice: total,
        pointsUsed: pointsUsed,
      };
      setIsFetching(true);
      const response = await fetch(
        `${SERVER_URL}/bookings?rid=${roomData.rid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log(response.status, data);
      setServerError({ status: response.status, message: data.message });

      if (response.ok) {
        navigate("/room/:id/book/success");
      }
      setIsFetching(false);
    }
  };

  return (
    <Container>
      <LeftSide>
        <div
          style={{
            borderBottom: "1px solid #888",
            paddingBottom: "30px",
            width: "500px ",
          }}
        >
          <Back onClick={() => navigate(-1)}>Back</Back>
          <BookingRequest>
            {isCancelRoute ? "Cancel Booking Request" : "Booking Request"}
          </BookingRequest>

          {isCancelRoute && isWithin24Hours(currentDate, checkInDate) && (
            <CheckInWarning>
              You have cancellations fees because you are canceling less than 24
              hours of your check-in date.
            </CheckInWarning>
          )}

          <InfoTitle>Location:</InfoTitle>
          <InfoText>
            {roomData.street_name}, {roomData.city}, {roomData.state}
          </InfoText>

          <InfoTitle>Dates:</InfoTitle>
          <InfoText>
            {roomData.startDate} - {roomData.endDate}
          </InfoText>

          <InfoTitle>Number of Guests:</InfoTitle>
          <InfoText>{numGuests}</InfoText>

          <InfoTitle>Reward Points Earned:</InfoTitle>
          <InfoText>10 points</InfoText>
        </div>

        <div
          style={{
            borderBottom: "1px solid #888",
            padding: "22px 0 30px 0",
            width: "500px ",
          }}
        >
          <InfoTitle>Apply Reward Points</InfoTitle>
          <InfoText>Points owned: 100 points</InfoText>
          <br />
          <FieldName>Apply points to reservation: </FieldName>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "5px",
            }}
          >
            <Input1 type="number" style={{ color: "black", margin: 0 }} />
            <SubmitButton
              style={{ width: "91px", height: "37px", padding: 0, margin: 0 }}
              type="submit"
            >
              Apply
            </SubmitButton>
          </div>
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

            {isCancelRoute && getCancellationFee() === 0 && (
              <NoFee>
                "No cancellation fees are charged for your request."
              </NoFee>
            )}

            <SubmitButton type="submit">
              {isCancelRoute ? (
                "Cancel Booking"
              ) : isFetching ? (
                <Ellipsis color="white" size={30} />
              ) : (
                "Pay & Reserve"
              )}
            </SubmitButton>
          </form>
        </div>
      </LeftSide>

      <RightSide>
        <Card>
          <Image>
            <img src={roomData.imageUrl} alt="hotel-room" />
          </Image>
          <Pricing>{isCancelRoute ? "Amount Due:" : "Pricing:"}</Pricing>
          <CostAndAmount>
            <div>
              {isCancelRoute
                ? "Cancellation Fees"
                : `${roomData.price} x {nights} nights`}
            </div>
            <Amount>
              {isCancelRoute
                ? `$${getCancellationFee()}`
                : dollarString.format(subtotal)}
            </Amount>
          </CostAndAmount>
          {!isCancelRoute && (
            <>
              <CostAndAmount>
                <div>Tax (8%)</div>
                <Amount>{dollarString.format(tax)}</Amount>
              </CostAndAmount>
              <CostAndAmount>
                <div>Discount from points</div>
                <Amount>-$10.00</Amount>
              </CostAndAmount>
            </>
          )}
          <Total>
            <div>Total (USD):</div>
            <TotalCost>
              {isCancelRoute
                ? `$${getCancellationFee()}`
                : dollarString.format(total)}
            </TotalCost>
          </Total>
        </Card>
      </RightSide>
    </Container>
  );
}

export default BookingForm;
