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
import java.math.RoundingMode;
import java.sql.Date;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.codeborne.selenide.Selenide.open;
import static java.lang.Math.round;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class BookingTest {
    WebDriver driver;

    Login login = new Login();
    Home home = new Home();

    ModifyListing modify = new ModifyListing();

    Details details = new Details();
    BookingForm bookingForm = new BookingForm();

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

    /**
     * Feature (ban double booking) isn't implemented yet
     * placeholder for now
     */
//    @Test
//    public void doubleBookingBan_check() throws Exception {
//        WebDriver driver = WebDriverRunner.getWebDriver();
//        loginAsGuest();
//        Thread.sleep(500);
//        home.myBookingBtn.click();
//        Thread.sleep(2000);
//        try{
//            driver.findElements(By.className("booking-card")).get(0).click();
//        }
//        catch(IndexOutOfBoundsException e){
//            String hotelName = findAvailableRoom(driver);
//            Thread.sleep(1000);
//            System.out.println("[doubleBookingBan_check()] hotelName = " + hotelName);
//            assert(!hotelName.equals("!!! No available room !!!"));
//            enterCardInfo("378282246310005", "1234", "05/29");
//            Thread.sleep(1000);
//            bookingForm.submitBtn.click();
//            Thread.sleep(2000);
//            bookingForm.bookingSuccessBtn.click();
//            Thread.sleep(1000);
//            driver.findElements(By.className("booking-card")).get(0).click();
//            Thread.sleep(1500);
//        }
//        //room booked
//        //get dates
//        // try to book again
//        // should not be able to
//    }

    @Test
    public void cancellationPolicy_feeCharged() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        // make sure listing has start date within 3 days
        modifyListingForCancelFee();
        open("/login");
        Thread.sleep(1000);
        loginAsGuest();
        Thread.sleep(1000);
        open("/room/34dWrYMylgIFpv7Fiqxt");
        Thread.sleep(2000);

        // if not already reserved --> reserve it
        if(!details.reservedContainer.isDisplayed()){
            details.reserveBtn.click();
            Thread.sleep(1000);
            enterCardInfo("378282246310005", "1234", "05/29");
            Thread.sleep(1000);
            bookingForm.submitBtn.click();
            Thread.sleep(4000);
            bookingForm.bookingSuccessBtn.click();
            Thread.sleep(1000);
        }
        open("/mybooking");
        Thread.sleep(2000);
        
        // calculate expected cancellation fee
        WebElement selectedBooking = findCardMyBookings(driver.findElements(By.className("booking-card")), "VipHotel");
        Thread.sleep(5000);
        String cancelFee = calculateCancelFee(parseTotalFromBooking(selectedBooking));
        System.out.println("[cancellationPolicy_feeCharged()] cancelFee = " + cancelFee);
        Thread.sleep(3000);

        open("/room/34dWrYMylgIFpv7Fiqxt");
        Thread.sleep(3000);
        details.cancelBookingBtn.click();
        Thread.sleep(2000);

        assert(bookingForm.cancelFeeWarning.isDisplayed());
        assertEquals(bookingForm.cancelFee.text(), cancelFee);
    }

    @Test
    public void cancellationPolicy_noFeeCharged() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        // make sure listing has start date within 3 days
        modifyListingForNoCancelFee();
        open("/login");
        Thread.sleep(1000);
        loginAsGuest();
        Thread.sleep(1000);
        open("/room/34dWrYMylgIFpv7Fiqxt");
        Thread.sleep(2000);

        // if not already reserved --> reserve it
        if(!details.reservedContainer.isDisplayed()){
            details.reserveBtn.click();
            Thread.sleep(1000);
            enterCardInfo("378282246310005", "1234", "05/29");
            Thread.sleep(1000);
            bookingForm.submitBtn.click();
            Thread.sleep(4000);
            bookingForm.bookingSuccessBtn.click();
            Thread.sleep(1000);
        }

        open("/room/34dWrYMylgIFpv7Fiqxt");
        Thread.sleep(3000);
        details.cancelBookingBtn.click();
        Thread.sleep(2000);

        assert(!bookingForm.cancelFeeWarning.isDisplayed());
        assertEquals(bookingForm.cancelFee.text(), "$0");
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

    WebElement findCardMyBookings(List<WebElement> bookingList, String hotelName){
        System.out.println("[findCardMyBookings()]: " + hotelName);
        for(WebElement b: bookingList){
            try{
                String[] hotelInfo = b.getText().split("\\r?\\n|\\r");
                System.out.println("Checking: " + hotelInfo[0]);
                if(hotelInfo[0].equals(hotelName)){
                    return b;
                }
            }
            catch(StaleElementReferenceException e){
                return null;
            }
        }
        return null;
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

    void loginAsHotel() throws Exception{
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }

    String calculateCancelFee(double price){
        DecimalFormat df = new DecimalFormat("0");
        double cFee = Math.round(0.2*price);
        return "$" + df.format(cFee);
    }

    double parseTotalFromBooking(WebElement booking){
        if(booking != null){
            try{
                String[] hotelInfo = booking.getText().split("\\r?\\n|\\r");
                System.out.println("[parseTotalFromBooking()] Parsing Total from: " + hotelInfo[0]);
//                for(int i = 0; i < hotelInfo.length; i++){
//                    System.out.println("[parseTotalFromBooking()] hotelInfo["+i+"] = " + hotelInfo[i]);
//                }
                String sPrice = hotelInfo[4].replaceAll("[A-za-z,$:]","");
                System.out.println("[parseTotalFromBooking()] sPrice = " + sPrice);
                return Double.parseDouble(sPrice);
            }
            catch(StaleElementReferenceException e){
                System.out.println("[parseTotalFromBooking()] ERROR");
                return -1.0;
            }
        }
        System.out.println("[parseTotalFromBooking()] ERROR");
        return -1.0;
    }

    void modifyListingForCancelFee() throws Exception{
        if(home.logoutBtn.isDisplayed()){
            home.logoutBtn.click();
            open("/login");
        }
        loginAsHotel();
        open("/room/34dWrYMylgIFpv7Fiqxt");
        try{
            Thread.sleep(2000);
            details.dropdownBtn.click();
            Thread.sleep(500);
            details.editBtn.click();
            Thread.sleep(1000);

            String dateString = new SimpleDateFormat("MM/dd/yyyy").format(new Date(System.currentTimeMillis()));
            System.out.println("[modifyListingForCancelFee()] dateString = " + dateString);

            modify.fromDate.clear();
            modify.fromDate.sendKeys(dateString);
            modify.submitBtn.click();
            Thread.sleep(2000);

            if(modify.toDateError.isDisplayed())
                tempFixToDateFormat();
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        open("/home");
        Thread.sleep(500);
        home.logoutBtn.click();
        Thread.sleep(500);
        open("/login");

    }

    void modifyListingForNoCancelFee() throws Exception{
        if(home.logoutBtn.isDisplayed()){
            home.logoutBtn.click();
            open("/login");
        }
        loginAsHotel();
        open("/room/34dWrYMylgIFpv7Fiqxt");
        try{
            Thread.sleep(2000);
            details.dropdownBtn.click();
            Thread.sleep(500);
            details.editBtn.click();
            Thread.sleep(1000);


            Calendar c = Calendar.getInstance();
            c.setTime(new Date(System.currentTimeMillis())); // Using today's date
            c.add(Calendar.DATE, 5);
            String dateString = new SimpleDateFormat("MM/dd/yyyy").format(c.getTime());
            System.out.println("[modifyListingForNoCancelFee()] dateString = " + dateString);

            modify.fromDate.clear();
            modify.fromDate.sendKeys(dateString);
            modify.submitBtn.click();
            Thread.sleep(2000);

            if(modify.toDateError.isDisplayed())
                tempFixToDateFormat();
        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
        open("/home");
        Thread.sleep(500);
        home.logoutBtn.click();
        Thread.sleep(500);
        open("/login");

    }

    void tempFixToDateFormat(){
        modify.toDate.clear();
        modify.toDate.sendKeys("07/19/2024");
        modify.submitBtn.click(); //reattempts submission

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
