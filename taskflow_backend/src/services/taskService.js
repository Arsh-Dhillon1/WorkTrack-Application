const Task = require('../models/Task');

const createTask = async (data, userId) => {
  const task = await Task.create({
    ...data,
    owner: userId
  });

  return task;
};

const getProjectTasks = async (projectId, userId) => {
  return await Task.find({
    project: projectId,
    owner: userId
  });
};

const updateTask = async (taskId, data, userId) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, owner: userId },
    data,
    { returnDocument: 'after' }  );

  return task;
};

const getSingleTask = async (taskId, userId) => {
  return await Task.findOne({
    _id: taskId,
    owner: userId
  });
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  getSingleTask
};