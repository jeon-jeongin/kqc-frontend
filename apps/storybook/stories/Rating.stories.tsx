import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating, Group, Text } from '@kqc/ui';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  args: { defaultValue: 3 },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};

/** 읽기 전용: 평점 표시 */
export const ReadOnly: Story = {
  render: () => (
    <Group gap="xs">
      <Rating value={4.5} fractions={2} readOnly />
      <Text size="sm" c="dimmed">4.5 (128)</Text>
    </Group>
  ),
};
