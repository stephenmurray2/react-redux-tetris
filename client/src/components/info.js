import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './info.css';

class Info extends Component {
  render() {
    const { score, linesCleared, palette } = this.props;
    return (
      <div className="info" style={{ color: palette['info'] }}>
        <span className="section">Lines cleared: {linesCleared}</span>
        <span className="section">Score: {score}</span>
      </div>
    );
  }
}

Info.propTypes = {
  gameStatus: PropTypes.string,
  linesCleared: PropTypes.number,
  score: PropTypes.number
};

export default Info;
