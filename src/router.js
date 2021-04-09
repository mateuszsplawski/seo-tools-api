const express = require("express");

const router = express.Router();
const puppeteer = require("puppeteer");

router.get("/", (req, res) => {
  res.send("Hello from API");
});

router.get("/meta/:url", (req, res) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(req.params.url, {
      waitUntil: "networkidle0",
    });

    const title = await page.title();
    const description = await page.evaluate(
      () => document.querySelector("head > meta[name='description']").content
    );
    const keywords = await page.evaluate(() => {
      if (document.querySelector("head > meta[name='keywords']")) {
        return document.querySelector("head > meta[name='keywords']").content;
      }
    });

    res.send({ title, description, keywords });
    console.log("End");
    await browser.close();
  })();
});

module.exports = router;
