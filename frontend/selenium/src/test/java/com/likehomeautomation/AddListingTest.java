package com.likehomeautomation;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import com.likehomeautomation.AddListing;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import com.codeborne.selenide.logevents.SelenideLogger;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;

import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.File;

import static com.codeborne.selenide.Selenide.open;

public class AddListingTest {

    AddListing add = new AddListing();

    @BeforeAll
    public static void setUpAll() {
//        WebDriverManager.chromedriver().setup();
//        System.setProperty("webdriver.chrome.driver", "/frontend/node_modules/chromedriver");
//        System.setProperty("webdriver.gecko.driver", "/frontend/node_modules/geckodriver");
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
//        Configuration.browserCapabilities = new FirefoxOptions().addArguments("--remote-allow-origins=*");
        Configuration.browserCapabilities = new ChromeOptions().addArguments("--remote-allow-origins=*");
        open("http://127.0.0.1:3000");
    }

    @Test
    public void addListing() throws Exception {

        Thread.sleep(500);
        add.price.sendKeys("150");
    }
}
