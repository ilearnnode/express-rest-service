const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const { id = null } = req.params;
  const user = await usersService.get(id);
  if (!user) {
    res.sendStatus(404);
    return;
  }

  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { body = null } = req;
  const user = await usersService.create(body);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const { id = null } = req.params;
  const { body = null } = req;
  const user = await usersService.update(id, body);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id = null } = req.params;
  await usersService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
