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
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ModifyListingTest {
    WebDriver driver;
    ModifyListing modify = new ModifyListing();
    Login login = new Login();
    Home home = new Home();
    Details details = new Details();

    HashMap<Integer, SelenideElement> amenitiesMap = new HashMap<>();


    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        Configuration.browserSize = "1280x900";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        amenitiesMap.put(0, modify.freeWifi);
        amenitiesMap.put(1, modify.pool);
        amenitiesMap.put(2, modify.tv);
        amenitiesMap.put(3, modify.washer);
        amenitiesMap.put(4, modify.dryer);
        amenitiesMap.put(5, modify.parking);
        amenitiesMap.put(6, modify.ac);
        amenitiesMap.put(7, modify.breakfast);
        amenitiesMap.put(8, modify.lunch);
        amenitiesMap.put(9, modify.dinner);
        amenitiesMap.put(10, modify.microwave);
        amenitiesMap.put(11, modify.refrigerator);
        amenitiesMap.put(12, modify.pet);
        amenitiesMap.put(13, modify.spa);
        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000" ;
        open("/login");
    }

    @AfterEach
    public void tearDown(){
        WebDriverRunner.getWebDriver().quit();
    }

    @Test
    public void modify_price_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElement(By.className("idtiFj"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        int prevPrice = Integer.parseInt(modify.price.val());
        String modifiedPrice = (prevPrice == 400) ? "400" : "399";
        modify.price.clear();
        modify.price.sendKeys(modifiedPrice);
        modify.submitBtn.click();
        Thread.sleep(2000);

//        assertEquals("200", details.responseCode.val());
        assertEquals(details.price.text(), "$"+modifiedPrice);
    }

    @Test
    public void modify_price_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElement(By.className("idtiFj"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.price.clear();
        modify.price.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.priceError.isDisplayed());
    }

    @Test
    public void modify_fromDate_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElement(By.className("idtiFj"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.fromDate.clear();
        modify.price.sendKeys("10/30/2023");
        modify.submitBtn.click();
        Thread.sleep(2000);

//        assertEquals("200", details.responseCode.val());
        assertEquals(details.fromDate.val(), "10/30/2023");
    }

    @Test
    public void modify_fromDate_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElement(By.className("idtiFj"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.fromDate.clear();
        modify.fromDate.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.fromDateError.isDisplayed());
    }

    void loginAsHotel() throws Exception{
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }

}
