import { GAME_WIDTH } from '../../constants/appConstants';

const getInitialTetrominoPosition = () => ({
  x: Math.floor(GAME_WIDTH / 2),
  y: 0
});

export default getInitialTetrominoPosition;
