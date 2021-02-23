import { palettes } from '../../constants/palettes';

const getRandomPalette = () => {
  const random = Math.floor(Math.random() * Math.floor(palettes.length));
  return palettes[random];
};

export default getRandomPalette;
