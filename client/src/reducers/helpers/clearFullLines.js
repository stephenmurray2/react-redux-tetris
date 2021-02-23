import { GAME_WIDTH } from '../../constants/appConstants';

const clearFullLines = (grid) => {
  // clear out full rows
  const splicedBoard = grid.filter((row) => !row.every((g) => g));
  // add empty rows to get full board
  const numRemovedLines = grid.length - splicedBoard.length;
  const emptyRows = Array.from({ length: numRemovedLines }, () =>
    Array.from({ length: GAME_WIDTH }, () => null)
  );

  const gridWithClearedLines = emptyRows.concat(splicedBoard);
  return { gridWithClearedLines, numRemovedLines };
};

export default clearFullLines;
