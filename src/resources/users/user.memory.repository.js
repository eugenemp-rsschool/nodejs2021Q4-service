const users = new Map();

const list = async () => users.values();
const check = async (id) => users.has(id);
const get = async (id) => users.get(id);
const set = async (userObj) => users.set(userObj.id, userObj);
const remove = async (id) => users.delete(id);

module.exports = { list, check, get, set, remove };
