var _ = require('lodash');
var Window = require('./window');
var Guides = require('./guides');

var Manager = function () {
  this.windows = [];
};

_.extend(Manager.prototype, {

  onChange: _.noop,


  /**
   * get a window at a specified index
   * - i (int) : index
   */

  at: function (i) {
    return this.windows[i];
  },


  /**
   * get a window by it's id
   * - id (int) : window id
   */

  get: function (id) {
    for (var i = 0, len = this.windows.length; i < len; i++) {
      if (this.windows[i].id === id) {
        return this.windows[i];
      }
    }
    return undefined;
  },

  
  /**
   * add a window
   * - window (Window|object)
   */

  add: function (window) {
    if (!(window instanceof Window)) window = new Window(window);
    window.manager = this;
    this.windows.push(window);
    this.onChange();
  },


  /**
   * remove a window
   * - window (Window|int)
   */

  remove: function (window) {
    if (!(window instanceof Window)) window = this.get(window);
    var index = this.windows.indexOf(window);
    if (index > -1) {
      this.windows.splice(index, 1);
      this.onChange();
    }
  },

  
  /**
   * count how many windows are open
   * > int
   */

  length: function () {
    return this.windows.length;
  },


  /*
   * move a window to the end of the stack
   * - window (Window|int)
   */

  bringToFront: function (window) {
    if (!(window instanceof Window)) window = this.get(window);
    var index = this.windows.indexOf(window);
    if (index > -1) {
      this.windows.splice(index, 1);
      this.windows.push(window);
      this.onChange();
    }
  },


  /*
   * loop through each window
   */

  forEach: function (iterator, context) {
    return this.windows.forEach(iterator, context);
  },


  /*
   * map over each window
   */

  map: function (iterator, context) {
    return this.windows.map(iterator, context);
  },


  /*
   * export as a standard JS array
   */

  toJSON: function () {
    return _.map(this.windows, function (window) {
      return window.toJSON();
    });
  },


  /*
   * export as a JSON string
   */

  toString: function () {
    return JSON.stringify(this);
  }

});

module.exports = Manager;
