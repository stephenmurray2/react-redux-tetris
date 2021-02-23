import { GAME_WIDTH, GAME_HEIGHT } from '../../constants/appConstants';

const initialState = Array.from({ length: GAME_HEIGHT }, () =>
  Array.from({ length: GAME_WIDTH }, () => false)
);

export default initialState;
