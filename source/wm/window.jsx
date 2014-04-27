var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var Window = React.createClass({

  componentWillMount: function () {
    this.window = this.props.window;
    $(document.body).on('mousemove', this.handleMouseMove);
    $(document.body).on('mouseup', this.handleMouseUp);
  },

  getDefaultProps: function () {
    return {
      window: {},
      onStartMove: function () {},
      onEndMove: function () {}
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

  handleMouseDown: function (e) {
    var mode = e.button > 1 ? RESIZE : MOVE;

    switch (mode) {
      case MOVE:
        var el = $(this.getDOMNode()).offset();
        offset = {
          x: e.clientX - el.left,
          y: e.clientY - el.top
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
        this.window.x = e.clientX - this.state.offset.x;
        this.window.y = e.clientY - this.state.offset.y;
        this.forceUpdate();
        break;
      case RESIZE:
        this.window.width = e.clientX - this.state.offset.x;
        this.window.height = e.clientY - this.state.offset.y;
        this.forceUpdate();
        break;
    }
  },

  handleMouseUp: function () {
    if (this.state.mode === INACTIVE) return;
    this.setState({ mode: INACTIVE });
    this.props.onEndMove(this.window);
  },

  render: function () {
    var classes = React.addons.classSet({
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
        { this.window.title }
      </div>
    );
  }

});

module.exports = Window;
