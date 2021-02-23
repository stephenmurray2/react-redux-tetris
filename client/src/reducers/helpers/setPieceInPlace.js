// add the end of the current piece's turn add it to the set in place
import { GAME_WIDTH, GAME_HEIGHT } from '../../constants/appConstants';
import { tetrominoTypes } from '../../constants/tetrominoTypes';

const setPieceInPlace = ({ tetromino, rotation, position, grid }) => {
  // Deep copy of array of arrays
  const boardCopy = [...grid.map((s) => [...s])];
  const tetrominoGrid = tetrominoTypes[tetromino][rotation];
  for (let x = 0; x < tetrominoGrid.length; x++) {
    for (let y = 0; y < tetrominoGrid[0].length; y++) {
      const block = tetrominoGrid[y][x];
      if (block) {
        const boardX = position.x + x;
        const boardY = position.y + y;
        /* eslint-disable no-param-reassign */
        if (boardX < GAME_WIDTH && boardY < GAME_HEIGHT) {
          boardCopy[boardY][boardX] = tetromino;
        }
      }
    }
  }
  return boardCopy;
};

export default setPieceInPlace;
