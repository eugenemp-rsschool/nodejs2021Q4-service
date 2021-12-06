const tasksRepo = require('../tasks/task.memory.repository');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const updateTasks = async (tasks) => {
  const result = [];

  tasks.forEach((task) => {
    const updatedTask = {...task, userId: null };
    // console.log(updatedTask);
    result.push(tasksRepo.put(updatedTask));
  });

  return Promise.all(result);
};

const getUsers = async (req, res) => {
  const users = Array.from(await usersRepo.list());

  if (users.length === 0) {
    res.status(200).json(users);

    return;
  }

  res.status(200).json(users.map(User.toResponse));
};

const getUser = async (req, res) => {
  const id = req.params.userId;
  const user = await usersRepo.get(id);

  if (!user) {
    res.status(404).end('User width specified id does not exist');

    return;
  }

  res.status(200).json(User.toResponse(user));
};

const setUser = async (req, res) => {
  if (!User.validateUser(req.body)) {
    res.status(400).end('Mandatory user properties missing');

    return;
  }

  const newUser = new User(req.body);

  await usersRepo.set(newUser);
  const genUser = await usersRepo.get(newUser.id);
  res.status(201).json(User.toResponse(genUser));
};

const updateUser = async (req, res) => {
  const id = req.params.userId;
  const oldUser = await usersRepo.get(id);
  const newUser = req.body;

  if (!User.validateUser(newUser)) {
    res.status(400).end('Mandatory user properties missing');

    return;
  }

  if (!oldUser) {
    res.status(400).end('User width specified id does not exist');

    return;
  }

  await usersRepo.set({ ...newUser, id });
  res.status(200).json(await usersRepo.get(id));
};

const deleteUser = async (req, res) => {
  if (await usersRepo.remove(req.params.userId)) {
    const tasks = await tasksRepo.find('userId', req.params.userId);

    if (tasks.length > 0) await updateTasks(tasks);

    res.status(204).end('User deleted');
  } else res.status(404).end('User width specified id does not exist');
};

module.exports = { getUsers, getUser, setUser, updateUser, deleteUser };
