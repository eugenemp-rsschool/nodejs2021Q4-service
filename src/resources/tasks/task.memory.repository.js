const tasks = new Map();

const list = async () => tasks.values();
const check = async (id) => tasks.has(id);
const get = async (id) => tasks.get(id);
const set = async (taskObj) => tasks.set(taskObj.id, taskObj);
const remove = async (id) => tasks.delete(id);

const find = async (prop, value) => {
  const foundTasks = Array.from(await list()).filter(
    (task) => task[prop] === value
  );

  return foundTasks.length > 0 ? foundTasks : false;
};

module.exports = { list, check, get, set, remove, find };
