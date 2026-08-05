import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, LineChart, DonutChart, Sparkline, Stack, Text, Group } from '@kqc/ui';

/**
 * @mantine/charts (Recharts 래핑). 색 규칙:
 * - 시리즈 순서 = 'navy'(스킴 인지) → 'navy.2' → 'gray.5' → … (원칙 §5-4)
 * - 강조 시리즈(accent.5)는 차트당 1개 (원칙 §2 허용 3번)
 */
const meta: Meta = { title: 'Components/Charts', parameters: { layout: 'padded' } };
export default meta;

const monthly = [
  { month: '3월', 완료: 42, 진행: 18 },
  { month: '4월', 완료: 51, 진행: 22 },
  { month: '5월', 완료: 47, 진행: 15 },
  { month: '6월', 완료: 63, 진행: 20 },
  { month: '7월', 완료: 58, 진행: 12 },
];

export const Bar: StoryObj = {
  render: () => (
    <BarChart
      h={240} w={520} data={monthly} dataKey="month"
      series={[
        { name: '완료', color: 'navy' },
        // 2번 시리즈는 navy.2 — navy.4를 쓰면 다크에서 1번 시리즈(navy→400 자동 전환)와 같은 색이 됨
        { name: '진행', color: 'navy.2' },
      ]}
    />
  ),
};

/** 강조 시리즈 예: 여러 시리즈 중 "이번 달 목표" 하나만 accent */
export const AccentSeries: StoryObj = {
  render: () => (
    <LineChart
      h={240} w={520} data={monthly} dataKey="month" curveType="linear"
      series={[
        { name: '완료', color: 'navy' },
        { name: '진행', color: 'gray.5' },
      ]}
      referenceLines={[{ y: 55, color: 'accent.5', label: '목표' }]}
    />
  ),
};

export const Donut: StoryObj = {
  render: () => (
    <Group align="center" gap="xl">
      <DonutChart
        size={160} thickness={22} withLabelsLine={false} withLabels
        data={[
          { name: '플랫폼', value: 45, color: 'navy' },
          { name: '인프라', value: 30, color: 'navy.2' },
          { name: '리서치', value: 25, color: 'gray.4' },
        ]}
      />
      <Stack gap={4}>
        <Text fw={700}>파트별 작업 비중</Text>
        <Text size="sm" c="dimmed">도넛 두께·라벨은 이 설정 고정</Text>
      </Stack>
    </Group>
  ),
};

/** 테이블 셀·카드 안 미니 추세선 */
export const SparklineInline: StoryObj = {
  render: () => (
    <Group align="center">
      <Text size="sm">주간 가동률</Text>
      <Sparkline w={140} h={36} data={[92, 95, 91, 97, 99, 98, 99]} color="navy" fillOpacity={0.15} />
      <Text size="sm" fw={700} c="navy">99.2%</Text>
    </Group>
  ),
};
