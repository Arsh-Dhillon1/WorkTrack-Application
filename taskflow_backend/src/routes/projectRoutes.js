const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, projectController.createProject);
router.get('/', protect, projectController.getProjects);

module.exports = router;