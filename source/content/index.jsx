var CommentBox = require('./comment_box');

var content = function (data) {
  React.renderComponent(
    <CommentBox url="comments" pollInterval={ 2000 } />,
    document.getElementById('content')
  );
};

module.exports = content;
