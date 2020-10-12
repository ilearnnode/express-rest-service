const tasksService = require('../task/task.service');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = data => {
  const user = new User(data);
  return usersRepo.create(user);
};

const update = (id, data) => {
  const user = new User(data);
  return usersRepo.update(id, user);
};

const remove = async id => {
  const userTasks = await tasksService.getByUser(id);

  for (let i = 0; i < userTasks.length; i++) {
    const userTask = userTasks[i];
    await tasksService.update(userTask.id, { ...userTask, userId: null });
  }

  await usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
