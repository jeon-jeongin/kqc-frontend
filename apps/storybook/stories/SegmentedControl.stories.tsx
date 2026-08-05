import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl, Stack } from '@kqc/ui';

const data = ['일간', '주간', '월간'];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: { data },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/** 2~5개의 배타적 보기 전환. 페이지 이동이면 Tabs, 보기 전환이면 이것 */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack align="flex-start">
      <SegmentedControl size="sm" data={data} />
      <SegmentedControl size="md" data={data} />
      <SegmentedControl size="lg" data={data} />
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, w: 360 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
