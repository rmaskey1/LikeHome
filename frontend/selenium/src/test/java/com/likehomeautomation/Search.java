package com.likehomeautomation;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$x;

import com.codeborne.selenide.SelenideElement;

public class Search {
    // base inputs
    public SelenideElement locationInput = $x("//*[@id='location']");
    public SelenideElement guestsInput = $x("//*[@id='guests']");
    public SelenideElement fromInput = $x("//*[@id='startDate']");
    public SelenideElement toInput = $x("//*[@id='endDate']");
    // filters
    public SelenideElement minPriceInput = $x("//*[@id='min-input']");
    public SelenideElement maxPriceInput = $x("//*[@id='max-input']");
    public SelenideElement numOfBedsInput = $x("//*[@id='bed-input']");
    public SelenideElement numOfGuestsInput = $x("//*[@id='guests-input']");
    public SelenideElement numOfBathroomsInput = $x("//*[@id='bathrooms-input']");

    public SelenideElement bedTypeBtn(String option) {
        return $x("//*[@id='bedType_" + option + "']");
    }

    // String bedTypeOption = "yourBedType"; // Replace with the actual bed type
    // search.bedTypeBtn(bedTypeOption).click();

    public SelenideElement amenityCheckbox(int index) {
        return $x("//*[@id='amenityCheckbox_" + index + "']");
    }
    // int amenityIndex = 0; // Replace with the actual index
    // search.amenityCheckbox(amenityIndex).click();

    // search
    public SelenideElement searchBtn = $x("//*[@id='search-btn']");
    public SelenideElement filterBtn = $x("//*[@id='filterButton']");
    public SelenideElement submitFilterBtn = $x("//*[@id='start-filter-btn']");

    // preview cards
    public SelenideElement previewCard = $x("//*[@id='previewCardSelect']");
    public SelenideElement locationDetail = $x("//*[@id='locationdetail']");

    // errors
    public SelenideElement guestsError = $x("//*[@id='guest-error']");
    // Number of guests must be greater than 0
    public SelenideElement dateError = $x("//*[@id='from-error']");
    // Invalid date format (mm/dd/yyyy)
    SelenideElement dateToError = $x("//*[@id='to-error']");
    // Date must be in the future
    SelenideElement minError = $x("//*[@id='min-message']");
    // Price must be non-negative
    SelenideElement maxError = $x("//*[@id='max-message']");
    // Max price must be greater than min price
    SelenideElement numOfBedsError = $x("//*[@id='beds-message']");
    // Number of Beds must be non-negative
    SelenideElement numOfGuestsError = $x("//*[@id='guests-error']");
    // Number of Guests must be greater than 0
    SelenideElement numOfBathsError = $x("//*[@id='baths-error']");
    // Number of Bathrooms must be non-negative
}
