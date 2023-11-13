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

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class BookingTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();

    Details details = new Details();
    BookingForm bookingForm = new BookingForm();
    MyBookings myBookings = new MyBookings();

    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        WebDriverRunner.setWebDriver(new ChromeDriver(new ChromeOptions().addArguments("--remote-allow-origins=*")));
        Configuration.baseUrl = "http://127.0.0.1:3000" ;
        Configuration.browserSize = "1280x800";
        open("/login");
    }

    @AfterEach
    public void tearDown(){
        WebDriverRunner.getWebDriver().quit();
    }


    @Test
    public void requestBooking_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        Thread.sleep(500);
        String hotelName = findAvailableRoom(driver);
        Thread.sleep(1000);
        enterCardInfo("378282246310005", "1234", "05/29");
        Thread.sleep(1000);
        bookingForm.submitBtn.click();
        Thread.sleep(2000);
        bookingForm.bookingSuccessBtn.click();
        Thread.sleep(1000);
        List<WebElement> bookingList = driver.findElements(By.className("booking-card"));
        Thread.sleep(3000);
        assert(checkExistsMyBookings(bookingList, hotelName));
    }

    @Test
    public void requestBooking_fail_cardNum() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        Thread.sleep(500);
        String hotelName = findAvailableRoom(driver);
        Thread.sleep(1000);
        enterCardInfo("", "1234", "05/29");
        Thread.sleep(1000);
        bookingForm.submitBtn.click();
        Thread.sleep(2000);
        assert(bookingForm.cardNumError.isDisplayed());
    }

    @Test
    public void requestBooking_fail_cvc() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        Thread.sleep(500);
        String hotelName = findAvailableRoom(driver);
        Thread.sleep(1000);
        enterCardInfo("378282246310005", "0", "05/29");
        Thread.sleep(1000);
        bookingForm.submitBtn.click();
        Thread.sleep(2000);
        assert(bookingForm.cardCvcError.isDisplayed());
    }

    @Test
    public void requestBooking_fail_exp() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        Thread.sleep(500);
        String hotelName = findAvailableRoom(driver);
        Thread.sleep(1000);
        enterCardInfo("378282246310005", "1234", "0");
        Thread.sleep(1000);
        bookingForm.submitBtn.click();
        Thread.sleep(2000);
        assert(bookingForm.cardExpError.isDisplayed());
    }

    @Test
    public void cancelBooking_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsGuest();
        Thread.sleep(500);
        home.myBookingBtn.click();
        Thread.sleep(2000);
        try{
            driver.findElements(By.className("booking-card")).get(0).click();
        }
        catch(IndexOutOfBoundsException e){
            String hotelName = findAvailableRoom(driver);
            Thread.sleep(1000);
            System.out.println("[cancelBooking_pass()] hotelName = " + hotelName);
            assert(!hotelName.equals("!!! No available room !!!"));
            enterCardInfo("378282246310005", "1234", "05/29");
            Thread.sleep(1000);
            bookingForm.submitBtn.click();
            Thread.sleep(2000);
            bookingForm.bookingSuccessBtn.click();
            Thread.sleep(1000);
            driver.findElements(By.className("booking-card")).get(0).click();
            Thread.sleep(1500);
        }
        String hotelToCancel = details.hotelName.text();
        details.cancelBookingBtn.click();
        Thread.sleep(1500);
        assert(bookingForm.bookingFormTitle.text().equals("Cancel Booking Request"));
        bookingForm.cancelBookingBtn.click();
        Thread.sleep(1500);
        assert(bookingForm.bookingSuccess.text().equals("Cancel Request Success!"));
        bookingForm.bookingSuccessBtn.click();
        Thread.sleep(3000);
        List<WebElement> bookingList = driver.findElements(By.className("booking-card"));
        assert(!checkExistsMyBookings(bookingList, hotelToCancel));
    }

    boolean checkExistsMyBookings(List<WebElement> bookingList, String hotelName){
        System.out.println("[checkNewBookingExists()]: " + hotelName);
        for(WebElement b: bookingList){
            try{
                String[] hotelInfo = b.getText().split("\\r?\\n|\\r");
                System.out.println("Checking: " + hotelInfo[0]);
                if(hotelInfo[0].equals(hotelName)){
                    return true;
                }
            }
            catch(StaleElementReferenceException e){
                return false;
            }
        }
        return false;
    }

    String findAvailableRoom(WebDriver driver){
        System.out.println("Looking for available room...");
        int selectedCard = 0;
        String hotelName = "!!! No available room !!!";
        boolean listingsLoaded = true;

        while(listingsLoaded){
            open("/home");
            try{
                Thread.sleep(2000);
                driver.findElements(By.className("previewCard-select")).get(selectedCard).click();
                System.out.println("Listings loaded...");
                hotelName = details.hotelName.text();
                if(details.reserveBtn.isDisplayed()) {
                    details.reserveBtn.click();
                    if(bookingForm.bookingFormTitle.isDisplayed() && bookingForm.bookingFormTitle.text().equals("Booking Request")) {
                        System.out.println("Found available room at: " + hotelName);
                        return hotelName;
                    }
                }
                else if(details.doubleBookedWarning.isDisplayed()){
                    System.out.println("Double booked room: " + hotelName);
                    details.doubleBookedConfirm.click();
                }
                System.out.println("Some other error: " + hotelName);
                selectedCard++;
            }
            catch(IndexOutOfBoundsException e) {
                System.out.println("Couldn't load listings!");
                listingsLoaded = false;
            }
            catch(Exception e){
                System.out.println(e.getMessage());
            }
        }
        return hotelName;
    }

    void loginAsGuest() throws Exception{
        login.email.sendKeys("guest-test@gmail.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }

    void enterCardInfo(String num, String cvc, String exp){
        bookingForm.cardNum.clear();
        bookingForm.cardCvc.clear();
        bookingForm.cardExp.clear();
        try {
            Thread.sleep(2000);
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }

        bookingForm.cardNum.setValue(num);
        bookingForm.cardCvc.setValue(cvc);
        bookingForm.cardExp.setValue(exp);
    }
}
