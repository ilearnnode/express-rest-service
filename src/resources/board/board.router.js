const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  const result = boards;
  res.json(result);
});

router.route('/:id').get(async (req, res) => {
  const { id = null } = req.params;
  const board = await boardsService.get(id);
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const { body = null } = req;
  const board = await boardsService.create(body);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const { id = null } = req.params;
  const { body = null } = req;
  const board = await boardsService.update(id, body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const { id = null } = req.params;
  await boardsService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
