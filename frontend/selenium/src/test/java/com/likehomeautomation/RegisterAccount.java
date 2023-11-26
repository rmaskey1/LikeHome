package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class RegisterAccount {
    // Inputs
    public SelenideElement firstNameInput = $x("//*[@id='firstname-input']");
    public SelenideElement lastNameInput = $x("//*[@id='lastname-input']");
    public SelenideElement emailInput = $x("//*[@id='email-input-r']");
    public SelenideElement passwordInput = $x("//*[@id='password-input-r']");
    public SelenideElement phoneNumberInput = $x("//*[@id='phone-input']");
    public SelenideElement guestBtn = $x("//*[@id='guest-radio']");
    public SelenideElement hotelBtn = $x("//*[@id='hotel-radio']");

    // Submit
    public SelenideElement submitBtn = $x("//*[@id='signup-button']");

    // errors
    public SelenideElement fnameError = $x("//*[@id='firstname-error']");
    public SelenideElement lnameError = $x("//*[@id='lastname-error']");
    SelenideElement emailError = $x("//*[@id='email-error']");
    public SelenideElement phoneError = $x("//*[@id='phone-error']");
    public SelenideElement passwordError = $x("//*[@id='password-error']");
}
