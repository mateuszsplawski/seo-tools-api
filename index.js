const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

const port = 3000;

app.listen(port, () => console.log(`listening @${port}`));
app.get("/meta/:url", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://${req.params.url}`);

    const title = await page.title();
    res.send(title);
    await browser.close();
  })();
});
