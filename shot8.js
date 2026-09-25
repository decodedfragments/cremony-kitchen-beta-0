const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
  for (const [name, w, h] of [["b1024",1024,768],["b1440",1440,900],["b1920",1920,1080]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3100/", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 5000));
    const el = await page.$("canvas");
    if (el) await el.screenshot({ path: `chk-${name}.png` });
    await page.screenshot({ path: `chkpage-${name}.png` });
    await page.close();
  }
  await browser.close();
})();
