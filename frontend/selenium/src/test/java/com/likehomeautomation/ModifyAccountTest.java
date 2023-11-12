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
        Thread.sleep(1000);

        // Fill in registration form fields with valid data
        mod.fname.setValue("Johnn");
        mod.lname.setValue("Doee");
        mod.email.setValue("johnn.doee@example.com");
        mod.phone.setValue("+11234567888");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify successful mods
        assertEquals("Johnn", mod.fnameDisplay.text());
        assertEquals("Doee", mod.lnameDisplay.text());
        assertEquals("johnn.doee@example.com", mod.emailDisplay.text());
        assertEquals("+11234567888", mod.phoneDisplay.text());

        // put it back for other tests:
        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("Jack");
        mod.lname.setValue("Guest");
        mod.email.setValue("jack@guest.com");
        mod.phone.setValue("+11234567888");
        mod.updateBtn.click();
    }

    // test modification with invalid fname inputs on a guest acct
    @Test
    public void invalidFnameG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with invalid data
        mod.fname.setValue("John1");
        mod.lname.setValue("Doee");
        mod.email.setValue("johnn.doee@example.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.fnameError.shouldBe(visible);

        // Check the content of the error message
        mod.fnameError.shouldHave(text("Only letters are allowed"));
    }

    // test modification with invalid lname inputs on a guest acct
    @Test
    public void invalidLnameG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe1");
        mod.email.setValue("johnn.doee@example.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.lnameError.shouldBe(visible);

        // Check the content of the error message
        mod.lnameError.shouldHave(text("Only letters are allowed"));
    }

    // test modification with invalid email inputs on a guest acct
    @Test
    public void invalidEmailG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe");
        mod.email.setValue("johnn.doeeexample.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.emailError.shouldBe(visible);

        // Check the content of the error message
        mod.emailError.shouldHave(text("Invalid email format"));
    }

    // test modification of a guest acct with email that is already associated with
    // a guest acct
    @Test
    public void duplicateEmailG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with duplicate email data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe");
        mod.email.setValue("gc@gmail.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.emailError.shouldBe(visible);

        // Check the content of the error message
        mod.emailError.shouldHave(text("Email already in use"));
    }

    // test modification of a guest acct with email that is already associated with
    // a hotel acct
    @Test
    public void duplicateHEmailG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe");
        mod.email.setValue("vip@hotel.com");
        mod.phone.setValue("+11234567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.emailError.shouldBe(visible);

        // Check the content of the error message
        mod.emailError.shouldHave(text("Email already in use"));
    }

    // // test modification with invalid password on a guest acct
    // @Test
    // public void invalidPasswordG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // select modify account info
    // mod.editBtn.click();

    // // Fill in registration form fields with valid data
    // mod.fname.setValue("John");
    // mod.lname.setValue("Doe");
    // mod.email.setValue("john.doe@example.com");
    // mod.phone.setValue("+11234567899");
    // mod.password.setValue("weak");

    // // Submit the form
    // mod.updateBtn.click();
    // Thread.sleep(1000);

    // // Check if the error message is visible
    // mod.passwordError.shouldBe(visible);

    // // Check the content of the error message
    // mod.passwordError.shouldHave(text("Email does not exist"));
    // }

    // test modification with invalid phone length on a guest acct
    @Test
    public void invalidPhoneLengthG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe");
        mod.email.setValue("john.doe@example.com");
        mod.phone.setValue("+4567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.phoneError.shouldBe(visible);

        // Check the content of the error message
        mod.phoneError.shouldHave(text("Phone number must start with '+' and have 11 digits"));
    }

    // test modification with invalid phone input-type on a guest acct
    @Test
    public void invalidPhoneTypeG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.editBtn.click();

        // Fill in registration form fields with valid data
        mod.fname.setValue("John");
        mod.lname.setValue("Doe");
        mod.email.setValue("john.doe@example.com");
        mod.phone.setValue("+aaaa4567899");

        // Submit the form
        mod.updateBtn.click();
        Thread.sleep(1000);

        // Check if the error message is visible
        mod.phoneError.shouldBe(visible);

        // Check the content of the error message
        mod.phoneError.shouldHave(text("Phone number must start with '+' and have 11 digits"));
    }

    // // test guest acct deletion
    // @Test
    // public void validDeletionG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();
    // Register registration = new Register();

    // // switch to other acct
    // home.logoutBtn.click();
    // open("/login");
    // login.email.sendKeys("fl@gmail.com");
    // login.password.sendKeys("123456");
    // Thread.sleep(1000);
    // // Submit the form
    // login.submitBtn.click();
    // Thread.sleep(3000);
    // // home.profileBtn.click();

    // // select delete account info
    // open("/profile");
    // mod.deleteBtn.click();
    // Thread.sleep(1000);
    // mod.confirmDeleteBtn.click();
    // Thread.sleep(1000);

    // // Check if the account was deleted
    // open("/login");
    // Thread.sleep(1000);
    // // Fill in fields with valid data
    // login.email.sendKeys("fl@gmail.com");
    // login.password.sendKeys("123456");
    // Thread.sleep(1000);
    // // Submit the form
    // login.submitBtn.click();
    // Thread.sleep(1000);
    // // Check if the error message is visible
    // login.emailError.shouldBe(visible);
    // // Check the content of the error message
    // login.emailError.shouldHave(text("Email does not exist"));

    // // reset for the other tests
    // open("/register");
    // Thread.sleep(1000);
    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("f");
    // registration.lastNameInput.setValue("l");
    // Thread.sleep(500);
    // registration.emailInput.setValue("fl@gmail.com");
    // registration.passwordInput.setValue("123456");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+19255490000");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);
    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);
    // }

    // test cancelled guest acct deletion
    @Test
    public void cancelledDeletionG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // select modify account info
        mod.deleteBtn.click();
        mod.cancelDeleteBtn.click();

        // Check if the account was not deleted
        assertEquals("jack@guest.com", mod.emailDisplay.text());
    }

    // // test guest acct deletion after a cancelled deletion
    // @Test
    // public void validReDeletionG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();
    // Register registration = new Register();

    // // switch to other acct
    // home.logoutBtn.click();
    // open("/login");
    // login.email.sendKeys("gc@gmail.com");
    // login.password.sendKeys("123456");
    // Thread.sleep(1000);
    // // Submit the form
    // login.submitBtn.click();
    // home.profileBtn.click();

    // // select modify account info
    // mod.deleteBtn.click();
    // mod.cancelDeleteBtn.click();

    // // Check if the account was not deleted
    // assertEquals("gc@gmail.com", mod.emailDisplay.text());

    // // select modify account info
    // mod.deleteBtn.click();
    // mod.confirmDeleteBtn.click();

    // // Check if the account was deleted
    // open("/login");
    // Thread.sleep(3000);
    // // Fill in fields with valid data
    // login.email.sendKeys("gc@gmail.com");
    // login.password.sendKeys("123456");
    // Thread.sleep(1000);
    // // Submit the form
    // login.submitBtn.click();
    // Thread.sleep(3000);
    // // Check if the error message is visible
    // login.emailError.shouldBe(visible);
    // // Check the content of the error message
    // login.emailError.shouldHave(text("Email does not exist"));

    // // reset for the other tests
    // open("/register");
    // Thread.sleep(1000);
    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("g");
    // registration.lastNameInput.setValue("c");
    // Thread.sleep(500);
    // registration.emailInput.setValue("gc@gmail.com");
    // registration.passwordInput.setValue("123456");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+19255499040");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);
    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);
    // }
}