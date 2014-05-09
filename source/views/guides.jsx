var _ = require('lodash');
var React = require('react');
var Guide = require('./guide');

var Guides = React.createClass({

  render: function () {

    var start = 100;
    var end = 100;

    var i = 0;
    var guides = _.chain(this.props.guides).map(function (guides, orientation) {
      return guides.map(function (value) {
        return (
          <Guide key={orientation + value}
            orientation={orientation}
            start={start}
            end={end}
            position={value}
          />
        );
      });
    }).flatten(true).value();

    return (
      <div className="guides">
        {guides}
      </div>
    );
  }

});

module.exports = Guides;
