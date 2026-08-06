import type { ReactNode } from 'react';
import { Group } from '@mantine/core';

/** 좌측 `filters`, 우측 `right` → `search` 순. 검색은 항상 우측 끝. */
export function TableToolbar({
  filters, search, right,
}: { filters?: ReactNode; search?: ReactNode; right?: ReactNode }) {
  return (
    <Group justify="space-between" gap="sm" mb="md" wrap="wrap">
      <Group gap="sm">{filters}</Group>
      <Group gap="sm">{right}{search}</Group>
    </Group>
  );
}
