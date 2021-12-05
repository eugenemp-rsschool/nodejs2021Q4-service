const { v4: uuidv4 } = require('uuid');

class Column {
  constructor({ title = 'Column', order = 1 } = {}) {
    this.id = uuidv4;
    this.title = title;
    this.order = order;
  }

  static validateColumn(column) {
    if (!('title' in column) || !('order' in column)) return false;
    if (typeof column.title !== 'string' || typeof column.title !== 'number')
      return false;

    return true;
  }
}

module.exports = Column;
