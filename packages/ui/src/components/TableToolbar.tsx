import type { ReactNode } from 'react';
import { Group } from '@mantine/core';

/**
 * 테이블 상단 툴바 표준 배치: 좌측 필터 컨트롤, 우측 검색.
 * 필터 위젯 선택 기준 — 상태 3~5개 고정: SegmentedControl / 옵션 많거나 가변: Select /
 * 다중 선택: Chip.Group / 텍스트: TextInput(검색은 항상 우측).
 */
export function TableToolbar({ filters, search }: { filters?: ReactNode; search?: ReactNode }) {
  return (
    <Group justify="space-between" gap="sm" mb="md" wrap="wrap">
      <Group gap="sm">{filters}</Group>
      {search}
    </Group>
  );
}
