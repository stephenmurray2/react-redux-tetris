import {
  GAME_INIT,
  GAME_START,
  GAME_PAUSE,
  GAME_STOP,
  GAME_RESUME,
  MOVE,
  ENABLE_ACCELERATE,
  DISABLE_ACCELERATE,
  DROP,
  ROTATE
} from '../constants/actionTypes';
import { PLAYING, STOPPED } from '../constants/gameStatus';
import { DROP_INTERVAL_ACCELERATING } from '../constants/appConstants';

const setDropTimeout = (cb, interval) => {
  clearDropTimeout();
  window.dropTimer = setTimeout(cb, interval);
};

const clearDropTimeout = () => {
  if (!window.dropTimer) return;
  clearTimeout(window.dropTimer);
  window.dropTimer = null;
};

export const gameInit = () => (dispatch) => {
  clearDropTimeout();
  return {
    type: GAME_INIT
  };
};

export const gameStart = () => (dispatch) => {
  dispatch({ type: GAME_START });
  dispatch(drop());
};

export const drop = () => (dispatch, getState) => {
  const { gameStatus, isAccelerating, dropInterval } = getState();
  setDropTimeout(
    () => {
      if (gameStatus === STOPPED) return;

      if (gameStatus === PLAYING) {
        dispatch({ type: DROP });
      }

      dispatch(drop());
    },
    isAccelerating ? DROP_INTERVAL_ACCELERATING : dropInterval
  );
};

export function gamePause() {
  clearDropTimeout();
  return {
    type: GAME_PAUSE
  };
}

export const gameResume = () => (dispatch) => {
  dispatch({ type: GAME_RESUME });
  dispatch(drop());
};

export function gameStop() {
  clearDropTimeout();
  return {
    type: GAME_STOP
  };
}

export const moveRight = () => ({
  type: MOVE,
  payload: 1
});

export const moveLeft = () => ({
  type: MOVE,
  payload: -1
});

export const enableAccelerate = () => ({
  type: ENABLE_ACCELERATE
});

export const disableAccelerate = () => ({
  type: DISABLE_ACCELERATE
});

export const rotate = () => ({
  type: ROTATE
});
