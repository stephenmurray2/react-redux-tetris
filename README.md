# React Tetris

## Overview

A ReactJS implementation of the classic game Tetris. Play it [here](https://main.d39hvhh21byela.amplifyapp.com/). Implementation details of note:

- State management implemented with Redux
- State immutability achieved with plain JS
- No loadash; array/object manipulation was achieved with plain (ES6) JS
- Many cases of dynamically generated styles because, well, why not (work in progress)

## TODOs

- Use media queries in SCSS
- Use SCSS mixins for the dynamic styles
- Use module for text/translations (like `i18n`)
- Currently there is just one client side app; one could also create a server side app (players can create accounts, view a record of their games, etc.)

## How to run

Run the following terminal commands:

```
git clone git@github.com:stephenmurray2/react-redux-tetris.git
cd react-redux-tetris
npm install
cd client
npm install
npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
