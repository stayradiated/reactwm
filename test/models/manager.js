var assert = require('chai').assert;
var Window = require('../../source/models/window');
var Manager = require('../../source/models/manager');

describe('manager', function () {

  var manager;

  beforeEach(function () {
    manager = new Manager();
  });

  describe('.add', function () {

    it('should add a window', function () {
      var window = new Window();
      manager.add(window);
      assert.equal(manager.length(), 1);
    });

    it('should convert object to window instance', function () {
      var window = { title: 'my title' };
      manager.add(window);
      assert.equal(manager.length(), 1);
      assert(manager.at(0) instanceof Window);
      assert.equal(manager.at(0).title, window.title);
    });

  });

  describe('.at', function () {

    it('should get a window by its index', function () {
      var win1 = new Window();
      var win2 = new Window();
      var win3 = new Window();

      manager.add(win1);
      manager.add(win2);
      manager.add(win3);

      assert.equal(manager.at(0), win1);
      assert.equal(manager.at(1), win2);
      assert.equal(manager.at(2), win3);
    });

  });

  describe('.get', function () {

    it('should get a window by its id', function () {
      var win1 = new Window({ id: 'a' });
      var win2 = new Window({ id: 'b' });
      var win3 = new Window({ id: 'c' });

      manager.add(win1);
      manager.add(win2);
      manager.add(win3);

      assert.equal(manager.get('a'), win1);
      assert.equal(manager.get('b'), win2);
      assert.equal(manager.get('c'), win3);
    });

  });

  describe('.remove', function () {

    it('should remove a window', function () {
      var window = new Window();
      manager.add(window);
      assert.equal(manager.length(), 1);
      manager.remove(window);
      assert.equal(manager.length(), 0);
    });

    it('should remove a window by its id', function () {
      var window = {id: 0};
      manager.add(window);
      assert.equal(manager.length(), 1);
      manager.remove(0);
      assert.equal(manager.length(), 0);
    });

  });

  describe('.bringToFront', function () {

    it('should move a window to the end of the array', function () {
      var win1 = new Window();
      var win2 = new Window();
      var win3 = new Window();

      manager.add(win1);
      manager.add(win2);
      manager.add(win3);
      assert.deepEqual(manager.windows, [win1, win2, win3]);

      manager.bringToFront(win1);
      assert.deepEqual(manager.windows, [win2, win3, win1]);

      manager.bringToFront(win2);
      assert.deepEqual(manager.windows, [win3, win1, win2]);

      manager.bringToFront(win3);
      assert.deepEqual(manager.windows, [win1, win2, win3]);
    });

  });

  describe('.toJSON', function () {

    it('should export to a JS array', function () {
      var props = {
        id: 'my-id', 
        x: 200,
        y: 300,
        width: 100,
        height: 50,
        title: 'My amazing window',
        open: true
      };

      manager.add(props);
      assert.deepEqual(manager.toJSON(), [props]);
    });

  });

});
