const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async boardId => {
  const tasks = await tasksRepo.getAll();
  return tasks.filter(t => t.boardId === boardId);
};

const getAllByUser = async userId => {
  console.log('getAllByUser');

  const tasks = await tasksRepo.getAll();
  console.log('all', tasks);
  return tasks.filter(t => t.userId === userId);
};

const get = id => tasksRepo.get(id);

const create = (boardId, data) => {
  const task = new Task({ ...data, boardId });
  console.log('createTask', task);
  return tasksRepo.create(task);
};

const update = (id, data) => {
  const task = new Task(data);
  return tasksRepo.update(id, task);
};

const remove = id => tasksRepo.remove(id);

module.exports = { getAll, getAllByUser, get, create, update, remove };
