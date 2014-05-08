var classSet = React.addons.classSet;

var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var SNAP = 5;

var Window = React.createClass({

  ignore: function (e) {
    e.preventDefault();
    return false;
  },

  componentWillMount: function () {
    this.window = this.props.window;
    $(document.body).on('mousemove', this.handleMouseMove);
    $(document.body).on('mouseup', this.handleMouseUp);
  },

  getDefaultProps: function () {
    return {
      onStartMove: _.identity,
      onEndMove: _.identity,
      onClose: _.identify
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

  snap: function (direction, value, width) {
    var guides = this.props.guides[direction];
    for (var i = 0, len = guides.length; i < len; i++) {
      var guide = guides[i];

      if (value >= guide - SNAP && value <= guide + SNAP) {
        return guide;
      }
    }

    if (width) {
      return this.snap(direction, value + width) - width;
    }

    return value;
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

    this.props.onStartMove(this.window);
  },

  startResize: function (mouse) {
    this.setState({
      mode: RESIZE,
      offset: {
        x: mouse.x,
        y: mouse.y
      }
    });

    this.props.onStartMove(this.window);
  },

  handleMouseMove: function (e) {
    var mouse = this.props.parent.convertPoints(e);

    switch (this.state.mode) {
      case MOVE:
        this.window.move(mouse.x - this.state.offset.x, mouse.y - this.state.offset.y);
        this.forceUpdate();
        break;
      case RESIZE:

        var delta = {
          x: this.state.offset.x - mouse.x,
          y: this.state.offset.y - mouse.y
        };

        console.log(JSON.stringify({
          mouse: mouse,
          delta: delta,
          state: this.state.offset
        }, null, 2));

        this.window.resize(this.state.offset.x, this.state.offset.y, delta.x, delta.y);
        this.forceUpdate();
        break;
    }
  },

  handleMouseUp: function () {
    if (this.state.mode === INACTIVE) return true;
    this.setState({ mode: INACTIVE });
    this.props.onEndMove(this.window);
  },

  close: function () {
    this.props.parent.remove(this.window);
  },

  render: function () {
    var classes = classSet({
      window: true,
      active: this.props.active
    });

    var styles = {
      top: this.window.y,
      left: this.window.x,
      width: this.window.width,
      height: this.window.height
    };

    return (
      <div className={classes} style={styles} onMouseDown={this.handleMouseDownWithKey}>
        <header>
          <div className="title" onMouseDown={this.handleMouseDown}>{this.window.title}</div>
          <div className="close" onMouseDown={this.ignore} onClick={this.close}></div>
        </header>
        <div className='content'></div>
      </div>
    );
  }

});

module.exports = Window;
