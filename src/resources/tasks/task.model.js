const { v4: uuidv4 } = require('uuid');

class Task {
  constructor({
    id = uuidv4(),
    title = 'TASK',
    order = 'task',
    description = 'desc',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static validateTask(task) {
    const props = [
      'title',
      'order',
      'description',
      'userId',
      'boardId',
      'columnId',
    ];
    if (!props.every((prop) => prop in task)) return false;

    return true;
  }
}

module.exports = Task;
