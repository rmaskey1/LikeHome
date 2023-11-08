package com.likehomeautomation;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import com.codeborne.selenide.WebDriverRunner;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.HashMap;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class BookingTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();
    AddListing add = new AddListing();
    HashMap<Integer, SelenideElement> amenitiesMap = new HashMap<>();


    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        amenitiesMap.put(0, add.freeWifi);
        amenitiesMap.put(1, add.pool);
        amenitiesMap.put(2, add.tv);
        amenitiesMap.put(3, add.washer);
        amenitiesMap.put(4, add.dryer);
        amenitiesMap.put(5, add.parking);
        amenitiesMap.put(6, add.ac);
        amenitiesMap.put(7, add.breakfast);
        amenitiesMap.put(8, add.lunch);
        amenitiesMap.put(9, add.dinner);
        amenitiesMap.put(10, add.microwave);
        amenitiesMap.put(11, add.refrigerator);
        amenitiesMap.put(12, add.pet);
        amenitiesMap.put(13, add.spa);

        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000" ;
        open("/login");
    }

    @AfterEach
    public void tearDown(){
        WebDriverRunner.getWebDriver().quit();
    }

    @Test
    public void addListing_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        open("/room/add");
        Thread.sleep(1000);
        add.price.sendKeys("150");
        Thread.sleep(1000);


        assertEquals("200", home.responseCode.val());
    }

    void loginAsGuest() throws Exception{
        login.email.sendKeys("amy237@test.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }
}
