const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfControllers');


router.get('/', pdfController.renderHome);
router.get('/edit-html', pdfController.renderHtmlEditer);
router.get('/edit', pdfController.editPdf);

router.get('/download', pdfController.generatePDF);
router.get('/download/edited', pdfController.generateEditedPdf);
router.post('/download/html',pdfController.generateHtmlPdf);



module.exports = router;
