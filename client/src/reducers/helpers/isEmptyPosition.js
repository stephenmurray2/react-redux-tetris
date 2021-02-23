import { GAME_WIDTH, GAME_HEIGHT } from '../../constants/appConstants';
import { tetrominoTypes } from '../../constants/tetrominoTypes';

const isEmptyPosition = ({ tetromino, rotation, position, grid }) => {
  const proposedGrid = tetrominoTypes[tetromino][rotation];
  for (let x = 0; x < proposedGrid[0].length; x++) {
    for (let y = 0; y < proposedGrid[0].length; y++) {
      const block = proposedGrid[y][x];
      const coordinateX = x + position.x;
      const coordinateY = y + position.y;
      if (block) {
        if (
          coordinateX >= 0 &&
          coordinateX < GAME_WIDTH &&
          coordinateY < GAME_HEIGHT
        ) {
          // make sure it's available
          if (grid[coordinateY]?.[coordinateX]) {
            // that square is taken by the board already
            return false;
          }
        } else {
          // there's a square in the block that's off the board
          return false;
        }
      }
    }
  }
  return true;
};

export default isEmptyPosition;
