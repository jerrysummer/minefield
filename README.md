Minefield
============

This is a Minefield game made with React and Redux

![Game Preview](./demo.gif)

---

## How To Play

Left click to step on a spot
Right click to mark a spot as a bomb
Click reset to start new game

---

## Features

- [x] Add mine flagging (i.e. a way for users to indicate where they think the mines are)
- [x] Add a timer
- [x] Add some animations (e.g. when uncovering empty regions)
- [x] Add a way for users to choose a difficulty level (e.g. board size and mine count)
- [x] Different numbered cells should be represented by a different color
- [x] Do something fun when the user wins or loses, and show the mines!
- [x] Add unit tests to cover edge cases


#### There are 3 difficulty levels:
- **Easy:** 9 x 9 + 5 (mine count defaults to 5 for easy testing)
- **Medium:** 15 x 15 + 40
- **Hard:** 15 x 25 + 99

---

## Setup
cd to directory.

You can run  `yarn start` to start the development application. 

---

## Usage
You will then be able to access it at localhost:3000.

You can run  `yarn test` to test tart the application.

Supports [`Redux DevTools Chrome Extension`](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

---

## TODOs

- [x] Deploy to Heroku
- [ ] Add integration and snapshot tests
- [ ] Add form input for custom difficulty
- [x] Reset should reset using current difficulty
- [ ] Prevent the first click from being a mine
- [x] Reposition flag count to float right
- [ ] Add custom emoji to reset button
- [x] Scaling interface for small monitors and mobile

