import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import { useNavigate, useParams, useLocation } from "react-router-dom";

import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as BedIcon } from "../icons/bed.svg";
import { ReactComponent as SinkIcon } from "../icons/sink.svg";
import { useQuery } from "react-query";
import "react-calendar/dist/Calendar.css";
import { SERVER_URL, getListing, getMyBooking } from "api";
import Amenity from "components/Amenity";
import DoubleBookingWarning from "components/DoubleBookingWarning";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 36px;
  width: 70%;
  height: 100vh;
  padding: 20px;
`;

const HotelName = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const Location = styled.div`
  margin-top: 12px;
  font-size: 26px;
  font-weight: 400;
`;

const Summary = styled.div`
  margin-top: 7px;
  font-size: 20px;
`;

const Board = styled.div`
  display: flex;
  margin-top: 19px;
  gap: 32px;
  div img {
    width: 100%;
    height: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 385px;
  height: 310px;
  border: 1px solid #888888;
`;

const Reserve = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 356px;
  height: 310px;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 15px;
`;

const Reservebtn = styled.button`
  width: 243px;
  height: 42px;
  border-radius: 20px;
  background-color: #cf316a;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &.gray-button {
    background-color: #888888; /* Use the desired gray color */
    cursor: not-allowed;
  }
`;

const ReserveForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReserveDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const ReserveInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
`;
const ReserveInputLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ReserveDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 44px;
  letter-spacing: 1px;
  border-radius: 2px;
  font-weight: 400;
  font-size: 16px;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 10px;
  span {
    font-size: 10px;
    font-weight: 600;
  }
`;

const GuestModBtn = styled.button`
  width: 20px;
  height: 20px;
  background: white;
  color: #7a7a7a;
  border: 1px solid #b0b0b0;
  border-radius: 15px;
  padding: 0;
  outline: 0;
  cursor: pointer;
  line-height: 18px;

  &:hover {
    border-color: #7a7a7a;
  }
`;

const Divider = styled.div`
  width: 744px;
  height: 1px;
  background-color: #888888;
  margin: 30px 0;
`;

const Detail = styled.div`
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 33px;

  svg {
    width: 30px;
    height: 30px;
    stroke-width: 3px;
  }

  span {
    font-size: 24px;
    font-weight: 400;
  }

  li {
    margin-left: 50px;
    list-style-type: disc;
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
    max-width: 55%;
  }
`;

const Dropdown = styled.div`
  cursor: pointer;
  user-select: none;
  font-size: 30px;
  font-weight: 600;
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 400;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #cf316a;
    color: #ffffff;
  }
`;

const Buttons = styled.button`
  background-color: #cf316a;
  width: 126px;
  height: 31px;
  font-size: 16px;
  color: #ffffff;
  padding: 5px 30px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    border: 2px solid #cf316a;
    color: #cf316a;
    background-color: #ffffff;
  }
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
`;

function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const { state: stateData } = useLocation();

  console.log("state", stateData);
  console.log("roomData", roomData);

  const [showDoubleBookingWarning, setShowDoubleBookingWarning] =
    useState(false);
  const [isDoubleBooking, setIsDoubleBooking] = useState(false); //check if double booking here!

  const rid = params.id;
  const userinfo = localStorage.userinfo
    ? JSON.parse(localStorage.userinfo)
    : {};

  const { isLoading: bookingIsLoading, data: bookingData } = useQuery(
    ["myBooking"],
    getMyBooking
  );

  const [numGuests, setNumGuests] = useState(2);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to handle the "Edit Listing" click event
  const handleEditListingClick = () => {
    // Use navigate to navigate to the desired route
    navigate(`modify`, { state: roomData });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const dateFormatted = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    });
  };

  const deleteListing = async () => {
    await fetch(`${SERVER_URL}/listing/${rid}`, { method: "delete" });
    await navigate("/home");
  };

  const isGuest = userinfo.accountType === "guest";

  const isReserved = //BANDAID SOLUTION!! please look into it more INTEGRATIONS!!
    isGuest &&
    !bookingIsLoading &&
    Array.isArray(bookingData) &&
    bookingData.find((b) => b.rid === rid);

  //isGuest && !bookingIsLoading && bookingData.find((b) => b.rid === rid);

  const { isLoading, data: fetchData } = useQuery(["listing"], () =>
    getListing(rid)
  );

  /*
  useEffect(() => {
    if (stateData) setRoomData(stateData);
    if (stateData == null && !isLoading) setRoomData(fetchData);
  }, [fetchData, isLoading, stateData]);
  */

  useEffect(() => {
    if (stateData) {
      if (stateData.roominfo) {
        console.log("case 1");
        //case 1: {roominfo} structure
        setRoomData(stateData.roominfo);
      } else {
        console.log("case 2", stateData);
        setRoomData(stateData);
      }
    } else if (stateData == null && !isLoading) {
      setRoomData(fetchData);
    }
  }, [fetchData, isLoading, stateData]);

  const isCheckInDateToday =
    roomData &&
    new Date().toLocaleDateString() ===
      new Date(roomData.startDate).toLocaleDateString();

  console.log("is checkin today?", isCheckInDateToday);
  console.log("today", new Date());
  //console.log("checkin", new Date(roomData.startDate));

  const handleConfirm = () => {
    setShowDoubleBookingWarning(false);
  };

  const getDaysArray = (start, end) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {
    let bookedDates = [];

    if (Array.isArray(bookingData)) {
      //wrapped this in an array bc it was giving "bookingData.forEach is not a function" errors
      bookingData.forEach((b) => {
        bookedDates = [...bookedDates, ...getDaysArray(b.startDate, b.endDate)];
      });
    }

    roomData &&
      getDaysArray(roomData.startDate, roomData.endDate).forEach((date) => {
        for (let i = 0; i < bookedDates.length; i++) {
          if (bookedDates[i].getTime() === date.getTime()) {
            setIsDoubleBooking(true);
            break;
          }
        }
      });
  }, [bookingData, roomData]);

  return (
    <Container>
      {roomData === null ? (
        "Loading..."
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "525px" }}>
              <HotelName id="hotelName">{roomData.hotelName}</HotelName>
            </div>
            <div>
              {userinfo.accountType === "hotel" && (
                <Dropdown id="dropdown-btn" onClick={toggleDropdown}>
                  . . .
                  {isDropdownOpen && (
                    <DropdownContent>
                      <DropdownItem
                        id="edit-btn"
                        onClick={handleEditListingClick}
                      >
                        Edit Listing
                      </DropdownItem>
                      <DropdownItem id="delete-btn" onClick={openDeleteModal}>
                        Delete Listing
                      </DropdownItem>
                    </DropdownContent>
                  )}
                </Dropdown>
              )}
            </div>
          </div>

          <Location>{`${roomData.street_name}, ${roomData.city}, ${roomData.state}`}</Location>
          <Summary>
            {roomData.numberGuests} Guests - {roomData.numberOfBeds} Beds -{" "}
            {roomData.numberOfBathrooms} Bath
          </Summary>
          <Board>
            <ImgContainer>
              <img src={roomData.imageUrl} alt="example" />
            </ImgContainer>

            {isGuest && isReserved ? (
              <Reserve id="reserved-container">
                <div>You are currently reserving this listing.</div>
                {isCheckInDateToday ? (
                  <Reservebtn
                    id="modify-booking-btn"
                    className="gray-button"
                    disabled
                  >
                    Modify Booking
                  </Reservebtn>
                ) : (
                  <Reservebtn
                    id="modify-booking-btn"
                    onClick={() =>
                      navigate(`/mybooking/${rid}/modify`, {
                        state: { roomData, numGuests },
                      })
                    }
                  >
                    Modify Booking
                  </Reservebtn>
                )}
                {isCheckInDateToday ? (
                  <Reservebtn
                    id="cancel-booking-btn"
                    className="gray-button"
                    disabled
                  >
                    Cancel Booking
                  </Reservebtn>
                ) : (
                  <Reservebtn
                    id="cancel-booking-btn"
                    onClick={() =>
                      navigate(`/mybooking/${rid}/cancel`, {
                        state: { roomData, numGuests },
                      })
                    }
                  >
                    Cancel Booking
                  </Reservebtn>
                )}
              </Reserve>
            ) : (
              //Render the default reserve container if not a guest or not reserved
              <Reserve>
                <div>
                  <span
                    id="price-detail"
                    style={{ fontSize: "30px", fontWeight: 600 }}
                  >
                    ${roomData.price}
                  </span>{" "}
                  <span style={{ fontSize: "20px", fontWeight: 400 }}>
                    per night
                  </span>
                </div>
                <ReserveForm>
                  <ReserveDateContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Check-in Date</ReserveInputLabel>
                      <ReserveDate id="fromDate-detail">
                        {dateFormatted(roomData.startDate)}
                      </ReserveDate>
                    </ReserveInputContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Check-out Date</ReserveInputLabel>
                      <ReserveDate id="toDate-detail">
                        {dateFormatted(roomData.endDate)}
                      </ReserveDate>
                    </ReserveInputContainer>
                  </ReserveDateContainer>
                  <ReserveDateContainer>
                    <ReserveInputContainer>
                      <ReserveInputLabel>Guests</ReserveInputLabel>
                      <ReserveDate
                        style={{
                          width: "100%",
                          justifyContent: "space-between",
                          padding: "0 20px",
                        }}
                      >
                        <GuestModBtn
                          onClick={() =>
                            numGuests > 1 && setNumGuests(numGuests - 1)
                          }
                        >
                          -
                        </GuestModBtn>
                        <div>{numGuests} Guests</div>
                        <GuestModBtn
                          onClick={() =>
                            numGuests < roomData.numberGuests &&
                            setNumGuests(numGuests + 1)
                          }
                        >
                          {" "}
                          +
                        </GuestModBtn>
                      </ReserveDate>
                    </ReserveInputContainer>
                  </ReserveDateContainer>
                </ReserveForm>
                <Reservebtn
                  id="reserve-btn"
                  onClick={() => {
                    if (isDoubleBooking) {
                      setShowDoubleBookingWarning(true);
                    } else {
                      navigate("book", { state: { roomData, numGuests } });
                    }
                  }}
                >
                  Reserve
                </Reservebtn>
                {showDoubleBookingWarning && (
                  <DoubleBookingWarning onConfirm={handleConfirm} />
                )}
              </Reserve>
            )}
          </Board>
          <Divider />
          <Detail>
            <h1>Room Details</h1>
            <DetailItem>
              <PersonIcon />
              <span id="guests-detail">{roomData.numberGuests} Guests</span>
            </DetailItem>
            <DetailItem>
              <BedIcon />
              <span id="beds-detail">
                {roomData.numberOfBeds} Bed(s){" "}
                <span id="bedType-detail">({roomData.bedType})</span>
              </span>
            </DetailItem>
            <DetailItem>
              <SinkIcon />
              <span id="bathrooms-detail">
                {roomData.numberOfBathrooms} Bath
              </span>
            </DetailItem>
          </Detail>
          <Divider />

          <Detail>
            <h1>Amenities</h1>
            <div id="amenities-detail">
              {roomData.Amenities?.map((item, i) => (
                <Amenity key={i} item={item} />
              ))}
            </div>
          </Detail>
          <Divider />
          <Detail>
            <h1>Cancellation Policy</h1>
            <DetailItem>
              <ul>
                <li>
                  Cancellation is NOT allowed on the day of or after your
                  check-in date.
                </li>
                <li>
                  A cancellation fee 20% of your reservation's total price will
                  be charged if reservation is canceled within 3 days of
                  check-in date.
                </li>
                <li>
                  FULL refund is possible only if you cancel at least 4 days
                  prior to your check-in date (with the exception that the
                  reservation is made within 3 days of check-in date)
                </li>
                <li>
                  Cancellations will refund the reward points that were used on
                  the reservation
                </li>
              </ul>
            </DetailItem>
            <DetailItem style={{ marginLeft: "20px" }}>
              <span>For example:</span>
            </DetailItem>
            <DetailItem>
              <ul>
                <li style={{ marginBottom: "0", maxWidth: "80%" }}>
                  Check-in date is Jan 29
                </li>
                <li style={{ marginBottom: "0", maxWidth: "80%" }}>
                  Cancellation before Jan 26 is fully refundable
                </li>
                <li style={{ marginBottom: "0", maxWidth: "80%" }}>
                  Cancellation between Jan 26 (inclusive) and 29 (exclusive)
                  will have a fee
                </li>
              </ul>
            </DetailItem>
          </Detail>

          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={closeDeleteModal}
            contentLabel="Delete Listing Modal"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              },
              content: {
                width: "400px",
                height: "fit-content",
                margin: "auto",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                border: "none",
              },
            }}
          >
            <SectionTitle>
              Are you sure you want to delete this listing?
            </SectionTitle>
            <br />
            <p>This action is irreversible.</p>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <Buttons id="confirm-delete-btn" onClick={deleteListing}>
                  Yes
                </Buttons>
              </div>
              <div>
                <Buttons id="cancel-delete-btn" onClick={closeDeleteModal}>
                  No
                </Buttons>
              </div>
            </div>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Details;
