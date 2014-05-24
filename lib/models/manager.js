var _ = require('lodash');
var signals = require('signals');
var Window = require('./window');

var Manager = function (windows) {
  signals.convert(this);

  this._windows = {};
  this._index = 1;
  this._active = false;

  if (_.isArray(windows)) {
    windows.forEach(this.add, this);
  }

  this._resetIndex();
};

_.extend(Manager.prototype, {


  /**
   * get a window by it's id
   * - id (string) : window id
   */

  get: function (id) {
    return this._windows[id];
  },


  /**
   * check if a window exists in this manager
   * - window (window|string)
   */

  has: function (window) {
    var id = _.isObject(window) ? window.id : window;
    return this._windows.hasOwnProperty(id);
  },

  
  /**
   * add a window
   * - window (Window|object)
   */

  add: function (window) {
    if (!(window instanceof Window)) window = new Window(window);
    window.manager = this;

    this._windows[window.id] = window;
    this.focus(window);

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

    delete this._windows[id];

    this.emit('remove', window);
    this.emit('change');

    return window;
  },


  /**
   * open a window
   * - id (string)
   * - component (React)
   * - defaults (object)
   */

  open: function (id, component, defaults) {
    if (! defaults) defaults = {};
    defaults.id = id;

    var window = this.has(id) ? this.get(id) : this.add(defaults);
    window.setComponent(component);
    window.open();
    this.focus(window);

    return window;
  },

  
  /**
   * count how many windows are open
   * > int
   */

  length: function () {
    return _.keys(this._windows).length;
  },


  /**
   * focus on a window
   * - window (Window|string)
   */

  focus: function (id) {
    var window = _.isObject(id) ? id : this.get(id);

    if (! window) {
      throw new Error('Can not focus on a window it cannot find: ' + id);
    } else if (window === this._active) {
      // already at the end of the stack
      return;
    }

    window.setIndex(this._index++);
    this._active = window;
  },

  /**
   * get the active window
   */

  active: function () {
    return this._active;
  },


  /**
   * get all windows (open and closed)
   */

  allWindows: function () {
    return _.values(this._windows);
  },


  /**
   * get all open windows
   * > array
   */

  openWindows: function () {
    return this.allWindows().filter(function (window) {
      return window.isOpen;
    });
  },


  /**
   * export as a standard JS array
   * > object
   */

  toJSON: function () {
    return this.allWindows().map(function (window) {
      return window.toJSON();
    });
  },


  /**
   * export as a JSON string
   * > string
   */

  toString: function () {
    return JSON.stringify(this);
  },


  /**
   * private: reset window index to 0
   */

  _resetIndex: function () {
    this._index = 1;
    _.sortBy(this.allWindows(), 'index').forEach(function (window) {
      window.setIndex(this._index++);
      this._active = window;
    }, this);
  }

});

module.exports = Manager;
