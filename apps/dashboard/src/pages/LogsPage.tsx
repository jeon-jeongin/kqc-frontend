import { useState } from 'react';
import {
  Anchor, Card, Chip, Group, Skeleton, Stack, Table, Text, Title, SegmentedControl,
  TableToolbar, TablePagination, usePagedList,
} from '@kqc/ui';
import { useLogsQuery } from '../features/logs/queries';
import { LevelBadge } from '../features/logs/LevelBadge';

/* 예시 데이터 — 시간대별 로그 발생량 집계 API가 생기면 schema→query로 교체 */
const volume = [
  12, 8, 15, 64, 10, 9, 14, 11, 22, 13, 9, 71, 12, 10, 16, 9,
  11, 14, 58, 10, 12, 9, 13, 15, 67, 11, 8, 12, 10, 14, 9, 11,
];
const PEAK = 50;

function VolumeTimeline() {
  return (
    <div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 48 }}>
        {volume.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${Math.max((v / Math.max(...volume)) * 100, 12)}%`,
              borderRadius: 2,
              background:
                v >= PEAK
                  ? 'light-dark(var(--mantine-color-navy-5), var(--mantine-color-navy-4))'
                  : 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))',
            }}
          />
        ))}
      </div>
      <Group justify="space-between" mt={4}>
        <Text size="xs" c="dimmed">08-04 16:22</Text>
        <Text size="xs" c="dimmed">08-05 04:00</Text>
        <Text size="xs" c="dimmed">08-05 16:24</Text>
      </Group>
    </div>
  );
}

export function LogsPage() {
  const { data: logs, isPending } = useLogsQuery();
  const [level, setLevel] = useState('전체');
  const [services, setServices] = useState<string[]>([]);

  const allServices = [...new Set(logs?.map((log) => log.service))];
  const visible = logs?.filter(
    (log) =>
      (level === '전체' || log.level === level) &&
      (services.length === 0 || services.includes(log.service)),
  );
  const { pageItems, page, setPage, totalPages, totalCount, pageSize, setPageSize } =
    usePagedList(visible, 10);

  return (
    <Stack gap="md">
      <div>
        <Title order={3}>로그</Title>
        <Text size="xs" c="dimmed">2026-08-04 16:22 ~ 2026-08-05 16:24</Text>
      </div>

      <Card>
        <Group justify="space-between" mb="sm">
          <Text fw={700}>발생 추이</Text>
          <Anchor size="sm">대시보드에 추가</Anchor>
        </Group>
        <VolumeTimeline />
      </Card>

      <Card>
        <TableToolbar
          filters={
            <>
              <SegmentedControl
                value={level}
                onChange={setLevel}
                data={['전체', 'INFO', 'WARN', 'ERROR']}
              />
              <Chip.Group multiple value={services} onChange={setServices}>
                <Group gap={6}>
                  {allServices.map((service) => (
                    <Chip key={service} value={service} size="xs" radius="sm">
                      {service}
                    </Chip>
                  ))}
                </Group>
              </Chip.Group>
            </>
          }
        />

        {isPending ? (
          <Skeleton h={420} />
        ) : (
          <>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={150}>시각</Table.Th>
                  <Table.Th w={90}>레벨</Table.Th>
                  <Table.Th w={170}>호스트</Table.Th>
                  <Table.Th>메시지</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pageItems.map((log) => (
                  <Table.Tr key={log.id}>
                    <Table.Td>
                      <Text size="sm">{log.time.slice(0, 10)}</Text>
                      <Text size="xs" c="dimmed" ff="monospace">{log.time.slice(11)}</Text>
                    </Table.Td>
                    <Table.Td><LevelBadge level={log.level} /></Table.Td>
                    <Table.Td><Anchor size="sm" ff="monospace">{log.hostname}</Anchor></Table.Td>
                    <Table.Td><Text size="sm">{log.message}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <TablePagination
              page={page}
              totalPages={totalPages}
              totalCount={totalCount}
              onChange={setPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </Card>
    </Stack>
  );
}
