import getRandomPalette from './getRandomPalette';
import {
  GAME_WIDTH,
  DROP_INTERVAL_DEFAULT
} from '../../constants/appConstants';
import initialGrid from './initialGrid';
import { INITIALIZED } from '../../constants/gameStatus';

const initialPosition = { x: Math.round(GAME_WIDTH / 2), y: 0 };

const generateInitialState = () => ({
  gameStatus: INITIALIZED,
  score: 0,
  linesCleared: 0,
  grid: initialGrid,
  position: initialPosition,
  rotation: 0,
  dropInterval: DROP_INTERVAL_DEFAULT,
  palette: getRandomPalette()
});

export default generateInitialState;
