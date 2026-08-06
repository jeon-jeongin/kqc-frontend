import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Stack, Text, CHART_SERIES, CHART_PALETTES, tokens } from '@kqc/ui';

const meta: Meta = { title: 'Guide/차트 컬러', parameters: { layout: 'padded' } };
export default meta;

function Swatch({ index }: { index: number }) {
  const name = CHART_PALETTES[index];
  return (
    <Stack gap={4} align="center" w={92}>
      <div style={{ width: 68, height: 68, borderRadius: 8, background: CHART_SERIES[index] }} />
      <Text size="sm" fw={700}>{index + 1}. {name}</Text>
      <Text size="xs" c="dimmed" ff="monospace">{tokens[`color_${name}_400`]}</Text>
      <Text size="xs" c="dimmed" ff="monospace">{tokens[`color_${name}_300`]}</Text>
    </Stack>
  );
}

export const 시리즈_순서: StoryObj = {
  render: () => (
    <Stack gap="lg">
      <Text size="sm" c="dimmed" maw={720}>
        시리즈 색은 <code>CHART_SERIES</code>에서 순서대로 꺼내 쓴다.<br/>
        시리즈가 8개를 넘으면 색을 늘리지 말고 차트를 쪼갠다. 축·그리드선은 gray를 쓴다<br/>
      </Text>
      <Group gap="md" align="flex-start">
        {CHART_SERIES.map((_, i) => <Swatch key={i} index={i} />)}
      </Group>
    </Stack>
  ),
};
