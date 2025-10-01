const express = require('express');
const router = express.Router();
const urlScreenshotController = require('../controllers/urlScreenshotController');

router.get('/edit-html', urlScreenshotController.renderHtmlEditer);
router.get("/screenshot",urlScreenshotController.urlImageGenerator );
router.post('/download/html',urlScreenshotController.generateHtmlPdf);


module.exports = router;