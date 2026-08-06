import { useState } from 'react';
import {
  Anchor, AreaChart, Card, DonutChart, Group, Select, Skeleton, Stack, Table, Text, Title,
  CHART_SERIES,
} from '@kqc/ui';
import { Link } from 'react-router';
import { useTasksQuery } from '../features/tasks/queries';
import { StatusBadge } from '../features/tasks/StatusBadge';

/* 예시 데이터 — 집계 API가 생기면 schema→query로 교체 */
const monthly = [
  { month: '4월', 완료: 51, 진행: 22 },
  { month: '5월', 완료: 47, 진행: 15 },
  { month: '6월', 완료: 63, 진행: 20 },
  { month: '7월', 완료: 58, 진행: 12 },
  { month: '8월', 완료: 21, 진행: 18 },
];
const byPart = [
  { name: '플랫폼', value: 45, color: CHART_SERIES[0] },
  { name: '인프라', value: 30, color: CHART_SERIES[1] },
  { name: '리서치', value: 25, color: CHART_SERIES[2] },
];

function StatCard({
  label, value, delta, note,
}: { label: string; value: string; delta: number; note: string }) {
  const up = delta >= 0;
  return (
    <Card flex={1}>
      <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: '0.05em' }}>
        {label}
      </Text>
      <Text size="xl" fw={800} c="navy" my={4}>{value}</Text>
      <Group gap={6}>
        <Text size="xs" fw={700} c={up ? 'green' : 'red'}>
          {up ? '▲' : '▼'} {Math.abs(delta)}%
        </Text>
        <Text size="xs" c="dimmed">{note}</Text>
      </Group>
    </Card>
  );
}

export function DashboardPage() {
  const { data: tasks, isPending } = useTasksQuery();
  const [range, setRange] = useState<string | null>('최근 30일');

  const total = tasks?.length ?? 0;
  const inProgress = tasks?.filter((t) => t.status === '진행중').length ?? 0;
  const done = tasks?.filter((t) => t.status === '완료').length ?? 0;
  const doneRate = total ? Math.round((done / total) * 100) : 0;

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={3}>대시보드</Title>
          <Text size="xs" c="dimmed">안녕하세요, 홍 님 — 오늘의 운영 현황입니다</Text>
        </div>
        <Select
          data={['오늘', '최근 7일', '최근 30일']}
          value={range}
          onChange={setRange}
          w={130}
          size="sm"
          aria-label="조회 기간"
        />
      </Group>

      {isPending ? (
        <Group gap="md">
          <Skeleton h={104} flex={1} />
          <Skeleton h={104} flex={1} />
          <Skeleton h={104} flex={1} />
          <Skeleton h={104} flex={1} />
        </Group>
      ) : (
        <Group gap="md" align="stretch">
          <StatCard label="전체 작업" value={`${total}건`} delta={12} note="지난달 대비" />
          <StatCard label="진행중" value={`${inProgress}건`} delta={-8} note="지난달 대비" />
          <StatCard label="완료율" value={`${doneRate}%`} delta={5} note="지난달 대비" />
          <StatCard label="오류 로그" value="3건" delta={-25} note="지난주 대비" />
        </Group>
      )}

      <Group gap="md" align="stretch">
        <Card flex={2}>
          <Text fw={700} mb="md">월별 작업 처리</Text>
          <AreaChart
            h={260}
            data={monthly}
            dataKey="month"
            series={[
              { name: '완료', color: CHART_SERIES[0] },
              { name: '진행', color: CHART_SERIES[1] },
            ]}
            curveType="monotone"
            withLegend
            legendProps={{ verticalAlign: 'bottom' }}
          />
        </Card>

        <Card flex={1}>
          <Text fw={700} mb="md">파트별 비중</Text>
          <Group justify="center">
            <DonutChart size={140} thickness={20} withLabelsLine={false} data={byPart} />
          </Group>
          <Table verticalSpacing="xs" mt="md">
            <Table.Tbody>
              {byPart.map((p) => (
                <Table.Tr key={p.name}>
                  <Table.Td><Text size="sm">{p.name}</Text></Table.Td>
                  <Table.Td ta="right"><Text size="sm" fw={700} c="navy">{p.value}%</Text></Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Group>

      <Card>
        <Group justify="space-between" mb="md">
          <Text fw={700}>최근 작업</Text>
          <Anchor component={Link} to="/tasks" size="sm">전체 보기</Anchor>
        </Group>
        {isPending ? (
          <Skeleton h={160} />
        ) : (
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Tbody>
              {tasks?.slice(0, 4).map((t) => (
                <Table.Tr key={t.id}>
                  <Table.Td w={100}><Text ff="monospace" size="sm">{t.id}</Text></Table.Td>
                  <Table.Td><Text size="sm">{t.name}</Text></Table.Td>
                  <Table.Td w={90}><Text size="sm" c="dimmed">{t.part}</Text></Table.Td>
                  <Table.Td w={90}><StatusBadge status={t.status} /></Table.Td>
                  <Table.Td w={110}><Text size="sm" c="dimmed">{t.date}</Text></Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>
    </Stack>
  );
}
