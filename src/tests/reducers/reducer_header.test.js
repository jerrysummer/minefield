import headerReducer from '../../reducers/reducer_header';

describe('header reducer', () => {

  test('it should return header ', () => {

    expect(headerReducer(null, {})).toEqual(null);

  });
});