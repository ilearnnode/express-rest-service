const users = [];

const getAll = async () => {
  return users;
};

const get = async id => {
  return users.find(u => u.id === id);
};

const create = async user => {
  users.push(user);
  return user;
};

const update = async (id, user) => {
  const index = users.findIndex(u => u.id === id);
  users[index] = user;
  return user;
};

const remove = async id => {
  const index = users.findIndex(u => u.id === id);
  users.splice(index, 1);
};

module.exports = { getAll, get, create, update, remove };
