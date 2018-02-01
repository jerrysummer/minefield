export default function header(state = initHeaderState, action) {
  switch (action.type) {
    case "END_GAME": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.gameStatus = action.payload;
      return newState;
    }
    case "NEW_MINEFIELD": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.gameStatus = "NEW";
      newState.flagCount = action.payload.mineCount;
      newState.mineCount = action.payload.mineCount;
      newState.row = action.payload.row;
      newState.col = action.payload.col;
      return newState;
    }
    case "FLAG_MINE": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.gameStatus = "PALYING";

      if (action.payload.hasFlag) {
        newState.flagCount += 1;
      } else {
        newState.flagCount -= 1
      }
      return newState;
    }
    case "OPEN_MINE": {
      let newState = JSON.parse(JSON.stringify(state));
      newState.gameStatus = "PLAYING";
      return newState;
    }
    default:
    return state;
  }
}

// default minefiled parameters
// minecount set to 5 for easy demos
let initHeaderState = {
  gameStatus: 'NEW',
  flagCount: 5,
  mineCount: 5,
  row: 9, 
  col: 9,
}