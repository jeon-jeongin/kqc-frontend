import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, Stack, Text } from '@kqc/ui';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: { value: 62, w: 320 },
};
export default meta;
type Story = StoryObj<typeof Progress>;

/** 진행률 표시. 색은 navy 고정 — 진행률은 "강조"가 아니라 "상태" */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack w={320}>
      <Progress size="sm" value={62} />
      <Progress size="md" value={62} />
      <Progress size="lg" value={62} />
    </Stack>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Stack w={320} gap={6}>
      <Text size="sm">업로드 중… 62%</Text>
      <Progress value={62} />
    </Stack>
  ),
};

/** 구간 표시: 사용량 등. 위험 구간만 red */
export const Sections: Story = {
  render: () => (
    <Progress.Root size="lg" w={320}>
      <Progress.Section value={55} color="navy" />
      <Progress.Section value={25} color="navy.2" />
      <Progress.Section value={12} color="red" />
    </Progress.Root>
  ),
};
