const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const Column = require('./column.model');

const getAll = () => boardRepo.getAll();

const get = id => boardRepo.get(id);

const create = data => {
  const columns = data.columns.map(c => new Column(c));
  const board = new Board({ ...data, columns });
  return boardRepo.create(board);
};

const update = (id, data) => {
  const columns = data.columns.map(c => new Column(c));
  const board = new Board(...data, columns);
  return boardRepo.update(id, board);
};

const remove = id => boardRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
