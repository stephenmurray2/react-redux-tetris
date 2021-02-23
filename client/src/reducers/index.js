import {
  GAME_INIT,
  GAME_START,
  GAME_PAUSE,
  GAME_RESUME,
  MOVE,
  ROTATE,
  DROP,
  ENABLE_ACCELERATE,
  DISABLE_ACCELERATE
} from '../constants/actionTypes';

import isEmptyPosition from './helpers/isEmptyPosition';
import clearFullLines from './helpers/clearFullLines';
import setPieceInPlace from './helpers/setPieceInPlace';
import getRandomTetromino from './helpers/getRandomTetronimo';
import getInitialTetrominoPosition from './helpers/getInitialTetrominoPosition';
import generateInitialState from './helpers/generateInitialState';
import initialGrid from './helpers/initialGrid';
import { PAUSED, PLAYING, STOPPED } from '../constants/gameStatus';
import {
  DROP_INTERVAL_MIN,
  DROP_INTERVAL_DEFAULT,
  DROP_INTERVAL_DECREMENT,
  LINE_CLEAR_BONUS
} from '../constants/appConstants';

export default function root(state = {}, { type, payload }) {
  let {
    score,
    linesCleared,
    grid,
    currentTetromino,
    nextTetromino,
    position,
    rotation,
    dropInterval
  } = state;

  let newPosition;
  let newRotation;

  switch (type) {
    case GAME_INIT:
      return generateInitialState();
    case GAME_START:
      return {
        ...state,
        gameStatus: PLAYING,
        grid: initialGrid,
        isAccelerating: false,
        currentTetromino: getRandomTetromino(),
        nextTetromino: getRandomTetromino()
      };
    case GAME_PAUSE:
      return { ...state, gameStatus: PAUSED };
    case GAME_RESUME:
      return { ...state, gameStatus: PLAYING };
    case MOVE:
      newPosition = {
        x: position.x + payload,
        y: position.y
      };
      if (
        !isEmptyPosition({
          tetromino: currentTetromino,
          position: newPosition,
          rotation,
          grid
        })
      ) {
        return state;
      }
      return { ...state, position: newPosition };
    case ROTATE:
      newRotation = (rotation + 1) % 4;

      if (
        !isEmptyPosition({
          tetromino: currentTetromino,
          position,
          rotation: newRotation,
          grid
        })
      )
        return state;
      else return { ...state, rotation: newRotation };
    case DROP:
      newPosition = { ...position, y: position.y + 1 };

      if (
        isEmptyPosition({
          tetromino: currentTetromino,
          position: newPosition,
          rotation,
          grid
        })
      ) {
        return { ...state, position: newPosition };
      }

      // can't drop the teteromino and the position is 0, therefore game is over
      if (position.y <= 0) {
        return { ...state, gameStatus: STOPPED };
      }

      const newGrid = setPieceInPlace({
        tetromino: currentTetromino,
        position,
        rotation,
        grid
      });

      const { gridWithClearedLines, numRemovedLines } = clearFullLines(newGrid);
      const newLinesCleared = linesCleared + numRemovedLines;

      const newScore =
        score + 10 + (LINE_CLEAR_BONUS[numRemovedLines - 1] || 0);
      console.log(dropInterval);
      return {
        ...state,
        score: newScore,
        linesCleared: newLinesCleared,
        grid: gridWithClearedLines,
        currentTetromino: nextTetromino,
        position: getInitialTetrominoPosition(),
        rotation: 0,
        nextTetromino: getRandomTetromino(),
        dropInterval:
          dropInterval <= DROP_INTERVAL_MIN
            ? DROP_INTERVAL_MIN
            : DROP_INTERVAL_DEFAULT -
              DROP_INTERVAL_DECREMENT * Math.floor(newLinesCleared / 10)
      };

    case ENABLE_ACCELERATE:
      return { ...state, isAccelerating: true };
    case DISABLE_ACCELERATE:
      return { ...state, isAccelerating: false };
    default:
      return state;
  }
}
