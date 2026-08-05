import { Group, Pagination, Select, Text } from '@mantine/core';

/**
 * 테이블 하단 표준: 좌측 "시작 - 끝 / 총계", 우측 "페이지당 N" 선택 + 페이지네이션.
 * pageSize를 넘기면 범위 표기, onPageSizeChange까지 넘기면 페이지당 선택이 나타난다
 * (usePagedList와 연결).
 */
export function TablePagination({
  page, totalPages, totalCount, onChange,
  pageSize, onPageSizeChange, pageSizeOptions = [10, 20, 50],
}: {
  page: number;
  totalPages: number;
  totalCount: number;
  onChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}) {
  const start = totalCount === 0 || !pageSize ? 0 : (page - 1) * pageSize + 1;
  const end = pageSize ? Math.min(page * pageSize, totalCount) : totalCount;

  return (
    <Group justify="space-between" mt="md">
      <Text size="sm" c="dimmed">
        {pageSize ? `${start} - ${end} / ${totalCount}` : `총 ${totalCount}건`}
      </Text>
      <Group gap="sm">
        {pageSize !== undefined && onPageSizeChange && (
          <Select
            data={pageSizeOptions.map((n) => ({ value: String(n), label: `${n}개씩` }))}
            value={String(pageSize)}
            onChange={(v) => v && onPageSizeChange(Number(v))}
            w={88}
            size="xs"
            aria-label="페이지당 표시 개수"
          />
        )}
        {totalPages > 1 && (
          <Pagination value={page} onChange={onChange} total={totalPages} size="sm" />
        )}
      </Group>
    </Group>
  );
}
