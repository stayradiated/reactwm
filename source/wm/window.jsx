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
      window: {},
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

  snap: function (direction, value) {
    var guides = this.props.guides[direction];
    for (var i = 0, len = guides.length; i < len; i++) {
      var pos = guides[i];
      if (value >= pos - SNAP && value <= pos + SNAP) {
        return pos;
      }
    }
    return value;
  },

  handleMouseDown: function (e) {
    var mode = e.button > 1 ? RESIZE : MOVE;

    var parentEl = $(this.props.parent.getDOMNode()).offset();

    switch (mode) {
      case MOVE:
        var el = $(this.getDOMNode()).offset();
        offset = {
          x: e.clientX - el.left - parentEl.left,
          y: e.clientY - el.top + parentEl.top
        };
        break;
      case RESIZE:
        offset = {
          x: e.clientX - this.window.width,
          y: e.clientY - this.window.height
        };
        break;
    }

    this.setState({ mode: mode, offset: offset });
    this.props.onStartMove(this.window);
  },

  handleMouseMove: function (e) {
    switch (this.state.mode) {
      case MOVE:
        this.window.x = this.snap('vertical', e.clientX - this.state.offset.x);
        this.window.y = this.snap('horizontal', e.clientY - this.state.offset.y);
        this.forceUpdate();
        break;
      case RESIZE:
        var width = e.clientX - this.state.offset.x;
        var height = e.clientY - this.state.offset.y;
        this.window.width = this.snap('vertical', width + this.window.x) - this.window.x;
        this.window.height = this.snap('horizontal', height + this.window.y) - this.window.y;
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
    this.props.onClose(this.window);
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
      <div
        className={classes} style={styles}
        onMouseDown={this.handleMouseDown}> 
        <header>
          <div className="title">{this.window.title}</div>
          <div className="close" onMouseDown={this.ignore} onClick={this.close}></div>
        </header>
        <div className='content'></div>
      </div>
    );
  }

});

module.exports = Window;
