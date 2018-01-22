export function newMinefield(row,col,mineCount) {
  return {
    type: "NEW_MINEFIELD",
    payload: {row, col, mineCount}
  };
}

export function openMine(row,col) {
  return {
    type: "OPEN_MINE",
    payload: {row, col}
  };
}

export function flagMine(row, col, hasFlag) {
  return {
    type: "FLAG_MINE",
    payload: { row, col, hasFlag}
  };
}

export function endGame(status) {
  return {
    type: "END_GAME",
    payload: status,
  };
}
