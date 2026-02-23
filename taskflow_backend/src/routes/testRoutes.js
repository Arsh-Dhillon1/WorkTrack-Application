const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, testController.createTest);

module.exports = router;