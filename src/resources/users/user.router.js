const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(usersService.getUsers).post(usersService.setUser);

router
  .route('/:userId')
  .get(usersService.getUser)
  .put(usersService.updateUser)
  .delete(usersService.deleteUser);

module.exports = router;
