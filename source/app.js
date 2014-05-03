var content = require('./components/content');

var data = [
  { author: "Peter Hunt", text: "This is one comment"},
  { author: "Jordan Walke", text: "This is *another* comment"}
];

$(function () {
  content(data);
});
