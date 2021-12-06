const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const deleteTasks = async (tasks) => {
  const result = [];

  tasks.forEach((task) => {
    result.push(tasksRepo.remove(task.id));
  });

  return Promise.all(result);
};

const getBoards = async (req, res) => {
  const boards = Array.from(await boardsRepo.list());

  res.status(200).json(boards);
};

const getBoard = async (req, res) => {
  const id = req.params.boardId;
  const board = await boardsRepo.get(id);

  if (!board) {
    res.status(404).end('Board width specified id does not exist');

    return;
  }

  res.status(200).json(board);
};

const setBoard = async (req, res) => {
  if (!Board.validateBoard(req.body)) {
    res.status(401).end('Mandatory board properties missing');

    return;
  }

  const newBoard = new Board(req.body);

  await boardsRepo.set(newBoard);
  const genBoard = await boardsRepo.get(newBoard.id);
  res.status(201).json(genBoard);
};

const updateBoard = async (req, res) => {
  const id = req.params.boardId;
  const oldBoard = await boardsRepo.get(id);
  const newBoard = req.body;

  if (!oldBoard) {
    res.status(400).end('Board width specified id does not exist');

    return;
  }

  if (!Board.validateBoard(newBoard)) {
    res.status(401).end('Mandatory board properties missing');

    return;
  }

  await boardsRepo.set({ ...newBoard, id });
  res.status(200).json(await boardsRepo.get(id));
};

const deleteBoard = async (req, res) => {
  if (await boardsRepo.remove(req.params.boardId)) {
    const tasks = await tasksRepo.find('boardId', req.params.boardId);

    if (tasks.length > 0) await deleteTasks(tasks);

    res.status(204).end('Board deleted');
  } else res.status(404).end('Board width specified id does not exist');
};

module.exports = { getBoards, getBoard, setBoard, updateBoard, deleteBoard };
