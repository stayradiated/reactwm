var sinon = require('sinon');
var assert = require('chai').assert;
var Window = require('../../lib/models/window');
var Manager = require('../../lib/models/manager');

describe('manager', function () {

  var manager;

  beforeEach(function () {
    manager = new Manager();
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

  describe('.has', function () {

    it('should check if a window exists in the manager', function () {
      var window = new Window({ id: 0 });

      assert.isFalse(manager.has(window));
      manager.add(window);
      assert.isTrue(manager.has(window));
    });

  });

  describe('.add', function () {

    it('should add a window', function () {
      var window = new Window({ id: 'a' });
      assert.equal(manager.add(window), window);
      assert.equal(manager.length(), 1);
      assert.deepEqual(manager.allWindows(), [window]);
    });

    it('should convert object to window instance', function () {
      var window = { id: 'custom', title: 'my title' };
      window = manager.add(window);
      assert(window instanceof Window);
      assert.equal(manager.length(), 1);
      assert.equal(manager.get('custom'), window);
    });

  });

  describe('.remove', function () {

    it('should remove a window', function () {
      var window = new Window({ id: 0 });
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

  describe('.open', function () {

    it('should only add a window once', function () {
      var size = 10;
      var component = '<div></div>';
      var props = { id: 20, x: size, y: size, width: size, height: size };

      var window = manager.open(component, props);

      assert(manager.has(window));
      assert.equal(manager.length(), 1);

      assert.equal(manager.open(component,props), window);
      assert.equal(manager.length(), 1);
    });

  });

  describe('.focus', function () {

    it('should increase z-index', function () {
      var win1 = new Window({ id: 1 });
      var win2 = new Window({ id: 2 });
      var win3 = new Window({ id: 3 });

      manager.add(win1);
      manager.add(win2);
      manager.add(win3);
      assert.deepEqual(manager._active, win3);

      manager.focus(win1);
      assert.deepEqual(manager._active, win1);

      manager.focus(win2);
      assert.deepEqual(manager._active, win2);

      manager.focus(win3);
      assert.deepEqual(manager._active, win3);
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
        isOpen: true
      };

      var window = manager.add(props);
      assert.deepEqual(manager.toJSON(), [window.toJSON()]);
    });

  });

});
