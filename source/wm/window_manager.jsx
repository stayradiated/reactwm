var Window = require('./window');

var PADDING = 40;

var WindowManager = React.createClass({

  componentDidMount: function () {
    $(this.getDOMNode()).on('contextmenu', this.handleContextMenu);
  },

  getInitialProps: function () {
    return {
      windows: [],
    };
  },

  getInitialState: function () {
    return {
      active: false,
      guides: {}
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
  },

  handleContextMenu: function (e) {
    e.preventDefault();
  },

  getGuides: function (ignore) {
    var el = this.getDOMNode();
    var height = el.offsetHeight;
    var width = el.offsetWidth;

    var guides = {
      vertical: [PADDING, width - PADDING],
      horizontal: [PADDING, height - PADDING]
    };

    this.props.windows.forEach(function (window) {
      if (window === ignore) return;
      guides.vertical.push(window.x);
      guides.vertical.push(window.x - PADDING);
      guides.horizontal.push(window.y);
      guides.horizontal.push(window.y - PADDING);
      guides.vertical.push(window.x + window.width);
      guides.vertical.push(window.x + window.width + PADDING);
      guides.horizontal.push(window.y + window.height);
      guides.horizontal.push(window.y + window.height + PADDING);
    });
    return guides;
  },

  remove: function (window) {
    var index = this.props.windows.indexOf(window);
    this.props.windows.splice(index, 1);
    this.forceUpdate();
  },

  render: function () {
    return (
      <div className="window-manager"
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        { this.props.windows.map(function (window) {
          return <Window key={window.id}
            window={window}
            guides={this.state.guides}
            active={this.state.active === window}
            onClose={this.remove}
            onStartMove={this.handleStartMove}
            onEndMove={this.handleEndMove} />;
        }, this)}
      </div>
    );
  }

});

module.exports = WindowManager;
