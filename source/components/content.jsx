var CommentBox = require('./comment_box');

var content = function (data) {
  React.renderComponent(
    <CommentBox data={ data } />,
    document.getElementById('content')
  );
};

module.exports = content;
