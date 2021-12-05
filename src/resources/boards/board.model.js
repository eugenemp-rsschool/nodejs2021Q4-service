const { v4: uuidv4 } = require('uuid');
const Column = require('./column/column.model');

class Board {
  constructor({ id = uuidv4(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static validateBoard(board) {
    if (!('title' in board) || !('columns' in board)) return false;
    if (typeof board.title !== 'string' || !Array.isArray(board.columns))
      return false;

    if (
      board.columns.length !== 0 &&
      board.columns.every((column) => Column.validateColumn(column))
    )
      return false;

    return true;
  }
}

module.exports = Board;
