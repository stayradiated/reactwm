var _ = require('underscore');

var Window = function (props) {
  props       = props        || {};
  this.x      = props.x      || 0;
  this.y      = props.y      || 0;
  this.width  = props.width  || 0;
  this.height = props.height || 0;
  this.title  = props.title  || '';
};

_.extend(Window.prototype, {

  move: function (x, y) {
    this.x = x;
    this.y = y;
  },

  resize: function (originX, originY, deltaX, deltaY) {
    var halfWidth = this.x + (this.width / 2);
    var halfHeight = this.y + (this.height / 2);

    if (originX < halfWidth) {
      // move left side
      this.x += deltaX;
      this.width -= deltaX;
    } else {
      // move right side
      this.width -= deltaX;
    }

    if (originY < halfHeight) {
      // move top side
      this.y += deltaY;
      this.height -= deltaY;
    } else {
      // move bottom side
      this.height -= deltaY;
    }
  },

  rename: function (title) {
    this.title = title;
  }

});

module.exports = Window;
