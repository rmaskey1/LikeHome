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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static com.codeborne.selenide.Selenide.open;

public class AddListingTest {
    AddListing add = new AddListing();
    HashMap<Integer, SelenideElement> amenitiesMap = new HashMap<>();


    @BeforeAll
    public static void setUpAll() {
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


        Configuration.browserCapabilities = new ChromeOptions().addArguments("--remote-allow-origins=*");
        open("http://127.0.0.1:3000/room/add");
    }



    @Test
    public void addListing_pass() throws Exception {
        Thread.sleep(1000);
        add.price.sendKeys("150");
        Thread.sleep(1000);
        add.fromDate.sendKeys("10/23/2023");
        Thread.sleep(1000);
        add.toDate.sendKeys("11/18/2023");
        Thread.sleep(1000);
        add.beds.sendKeys("2");
        Thread.sleep(1000);
        add.bedType.sendKeys("queen");
        Thread.sleep(1000);
        add.guests.sendKeys("4");
        Thread.sleep(1000);
        add.bathrooms.sendKeys("1");
        Thread.sleep(1000);
        add.imageUrl.sendKeys("https://www.google.com/url?sa=i&url=https%3A%2F%2Frhotelgeelong.com.au%2Faccommodation%2Fhotel-rooms%2F&psig=AOvVaw19gTfbYSnHKylnsvwBBEEF&ust=1698201232861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC5mN3SjYIDFQAAAAAdAAAAABAD");
        Thread.sleep(1000);

        ArrayList<SelenideElement> amenities = this.selectRandomAmenities();
        add.submitBtn.click();
        Thread.sleep(2000);
    }

    ArrayList<SelenideElement> selectRandomAmenities(){
        ArrayList<SelenideElement> selectedAmenities = new ArrayList<>();
        Random r = new Random();
        int amnt = r.nextInt(14);
        for(int i = 0; i < amnt; i++){
            int selected = r.nextInt(13);
            selectedAmenities.add(amenitiesMap.get(selected));
            amenitiesMap.get(selected).click();
        }
        return selectedAmenities;
    }
}
