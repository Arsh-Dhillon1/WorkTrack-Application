const testService = require('../services/testService');

const createTest = async (req, res) => {
  try {
    const result = await testService.createTest(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTest
};
