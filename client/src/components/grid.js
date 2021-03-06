import React from 'react';
import { tetrominoTypes } from '../constants/tetrominoTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { PLAYING } from '../constants/gameStatus';
import en from '../en';
import {
  BLOCK_WIDTH_SMALL,
  BLOCK_WIDTH_LARGE
} from '../constants/appConstants';

import './grid.css';

export class Grid extends React.Component {
  _renderGrid() {
    const { grid, currentTetromino, position, rotation, palette } = this.props;
    if (!grid) return;

    const tetrominoGrid = tetrominoTypes[currentTetromino]?.[rotation] || [];

    const BLOCK_WIDTH = window.matchMedia('(max-width: 1366px)').matches
      ? BLOCK_WIDTH_SMALL
      : BLOCK_WIDTH_LARGE;

    console.log(BLOCK_WIDTH);

    return grid.map((row, j) => {
      return row.map((square, i) => {
        const blockType =
          grid[j][i] || // get colour of a block set in place
          (tetrominoGrid[j - position.y]?.[i - position.x] && currentTetromino); // get colour of moving tetromino
        return (
          <div
            className="block"
            key={`r${i}c${j}`}
            style={{
              width: `${BLOCK_WIDTH}px`,
              height: `${BLOCK_WIDTH}px`,
              top: `${j * BLOCK_WIDTH}px`,
              left: `${i * BLOCK_WIDTH}px`
            }}
          >
            <div
              className={`${blockType ? 'fill' : ''}`}
              style={{
                background: `${palette?.[blockType]}`,
                borderColor: `${palette?.[blockType]}`
              }}
            ></div>
          </div>
        );
      });
    });
  }

  render() {
    const { gameStatus } = this.props;

    return (
      <div>
        {gameStatus !== PLAYING && (
          <div className="overlay">{en[gameStatus]}</div>
        )}
        {this._renderGrid()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameStatus: state.gameStatus,
  grid: state.grid,
  currentTetromino: state.currentTetromino,
  nextTetromino: state.nextTetromino,
  position: state.position,
  rotation: state.rotation
});

Grid.propTypes = {
  gameStatus: PropTypes.string,
  grid: PropTypes.array,
  currentTetromino: PropTypes.oneOf(Object.keys(tetrominoTypes)),
  nextTetromino: PropTypes.oneOf(Object.keys(tetrominoTypes)),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  rotation: PropTypes.number
};

export default connect(mapStateToProps)(Grid);
