package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import java.util.List;

import static com.codeborne.selenide.Selenide.$x;

public class MyBookings {
    public SelenideElement bookingName = $x("//*[@id='bookedName']");

}
