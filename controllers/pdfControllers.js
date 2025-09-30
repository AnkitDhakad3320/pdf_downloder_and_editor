const path = require('path');
const puppeteer = require('puppeteer');
const renderHTML = require('../utils/renderHTML');

exports.renderHome = (req, res) => {
  res.render('home', {
    title: "PDF Generator",
    message: "This content will be in the PDF!",
  });
};

exports.editPdf = (req, res) => {
  res.render('edit', {
    title: "The Forgotten Career",
    message: "This content will be in the PDF!"
  });
};

exports.renderHtmlEditer =  (req, res) => {
    console.log('Rendering HTML editor...');
    res.render('htmlEditor');  
};


exports.generatePDF = async (req, res) => {
  console.log('Generating PDF...');
  try {
    const html = await renderHTML('frontpage', {
      title: "The Forgotten Career",
      subtitle: "A Journey Through Theater",
      author: "Abhishek Pathak",
      publisher: "Ankit Novels Press",
      edition: "First Edition",
      year: 2025,
    });

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');
    res.send(pdfBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate PDF');
  }
};

exports.generateEditedPdf = async (req, res) => {
    try {
        const { title, message } = req.query;
        const html = await renderHTML('frontpage', {
            title: title || "Default Title",
            message: message || "Default Message"
        });

        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        await page.setContent(html, {
            waitUntil: 'networkidle0'
        });

        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="edited.pdf"');
        res.send(pdfBuffer);

    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to generate edited PDF');
    }
}

exports.generateHtmlPdf =  async (req, res) => {
  const { html } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="custom-html.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF');
  }
};