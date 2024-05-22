/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable comma-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

const InfiniteScroll = ({
  queryKey,
  queryFn,
  renderItem,
  getNextPageParam,
  dataPath,
}: any) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      getNextPageParam,
      initialPageParam: 0,
    });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 기본적으로 브라우저 뷰포트를 root로 사용
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="w-full">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {dataPath(page).map((item: any) => renderItem(item))}
        </React.Fragment>
      ))}
      {isLoading && <div>Loading more items...</div>}
      <div ref={loadMoreRef} />
    </div>
  );
};

export default InfiniteScroll;
