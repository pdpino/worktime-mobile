const colorDefs = [
  ['gray', '#a3a3a3', '#787878', '#616161'],
  ['red', '#9d4343', '#c82828', '#ff0a0a'], // hue 0
  ['orange', '#c47b40', '#dc8a47', '#f78d36'], // hue 27
  ['yellow', '#9b9841', '#cac52f', '#e5df2e'], // hue 58
  ['green', '#639b41', '#71be41', '#4fc507'], // hue 97
  ['lightBlue', '#4ba5b9', '#28bbdc', '#0eccf6'], // hue 191
  ['blue', '#4476ab', '#287bd4', '#0b5eb8'], // hue 211
  ['purple', '#6668c2', '#5b5fea', '#4f52fe'], // hue 239
  ['pink', '#9a77a1', '#bd75c9', '#c11bde'], // hue 291
  ['brown', '#967963', '#614e40', '#6e2e00'], // hue 25
];

const colorPaletteByKey = {};

const colorPalette = colorDefs.map((item) => {
  const [key, light, medium, strong] = item;
  colorPaletteByKey[key] = {
    light,
    medium,
    strong,
  };
  return {
    key,
    light,
    medium,
    strong,
  };
});

const colorGetterFunctionFor = level => (key) => {
  if (!key) return null;
  const spectrum = colorPaletteByKey[key] || colorPaletteByKey.gray;
  return spectrum[level];
};

// Light is mainly used for background
const getLightColor = colorGetterFunctionFor('light');
// Medium is mainly used for texts
const getMediumColor = colorGetterFunctionFor('medium');
// Strong is mainly used to paint figures (e.g. circle)
const getStrongColor = colorGetterFunctionFor('strong');

export {
  colorPalette,
  getLightColor,
  getMediumColor,
  getStrongColor,
};
