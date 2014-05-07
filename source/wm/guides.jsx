var Guide = require('./guide');

var Guides = React.createClass({

  render: function () {

    var i = 0;
    var guides = _.chain(this.props.guides).map(function (guides, orientation) {
      return guides.map(function (value) {
        return <Guide key={i++} orientation={orientation} position={value} />
      });
    }).flatten(true).value();

    console.log(guides);

    return (
      <div className="guides">
        {guides}
      </div>
    );
  }

});

module.exports = Guides;
