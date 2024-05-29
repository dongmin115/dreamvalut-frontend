/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */

const breakpoints = {
  '2xl': '1536px',
  xl: '1280px',
  lg: '1024px',
  md: '768px',
  sm: '640px',
};

const mediaQueryLists = {
  '2xl': window.matchMedia(`(min-width: ${breakpoints['2xl']})`),
  xl: window.matchMedia(
    `(min-width: ${breakpoints.xl}) and (max-width: ${parseInt(breakpoints['2xl'], 10) - 1}px)`,
  ),
  lg: window.matchMedia(
    `(min-width: ${breakpoints.lg}) and (max-width: ${parseInt(breakpoints.xl, 10) - 1}px)`,
  ),
  md: window.matchMedia(
    `(min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg, 10) - 1}px)`,
  ),
  sm: window.matchMedia(
    `(min-width: ${breakpoints.sm}) and (max-width: ${parseInt(breakpoints.md, 10) - 1}px)`,
  ),
};

export function matchMedia() {
  let result = '';
  for (const [key, value] of Object.entries(mediaQueryLists)) {
    if (value.matches) {
      result = key;
    }
  }
  return result;
}
