var _ = require('lodash');

module.exports = require('./views/manager');

_.extend(module.exports, {

  Manager: require('./models/manager'),
  Window: require('./models/window')

});
