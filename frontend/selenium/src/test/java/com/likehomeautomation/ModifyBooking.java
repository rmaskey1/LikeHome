package com.likehomeautomation;

import static com.codeborne.selenide.Selenide.$x;

import com.codeborne.selenide.SelenideElement;

public class ModifyBooking {
    // inputs
    public SelenideElement clickableBookingCard = $x("//*[@id='moon-icon']");
    public SelenideElement checkOutDateInput = $x("//*[@id='checkout-date-input']");
    public SelenideElement numberOfGuestsInput = $x("//*[@id='number-of-guests-input']");
    public SelenideElement updateBtn = $x("//*[@id='update-btn']");

    // errors
    public SelenideElement guestsError = $x("//*[@id='guests-error']");
    public SelenideElement datesError = $x("//*[@id='dates-available-error']");
}
