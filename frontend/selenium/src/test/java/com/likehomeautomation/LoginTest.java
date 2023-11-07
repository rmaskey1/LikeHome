package com.likehomeautomation;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Condition.text;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.WebDriverRunner;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import com.codeborne.selenide.logevents.SelenideLogger;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class LoginTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();

    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        // Configuration.browserCapabilities = ;
        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000";
        open("/login");
    }

    @AfterEach
    public void tearDown() {
        WebDriverRunner.getWebDriver().quit();
    }

    // test login with a valid hotel username & password
    @Test
    public void testLoginWithValidDataH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Add assertions to verify successful login aka redirect to home page
        // Check if the URL matches the expected URL of the home page
        // assertEquals("VIP", home.responseCode.val());
        assertEquals("Welcome, Vip!", home.WelcomeName.text());
    }

    // test login with a valid guest username & password

    @Test
    public void testLoginWithValidDataG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("jack@guest.com");
        login.password.sendKeys("123456");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Add assertions to verify successful login aka redirect to home page
        // Check if the URL matches the expected URL of the home page
        // assertEquals("VIP", home.responseCode.val());
        assertEquals("Welcome, Jack!", home.WelcomeName.text());
    }

    // test login with an invalid username & password(for both guest and hotel
    // because it can't be for one or the other without a valid username)
    @Test
    public void testLoginWithInvalidData() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("invalid@email.com");
        login.password.sendKeys("NotThePassword");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Check if the error message is visible
        login.emailError.shouldBe(visible);

        // Check the content of the error message
        login.emailError.shouldHave(text("Email does not exist"));
    }

    // test login with an valid hotel username & invalid password
    @Test
    public void testLoginWithInvalidPasswordH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("NotThePassword");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Check if the error message is visible
        login.passwordError.shouldBe(visible);

        // Check the content of the error message
        login.passwordError.shouldHave(text("Your password is incorrect"));
    }

    // test login with an valid guest username & invalid password
    @Test
    public void testLoginWithInvalidPasswordG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("jack@guest.com");
        login.password.sendKeys("NotThePassword");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Check if the error message is visible
        login.passwordError.shouldBe(visible);

        // Check the content of the error message
        login.passwordError.shouldHave(text("Your password is incorrect"));
    }

    // test login with an invalid username format & password(for both guest and
    // hotel
    // because it can't be for one or the other without a valid username)
    @Test
    public void testLoginWithInvalidEmail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        login.email.sendKeys("viphotel.com");
        login.password.sendKeys("NotThePassword");
        Thread.sleep(1000);
        // Submit the form
        login.submitBtn.click();
        Thread.sleep(3000);

        // Check if the error message is visible
        login.emailFormatError.shouldBe(visible);

        // Check the content of the error message
        login.emailFormatError.shouldHave(text("Please enter valid email"));
    }
}