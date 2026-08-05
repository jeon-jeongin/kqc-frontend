import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Stack, Text, theme } from '@kqc/ui';

/**
 * 차트 색 순서의 단일 기준 — theme.other.chart.series 순서대로만 사용 (원칙 §5-4).
 * 여기의 hex 값은 라이트 전용으로, Mantine 밖(이메일·인쇄·외부 툴) 참조용.
 * 앱 안의 차트는 Components/Charts처럼 색 이름('navy' → 'navy.2')으로 지정한다.
 */
const meta: Meta = { title: 'Guide/차트 컬러', parameters: { layout: 'padded' } };
export default meta;

const chart = (
  theme.other as {
    chart: { series: string[]; accentSeries: string; grid: string; axisText: string };
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
        <Text fw={700} mb="sm">기본 시리즈 (이 순서대로만)</Text>
        <Group gap="md">
          {chart.series.map((c: string, i: number) => (
            <Swatch key={c} c={c} label={`${i + 1}번째`} />
          ))}
        </Group>
      </div>
      <div>
        <Text fw={700} mb="sm">강조 시리즈 — 차트당 1개 (원칙 §2)</Text>
        <Group gap="md">
          <Swatch c={chart.accentSeries} label="강조" />
          <Swatch c={chart.grid} label="그리드선" />
          <Swatch c={chart.axisText} label="축 텍스트" />
        </Group>
      </div>
      <Text size="xs" c="dimmed">
        사용법: @kqc/ui 차트(BarChart 등)에서는 색 이름으로 지정 — 1번 시리즈는 'navy'(인덱스
        없이, 스킴 자동 전환), 이후 'navy.2' → 'gray.5' 순서. 강조는 'accent.5' 차트당 1개.
        (navy.4는 다크에서 1번 시리즈와 같은 색이 되므로 시리즈에 쓰지 않는다.)
        위 hex 값(theme.other.chart)은 라이트 전용 — Mantine 밖(이메일·인쇄·외부 툴)에서만 사용.
      </Text>
    </Stack>
  ),
};
