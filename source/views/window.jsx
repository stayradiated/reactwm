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
      mode: INACTIVE
    };
  },

  handleMouseDownWithKey: function (e) {
    console.log('HandleMouseDownWithKey');
    e.preventDefault();
    if (!(e.ctrlKey || e.metaKey || e.altKey || e.button !== 0)) return false;
    this.handleMouseDown(e);
    return false;
  },

  handleMouseDown: function (e) {
    console.log('handleMouseDown');
    var mouse = this.props.parent.convertPoints(e);
    if (e.button === 0) { this.startMove(mouse); }
    else { this.startResize(mouse); }
  },

  startMove: function (mouse) {
    this.props.window.startMove(mouse.x, mouse.y);

    this.setState({
      mode: MOVE
    });

    // TODO: Maybe we won't need this? e.g. listen to the model instead
    this.props.onStartMove();
  },

  startResize: function (mouse) {
    console.log('>> starting resize');
    this.props.window.startResize(mouse.x, mouse.y);

    this.setState({
      mode: RESIZE
    });

    this.props.onStartMove(this.window);
  },

  handleMouseMove: function (e) {
    if (this.state.mode == INACTIVE) return true;
    var mouse = this.props.parent.convertPoints(e);

    switch (this.state.mode) {
      case MOVE:
        this.window.move(mouse.x, mouse.y);
        break;
      case RESIZE:
        this.window.resize(mouse.x, mouse.y);
        break;
    }

    this.forceUpdate();
  },

  handleMouseUp: function () {
    if (this.state.mode === INACTIVE) return true;
    if (this.state.mode == MOVE) this.props.window.endMove();
    else if (this.state.mode == RESIZE) this.props.window.endResize();
    this.setState({ mode: INACTIVE });
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
