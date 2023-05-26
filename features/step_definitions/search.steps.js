const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, setDefaultTimeout, After } = require("@cucumber/cucumber");
const { timeSelection, seatSelection, completionOfBooking, dateSelection } = require("../../lib/commands.js");

setDefaultTimeout(60000);

Before(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 300
    });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given("user is on {string} page", async function (string) {
    return await this.page.goto(`http://qamid.tmweb.ru/${string}/index.php`);
});

When("user selects time {int}", async function (time) {
    return await timeSelection(this.page, time);
});

When("user select seats row {string} and seat {string}", {timeout: 60000}, async function (string, string2) {
  return await seatSelection(this.page, string, string2);
});


When("choose the date today + {int} day", async function (day) {
    return await dateSelection(this.page, day + 1);
});

Then("user gets {string}", async function (string) {
    await completionOfBooking(this.page, "button", "button");
        
    const actual = await this.page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
    expect(actual).contains(`i/${string}.png`);
});

Then("booking {string} is disabled", async function (selector) {
    
    const actual = await this.page.$eval(`${selector}`, link => link.hasAttribute('disabled'));
    expect(actual).to.be.true;
})