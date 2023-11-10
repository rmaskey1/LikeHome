package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class Details {
    public SelenideElement hotelName = $x("//*[@id='hotelName']");
    public SelenideElement reserveBtn = $x("//*[@id='reserve-btn']");
    public SelenideElement dropdownBtn = $x("//*[@id='dropdown-btn']");
    public SelenideElement editBtn = $x("//*[@id='edit-btn']");
    public SelenideElement deleteListingBtn = $x("//*[@id='delete-btn']");
    public SelenideElement confirmDeleteListingBtn = $x("//*[@id='confirm-delete-btn']");
    public SelenideElement cancelDeleteListingBtn = $x("//*[@id='cancel-delete-btn']");
    public SelenideElement doubleBookedWarning = $x("//*[@id='doubleBooking-warning']");
    public SelenideElement doubleBookedConfirm = $x("//*[@id='doubleBookedConfirm-btn']");
    public SelenideElement reservedContainer = $x("//*[@id='reserved-container']");
    public SelenideElement cancelBookingBtn = $x("//*[@id='cancel-booking-btn']");
    public SelenideElement modifyBookingBtn = $x("//*[@id='modify-booking-btn']");

    // listing details
    public SelenideElement price = $x("//*[@id='price-detail']");
    public SelenideElement fromDate = $x("//*[@id='fromDate-detail']");
    public SelenideElement toDate = $x("//*[@id='toDate-detail']");
    public SelenideElement beds = $x("//*[@id='beds-detail']");
    public SelenideElement bedType = $x("//*[@id='bedType-detail']");
    public SelenideElement guests = $x("//*[@id='guests-detail']");
    public SelenideElement bathrooms = $x("//*[@id='bathrooms-detail']");
    public SelenideElement amenities = $x("//*[@id='amenities-detail']");
}
