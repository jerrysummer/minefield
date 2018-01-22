import * as actions from '../../actions/index';

describe('NEW_GAME', () => {

  test('it should fire an action when passed in arguments', () => {

    const expectedAction = {
      type: "NEW_MINEFIELD",
      payload: {row : 9, col :9, mineCount: 5 }
    }
    expect(actions.newMinefield(9,9,5)).toEqual(expectedAction);
  });
});