const Project = require('../models/Project');

const createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    owner: userId
  });

  return project;
};

const getUserProjects = async (userId) => {
  return await Project.find({ owner: userId });
};

module.exports = {
  createProject,
  getUserProjects
};