const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');

// Create Task
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('project').isMongoId().withMessage('Invalid project ID'),
    body('status')
      .optional()
      .isIn(['todo', 'in-progress', 'done'])
      .withMessage('Invalid status value')
  ],
  validate,
  protect,
  taskController.createTask
);


router.get(
  '/single/:taskId',
  protect,
  taskController.getSingleTask
);

// Get Tasks by Project

router.get(
  '/:projectId',
  [
    param('projectId').isMongoId().withMessage('Invalid project ID')
  ],
  validate,
  protect,
  taskController.getTasks
);

// Update Task
router.put(
  '/:taskId',
  [
    param('taskId').isMongoId().withMessage('Invalid task ID'),
    body('status')
      .optional()
      .isIn(['todo', 'in-progress', 'done'])
      .withMessage('Invalid status value')
  ],
  validate,
  protect,
  taskController.updateTask
);

module.exports = router;