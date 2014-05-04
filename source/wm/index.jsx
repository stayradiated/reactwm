var WindowManager = require('./window_manager');

var windows = [
  {id: 0, x: 10, y: 20},
  {id: 1, x: 100, y: 100},
  {id: 2, x: 200, y: 200},
];

module.exports = function () {
  React.renderComponent(
    <WindowManager windows={windows} />,
  document.body);
};
