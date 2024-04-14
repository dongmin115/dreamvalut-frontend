/* eslint-disable import/prefer-default-export */
export const getSlideContentStyle = (pageIndex: number, pageMax: number) => ({
  transform: `translateX(-${pageIndex * (100 / pageMax)}%)`,
  transition: 'transform 0.5s ease',
});
