const boards = new Map();

const list = async () => boards.values();
const check = async (id) => boards.has(id);
const get = async (id) => boards.get(id);
const set = async (boardObj) => boards.set(boardObj.id, boardObj);
const remove = async (id) => boards.delete(id);

module.exports = { list, check, get, set, remove };
