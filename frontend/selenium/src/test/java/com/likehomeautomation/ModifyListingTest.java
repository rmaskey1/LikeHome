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
    HashMap<SelenideElement, String> amenitiesDescr = new HashMap<>();


    @BeforeAll
    public static void setUpAll() {
        System.setProperty("webdriver.chrome.driver", "../node_modules/chromedriver/lib/chromedriver/chromedriver.exe");
        Configuration.browserSize = "1280x900";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {

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
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
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

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.price.text(), "$"+modifiedPrice);
    }

    @Test
    public void modify_price_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
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
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.fromDate.clear();
        modify.fromDate.sendKeys("10/30/2023");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.fromDate.innerText(), "Oct 30, 23");
    }

    @Test
    public void modify_fromDate_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
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

    @Test
    public void modify_toDate_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.toDate.clear();
        modify.toDate.sendKeys("07/19/2024");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.toDate.innerText(), "Jul 19, 24");
    }

    @Test
    public void modify_toDate_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.toDate.clear();
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.toDateError.isDisplayed());
    }

    @Test
    public void modify_guests_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.guests.clear();
        modify.guests.sendKeys("5");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.guests.innerText(), "5 Guests");
    }

    @Test
    public void modify_guests_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.guests.clear();
        modify.guests.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.guestsError.isDisplayed());
    }

    @Test
    public void modify_beds_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.beds.clear();
        modify.beds.sendKeys("1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.beds.innerText(), "1 Bed(s) "+ details.bedType.innerText());
    }

    @Test
    public void modify_beds_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.beds.clear();
        modify.beds.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.bedsError.isDisplayed());
    }

    @Test
    public void modify_bedType_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.bedType.clear();
        modify.bedType.sendKeys("king");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.bedType.innerText(), "(king)");
    }

    @Test
    public void modify_bedType_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.bedType.clear();
        modify.bedType.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.bedTypeError.isDisplayed());
    }

    @Test
    public void modify_bathrooms_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        modify.bathrooms.clear();
        modify.bathrooms.sendKeys("5");
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assertEquals(details.bathrooms.innerText(), "5 Bath");
    }

    @Test
    public void modify_bathrooms_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        Thread.sleep(3000);
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        details.editBtn.click();
        Thread.sleep(1000);

        modify.bathrooms.clear();
        modify.bathrooms.sendKeys("-1");
        modify.submitBtn.click();
        Thread.sleep(2000);

        assert(modify.bathroomsError.isDisplayed());
    }

    /**
     * Issue B2
     * currently only displays 1 amenity after modification
     */
    @Test
    public void modify_amenities_pass() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElements(By.className("previewCard-select")).get(0);
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.editBtn.click();
        Thread.sleep(1000);

        initializeAmenitiesMap();
        initializeAmenitiesDesr();
        clearAmenities();

        ArrayList<String> selected = selectRandomAmenities();
        modify.submitBtn.click();
        Thread.sleep(2000);

        if(modify.fromDateError.isDisplayed() || modify.toDateError.isDisplayed())
            tempFixDateFormat();

        assert(checkAmenities(driver, selected));
    }

    boolean checkAmenities(WebDriver driver, ArrayList<String> amenitiesUnderTest){
        ArrayList<WebElement> displayedAmenities = new ArrayList<>(driver.findElements(By.className("amenities-descr")));
        ArrayList<String> displayedDescr = new ArrayList<>();
        for(WebElement d: displayedAmenities){
            String displayedTxt = d.getText();
            displayedDescr.add(d.getText());
            System.out.println("displayed: " + displayedTxt);
        }

        for(String a: amenitiesUnderTest){
            System.out.println("selected: " + a);
            if(!displayedDescr.contains(a))
                return false;
        }
        return true;
    }


    ArrayList<String> selectRandomAmenities(){
        ArrayList<String> selectedAmenities = new ArrayList<>();
        Random r = new Random();
        int amnt = r.nextInt(14);
        for(int i = 0; i < amnt; i++){
            int selected = r.nextInt(14);
            System.out.println("selectRandomAmenities(): selected " + amenitiesDescr.get(amenitiesMap.get(selected)));
            selectedAmenities.add(amenitiesDescr.get(amenitiesMap.get(selected)));
            amenitiesMap.get(selected).click();
        }
        return selectedAmenities;
    }

    void clearAmenities(){
        ArrayList<SelenideElement> selectedAmenities = new ArrayList<>();
        for(int i = 0; i < 13; i++){
            SelenideElement amenity = amenitiesMap.get(i);
            if(amenity.isSelected())
                amenity.click(); //unchecks amenity
        }
    }

    void tempFixDateFormat(){
        modify.fromDate.clear();
        modify.fromDate.sendKeys("10/30/2023");
        modify.toDate.clear();
        modify.toDate.sendKeys("07/19/2024");
        modify.submitBtn.click(); //reattempts submission
    }

    void loginAsHotel() throws Exception{
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(5000);
    }

    void initializeAmenitiesDesr(){
        amenitiesDescr.put(modify.freeWifi, "Free Wifi");
        amenitiesDescr.put(modify.pool, "Pool");
        amenitiesDescr.put(modify.tv, "TV");
        amenitiesDescr.put(modify.washer, "Free Washer - In Unit");
        amenitiesDescr.put(modify.dryer, "Free Dryer - In Unit");
        amenitiesDescr.put(modify.parking, "Free Parking");
        amenitiesDescr.put(modify.ac, "Air Conditioning");
        amenitiesDescr.put(modify.breakfast, "Free Breakfast");
        amenitiesDescr.put(modify.lunch, "Free Lunch");
        amenitiesDescr.put(modify.dinner, "Free Dinner");
        amenitiesDescr.put(modify.microwave, "Microwave");
        amenitiesDescr.put(modify.refrigerator, "Refrigerator");
        amenitiesDescr.put(modify.pet, "Pet Friendly");
        amenitiesDescr.put(modify.spa, "Spa");
    }

    void initializeAmenitiesMap(){
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
    }

}
