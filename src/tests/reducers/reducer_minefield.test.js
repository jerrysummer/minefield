import minefieldReducers from '../../reducers/reducer_minefield';

describe('minefield reducer', () => {

  test('it should return minefield ', () => {

    expect(minefieldReducers(null, {})).toEqual(null);

  });

  test('it should return minefield 1 X 1 ', () => {
    let state = [[{
      row: 0,
      col: 0,
      hasMine: false,
      hasFlag: false,
      isOpen: false,
      mineCount: 0
    }]]

    let action = {}

    expect(minefieldReducers(state, {})).toEqual(state);

  });

  test('it should return minefield 9 9 5 ', () => {
    let state = []

    let row = 9;
    let col = 9;
    let mineCount = 5;

    let action = {
      type: "NEW_MINEFIELD",
      payload: { row, col, mineCount }
    }

    let mineArray = minefieldReducers(state, action);

    expect(mineArray.length).toEqual(row);
    expect(mineArray.length).toEqual(row);

    for(let i = 0; i < row; i++) {
      expect(mineArray[i].length).toEqual(row);
    }

    let initMineCount = 0;

    for(let i = 0; i < row; i++) {
      for(let j = 0; j < col; j++) {
        if(mineArray[i][j].hasMine) {
          initMineCount ++;
        }
      }
    }

    expect(initMineCount).toEqual(5);

  });

  test('it should allow mineOpen ', () => {

    let defaultState = [[{
      row: 0,
      col: 0,
      hasMine: true,
      hasFlag: false,
      isOpen: false,
      mineCount: 0
    }]]

    let action = {
      type: "OPEN_MINE",
      payload: { row:0, col:0 }
    }

    let expectedState = [[{
      row: 0,
      col: 0,
      hasMine: true,
      hasFlag: false,
      isOpen: true,
      mineCount: 0
    }]]

    expect(minefieldReducers(defaultState, action)).toEqual(expectedState);

  });


});