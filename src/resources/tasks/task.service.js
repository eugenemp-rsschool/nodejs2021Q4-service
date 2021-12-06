const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getTasks = async (req, res) => {
  const tasks = Array.from(await tasksRepo.list());

  res.status(200).json(tasks);
};

const getTask = async (req, res) => {
  const id = req.params.taskId;
  const task = await tasksRepo.get(id);

  if (!task) {
    res.status(404).end('Task width specified id does not exist');

    return;
  }

  res.status(200).json(task);
};

const setTask = async (req, res) => {
  if (!Task.validateTask(req.body)) {
    res.status(401).end('Mandatory task properties missing');

    return;
  }

  const newTask = new Task({ ...req.body, boardId: req.params.boardId });

  await tasksRepo.set(newTask);
  const genTask = await tasksRepo.get(newTask.id);
  res.status(201).json(genTask);
};

const updateTask = async (req, res) => {
  const id = req.params.taskId;
  const oldTask = await tasksRepo.get(id);
  const newTask = req.body;

  if (!Task.validateTask(newTask)) {
    res.status(400).end('Mandatory task properties missing');

    return;
  }

  if (!oldTask) {
    res.status(404).end('Task width specified id does not exist');

    return;
  }

  await tasksRepo.set({ ...newTask, id });
  res.status(200).json(await tasksRepo.get(id));
};

const deleteTask = async (req, res) => {
  if (await tasksRepo.remove(req.params.taskId))
    res.status(204).end('Task deleted');
  else res.status(404).end('Task width specified id does not exist');
};

module.exports = {
  getTasks,
  getTask,
  setTask,
  updateTask,
  deleteTask,
};
