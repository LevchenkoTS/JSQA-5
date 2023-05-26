module.exports = {
    timeSelection: async function (page, time) {
      try {
          const linkToTime = `div:nth-child(${time}) > ul > li > a`;
          await page.waitForSelector(linkToTime);
          await page.click(linkToTime);
          await page.waitForSelector('div.buying-scheme', {
              visible: true,
          });
      } catch (error) {
          throw new Error("The movie or time is specified incorrectly");
      }
  },

  seatSelection: async function (page, row, chairNumber) {
      try {
          const seat= `div:nth-child(${row}) > span:nth-child(${chairNumber})`;
          await page.waitForSelector(seat);
          await page.click(seat);
      } catch (error) {
          throw new Error("The place is indicated incorrectly or is already busy");
      }
      
  },

  completionOfBooking: async function (page, buttonBook, buttonCode) {
      try {
          await page.click(buttonBook);
          // await page.waitForSelector('ticket__check-title');
          await page.click(buttonCode);
          await page.waitForSelector('.ticket__info-qr', {
              visible: true,
          });
      } catch (error) {
          throw new Error(`The action is not available for the selector: ${buttonCode}`);
      }
      
  },

  dateSelection: async function (page, day) {
      try {
          const buttonDay = `a:nth-child(${day})`;
          await page.click(buttonDay);
          
      } catch (error) {
          throw new Error(`The action is not available for the selector: ${buttonDay}`);
      }
      
  }
}