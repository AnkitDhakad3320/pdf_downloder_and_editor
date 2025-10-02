const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfControllers');


router.get('/', pdfController.renderHome);
router.get('/edit', pdfController.editPdf);

router.get('/download', pdfController.generatePDF);
router.get('/download/edited', pdfController.generateEditedPdf);


module.exports = router;
