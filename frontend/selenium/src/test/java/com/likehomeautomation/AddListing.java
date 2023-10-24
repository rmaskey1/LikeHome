package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class AddListing {
    // required inputs
    public SelenideElement price = $x("//*[@id='price-input']");
    public SelenideElement fromDate = $x("//*[@id='fromDate-input']");
    public SelenideElement toDate = $x("//*[@id='toDate-input']");
    public SelenideElement beds = $x("//*[@id='beds-input']");
    public SelenideElement bedType = $x("//*[@id='bedType-input']");
    public SelenideElement guests = $x("//*[@id='guests-input']");
    public SelenideElement bathrooms = $x("//*[@id='bathrooms-input']");
    public SelenideElement imageUrl = $x("//*[@id='image-input']");

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


}