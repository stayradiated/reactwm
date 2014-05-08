var assert = require('chai').assert;
var Window = require('../../source/models/window');

describe('window', function () {

  describe('.move', function () {

    it('should move the window to a point', function () {
      var window = new Window();
      assert.equal(window.x, 0);
      assert.equal(window.y, 0);

      var x = 200;
      var y = 300;

      window.move(x, y);
      assert.equal(window.x, x);
      assert.equal(window.y, y);
    });

  });

  describe('.resize', function () {

    var window;
    var start  = 100;
    var change = 20;

    beforeEach(function () {
      window = new Window({
        x: start, y: start,
        width: start, height: start
      });
    });

    describe('left', function () {
      var origin = 120;

      it('in', function () {
        window.resize(origin, 0, -change, 0);
        assert.equal(window.x, start - change);
        assert.equal(window.width, start + change);
      });

      it('out', function () {
        window.resize(origin, 0, +change, 0);
        assert.equal(window.x, start + change);
        assert.equal(window.width, start - change);
      });
    });

    describe('top', function () {
      var origin = 120;

      it('in', function () {
        window.resize(0, origin, 0, -change);
        assert.equal(window.y, start - change);
        assert.equal(window.height, start + change);
      });

      it('out', function () {
        window.resize(0, origin, 0, +change);
        assert.equal(window.y, start + change);
        assert.equal(window.height, start - change);
      });
    });

    describe('right', function () {
      var origin = 180;

      it('in', function () {
        window.resize(origin, 0, -change, 0);
        assert.equal(window.x, start);
        assert.equal(window.width, start + change);
      });

      it('out', function () {
        window.resize(origin, 0, +change, 0);
        assert.equal(window.x, start);
        assert.equal(window.width, start - change);
      });
    });

    describe('bottom', function () {
      var origin = 180;

      it('in', function () {
        window.resize(0, origin, 0, -change);
        assert.equal(window.y, start);
        assert.equal(window.height, start + change);
      });

      it('out', function () {
        window.resize(0, origin, 0, +change);
        assert.equal(window.y, start);
        assert.equal(window.height, start - change);
      });
    });

  });

  describe('.rename', function () {

    it('should rename the window', function () {
      var window = new Window();
      assert.equal(window.title, '');

      var title = 'My custom window title';

      window.rename(title);
      assert.equal(window.title, title);
    });

  });

  describe('.toJSON', function () {

    it('should export to a standard JS object', function () {
      var props = {
        id: 'window-1',
        x: 20,
        y: 30,
        width: 200,
        height: 400,
        title: 'Test'
      };

      var window = new Window(props);
      assert.deepEqual(window.toJSON(), props);
    });

  });

});
