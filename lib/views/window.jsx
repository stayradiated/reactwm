var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var classSet = require('react/addons').addons.classSet;

var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var Window = React.createClass({

  componentWillMount: function () {
    this.window = this.props.window;
  },

  componentDidMount: function () {
    this.window.on('change', this.forceUpdate, this);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  },

  componentWillUnmount: function () {
    this.window.off('change', this.forceUpdate);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  },

  quickUpdate: function () {
    var self = this;
    requestAnimationFrame(function () {
      var el = self.getDOMNode();
      el.style.width = self.window.width + 'px';
      el.style.height = self.window.height + 'px';
      el.style.top = self.window.y + 'px';
      el.style.left = self.window.x + 'px';
    });
  },

  preventDefault: function (e) {
    e.preventDefault();
    return false;
  },

  handlePropagation: function (e) {
    if (!(e.ctrlKey || e.metaKey || e.altKey || e.button !== 0)){
      this.focus();
      e.stopPropagation();
    }
  },

  handleResize: function (e) {
    this.focus();
    var mouse = this.convertPoints(e);
    this.window.startResize(mouse.x, mouse.y);
    e.stopPropagation();
  },

  handleMove: function (e) {
    this.focus();
    var mouse = this.convertPoints(e);
    this.window.startMove(mouse.x, mouse.y);
  },

  handleMouseMove: function (e) {
    if (this.window.mode == INACTIVE) return true;
    var mouse = this.convertPoints(e);
    this.window.update(mouse.x, mouse.y);
    this.quickUpdate();
  },

  handleMouseUp: function () {
    this.window.endChange();
  },

  focus: function () {
    this.window.requestFocus();
  },

  close: function () {
    this.window.requestFocus();
    this.window.close();
  },

  convertPoints: function (e) {
    return {
      x: e.clientX - this.props.offset.left,
      y: e.clientY - this.props.offset.top
    };
  },

  render: function () {
    var classes = classSet({
      window: true,
      active: this.window.isFocused()
    });

    var styles = {
      top: this.window.y,
      left: this.window.x,
      width: this.window.width,
      height: this.window.height,
      zIndex: this.window.index
    };

    return (
      <div className={classes} style={styles} onMouseDown={this.handleMove}>
        <header>
          <div className='title'>{this.window.title}</div>
          <div className='close' onMouseDown={this.preventDefault} onClick={this.close} />
        </header>
        <div className='content' onMouseDown={this.handlePropagation}>
          {this.window.component}
        </div>
        <div className='resize s-resize' onMouseDown={this.handleResize} />
        <div className='resize e-resize' onMouseDown={this.handleResize} />
        <div className='resize w-resize' onMouseDown={this.handleResize} />
        <div className='resize sw-resize' onMouseDown={this.handleResize} />
        <div className='resize se-resize' onMouseDown={this.handleResize} />
      </div>
    );
  }

});

module.exports = Window;
