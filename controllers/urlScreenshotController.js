const puppeteer = require('puppeteer');

exports.renderHtmlEditer =  (req, res) => {
    res.render('htmlEditor');  
};

exports.generateHtmlPdf =  async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { 
        waitUntil: "networkidle2",
     });
     await browser.close();
    const pdfBuffer = await page.pdf({ format: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="custom-html.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
};

exports.urlImageGenerator = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL required");

  const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
 args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-accelerated-2d-canvas",
    "--no-first-run",
    "--no-zygote",
    "--single-process",
    "--disable-gpu",
  ]
  });
  const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    );
  await page.goto(url, { 
      waitUntil: "domcontentloaded", // instead of networkidle2
      timeout: 60000,
   });
  const screenshotBuffer = await page.screenshot({ type: "png" ,fullPage: false });
  await browser.close();

  res.set("Content-Type", "image/png");
  res.send(screenshotBuffer);
}