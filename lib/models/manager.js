var _ = require('lodash');
var signals = require('signals');
var Window = require('./window');

var Manager = function (windows) {
  signals.convert(this);

  this.windows = {};
  this.order = [];

  if (_.isArray(windows)) {
    windows.forEach(this.add, this);
  }
};

_.extend(Manager.prototype, {


  /**
   * get a window by it's position in the stack
   * - index (int)
   */

  at: function (index) {
    var id = this.order[index];
    return this.windows[id];
  },


  /**
   * get a window by it's id
   * - id (string) : window id
   */

  get: function (id) {
    return this.windows[id];
  },


  /**
   * check if a window exists in this manager
   * - window (window|string)
   */

  has: function (window) {
    var id = _.isObject(window) ? window.id : window;
    return this.windows.hasOwnProperty(id);
  },

  
  /**
   * add a window
   * - window (Window|object)
   */

  add: function (window) {
    if (!(window instanceof Window)) window = new Window(window);
    window.manager = this;

    this.windows[window.id] = window;
    this.order.push(window.id);

    window.on('change:open', function () {
      this.emit('change');
    }, this);

    window.on('change', function () {
      this.emit('change:windows');
    }, this);

    this.emit('add', window);
    this.emit('change');

    return window;
  },


  /**
   * remove a window
   * - window (Window|string)
   */

  remove: function (window) {
    var id = _.isObject(window) ? window.id : window;
    window = this.get(id);

    if (! window) {
      throw new Error('Can not a window that it cannot find: ' + id);
    }

    delete this.windows[id];
    this.order.splice(this.order.indexOf(id), 1);

    this.emit('remove', window);
    this.emit('change');

    return window;
  },


  /**
   * open a window
   * - component (React)
   * - props (object)
   */

  open: function (component, props) {
    if (! props || ! props.hasOwnProperty('id')) {
      throw new Error('Must specify props.id');
    }

    var window = this.has(props.id) ? this.get(props.id) : this.add(props);
    window.content = component;
    window.open();

    return window;
  },

  
  /**
   * count how many windows are open
   * > int
   */

  length: function () {
    return this.order.length;
  },


  /**
   * focus on a window
   * - window (Window|string)
   */

  focus: function (window) {
    var id = _.isObject(window) ? window.id : window;
    var index = this.order.indexOf(id);

    if (index < 0) {
      throw new Error('Can not focus on a window it cannot find: ' + id);
    } else if (index == this.length() - 1) {
      // already at the end of the stack
      return;
    }

    this.order.splice(index, 1);
    this.order.push(id);

    this.emit('change');
  },

  /**
   * get the active window
   */

  active: function () {
    if (this.order.length === 0) return false;
    return this.windows[this.order[this.order.length - 1]];
  },


  /**
   * filter the windows
   * - predicate (function) : should return true/false
   * - [context] (object) : context to run function as
   */

  filter: function (predicate, context) {
    context = context || this;
    return this.order.filter(function (id) {
      return predicate.call(context, this.windows[id]);
    }, this).map(function (id) {
      return this.windows[id];
    }, this);
  },


  /**
   * loop through each window
   * - iterator (function) : run once for each window
   * - [context] (object) : context to run function as
   */

  forEach: function (iterator, context) {
    context = context || this;
    return this.order.forEach(function (id) {
      return iterator.call(context, this.windows[id]);
    }, this);
  },


  /**
   * map over each window
   * - iterator (function) : run once for each window
   * - [context] (object) : context to run function as
   */

  map: function (iterator, context) {
    context = context || this;
    return this.order.map(function (id) {
      return iterator.call(context, this.windows[id]);
    }, this);
  },


  /**
   * export as a standard JS array
   * > object
   */

  toJSON: function () {
    return this.map(function (window) {
      return window.toJSON();
    });
  },


  /**
   * export as a JSON string
   * > string
   */

  toString: function () {
    return JSON.stringify(this);
  }

});

module.exports = Manager;
