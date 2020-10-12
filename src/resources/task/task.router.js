const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId = null } = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const { id = null } = req.params;
  const task = await tasksService.get(id);
  if (!task) {
    res.sendStatus(404);
    return;
  }

  res.json(task);
});

router.route('/').post(async (req, res) => {
  const { boardId = null } = req.params;
  const { body = null } = req;
  const task = await tasksService.create(boardId, body);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const { id = null } = req.params;
  const { body = null } = req;
  const task = await tasksService.update(id, body);
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const { id = null } = req.params;
  await tasksService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
