var Window = React.createClass({

  componentWillMount: function () {
    $(document.body).on('mousemove', this.handleMouseMove);
    $(document.body).on('mouseup', this.handleMouseUp);
  },

  getDefaultProps: function () {
    return {
      x: 0,
      y: 0,
      onStartMove: function () {},
      onEndMove: function () {}
    };
  },

  getInitialState: function () {
    return {
      active: false,
      offset: {
        x: 0,
        y: 0
      },
      pos: {
        x: this.props.x,
        y: this.props.y
      }
    };
  },

  handleMouseDown: function (e) {
    var offset = $(this.getDOMNode()).offset();

    this.setState({
      active: true,
      offset: {
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
      }
    });

    this.props.onStartMove(this.props.key);
  },

  handleMouseMove: function (e) {
    if (! this.state.active) return;

    this.setState({
      pos: {
        x: e.clientX - this.state.offset.x,
        y: e.clientY - this.state.offset.y
      }
    });
  },

  handleMouseUp: function () {
    if (! this.state.active) return;
    this.setState({ active: false });
    this.props.onEndMove(this);
  },

  render: function () {
    var styles = {
      top: this.state.pos.y,
      left: this.state.pos.x
    };

    return (
      <div onMouseDown={this.handleMouseDown} className="window" style={styles}>
        This is a window
      </div>
    );
  }

});

module.exports = Window;
