import { useMemo, useState } from 'react';

/**
 * 클라이언트 페이지네이션 핸들링. 필터로 목록이 줄면 페이지가 자동 보정되고,
 * 페이지 크기를 바꾸면 1페이지로 돌아간다.
 * const { pageItems, page, setPage, totalPages, totalCount, pageSize, setPageSize } =
 *   usePagedList(visible, 10);
 */
export function usePagedList<T>(items: readonly T[] | undefined, initialPageSize = 10) {
  const [pageSize, setPageSizeRaw] = useState(initialPageSize);
  const [rawPage, setPage] = useState(1);

  const totalCount = items?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const page = Math.min(rawPage, totalPages);

  const pageItems = useMemo(
    () => (items ?? []).slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize],
  );

  const setPageSize = (size: number) => {
    setPageSizeRaw(size);
    setPage(1);
  };

  return { pageItems, page, setPage, totalPages, totalCount, pageSize, setPageSize };
}
