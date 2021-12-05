const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service')

router.route('/').get(boardsService.getBoards).post(boardsService.setBoard);

router
  .route('/:boardId')
  .get(boardsService.getBoard)
  .put(boardsService.updateBoard)
  .delete(boardsService.deleteBoard);

router
  .route('/:boardId/tasks')
  .get(tasksService.getTasks)
  .post(tasksService.setTask);

router
  .route('/:boardId/tasks/:taskId')
  .get(tasksService.getTask)
  .put(tasksService.updateTask)
  .delete(tasksService.deleteTask);
module.exports = router;
