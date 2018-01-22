// State argument is not application state, only the state
// this reducer is responsible for

export default function (state = generateMineField(9, 9, 5), action) {
  switch (action.type) {
    case "NEW_MINEFIELD": {
      let row = action.payload.row;
      let col = action.payload.col;
      let mineCount = action.payload.mineCount;
      let minefield = generateMineField(row, col, mineCount);
      return minefield;
    }

    case "OPEN_MINE": {
      let newState = JSON.parse(JSON.stringify(state))
      let row = action.payload.row;
      let col = action.payload.col;
      let height = state.length;
      let width = state[0].length;
      
      openMine(row, col);
      
      /**
       * changes the isOpen property on clicked mine
       * skips if mine has hasFlag to true
       * calls getNeighbor to click surrounding mine if minecount is zero; recursive
       * @param {integer} row row count
       * @param {integer} col column count
       */
      function openMine(row, col) {
        let { hasMine, hasFlag, mineCount, isOpen } = newState[row][col];

        if(hasFlag) {
          return;
        }
        
        newState[row][col].isOpen = true;
        
        if( isOpen ) {
          return;
        } else if (!mineCount) {
          getNeighbors(row, col);
        }
        
      }

      /**
       * works recurively with open mine; 
       * if mine with no neighbor mine is found, it's passed back to openMine function
       * @param {integer} row row count
       * @param {integer} col col count
       */
      function getNeighbors(row, col) {

        // direction to the eight neightbor coords for mines
        // repeating code below, should consolidate
        const neightborMines = [
          { drow: -1, dcol: -1 },
          { drow: 0, dcol: -1 },
          { drow: 1, dcol: -1 },
          { drow: -1, dcol: 0 },
          { drow: 1, dcol: 0 },
          { drow: -1, dcol: 1 },
          { drow: 0, dcol: 1 },
          { drow: 1, dcol: 1 }
        ]

        // loop through mineCoords and +1 to all 8 neighbor's mineCount property
        for (let j = 0; j < neightborMines.length; j++) {
          let neighborRow = row + parseInt(neightborMines[j].drow, 10);
          let neighborCol = col + parseInt(neightborMines[j].dcol, 10);

          if ((neighborRow >= 0 && neighborRow < height) && (neighborCol >= 0 && neighborCol < width)) {

            let { mineCount, isOpen } = newState[neighborRow][neighborCol];
            if (!isOpen) {
                openMine(neighborRow, neighborCol)
            }
          }
        }
      }

      return newState;
    }

    case "FLAG_MINE": {
      let newState = JSON.parse(JSON.stringify(state));
      let row = action.payload.row;
      let col = action.payload.col;

      if (newState[row][col].isOpen) {
        return state;
      }

      newState[row][col].hasFlag = !newState[row][col].hasFlag;

      return newState;
    }

    case "END_GAME": {
      let newState = JSON.parse(JSON.stringify(state));
      for(let row = 0; row < newState.length; row++) {
        for(let col = 0; col < newState[row].length; col++) {
          if(newState[row][col].hasMine) {
            newState[row][col].isOpen = true;
          }
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

/**
 * Returns a two dimensional array with set number of cell and some cells will contain hasMine property to true
 * @param {integer} row how many rows the minefield should have
 * @param {integer} col how many columns the minefield should have
 * @param {integer} mineCount how many mines will be planted
 */
const generateMineField = (row, col, mineCount) => {
  let minefield = [];
  for (let i = 0; i < row; i++) {
    minefield.push([]);
  };

  // the definition of a cell with six properties
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      minefield[y][x] = {
        row: y,
        col: x,
        hasMine: false,
        hasFlag: false,
        isOpen: false,
        mineCount: 0
      }
    }
  }
  // returns an array of coordinates unique and non overlapping
  function generateMineCoords(row, col, mineCount) {

    // use Set's unique value only property to avoid dups
    let mineLocationSet = new Set();

    const getRandomInt = (max) => Math.floor(Math.random() * max);
    // dup coords will not increase Set length
    while (mineLocationSet.size < mineCount) {
      let yx = getRandomInt(row) + '-' + getRandomInt(col);
      mineLocationSet.add(yx);
    }
    // convert Set to Array
    let mineLocationArray = [...mineLocationSet];
    // convert string coordinates to numbers
    mineLocationArray = mineLocationArray.map((ele) => ele.split('-'));

    return mineLocationArray;
  }

  let mineCoords = generateMineCoords(row, col, mineCount);

  // "insert" mines into the minefield using coordinates generated
  // set hasMine property of cells to true
  for (let i = 0; i < mineCoords.length; i++) {
    let row = mineCoords[i][0];
    let col = mineCoords[i][1];
    minefield[row][col].hasMine = true;
  }

  // direction to the eight neightbor coords for any cell
  const neightborMines = [
    { drow: -1, dcol: -1 },
    { drow: 0, dcol: -1 },
    { drow: 1, dcol: -1 },
    { drow: -1, dcol: 0 },
    { drow: 1, dcol: 0 },
    { drow: -1, dcol: 1 },
    { drow: 0, dcol: 1 },
    { drow: 1, dcol: 1 }
  ]

  // loop through mineCoords and +1 to all 8 neighbor's mineCount property
  for (let i = 0; i < mineCoords.length; i++) {
    for (let j = 0; j < neightborMines.length; j++) {
      let neighborRow = parseInt(mineCoords[i][0], 10) + parseInt(neightborMines[j].drow, 10);
      let neightborCol = parseInt(mineCoords[i][1], 10) + parseInt(neightborMines[j].dcol, 10);
      if ((neighborRow >= 0 && neighborRow < row) && (neightborCol >= 0 && neightborCol < col)) {
        minefield[neighborRow][neightborCol].mineCount++;
        if (minefield[neighborRow][neightborCol].hasMine) {
          minefield[neighborRow][neightborCol].mineCount = 9;
        }
      }
    }
  }

  return minefield;
}

