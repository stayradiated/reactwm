var _ = require('lodash');
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
    this.window.on('change:open', this.forceUpdate, this);
    this.window.on('change:title', this.forceUpdate, this);
    this.window.on('change:position', this.setPosition, this);
    this.window.on('change:size', this.setSize, this);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  },

  componentWillUnmount: function () {
    this.window.off('change:open', this.forceUpdate);
    this.window.off('change:title', this.forceUpdate);
    this.window.off('change:position', this.setPosition);
    this.window.off('change:size', this.setSize);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  },

  componentDidUpdate: function () {
    this.setSize();
    this.setPosition();
  },

  setSize: function () {
    var el = this.getDOMNode();
    el.style.top = this.window.y + 'px';
    el.style.left = this.window.x + 'px';
  },

  setPosition: function () {
    var el = this.getDOMNode();
    el.style.width = this.window.width + 'px';
    el.style.height = this.window.height + 'px';
  },

  preventDefault: function (e) {
    e.preventDefault();
    return false;
  },

  handlePropagation: function (e) {
    if (!(e.ctrlKey || e.metaKey || e.altKey || e.button !== 0)){
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
    this.forceUpdate(); // window.update does not trigger change
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

    return (
      <div className={classes} onMouseDown={this.handleMove}>
        <header>
          <div className="title">{this.window.title}</div>
          <div className="close" onMouseDown={this.preventDefault} onClick={this.close} />
        </header>
        <div className='content' onMouseDown={this.handlePropagation}>
          {this.window.content}
        </div>
        <div className='resize' onMouseDown={this.handleResize} />
      </div>
    );
  }

});

module.exports = Window;
