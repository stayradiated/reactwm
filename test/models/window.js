var assert = require('chai').assert;
var sinon = require('sinon');
var Window = require('../../source/models/window');

describe('window', function () {
  var window;

  beforeEach(function () {
    window = new Window({
      id: 0,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      title: 'title'
    });
  });

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

  describe('.quadrant', function () {

    it('top left', function () {
      assert.deepEqual(window.quadrant(1, 1), {
        top: true,
        left: true
      });
    });

    it('top right', function () {
      assert.deepEqual(window.quadrant(99, 1), {
        top: true,
        left: false
      });
    });

    it('bottom left', function () {
      assert.deepEqual(window.quadrant(1, 99), {
        top: false,
        left: true
      });
    });

    it('bottom right', function () {
      assert.deepEqual(window.quadrant(99, 99), {
        top: false,
        left: false
      });
    });

  });

  describe('.resize', function () {
    var start  = 100;
    var change = 20;

    beforeEach(function () {
      window.move(start, start);
      window.width = start;
      window.height = start;
    });

    describe('left', function () {
      it('in', function () {
        window.resize(-change, 0, true, false);
        assert.equal(window.x, start - change);
        assert.equal(window.width, start + change);
      });

      it('out', function () {
        window.resize(change, 0, true, false);
        assert.equal(window.x, start + change);
        assert.equal(window.width, start - change);
      });
    });

    describe('top', function () {
      it('in', function () {
        window.resize(0, -change, false, true);
        assert.equal(window.y, start - change);
        assert.equal(window.height, start + change);
      });

      it('out', function () {
        window.resize(0, +change, false, true);
        assert.equal(window.y, start + change);
        assert.equal(window.height, start - change);
      });
    });

    describe('right', function () {
      it('in', function () {
        window.resize(-change, 0, false, false);
        assert.equal(window.x, start);
        assert.equal(window.width, start - change);
      });

      it('out', function () {
        window.resize(change, 0, false, false);
        assert.equal(window.x, start);
        assert.equal(window.width, start + change);
      });
    });

    describe('bottom', function () {
      it('in', function () {
        window.resize(0, -change, false, false);
        assert.equal(window.y, start);
        assert.equal(window.height, start - change);
      });

      it('out', function () {
        window.resize(0, change, false, false);
        assert.equal(window.y, start);
        assert.equal(window.height, start + change);
      });
    });

  });

  describe('.close', function () {

    it('should close the window', function () {
      var window = new Window();
      assert.equal(window.open, true);

      window.close();
      assert.equal(window.open, false);
    });

  });

  describe('.requestFocus', function () {

    it('should focus the window', function () {
      var window = new Window();
      window.requestFocus();
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
        title: 'Test',
        open: true
      };

      var window = new Window(props);
      assert.deepEqual(window.toJSON(), props);
    });

  });

  describe('.onChange', function () {

    it('should trigger on move', function () {
      var window = new Window();
      window.onChange = sinon.spy();

      window.move(0, 0);
      assert(window.onChange.calledOnce);
    });

    it('should trigger on resize', function () {
      var window = new Window();
      window.onChange = sinon.spy();

      window.resize(0, 0, false, false);
      assert(window.onChange.calledOnce);
    });

    it('should trigger on close', function () {
      var window =  new Window();
      window.onChange = sinon.spy();

      window.close();
      assert(window.onChange.calledOnce);
    });

    it('should trigger on rename', function () {
      var window = new Window();
      window.onChange = sinon.spy();

      window.rename('new name');
      assert(window.onChange.calledOnce);
    });

  });

});
