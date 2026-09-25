const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
  const results = [];
  for (const [name, w, h] of [["p1024",1024,768],["p1440",1440,900],["p1920",1920,1080]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto("http://localhost:3100/", { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 3500));
    const el = await page.$("canvas");
    for (let i = 0; i < 3 && el; i++) {
      await el.screenshot({ path: `f-${name}-${i}.png` });
      await new Promise(r => setTimeout(r, 2600));
    }
    if (name === "p1440") await page.screenshot({ path: "f-page-1440.png" });
    await page.close();
  }
  await browser.close();
  console.log("done");
})();
