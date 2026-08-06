import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart, LineChart, DonutChart, Sparkline, Stack, Text, Group, CHART_SERIES } from '@kqc/ui';

/** 시리즈 색은 CHART_SERIES 순서대로 꺼내 쓴다 (Guide/차트 컬러) */
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
        { name: '완료', color: CHART_SERIES[0] },
        { name: '진행', color: CHART_SERIES[1] },
      ]}
    />
  ),
};

/** 기준선 예시 */
export const AccentSeries: StoryObj = {
  render: () => (
    <LineChart
      h={240} w={520} data={monthly} dataKey="month" curveType="linear"
      series={[
        { name: '완료', color: CHART_SERIES[0] },
        { name: '진행', color: CHART_SERIES[1] },
      ]}
      referenceLines={[{ y: 55, color: 'gray.6', label: '목표' }]}
    />
  ),
};

export const Donut: StoryObj = {
  render: () => (
    <Group align="center" gap="xl">
      <DonutChart
        size={160} thickness={22} withLabelsLine={false} withLabels
        data={[
          { name: '플랫폼', value: 45, color: CHART_SERIES[0] },
          { name: '인프라', value: 30, color: CHART_SERIES[1] },
          { name: '리서치', value: 25, color: CHART_SERIES[2] },
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
      <Sparkline w={140} h={36} data={[92, 95, 91, 97, 99, 98, 99]} color={CHART_SERIES[0]} fillOpacity={0.15} />
      <Text size="sm" fw={700} c="navy">99.2%</Text>
    </Group>
  ),
};
