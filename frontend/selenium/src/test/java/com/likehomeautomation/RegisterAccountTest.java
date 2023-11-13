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

public class RegisterAccountTest {
    WebDriver driver;

    RegisterAccount registration = new RegisterAccount();
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
        open("/register");
    }

    @AfterEach
    public void tearDown() {
        WebDriverRunner.getWebDriver().quit();
    }

    // test registration with all valid guest inputs
    @Test
    public void testRegistrationWithValidDataG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        //
        // Add assertions to verify successful registration aka login with the new
        // inputs
        login.email.sendKeys("john.doe@example.com");
        login.password.sendKeys("securePassword");
        login.submitBtn.click();
        Thread.sleep(3000);
        assertEquals("Welcome, John!", home.WelcomeName.text());

        // cleanup for future test cases
        home.profileBtn.click();
        mod.deleteBtn.click();
        mod.confirmDeleteBtn.click();
    }

    // @Test
    // ic void testRegistrationWithInvalidPhoneNumberG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John");
    // registration.lastNameInput.setValue("Doe");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+1234567aaaa");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.phoneError.shouldBe(visible);

    // // Check the content of the error message
    //

    // test guest account with short phone number input
    @Test
    public void testRegistrationWithInvalidPhoneNumberG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("45678900");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.phoneError.shouldBe(visible);

        // Check the content of the error message
        registration.phoneError.shouldHave(text("Please enter valid phone number"));
    }

    // //test guest account with invalid first name input
    // @Test
    // public void testRegistrationWithInvalidFirstNameG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John1!");
    // registration.lastNameInput.setValue("Doe");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+12345678900");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.fnameError.shouldBe(visible);

    // // Check the content of the error message
    // registration.fnameError.shouldHave(text("Please enter valid first name"));
    // }

    // //test guest account with invalid Last name input
    // @Test
    // public void testRegistrationWithInvalidLastNameG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John");
    // registration.lastNameInput.setValue("Doe1!");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+12345678900");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.lnameError.shouldBe(visible);

    // // Check the content of the error message
    // registration.lnameError.shouldHave(text("Please enter valid last name"));
    // }

    // test guest account with invalid email input
    @Test
    public void testRegistrationWithInvalidFirstNameG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doeexample.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Please enter valid email"));
    }

    // test guest account with invalid password input
    @Test
    public void testRegistrationWithInvalidPasswordG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("weak");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.passwordError.shouldBe(visible);

        // Check the content of the error message
        registration.passwordError.shouldHave(text("Password must be a string at least 6 characters long."));
    }

    // test guest account with duplicate email input
    @Test
    public void testRegistrationWithDuplicateEmailG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678988");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // go back to the registration page
        open("/register");

        // fill in the same info
        open("/register");
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        registration.phoneNumberInput.setValue("+12345678988");
        registration.guestBtn.click(); // Select the "Guest" role
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Email already in use."));

        // cleanup for future test cases
        open("/login");
        login.email.sendKeys("john.doe@example.com");
        login.password.sendKeys("securePassword");
        login.submitBtn.click();
        Thread.sleep(3000);
        assertEquals("Welcome, John!", home.WelcomeName.text());
        home.profileBtn.click();
        mod.deleteBtn.click();
        mod.confirmDeleteBtn.click();
    }

    // test guest account with duplicate email input where one is a hotel acct and
    // one is a guest acct
    @Test
    public void testRegistrationWithDuplicateEmailGandH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.guestBtn.click(); // Select the "Guest" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // go back to the registration page
        open("/register");

        // fill in the same info
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        registration.phoneNumberInput.setValue("+12345678900");
        registration.hotelBtn.click(); // Select the "Hotel" role
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Email already in use."));

        // cleanup for future test cases
        open("/login");
        login.email.sendKeys("john.doe@example.com");
        login.password.sendKeys("securePassword");
        login.submitBtn.click();
        Thread.sleep(3000);
        assertEquals("Welcome, John!", home.WelcomeName.text());
        home.profileBtn.click();
        mod.deleteBtn.click();
        mod.confirmDeleteBtn.click();
    }

    // test registration with all valid hotel inputs
    @Test
    public void testRegistrationWithValidDataH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john111.doe@example.com");
        registration.passwordInput.setValue("123456");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345600000");
        registration.hotelBtn.click(); // Select the "hotel" role
        Thread.sleep(1000);
        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // hotel side now
        registration.hNameInput.setValue("Hyatt");
        registration.sNameInput.setValue("145 Reed Street");
        Thread.sleep(500);
        registration.cityInput.setValue("San Jose");
        registration.zipInput.setValue("95112");
        Thread.sleep(500);
        registration.stateInput.setValue("CA");
        registration.countryInput.setValue("USA");
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify successful registration aka login with the new
        // inputs
        login.email.sendKeys("john111.doe@example.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
        assertEquals("Welcome, John!", home.WelcomeName.text());

        // cleanup for future test cases
        home.profileBtn.click();
        mod.deleteBtn.click();
        mod.confirmDeleteBtn.click();
    }

    // @Test
    // ic void testRegistrationWithInvalidPhoneNumberG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John");
    // registration.lastNameInput.setValue("Doe");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+1234567aaaa");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.phoneError.shouldBe(visible);

    // // Check the content of the error message
    //

    // test guest account with short phone number input
    @Test
    public void testRegistrationWithShortPhoneNumberH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("45678900");
        registration.hotelBtn.click(); // Select the "hotel" role

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.phoneError.shouldBe(visible);

        // Check the content of the error message
        registration.phoneError.shouldHave(text("Please enter valid phone number"));
    }

    // //test guest account with invalid first name input
    // @Test
    // public void testRegistrationWithInvalidFirstNameG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John1!");
    // registration.lastNameInput.setValue("Doe");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+12345678900");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.fnameError.shouldBe(visible);

    // // Check the content of the error message
    // registration.fnameError.shouldHave(text("Please enter valid first name"));
    // }

    // //test guest account with invalid Last name input
    // @Test
    // public void testRegistrationWithInvalidLastNameG() throws Exception {
    // WebDriver driver = WebDriverRunner.getWebDriver();

    // // Fill in fields with valid data
    // registration.firstNameInput.setValue("John");
    // registration.lastNameInput.setValue("Doe1!");
    // Thread.sleep(500);
    // registration.emailInput.setValue("john.doe@example.com");
    // registration.passwordInput.setValue("securePassword");
    // Thread.sleep(500);
    // registration.phoneNumberInput.setValue("+12345678900");
    // registration.guestBtn.click(); // Select the "Guest" role
    // Thread.sleep(1000);

    // // Submit the form
    // registration.submitBtn.click();
    // Thread.sleep(1000);

    // // Add assertions to verify unsuccessful registration aka
    // // Check if the error message is visible
    // registration.lnameError.shouldBe(visible);

    // // Check the content of the error message
    // registration.lnameError.shouldHave(text("Please enter valid last name"));
    // }

    // test guest account with invalid email input
    @Test
    public void testRegistrationWithInvalidEmailH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doeexample.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.hotelBtn.click(); // Select the "hotel" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Please enter valid email"));
    }

    // test guest account with invalid password input
    @Test
    public void testRegistrationWithInvalidPasswordH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("weak");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.hotelBtn.click(); // Select the "hotel" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.passwordError.shouldBe(visible);

        // Check the content of the error message
        registration.passwordError.shouldHave(text("Password must be a string at least 6 characters long."));
    }

    // test guest account with duplicate email input
    @Test
    public void testRegistrationWithDuplicateEmailH() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        Thread.sleep(500);
        registration.emailInput.setValue("vip@hotel.com");
        registration.passwordInput.setValue("securePassword");
        Thread.sleep(500);
        registration.phoneNumberInput.setValue("+12345678900");
        registration.hotelBtn.click(); // Select the "hotel" role
        Thread.sleep(1000);

        // Submit the form
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Email already in use."));
    }

    // test guest account with duplicate email input where one is a hotel acct and
    // one is a guest acct
    @Test
    public void testRegistrationWithDuplicateEmailHandG() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        // fill in the info
        registration.firstNameInput.setValue("John");
        registration.lastNameInput.setValue("Doe");
        registration.emailInput.setValue("john.doe@example.com");
        registration.passwordInput.setValue("securePassword");
        registration.phoneNumberInput.setValue("+12345678900");
        registration.hotelBtn.click(); // Select the "Hotel" role
        registration.submitBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful registration aka
        // Check if the error message is visible
        registration.emailError.shouldBe(visible);

        // Check the content of the error message
        registration.emailError.shouldHave(text("Email already in use."));
    }
}