package com.likehomeautomation;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import com.codeborne.selenide.WebDriverRunner;
import com.likehomeautomation.AddListing;
import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.selenide.AllureSelenide;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import com.codeborne.selenide.logevents.SelenideLogger;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.openqa.selenium.devtools.v85.tracing.model.StreamFormat.JSON;

public class AddListingTest {
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

//        Configuration.browserCapabilities = ;
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
        loginAsHotel();
        open("/room/add");
        Thread.sleep(1000);
        add.price.sendKeys("150");
        Thread.sleep(1000);
        add.fromDate.sendKeys("10/23/2023");
        add.toDate.sendKeys("11/18/2023");
        add.beds.sendKeys("2");
        add.bedType.sendKeys("queen");
        add.guests.sendKeys("4");
        add.bathrooms.sendKeys("1");
        add.imageUrl.sendKeys("https://www.google.com/url?sa=i&url=https%3A%2F%2Frhotelgeelong.com.au%2Faccommodation%2Fhotel-rooms%2F&psig=AOvVaw19gTfbYSnHKylnsvwBBEEF&ust=1698201232861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC5mN3SjYIDFQAAAAAdAAAAABAD");
        Thread.sleep(1000);

        ArrayList<SelenideElement> amenities = this.selectRandomAmenities();
        add.submitBtn.click();

        assertEquals("200", home.responseCode.val());
    }

    @Test
    public void addListing_fail_price() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        open("/room/add");
        Thread.sleep(1000);
        add.price.sendKeys("-999");
        Thread.sleep(1000);
        add.fromDate.sendKeys("10/23/2023");
        add.toDate.sendKeys("11/18/2023");
        add.beds.sendKeys("2");
        add.bedType.sendKeys("queen");
        add.guests.sendKeys("4");
        add.bathrooms.sendKeys("1");
        add.imageUrl.sendKeys("https://www.google.com/url?sa=i&url=https%3A%2F%2Frhotelgeelong.com.au%2Faccommodation%2Fhotel-rooms%2F&psig=AOvVaw19gTfbYSnHKylnsvwBBEEF&ust=1698201232861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC5mN3SjYIDFQAAAAAdAAAAABAD");
        Thread.sleep(1000);

        ArrayList<SelenideElement> amenities = this.selectRandomAmenities();
        add.submitBtn.click();
        
        assert(add.priceError.isDisplayed());
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

//    int getResponseCode(WebDriver driver, String urlString){
//        System.out.println("[getResponseCode()]: " + urlString);
//        try{
//            HttpURLConnection cn = (HttpURLConnection) new URL(urlString).openConnection();
//
//            // mocks call to flask server
//            cn.setRequestMethod("POST");
//            cn.setRequestProperty("Content-Type", "application/json");
//            JSONObject formData = new JSONObject();
//            cn.setRequestProperty("body", "test");
//            cn.connect();
//            return cn.getResponseCode();
//        }
//        catch(Exception e){
//            e.printStackTrace();
//        }
//        return -1;
//    }

    void loginAsHotel() throws Exception{
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }

}
