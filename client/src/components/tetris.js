import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Info from './info';
import Grid from './grid';

import {
  gameInit,
  gameStart,
  gamePause,
  gameResume,
  moveLeft,
  moveRight,
  enableAccelerate,
  disableAccelerate,
  rotate
} from '../actions';
import { PLAYING } from '../constants/gameStatus';
import { tetrominoTypes } from '../constants/tetrominoTypes';
import { UP, LEFT, RIGHT, DOWN, PAUSE, START } from '../constants/appConstants';
import en from '../en';

import './tetris.css';

// export common class component for test
export class Tetris extends Component {
  constructor() {
    super();

    this._onkeydown = this._onkeydown.bind(this);
    this._onkeyup = this._onkeyup.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this._onkeydown);
    window.addEventListener('keyup', this._onkeyup);
    const { onGameInit } = this.props;
    onGameInit();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._onkeydown);
    window.removeEventListener('keyup', this._onkeyup);
  }

  _onkeydown(e) {
    e.preventDefault();

    const {
      onMoveLeft,
      onMoveRight,
      onRotate,
      onEnableAccelerate,
      onGamePause,
      onGameStart,
      onGameResume,
      isAccelerating,
      gameStatus
    } = this.props;

    switch (e.keyCode) {
      case UP:
        if (gameStatus === 'PLAYING') {
          onRotate();
        }
        break;
      case LEFT:
        if (gameStatus === 'PLAYING') {
          onMoveLeft();
        }
        break;
      case RIGHT:
        if (gameStatus === 'PLAYING') {
          onMoveRight();
        }
        break;
      case DOWN:
        if (gameStatus === 'PLAYING' && !isAccelerating) {
          onEnableAccelerate();
        }
        break;
      case PAUSE:
        if (gameStatus !== 'PAUSED') {
          onGamePause();
        } else {
          onGameResume();
        }
        break;
      case START:
        if (gameStatus !== 'PAUSED' && gameStatus !== 'PLAYING') {
          onGameStart();
        }
        break;
      default:
        return;
    }
  }

  _onkeyup(e) {
    const { isPlaying, onDisableAccelerate } = this.props;
    if (!isPlaying) return;

    if (e.keyCode === DOWN) {
      onDisableAccelerate();
    }
  }

  render() {
    const { score, linesCleared, palette } = this.props;
    return (
      <div>
        <div>
          <Info {...{ score, linesCleared, palette }} />
        </div>
        <div
          className="tetris-container"
          style={{ background: `${palette['gridBg']}` }}
        >
          <Grid {...{ palette }} />
        </div>
        <div
          className="app-background"
          style={{
            background: `${palette['appBg']}`
          }}
        />
        <div className="instructions-panel" style={{ color: palette['info'] }}>
          <div className="panel">
            <span>&larr;</span>
            <span>{en['instructions_left']}</span>
            <span>|</span>
            <span>&rarr;</span>
            <span>{en['instructions_right']}</span>
            <span>|</span>
            <span>&uarr; </span>
            <span>{en['instructions_rotate']}</span>
            <span>|</span>
            <span>&darr;</span>
            <span>{en['instructions_accelerate']}</span>
            <span>|</span>
            <span>
              <strong>P</strong>
            </span>
            <span>{en['instructions_pause']}</span>
            <span>|</span>
          </div>
          <div className="panel">{en['source_code']}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameStatus: state.gameStatus,
  score: state.score,
  linesCleared: state.linesCleared,
  nextTetromino: state.nextTetromino,
  isPlaying: state.gameStatus === PLAYING,
  isAccelerating: state.isAccelerating,
  palette: state.palette
});

const mapDispatchToProps = (dispatch) => ({
  onGameInit: () => dispatch(gameInit()),
  onGameStart: () => dispatch(gameStart()),
  onGamePause: () => dispatch(gamePause()),
  onGameResume: () => dispatch(gameResume()),
  onMoveLeft: () => dispatch(moveLeft()),
  onMoveRight: () => dispatch(moveRight()),
  onRotate: () => dispatch(rotate()),
  onEnableAccelerate: () => dispatch(enableAccelerate()),
  onDisableAccelerate: () => dispatch(disableAccelerate())
});

Tetris.propTypes = {
  gameStatus: PropTypes.string,
  isAccelerating: PropTypes.bool,
  isPlaying: PropTypes.bool,
  linesCleared: PropTypes.number,
  nextTetromino: PropTypes.oneOf(Object.keys(tetrominoTypes)),
  score: PropTypes.number,
  palette: PropTypes.object,
  onDisableAccelerate: PropTypes.func,
  onEnableAccelerate: PropTypes.func,
  onGameInit: PropTypes.func,
  onGameStart: PropTypes.func,
  onGamePause: PropTypes.func,
  onGameResume: PropTypes.func,
  onMoveLeft: PropTypes.func,
  onMoveRight: PropTypes.func,
  onRotate: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Tetris);
