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

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.codeborne.selenide.Condition;

public class SearchTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();
    Details details = new Details();
    Search search = new Search();

    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000";
        open("/login");
        login.email.sendKeys("jack@guest.com");
        login.password.sendKeys("123456");
        // Submit the form
        login.submitBtn.click();
    }

    @AfterEach
    public void tearDown() {
        WebDriverRunner.getWebDriver().quit();
    }

    // test location,guest number, and date inputs with a valid search
    @Test
    public void validSearch() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        search.locationInput.setValue("San Jose");
        search.guestsInput.setValue("5");
        search.fromInput.setValue("12/22/2027");
        search.toInput.setValue("12/25/2027");
        Thread.sleep(1000);

        // Submit the form
        search.searchBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify successful searching
        search.previewCard.click();
        search.locationDetail.shouldHave(Condition.text("San Jose"));

        // deal with guests num
        String guestsText = details.guests.getText();
        int numberOfGuests = Integer.parseInt(guestsText.replaceAll("\\D", ""));
        assert numberOfGuests > 4;

        // Parse details dates
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate inputFromDate = LocalDate.parse("12/01/2023", formatter);
        LocalDate inputToDate = LocalDate.parse("12/10/2023", formatter);
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("MMM d, yy");
        LocalDate detailsFromDate = LocalDate.parse(details.fromDate.getText(), formatter2);
        LocalDate detailsToDate = LocalDate.parse(details.toDate.getText(), formatter2);
        assert detailsFromDate.isBefore(inputFromDate) || detailsFromDate.isEqual(inputFromDate);
        assert detailsToDate.isAfter(inputToDate) || detailsToDate.isEqual(inputToDate);
    }

    // test filters with valid inputs
    @Test
    public void validFilters() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // filter it up
        search.filterBtn.click();
        search.minPriceInput.setValue("1");
        search.maxPriceInput.setValue("2");
        search.numOfBedsInput.setValue("1");
        search.numOfGuestsInput.setValue("1");
        search.numOfBathroomsInput.setValue("1");
        search.bedTypeBtn("Single").click();
        search.amenityCheckbox(0).click();
        search.amenityCheckbox(12).click();
        search.amenityCheckbox(13).click();
        Thread.sleep(500);
        search.submitFilterBtn.click();

        // Add assertions to verify successful searching
        Thread.sleep(1000);
        search.previewCard.click();
        details.price.shouldHave(Condition.text("1"));
        details.beds.shouldHave(Condition.text("1"));
        String guestsText = details.guests.getText();
        int numberOfGuests = Integer.parseInt(guestsText.replaceAll("\\D", ""));
        assert numberOfGuests >= 1;
        details.bathrooms.shouldHave(Condition.text("1"));
        details.amenities.shouldHave(Condition.text("Free Wifi"));
        details.amenities.shouldHave(Condition.text("Pet Friendly"));
        details.amenities.shouldHave(Condition.text("Spa"));
    }

    // test location,guest number, and date inputs with a invalid inputs
    @Test
    public void invalidSearch() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        search.locationInput.setValue("San Jose");
        search.guestsInput.setValue("-1");
        search.fromInput.setValue("13/1/2023");
        search.toInput.setValue("12/10/2021");
        Thread.sleep(1000);

        // Submit the form
        search.searchBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful searching
        search.guestsError.shouldBe(visible);
        search.dateError.shouldBe(visible);
        search.dateToError.shouldBe(visible);
        search.guestsError.shouldHave(text("Number of guests must be greater than 0"));
        search.dateError.shouldHave(text("Invalid date format (mm/dd/yyyy)"));
        search.dateToError.shouldHave(text("Date must be in the future"));
    }

    // test date inputs with a invalid data
    @Test
    public void invalidDatesSearch() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // Fill in fields with valid data
        search.fromInput.setValue("11/11/2024");
        search.toInput.setValue("12/10/2023");
        Thread.sleep(1000);

        // Submit the form
        search.searchBtn.click();
        Thread.sleep(1000);

        // Add assertions to verify unsuccessful searching
        search.dateToError.shouldBe(visible);
        search.dateToError.shouldHave(text("Date must be after From Date"));
    }

    // test filters with valid inputs
    @Test
    public void invalidFilters() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();

        // filter it up
        search.filterBtn.click();
        search.minPriceInput.setValue("-1");
        search.maxPriceInput.setValue("-2");
        search.numOfBedsInput.setValue("-1");
        search.numOfGuestsInput.setValue("-1");
        search.numOfBathroomsInput.setValue("-1");
        Thread.sleep(2000);
        search.submitFilterBtn.click();

        // Add assertions to verify successful searching
        Thread.sleep(1000);
        search.minError.shouldBe(visible);
        search.maxError.shouldBe(visible);
        search.numOfBedsError.shouldBe(visible);
        search.numOfBathsError.shouldBe(visible);
        search.numOfGuestsError.shouldBe(visible);
    }
}
