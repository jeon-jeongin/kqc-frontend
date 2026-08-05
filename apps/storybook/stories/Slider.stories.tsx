import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider, Stack } from '@kqc/ui';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  args: { defaultValue: 40, w: 320 },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};

/** 눈금·라벨: 의미 있는 구간이 있을 때만 */
export const WithMarks: Story = {
  args: {
    step: 25,
    marks: [
      { value: 0, label: '0%' },
      { value: 50, label: '50%' },
      { value: 100, label: '100%' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack w={320} gap="xl">
      <Slider size="sm" defaultValue={40} />
      <Slider size="md" defaultValue={40} />
      <Slider size="lg" defaultValue={40} />
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
