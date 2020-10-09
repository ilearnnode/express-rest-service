const boards = [];

const getAll = async () => {
  return boards;
};

const get = id => {
  return boards.find(b => b.id === id);
};

const create = board => {
  boards.push(board);
  return board;
};

const update = (id, board) => {
  const index = boards.findIndex(b => b.id === id);
  boards[index] = board;
  return board;
};

const remove = id => {
  const index = boards.findIndex(b => b.id === id);
  boards.splice(index, 1);
};

module.exports = { getAll, get, create, update, remove };
