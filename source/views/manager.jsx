var Window = require('./window');
var Guides = require('./guides');

var PADDING = 20;

var Manager = React.createClass({

  componentDidMount: function () {
    var el = $(this.getDOMNode());
    el.on('contextmenu', this.disableContextMenu);

    this.setState({
      offset: el.offset()
    });
  },

  getInitialState: function () {
    return {
      active: false,
      guides: {},
      offset: {
        top: 0,
        left: 0
      }
    };
  },

  disableContextMenu: function (e) {
    e.preventDefault();
    return false;
  },

  handleStartMove: function (window) {
    this.props.manager.bringToFront(window);
    this.setState({
      active: window,
      guides: this.props.manager.guides(window)
    });
  },

  handleEndMove: function (window) {
    this.setState({ guides: {} });
  },

  convertPoints: function (e) {
    return {
      x: e.clientX - this.state.offset.left,
      y: e.clientY - this.state.offset.top
    };
  },

  handleClose: function (window) {
    this.props.manager.remove(window);
  },

  render: function () {

    var windows = this.props.manager.map(function (window) {
      return <Window
        key={window.id}
        parent={this}
        window={window}
        guides={this.state.guides}
        active={this.state.active === window}
        onStartMove={this.handleStartMove}
        onEndMove={this.handleEndMove}
        onClose={this.handleClose.bind(this, window)} />;
    }, this);

    return (
      <div className="window-manager"
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
          <Guides guides={this.state.guides} />
          <div className="windows">{windows}</div>
      </div>
    );
  }

});

module.exports = Manager;
