import { tetrominoTypes } from '../../constants/tetrominoTypes';

const getRandomTetromino = () => {
  const random = Math.floor(Math.random() * Math.floor(7));
  const keys = Object.keys(tetrominoTypes);
  return keys[random];
};

export default getRandomTetromino;
