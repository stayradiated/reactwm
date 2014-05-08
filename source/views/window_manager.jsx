var Window = require('./window');
var Guides = require('./guides');

var PADDING = 20;

var WindowManager = React.createClass({

  componentDidMount: function () {
    var el = $(this.getDOMNode());
    el.on('contextmenu', this.handleContextMenu);
    this.setState({
      offset: el.offset()
    });
  },

  getInitialProps: function () {
    return {
      windows: [],
    };
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

  handleStartMove: function (window) {
    // Move selected window to front of screen
    var index = this.props.windows.indexOf(window);
    this.props.windows.splice(index, 1);
    this.props.windows.push(window);
    this.setState({
      active: window,
      guides: this.getGuides(window)
    });
  },

  handleEndMove: function (window) {
    this.setState({ guides: {} });
  },

  handleContextMenu: function (e) {
    e.preventDefault();
  },

  getGuides: function (ignore) {
    var guides = {
      vertical: [],
      horizontal: []
    };

    this.props.windows.forEach(function (window) {
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

  remove: function (window) {
    var index = this.props.windows.indexOf(window);
    this.props.windows.splice(index, 1);
    this.forceUpdate();
  },

  convertPoints: function (e) {
    return {
      x: e.clientX - this.state.offset.left,
      y: e.clientY - this.state.offset.top
    };
  },

  render: function () {

    var windows = this.props.windows.map(function (window) {
      return <Window key={window.id}
        window={window}
        parent={this}
        guides={this.state.guides}
        active={this.state.active === window}
        convertPoints={this.convertPoints}
        onClose={this.remove}
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

module.exports = WindowManager;
