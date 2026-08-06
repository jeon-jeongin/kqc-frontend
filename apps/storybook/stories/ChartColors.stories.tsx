import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Stack, Text, theme } from '@kqc/ui';

/** theme.other.chart의 라이트 전용 hex — Mantine 밖(이메일·인쇄·외부 툴) 참조용 */
const meta: Meta = { title: 'Guide/차트 컬러', parameters: { layout: 'padded' } };
export default meta;

const chart = (
  theme.other as {
    chart: { series: string[]; grid: string; axisText: string };
  }
).chart;

function Swatch({ c, label }: { c: string; label: string }) {
  return (
    <Stack gap={4} align="center">
      <div style={{ width: 56, height: 56, borderRadius: 8, background: c }} />
      <Text size="xs" c="dimmed">{label}</Text>
      <Text size="xs" ff="monospace">{c}</Text>
    </Stack>
  );
}

export const 시리즈_순서: StoryObj = {
  render: () => (
    <Stack gap="lg">
      <div>
        <Text fw={700} mb="sm">시리즈</Text>
        <Group gap="md">
          {chart.series.map((c: string, i: number) => (
            <Swatch key={c} c={c} label={`${i + 1}번째`} />
          ))}
        </Group>
      </div>
      <div>
        <Text fw={700} mb="sm">축·그리드</Text>
        <Group gap="md">
          <Swatch c={chart.grid} label="그리드선" />
          <Swatch c={chart.axisText} label="축 텍스트" />
        </Group>
      </div>
      <Text size="xs" c="dimmed">
        앱 안에서는 색 이름으로 지정한다 — 'navy'(인덱스 없이, 스킴 자동 전환) → 'navy.2' → 'gray.5'.
        navy.6·navy.7은 1번 시리즈와 같은 색이므로 시리즈에 쓰지 않는다.
      </Text>
    </Stack>
  ),
};
