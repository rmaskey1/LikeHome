//package com.likehomeautomation;
//
//import com.codeborne.selenide.Configuration;
//import com.codeborne.selenide.SelenideElement;
//import com.codeborne.selenide.logevents.SelenideLogger;
//import io.qameta.allure.selenide.AllureSelenide;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.openqa.selenium.chrome.ChromeOptions;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.NoSuchElementException;
//
//import static com.codeborne.selenide.Selenide.$x;
//import static com.codeborne.selenide.Selenide.open;
//import static org.junit.jupiter.api.Assertions.assertTrue;
//
//public class ModifyListingTest {
////    AddListing modify = new AddListing();
//
//    HashMap<String, String> prevFields, newFields;
//
//    @BeforeAll
//    public static void setUpAll() {
//        Configuration.browserSize = "800x600";
//        SelenideLogger.addListener("allure", new AllureSelenide());
//    }
//
//    @BeforeEach
//    public void setUp() {
//        Configuration.browserCapabilities = new ChromeOptions().addArguments("--remote-allow-origins=*");
//        open("http://127.0.0.1:3000/room/modify");
//        prevFields = new HashMap<>();
//        newFields = new HashMap<>();
//    }
//
//
//    @Test
//    public void modifyListing_pass() throws Exception {
//        modify.price.getValue();
//        Thread.sleep(1000);
//        modify.price.sendKeys("150");
//        Thread.sleep(1000);
//        modify.fromDate.sendKeys("10/23/2023");
//        Thread.sleep(1000);
//        modify.toDate.sendKeys("11/18/2023");
//        Thread.sleep(1000);
//        modify.beds.sendKeys("2");
//        Thread.sleep(1000);
//        modify.bedType.sendKeys("queen");
//        Thread.sleep(1000);
//        modify.guests.sendKeys("4");
//        Thread.sleep(1000);
//        modify.bathrooms.sendKeys("1");
//        Thread.sleep(1000);
//        modify.imageUrl.sendKeys("https://www.google.com/url?sa=i&url=https%3A%2F%2Frhotelgeelong.com.au%2Faccommodation%2Fhotel-rooms%2F&psig=AOvVaw19gTfbYSnHKylnsvwBBEEF&ust=1698201232861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC5mN3SjYIDFQAAAAAdAAAAABAD");
//        Thread.sleep(1000);
//
//        modify.submitBtn.click();
//        Thread.sleep(2000);
//    }
//
//
//    @Test
//    public void modifyListing_fail_fromDate() throws Exception {
//        Thread.sleep(1000);
//        modify.price.sendKeys("150");
//        modify.fromDate.sendKeys("09/23/2023");
//        modify.toDate.sendKeys("11/18/2023");
//        Thread.sleep(1000);
//        modify.beds.sendKeys("2");
//        modify.bedType.sendKeys("queen");
//        modify.guests.sendKeys("4");
//        modify.bathrooms.sendKeys("1");
//        Thread.sleep(1000);
//        modify.imageUrl.sendKeys("https://www.google.com/url?sa=i&url=https%3A%2F%2Frhotelgeelong.com.au%2Faccommodation%2Fhotel-rooms%2F&psig=AOvVaw19gTfbYSnHKylnsvwBBEEF&ust=1698201232861000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC5mN3SjYIDFQAAAAAdAAAAABAD");
//        Thread.sleep(1000);
//
////        ArrayList<SelenideElement> amenities = this.selectRandomAmenities();
//        modify.submitBtn.click();
//        Thread.sleep(10000);
//
////        Exception exception = assertThrows(NoSuchElementException.class, () -> {$x("//*[@id='submit-btn']");});
//
//
//
////        try{
////            SelenideElement submitBtn = $x("//*[@id='submit-btn']");
////            System.out.println("form not submitted");
////        } catch (NoSuchElementException e){
//////            assertTrue(e.getMessage().contains("submit-btn"));
////            assertTrue(e.getMessage().contains("!!!"));
////            System.out.println(e.getMessage());
////            System.out.println("form submitted");
////        }
//    }
//}
