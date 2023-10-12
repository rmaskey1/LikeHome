import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { ReactComponent as PersonIcon } from "../icons/person-fill.svg";
import { ReactComponent as BedIcon } from "../icons/bed.svg";
import { ReactComponent as LaundryIcon } from "../icons/laundry.svg";
import { ReactComponent as SinkIcon } from "../icons/sink.svg";
import { ReactComponent as MicrowaveIcon } from "../icons/microwave.svg";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-top: 36px;
  width: fit-content;
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

  div {
    width: 385px;
    height: 310px;
    border: 1px solid #888888;
  }
  div img {
    width: 100%;
    height: 100%;
  }
`;

const Reserve = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 46px;
  width: 356px;
  border-radius: 15px;

  span {
    font-size: 30px;
    font-weight: 500;
  }
  button {
    width: 229px;
    height: 54px;
    border-radius: 20px;
    background-color: #cf316a;
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
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
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  // Function to handle the "Edit Listing" click event
  const handleEditListingClick = () => {
    // Use navigate to navigate to the desired route
    navigate("/hotel/:id/modify_listing");
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

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "590px" }}>
          <HotelName>Hotel Room</HotelName>
        </div>
        <div>
          <Dropdown onClick={toggleDropdown}>
            . . .
            <DropdownContent isOpen={isDropdownOpen}>
              <DropdownItem onClick={handleEditListingClick}>
                Edit Listing
              </DropdownItem>
              <DropdownItem onClick={openDeleteModal}>
                Delete Listing
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      <Location>123 Street, San Jose, California</Location>
      <Summary>4 Guests - 2 Beds - 1 Bath</Summary>
      <Board>
        <div>
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-17826786/original/d40f0877-fa17-44fc-ba4f-71a9cf205ce2.jpeg?im_w=960"
            alt="example"
          />
        </div>
        <Reserve>
          <span>$100 per night</span>
          <button>Reserve</button>
        </Reserve>
      </Board>
      <Divider />
      <Detail>
        <h1>Room Details</h1>
        <DetailItem>
          <PersonIcon />
          <span>4 Guests</span>
        </DetailItem>
        <DetailItem>
          <BedIcon />
          <span>2 Beds / 2 Queen-sized Beds</span>
        </DetailItem>
        <DetailItem>
          <SinkIcon />
          <span>1 Bath</span>
        </DetailItem>
      </Detail>
      <Divider />
      <Detail>
        <h1>Ammenities</h1>
        <DetailItem>
          <LaundryIcon />
          <span>Free washer - In Unit</span>
        </DetailItem>
        <DetailItem>
          <LaundryIcon />
          <span>Free dryer - In Unit</span>
        </DetailItem>
        <DetailItem>
          <MicrowaveIcon />
          <span>Microwave</span>
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
            <Buttons>Yes</Buttons>
          </div>
          <div>
            <Buttons onClick={closeDeleteModal}>No</Buttons>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default Details;
