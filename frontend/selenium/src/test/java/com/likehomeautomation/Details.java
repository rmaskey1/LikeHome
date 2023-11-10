package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class Details {
    public SelenideElement dropdownBtn = $x("//*[@id='dropdown-btn']");
    public SelenideElement editBtn = $x("//*[@id='edit-btn']");
    public SelenideElement deleteBtn = $x("//*[@id='delete-btn']");
    public SelenideElement confirmDeleteBtn = $x("//*[@id='confirm-delete-btn']");
    public SelenideElement cancelDeleteBtn = $x("//*[@id='cancel-delete-btn']");
    public SelenideElement responseCode = $x("//*[@id='modify-response-code']");

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
