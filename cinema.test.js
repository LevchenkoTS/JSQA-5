const jestPuppeteerConfig = require("./jest-puppeteer.config");
const jestConfig = require("./jest.config");
const { timeSelection, seatSelection, completionOfBooking, dateSelection } = require("./lib/commands.js");

let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(() => {
    page.close();
});

describe("Buy tacket", () => {
    beforeEach(async () => {
        await page.goto("http://qamid.tmweb.ru/client/index.php");
    });

    test("Booking ticket tomorrow", async () => {

        await dateSelection(page, 2);
        await timeSelection(page, 2);
        
        await seatSelection(page, 1, 3);
        await completionOfBooking(page, "button", "button");
        await page.waitForSelector('.ticket__info-qr', {
            visible: true,
        });
        const actual = await page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
        expect(actual).toEqual("i/QR_code.png");
    });

    test("Booking two tickets in 3 days", async () => {
 
        await dateSelection(page, 4);
        await timeSelection(page, 2);
        await seatSelection(page, 3, 6);
        await completionOfBooking(page, "button", "button");
        
        const actual = await page.$eval(".ticket__info-qr", link => link.getAttribute('src') );
        expect(actual).toEqual("i/QR_code.png");
    });

    test("Inactive booking button", async () => {
        await dateSelection(page, 2);
        await timeSelection(page, 2);
        
        const actual = await page.$eval("button", link => link.hasAttribute('disabled'));
        expect(actual).toBe(true);
    });
})