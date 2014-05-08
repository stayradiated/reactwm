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
      guides: this.getGuides(window)
    });
  },

  handleEndMove: function (window) {
    this.setState({ guides: {} });
  },

  getGuides: function (ignore) {
    // TODO: Move to guides model

    var guides = {
      vertical: [],
      horizontal: []
    };

    this.props.manager.forEach(function (window) {
      if (window === ignore) return;
      guides.vertical.push(
        window.x,
        window.x + window.width,
        window.x - PADDING,
        window.x + window.width + PADDING
      );
      guides.horizontal.push(
        window.y,
        window.y + window.height,
        window.y - PADDING,
        window.y + window.height + PADDING
      );
    });

    guides.vertical = _.chain(guides.vertical).sort().uniq(true).value();
    guides.horizontal = _.chain(guides.horizontal).sort().uniq(true).value();

    return guides;
  },

  convertPoints: function (e) {
    return {
      x: e.clientX - this.state.offset.left,
      y: e.clientY - this.state.offset.top
    };
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
        onEndMove={this.handleEndMove} />;
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
