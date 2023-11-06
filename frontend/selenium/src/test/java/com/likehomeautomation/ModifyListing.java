package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class ModifyListing {
    public SelenideElement price = $x("//*[@id='price-field']");
    public SelenideElement fromDate = $x("//*[@id='fromDate-field']");
    public SelenideElement toDate = $x("//*[@id='toDate-field']");
    public SelenideElement beds = $x("//*[@id='beds-field']");
    public SelenideElement bedType = $x("//*[@id='bedType-field']");
    public SelenideElement guests = $x("//*[@id='guests-field']");
    public SelenideElement bathrooms = $x("//*[@id='bathrooms-field']");

    // optional amenities
    public SelenideElement freeWifi = $x("//*[@id='freeWifi-box']");
    public SelenideElement pool = $x("//*[@id='pool-box']");
    public SelenideElement tv = $x("//*[@id='tv-box']");
    public SelenideElement washer = $x("//*[@id='washer-box']");
    public SelenideElement dryer = $x("//*[@id='dryer-box']");
    public SelenideElement parking = $x("//*[@id='parking-box']");
    public SelenideElement ac = $x("//*[@id='ac-box']");
    public SelenideElement breakfast = $x("//*[@id='breakfast-box']");
    public SelenideElement lunch = $x("//*[@id='lunch-box']");
    public SelenideElement dinner = $x("//*[@id='dinner-box']");
    public SelenideElement microwave = $x("//*[@id='microwave-box']");
    public SelenideElement refrigerator = $x("//*[@id='refrigerator-box']");
    public SelenideElement pet = $x("//*[@id='pet-box']");
    public SelenideElement spa = $x("//*[@id='spa-box']");

    // submit
    public SelenideElement submitBtn = $x("//*[@id='submit-btn']");

    // errors
    public SelenideElement priceError = $x("//*[@id='price-error']");
    public SelenideElement fromDateError = $x("//*[@id='fromDate-error']");
    public SelenideElement toDateError = $x("//*[@id='toDate-error']");
    public SelenideElement bedsError = $x("//*[@id='beds-error']");
    public SelenideElement bedTypeError = $x("//*[@id='bedType-error']");
    public SelenideElement guestsError = $x("//*[@id='guests-error']");
    public SelenideElement bathroomsError = $x("//*[@id='bathrooms-error']");
    public SelenideElement imageUrlError = $x("//*[@id='image-error']");
}
