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

import java.util.HashMap;

import static com.codeborne.selenide.Selenide.open;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class DeleteListingTest {

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
        WebElement previewCard = driver.findElement(By.className("gsgro"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.deleteListingBtn.click();
        Thread.sleep(500);
        details.confirmDeleteListingBtn.click();
        Thread.sleep(2000);

        assertEquals("200", home.responseCode.val());
    }

    @Test
    public void modify_price_fail() throws Exception {
        WebDriver driver = WebDriverRunner.getWebDriver();
        loginAsHotel();
        Thread.sleep(1000);
        WebElement previewCard = driver.findElement(By.className("gsgro"));
        previewCard.click();
        ((JavascriptExecutor) driver).executeScript(
                "window.scrollTo(0, -document.body.scrollHeight)");
        Thread.sleep(2000);
        details.dropdownBtn.click();
        Thread.sleep(500);
        details.deleteListingBtn.click();
        Thread.sleep(500);
        details.cancelDeleteListingBtn.click();
        Thread.sleep(2000);

        assert(details.price.isDisplayed()); //modal is closed
    }

    void loginAsHotel() throws Exception{
        login.email.sendKeys("vip@hotel.com");
        login.password.sendKeys("123456");
        login.submitBtn.click();
        Thread.sleep(3000);
    }
}
