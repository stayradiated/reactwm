var _ = require('lodash');
var $ = require('jquery');
var React = require('react');
var classSet = require('react/addons').addons.classSet;

var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var Window = React.createClass({

  ignore: function (e) {
    e.preventDefault();
    return false;
  },

  componentWillMount: function () {
    this.window = this.props.window;
    $(document).on('mousemove', this.handleMouseMove);
    $(document).on('mouseup', this.handleMouseUp);
  },

  getDefaultProps: function () {
    return {
      onStartMove: _.identity,
      onEndMove: _.identity
    };
  },

  getInitialState: function () {
    return {
      mode: INACTIVE,
      offset: {
        x: 0,
        y: 0
      }
    };
  },

  handleMouseDownWithKey: function (e) {
    if (!(e.ctrlKey || e.metaKey || e.altKey || e.button !== 0)) return;
    this.handleMouseDown(e);
  },

  handleMouseDown: function (e) {
    var mouse = this.props.parent.convertPoints(e);
    if (e.button === 0) { this.startMove(mouse); }
    else { this.startResize(mouse); }
  },

  startMove: function (mouse) {
    this.setState({
      mode: MOVE,
      offset: {
        x: mouse.x - this.window.x,
        y: mouse.y - this.window.y
      }
    });

    this.props.onStartMove();
  },

  startResize: function (mouse) {
    this.setState({
      mode: RESIZE,
      offset: {
        x: mouse.x,
        y: mouse.y,
      },
      quadrant: this.window.quadrant(mouse.x, mouse.y)
    });

    this.props.onStartMove(this.window);
  },

  handleMouseMove: function (e) {
    if (this.state.mode == INACTIVE) return true;
    var mouse = this.props.parent.convertPoints(e);

    switch (this.state.mode) {
      case MOVE:
        this.window.move(mouse.x - this.state.offset.x, mouse.y - this.state.offset.y);
        this.forceUpdate();
        break;
      case RESIZE:
        var delta = {
          x: mouse.x - this.state.offset.x,
          y: mouse.y - this.state.offset.y
        };
        this.window.resize(delta.x, delta.y, this.state.quadrant.left, this.state.quadrant.top);
        this.setState({ offset: mouse });
        break;
    }
  },

  handleMouseUp: function () {
    if (this.state.mode === INACTIVE) return true;
    this.setState({ mode: INACTIVE, quadrant: undefined });
    this.props.onEndMove();
  },

  focus: function () {
    this.props.window.requestFocus();
  },

  close: function () {
    this.props.window.close();
  },

  render: function () {
    var classes = classSet({
      window: true,
      active: this.props.active
    });

    var position = {
      top: this.window.y,
      left: this.window.x
    };

    var size = {
      width: this.window.width,
      height: this.window.height
    };

    return (
      <div className={classes} style={position} onMouseDown={this.handleMouseDown}>
        <header>
          <div className="title">{this.window.title}</div>
          <div className="close" onMouseDown={this.ignore} onClick={this.close}></div>
        </header>
        <div className='content' onMouseDown={this.handleMouseDownWithKey} style={size}></div>
      </div>
    );
  }

});

module.exports = Window;
