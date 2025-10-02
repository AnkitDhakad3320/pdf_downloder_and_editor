const puppeteer = require('puppeteer');

exports.renderHtmlEditer =  (req, res) => {
    res.render('htmlEditor');  
};

exports.generateHtmlPdf =  async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({
         headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
      ],
      });
    const page = await browser.newPage();

    await page.setContent(html, { 
        waitUntil: "domcontentloaded", // instead of networkidle2
      timeout: 20000,
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
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
      ],
  });
  const page = await browser.newPage();
  await page.goto(url, { 
      waitUntil: "domcontentloaded", // instead of networkidle2
      timeout: 60000,
   });
  const screenshotBuffer = await page.screenshot({ type: "png" });
  await browser.close();

  res.set("Content-Type", "image/png");
  res.send(screenshotBuffer);
}