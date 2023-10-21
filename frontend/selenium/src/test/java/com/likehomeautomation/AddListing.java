package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class AddListing {
    public SelenideElement price = $x("//*[name()='Input' and @id='price-input']");


}