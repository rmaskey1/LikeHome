package com.likehomeautomation;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.$x;

public class Login {

        public SelenideElement email = $x("//*[@id='email-input']");
        public SelenideElement password = $x("//*[@id='password-input']");

        // submit
        public SelenideElement submitBtn = $x("//*[@id='submit-btn']");

}
