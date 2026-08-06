import { Group, Pagination, Select } from '@mantine/core';

/** pageSize와 onPageSizeChange를 함께 넘기면 개수 선택이 나타난다. */
export function TablePagination({
  page, totalPages, onChange,
  pageSize, onPageSizeChange, pageSizeOptions = [10, 20, 50],
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
}) {
  return (
    // 3열 그리드 — 양옆이 같은 폭이라 가운데 열이 컨테이너 정중앙에 온다
    <div
      style={{
        marginTop: 'var(--mantine-spacing-md)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}
    >
      <div />
      {totalPages > 1 ? (
        <Pagination value={page} onChange={onChange} total={totalPages} size="sm" />
      ) : (
        <div />
      )}
      <Group justify="flex-end">
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
      </Group>
    </div>
  );
}
