/* eslint-disable import/prefer-default-export */
export const getSlideContentStyle = (pageIndex: number) => ({
  transform: `translateX(-${pageIndex * 25}%)`,
  transition: 'transform 0.5s ease',
});
