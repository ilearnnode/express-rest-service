const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async boardId => {
  const tasks = await tasksRepo.getAll();
  return tasks.filter(t => t.boardId === boardId);
};

const getByUser = async userId => {
  const tasks = await tasksRepo.getAll();
  return tasks.filter(t => t.userId === userId);
};

const get = id => tasksRepo.get(id);

const create = (boardId, data) => {
  const task = new Task({ ...data, boardId });
  return tasksRepo.create(task);
};

const update = (id, data) => {
  const task = new Task(data);
  return tasksRepo.update(id, task);
};

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getByUser, get, create, update, remove };
