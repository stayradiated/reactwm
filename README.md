ReactWM
=======

A minimal window manager built using React.

## Install

```
npm install --save reactwm
```

## Example App

```
> npm start
```

Then open http://localhost:8000

## Usage

```javscript
var React = require('react');
var ReactWM = require('reactwm');

var Settings = require('./views/settings');

var manager = new ReactWM.Manager();

React.renderComponent(
    <ReactWM manager={manager}/>,
    document.body
);

manager.open(<Settings />, {
    id: 'settings',
    x: 20,
    y: 20,
    width: 300,
    height: 400,
    title: 'Settings'
});
```
