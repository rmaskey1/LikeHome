package com.likehomeautomation;

import static com.codeborne.selenide.Selenide.$x;

import com.codeborne.selenide.SelenideElement;

public class Modification {
    // hotel inputs
    public SelenideElement hName = $x("//*[@id='hotel-name-input']");
    public SelenideElement street = $x("//*[@id='street-name-input']");
    public SelenideElement city = $x("//*[@id='city-input']");
    public SelenideElement zip = $x("//*[@id='zip-input']");
    public SelenideElement state = $x("//*[@id='state-input']");
    public SelenideElement country = $x("//*[@id='country-input']");

    // both's inputs
    public SelenideElement email = $x("//*[@id='email-input']");
    public SelenideElement fname = $x("//*[@id='fname-input']");
    public SelenideElement lname = $x("//*[@id='lname-input']");
    public SelenideElement phone = $x("//*[@id='phone-input']");
    public SelenideElement password = $x("//*[@id='passw']");

    // buttons
    public SelenideElement deleteBtn = $x("//*[@id='delete-account-button']");
    public SelenideElement confirmDeleteBtn = $x("//*[@id='confirm-button']");
    public SelenideElement cancelDeleteBtn = $x("//*[@id='cancel-button']");
    public SelenideElement editBtn = $x("//*[@id='edit-profile-button']");
    public SelenideElement updateBtn = $x("//*[@id='update-btn']");
    public SelenideElement backBtn = $x("//*[@id='back-btn']");

    // profile displays
    public SelenideElement emailDisplay = $x("//*[@id='email-content']");
    public SelenideElement fnameDisplay = $x("//*[@id='first-name-content']");
    public SelenideElement lnameDisplay = $x("//*[@id='last-name-content']");
    public SelenideElement phoneDisplay = $x("//*[@id='phone-number-content']");

    // errors
    public SelenideElement hnameError = $x("//*[@id='hname-error']");
    public SelenideElement snameError = $x("//*[@id='sname-error']");
    public SelenideElement cityError = $x("//*[@id='city-error']");
    public SelenideElement zipError = $x("//*[@id='zip-error']");
    public SelenideElement stateError = $x("//*[@id='state-error']");
    public SelenideElement countryError = $x("//*[@id='country-error']");
    public SelenideElement emailError = $x("//*[@id='email-error']");
    public SelenideElement fnameError = $x("//*[@id='fname-error']");
    public SelenideElement lnameError = $x("//*[@id='lname-error']");
    public SelenideElement phoneError = $x("//*[@id='phone-error']");
    // public SelenideElement passwordError =
    // $x("//*[@id='password-error-message']");
}
