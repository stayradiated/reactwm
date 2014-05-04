var INACTIVE = 0;
var MOVE = 1;
var RESIZE = 2;

var Window = React.createClass({

  componentWillMount: function () {
    $(document.body).on('mousemove', this.handleMouseMove);
    $(document.body).on('mouseup', this.handleMouseUp);
  },

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
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
      },
      pos: {
        x: this.props.x,
        y: this.props.y
      },
      size: {
        width: this.props.width,
        height: this.props.height
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
          x: e.clientX - this.state.size.width,
          y: e.clientY - this.state.size.height
        };
        break;
    }

    this.setState({ mode: mode, offset: offset });
    this.props.onStartMove(this.props.key);
  },

  handleMouseMove: function (e) {
    switch (this.state.mode) {
      case MOVE:
        this.setState({
          pos: {
            x: e.clientX - this.state.offset.x,
            y: e.clientY - this.state.offset.y
          }
        });
        break;
      case RESIZE:
        this.setState({
          size: {
            width: e.clientX - this.state.offset.x,
            height: e.clientY - this.state.offset.y
          }
        });
        break;
    }
  },

  handleMouseUp: function () {
    if (this.state.mode === INACTIVE) return;
    this.setState({ mode: INACTIVE });
    this.props.onEndMove(this);
  },

  render: function () {
    var classes = React.addons.classSet({
      window: true,
      active: this.props.active
    });

    var styles = {
      top: this.state.pos.y,
      left: this.state.pos.x,
      width: this.state.size.width,
      height: this.state.size.height
    };

    return (
      <div onMouseDown={this.handleMouseDown} className={classes} style={styles}>
        This is a window
      </div>
    );
  }

});

module.exports = Window;
