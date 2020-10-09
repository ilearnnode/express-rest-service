const tasks = [];

const getAll = async () => {
  return tasks;
};

const get = async id => {
  return tasks.find(t => t.id === id);
};

const create = async task => {
  tasks.push(task);
  return task;
};

const update = async (id, task) => {
  const index = tasks.findIndex(t => t.id === id);
  tasks[index] = task;
  return task;
};

const remove = async id => {
  const index = tasks.find(t => t.id === id);
  tasks.splice(index, 1);
};

module.exports = { getAll, get, create, update, remove };
