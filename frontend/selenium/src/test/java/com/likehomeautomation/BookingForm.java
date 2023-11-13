package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class BookingForm {
    // input fields
    public SelenideElement bookingFormTitle = $x("//*[@id='bookingForm-title']");

    public SelenideElement cardNum = $x("//*[@id='cardNum-input']");
    public SelenideElement cardExp = $x("//*[@id='cardExp-input']");
    public SelenideElement cardCvc = $x("//*[@id='cardCvc-input']");

    public SelenideElement submitBtn = $x("//*[@id='submitBooking-btn']");
    public SelenideElement cancelBookingBtn = $x("//*[@id='cancel-booking-btn']");

    public SelenideElement bookingSuccessBtn = $x("//*[@id='confirmBookingSuccess-btn']");

    public SelenideElement cancelFee = $x("//*[@id='cancel-fee']");

    // error messages
    public SelenideElement cardNumError = $x("//*[@id='cardNum-error']");
    public SelenideElement cardExpError = $x("//*[@id='cardExp-error']");
    public SelenideElement cardCvcError = $x("//*[@id='cardCvc-error']");

    // alerts
    public SelenideElement bookingSuccess = $x("//*[@id='successfulBooking-alert']");
}
