const Test = require('../models/Test');

const createTest = async (data) => {
  const newTest = await Test.create(data);
  return newTest;
};

module.exports = {
  createTest
};
