package com.likehomeautomation;

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

public class ModifyAccountTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();
    ModifyAccount mod = new ModifyAccount();

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
        login.email.sendKeys("jack@guest.com");
        login.password.sendKeys("123456");
        // Submit the form
        login.submitBtn.click();
        home.profileBtn.click();
    }

    @AfterEach
    public void tearDown() {
        WebDriverRunner.getWebDriver().quit();
    }

    // test modification with all valid inputs on a guest acct
    @Test
    public void validModG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("Johnn");
        mod.lname.setValue("Doee");
        mod.email.setValue("johnn.doee@example.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify successful mods
        assertEquals("Johnn", mod.fnameDisplay.text());
        assertEquals("Doee", mod.lnameDisplay.text());
        assertEquals("johnn.doee@example.com", mod.emailDisplay.text());
        assertEquals("+11234567899", mod.phoneDisplay.text());

        // put it back for other tests:
        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("Jack");
        mod.lname.setValue("Guest");
        mod.email.setValue("jack@guest.com");
        mod.phone.setValue("+11234567899");
        mod.updateBtn.click();
    }
}