package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class Home {
    public SelenideElement addBtn = $x("//*[@id='add-btn']");
    public SelenideElement responseCode = $x("//*[@id='home-response-code']");
}
