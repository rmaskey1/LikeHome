import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
// import Rating from "../icons/rating.svg";
// import Favorite from "../icons/favorite.svg";
// import FavoriteFilled from "../icons/favorite-filled.svg";


// const StyledP = styled.p`
// font-family: Rubik, sans-serif;
// color: #293545;
// font-weight: lighter;
// margin-top: 0px;
// margin-bottom: 5px;
// `;


const StyledCard = styled.div`
gap: none;
padding: none;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: flex-start;
`;


// const ImgContainer = styled.div`
// position: relative;
// border: none;
// border-radius: 10px;
// width: 300px;
// height: auto;
// object-fit: cover;
// overflow: hidden;
// margin-bottom: 15px;
// `;


// const StyledImg = styled.img`
// display: flex;
// flex-wrap: wrap;
// max-width: 400px;
// height: auto;
// `;


// const StyledCardDetails = styled.div`
// cursor: pointer;
// margin: 0px;
// `;


// const formatMonthAndDate = (dateString) => {
// const options = { month: "short", day: "numeric" };
// const date = new Date(dateString);
// const currentYear = new Date().getFullYear();
// const includeYear = date.getFullYear() !== currentYear;


// if (includeYear) {
// options.year = "numeric";
// }
// return date.toLocaleDateString(undefined, options);
// };


// const SliderNavsContainer = styled.div`
// position: absolute;
// bottom: 10px;
// left: 50%;
// transform: translateX(-50%);
// display: flex;
// align-items: center;
// `;


// const SliderNav = styled.span`
// width: 5px;
// height: 5px;
// border-radius: 50%;
// background-color: #c1bebe;
// margin: 0 5px;
// transition: transform 0.2s, width 0.2s, height 0.2s;
// cursor: pointer;


// &.active {
// width: 7px;
// height: 7px;
// background-color: #f8f9fa;
// }
// `;


// const SaveFavoriteIcon = styled.img`
// position: absolute;
// top: 10px;
// right: 10px;
// cursor: pointer;
// width: 30px;
// height: 30px;
// `;


function TestCard({ id, image, title, city, country, guests, beds, baths, price }) {
return (
    <StyledCard>
        <Link to={`/room/${id}`}>
        <div className="card">
            <img src = {image} alt={title} />
            <p>{title}</p>
            <p>{city}, {country}</p>
            <p>{guests} Guests - {beds} Beds - {baths} Baths</p>
            <p>${price} per night</p>
        </div>
        </Link>
    </StyledCard>
);
}


export default TestCard;
