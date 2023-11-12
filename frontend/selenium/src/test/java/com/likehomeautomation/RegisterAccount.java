package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class RegisterAccount {
    // Inputs for both
    public SelenideElement firstNameInput = $x("//*[@id='firstname-input']");
    public SelenideElement lastNameInput = $x("//*[@id='lastname-input']");
    public SelenideElement emailInput = $x("//*[@id='email-input-r']");
    public SelenideElement passwordInput = $x("//*[@id='password-input-r']");
    public SelenideElement phoneNumberInput = $x("//*[@id='phone-input']");
    public SelenideElement guestBtn = $x("//*[@id='guest-radio']");
    public SelenideElement hotelBtn = $x("//*[@id='hotel-radio']");

    // inputs for hotels
    public SelenideElement hNameInput = $x("//*[@id='hotelName-input']");
    public SelenideElement sNameInput = $x("//*[@id='streetName-input']");
    public SelenideElement cityInput = $x("//*[@id='city-input']");
    public SelenideElement zipInput = $x("//*[@id='zip-input']");
    public SelenideElement stateInput = $x("//*[@id='state-input']");
    public SelenideElement countryInput = $x("//*[@id='country-input']");

    // Submit
    public SelenideElement submitBtn = $x("//*[@id='signup-button']");

    // errors
    public SelenideElement fnameError = $x("//*[@id='firstname-error']");
    public SelenideElement lnameError = $x("//*[@id='lastname-error']");
    SelenideElement emailError = $x("//*[@id='email-error']");
    public SelenideElement phoneError = $x("//*[@id='phone-error']");
    public SelenideElement passwordError = $x("//*[@id='password-error']");
    public SelenideElement hNameError = $x("//*[@id='hotelName-error']");
    public SelenideElement sNameError = $x("//*[@id='streetName-error']");
    public SelenideElement cityError = $x("//*[@id='city-error']");
    public SelenideElement zipError = $x("//*[@id='zip-error']");
    public SelenideElement stateError = $x("//*[@id='state-error']");
    public SelenideElement countryError = $x("//*[@id='country-error']");
}
