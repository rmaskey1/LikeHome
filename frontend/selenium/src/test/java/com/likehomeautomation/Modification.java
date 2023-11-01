package com.likehomeautomation;

import static com.codeborne.selenide.Selenide.$x;

import com.codeborne.selenide.SelenideElement;

public class Modification {
    public SelenideElement deleteBtn = $x("//*[@id='delete-account-button']");
    public SelenideElement confirmDeleteBtn = $x("//*[@id='confirm-button']");
    public SelenideElement cancelDeleteBtn = $x("//*[@id='cancel-button']");
    public SelenideElement editBtn = $x("//*[@id='edit-profile-button']");
}
