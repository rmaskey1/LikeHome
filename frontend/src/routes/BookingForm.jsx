import styled from "styled-components";
import { useForm } from "react-hook-form";
import { SERVER_URL, getUserInfo } from "api";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Ellipsis } from "react-spinners-css";
import { useQuery } from "react-query";
import { format, parse } from "date-fns";

const Container = styled.main`
  width: 100vw;
  height: 110vh;
  display: flex;
  justify-content: center;
  margin-top: 36px;
  //position: center;
  //margin-left: 5%;
`;

const LeftBox = styled.div`
  margin-top: 40px;
  margin-left: 50px;
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center; /* Center vertically */
  //margin-bottom: 20px; /* Add some spacing from the form */
`;

const Back = styled.div`
  font-size: 16px;
  font-weight: bold;
  //margin: 50px 0;
  //margin-bottom: 20px;
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

const NoFeeContainer = styled.div`
  display: flex;
  justify-content: center;
  //margin-top: 10px;
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
  const isCancelRoute = window.location.pathname.includes("/cancel");
  const { roomData, numGuests } = location.state;
  const [isFetching, setIsFetching] = useState(false);
  const [serverError, setServerError] = useState({ status: 0, message: "" });
  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [expirationDate, setExpirationDate] = useState("12/34");
  const [cvc, setCVC] = useState("121");
  const applyInputRef = useRef(null);
  const [pointsUsed, setPointsUsed] = useState(0);

  const { isLoading: isUserInfoLoading, data: userInfo } = useQuery(
    ["userinfo"],
    getUserInfo
  );

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
  const total = subtotal + tax - pointsUsed / 10;
  const rewardPointsEarned = Math.floor(total * 0.5);
  console.log(rewardPointsEarned);

  let dollarString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const checkInDateParts = roomData.startDate.split(", ");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateParts = checkInDateParts[0].split(" ");
  const month = monthNames.indexOf(dateParts[0]);
  const day = parseInt(dateParts[1]);
  const year = parseInt(checkInDateParts[1]);

  const checkInDate = new Date(year, month, day);
  const currentDate = new Date(); //2023, 10, 11 Mmonths are 0-indexed (10 represents November).

  console.log("checkindate", checkInDate);
  console.log("currentdate", currentDate);

  const threeDaysPrior = (currentDate, checkInDate) => {
    const hoursDifference = Math.abs(currentDate - checkInDate) / 36e5;
    return hoursDifference <= 72;
  };

  console.log("3 days", threeDaysPrior(currentDate, checkInDate));

  const getCancellationFee = () => {
    if (isCancelRoute && threeDaysPrior(currentDate, checkInDate)) {
      return Math.round(total * 0.2); // Cancellation fee applies within 3 days
    } else {
      return 0; // No cancellation fee
    }
  };

  const onSubmit = async (formData) => {
    if (isCancelRoute) {
      //calculating cancellation fee
      const cancellationFee = getCancellationFee();

      //request body with the cancellation fee
      const body = {
        cancellationFee: cancellationFee,
      };

      const response = await fetch(`${SERVER_URL}/bookings/${roomData.rid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), //including cancellation fee in the request body
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
        pointsUsed,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvc: cvc,
        rewardPointsEarned,
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
        if (data.error) setServerError({ ...serverError, message: data.error });
        else navigate("success");
      }
      setIsFetching(false);
    }
  };

  const handleApplyRewardPoint = () => {
    const value = applyInputRef.current.value;
    if (!isUserInfoLoading) {
      if (value > userInfo.rewardPoints) {
        alert("You cannot apply reward points greater than that you own");
      } else {
        setPointsUsed(value);
      }
    }
  };

  return (
    <>
      <LeftBox>
        <Back onClick={() => navigate(-1)}>Back</Back>
      </LeftBox>
      <Container>
        <LeftSide>
          <div
            style={{
              borderBottom: "1px solid #888",
              paddingBottom: "30px",
              width: "500px ",
            }}
          >
            <BookingRequest id="bookingForm-title">
              {isCancelRoute ? "Cancel Booking Request" : "Booking Request"}
            </BookingRequest>

            {isCancelRoute && threeDaysPrior(currentDate, checkInDate) && (
              <CheckInWarning>
                You have cancellations fees because you are canceling within 3
                days of your check-in date.
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
          </div>

          <div
            style={{
              borderBottom: "1px solid #888",
              padding: "22px 0 30px 0",
              width: "500px ",
            }}
          >
            <InfoTitle>
              Reward Points {isCancelRoute ? "Earned" : "to Earn"}:
            </InfoTitle>
            <InfoText>{rewardPointsEarned} points</InfoText>
          </div>
          {!isCancelRoute && (
            <div
              style={{
                borderBottom: "1px solid #888",
                padding: "22px 0 30px 0",
                width: "500px ",
              }}
            >
              <InfoTitle>Apply Reward Points</InfoTitle>
              <InfoText>
                Points owned: {isUserInfoLoading ? "0" : userInfo.rewardPoints}{" "}
                points
              </InfoText>
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
                <Input1
                  ref={applyInputRef}
                  type="number"
                  min={0}
                  defaultValue={0}
                  style={{ color: "black", margin: 0 }}
                />
                <SubmitButton
                  style={{
                    width: "91px",
                    height: "37px",
                    padding: 0,
                    margin: 0,
                  }}
                  type="submit"
                  onClick={handleApplyRewardPoint}
                >
                  Apply
                </SubmitButton>
              </div>
            </div>
          )}

          {!isCancelRoute && (
            <div>
              <Payment>Payment</Payment>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldName>Card Number</FieldName>
                <Input1
                  {...register("cardNumber", {
                    required: "Card Number is required",
                    valueAsNumber: true,
                  })}
                  id="cardNum-input"
                  type="number"

                  style={{ color: "black" }}
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {errors.cardNumber && (
                  <ErrorText className="error-text">
                    <span id="cardNum-error">{errors.cardNumber.message.toString()}</span>
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
                      id="cardExp-input"
                      type="text"
                      style={{ color: "black" }}
                      name="expirationDate"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                    {errors.expirationDate && (
                      <ErrorText className="error-text">
                        <span id="cardExp-error">{errors.expirationDate.message.toString()}</span>
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
                      id="cardCvc-input"
                      style={{ color: "black" }}
                      name="cvc"
                      value={cvc}
                      onChange={(e) => setCVC(e.target.value)}
                    />
                    {errors.cvc && (
                      <ErrorText2 className="error-text">
                        <span id="cardCvc-error">{errors.cvc.message.toString()}</span>
                      </ErrorText2>
                    )}
                  </div>
                </div>

                {serverError && (
                  <ErrorText2 className="error-text">
                    <span>{serverError.message}</span>
                  </ErrorText2>
                )}
                <SubmitButton id="submitBooking-btn" type="submit">
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
          )}
          {isCancelRoute && (
            <div
              style={{
                padding: "22px 0 30px 0",
                width: "500px ",
              }}
            >
              <InfoTitle>Cancellation Within 3 Days Refund Policy:</InfoTitle>
              {threeDaysPrior(currentDate, checkInDate) ? (
                <>
                  <InfoText>
                    Only a partial refund will be provided due to cancellation
                    within 3 days. The refund is calculated by the formula:
                    total reservation price - cancellation fee.
                  </InfoText>
                </>
              ) : (
                <NoFeeContainer>
                  <NoFee>
                    No cancellation fees are charged for your request.
                  </NoFee>
                </NoFeeContainer>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <SubmitButton id="cancel-booking-btn" type="submit"> Cancel Booking</SubmitButton>
              </form>
            </div>
          )}
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
                  : `${roomData.price} x ${nights} nights`}
              </div>
              <Amount id="cancel-fee">
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
                  <Amount>-{dollarString.format(pointsUsed / 10)}</Amount>
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
    </>
  );
}

export default BookingForm;
