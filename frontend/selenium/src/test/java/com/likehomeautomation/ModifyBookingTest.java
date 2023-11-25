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
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.time.Duration;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Condition.text;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ModifyBookingTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();

    Details details = new Details();
    BookingForm bookingForm = new BookingForm();
    ModifyBooking Mb = new ModifyBooking();

    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000";
        Configuration.browserSize = "1280x800";
        open("/login");
        login.email.sendKeys("fl@gmail.com");
        login.password.sendKeys("123456");
        // Submit the form
        login.submitBtn.click();
        home.myBookingBtn.click();
    }

    @AfterEach
    public void tearDown() {
        WebDriverRunner.getWebDriver().quit();
    }

    @Test
    public void validModification() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Wait until the button is clickable (i.e., it's both present in the DOM and
        // enabled)
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));

        Thread.sleep(3000);
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // we want to just shorten the booking by 1 day:
        String oldCheckoutDate = Mb.checkOutDateInput.getAttribute("value");
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

        try {
            // Parse the string into a Date object
            Date date = dateFormat.parse(oldCheckoutDate);

            // Create a Calendar instance and set it to the parsed date
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            // Add one day to the date
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            // Format the updated date back into a string
            String newCheckoutDate = dateFormat.format(calendar.getTime());

            // finally actually modify the data
            Mb.numberOfGuestsInput.setValue("1");
            Thread.sleep(1000);
            Mb.checkOutDateInput.setValue(newCheckoutDate);
            Thread.sleep(1000);
            Mb.updateBtn.click();
            Thread.sleep(1000);
            assertEquals(newCheckoutDate, details.toDate.text());
            assertEquals(1, details.guests.text());
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void pastCheckOutDate() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable (i.e., it's both present in the DOM and
        // enabled)
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.checkOutDateInput.setValue("01/27/2000");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.datesError.shouldBe(visible);

        // Check the content of the error message
        Mb.datesError.shouldHave(text("Date must be in the future"));
    }

    @Test
    public void invalidDateFormat() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.checkOutDateInput.setValue("111");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.datesError.shouldBe(visible);

        // Check the content of the error message
        Mb.datesError.shouldHave(text("Invalid date format (mm/dd/yyyy)"));
    }

    @Test
    public void unavailDate() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.checkOutDateInput.setValue("10/31/5000");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.datesError.shouldBe(visible);

        // Check the content of the error message
        Mb.datesError.shouldHave(text("The listing is not available on the dates you've selected"));
    }

    @Test
    public void notRealDate() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.checkOutDateInput.setValue("02/31/2024");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.datesError.shouldBe(visible);

        // Check the content of the error message
        Mb.datesError.shouldHave(text("The listing is not available on the dates you've selected"));
    }

    @Test
    public void invalidGuestAmount() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.numberOfGuestsInput.setValue("0");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.guestsError.shouldBe(visible);

        // Check the content of the error message
        Mb.guestsError.shouldHave(text("Number of Guests must be greater than 0"));
    }

    @Test
    public void excessiveGuestAmount() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        /// Create WebDriverWait with a timeout of 10 seconds
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        // Wait until the button is clickable
        wait.until(ExpectedConditions.elementToBeClickable(Mb.clickableBookingCard));
        Mb.clickableBookingCard.click();
        details.modifyBookingBtn.click();
        Thread.sleep(1000);

        // modify the date
        Mb.numberOfGuestsInput.setValue("5000");
        Thread.sleep(1000);
        Mb.updateBtn.click();
        Thread.sleep(1000);
        // Add assertions to verify unsuccessful modification
        Mb.guestsError.shouldBe(visible);
    }
}
