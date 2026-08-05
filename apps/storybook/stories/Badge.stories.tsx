import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Group } from '@kqc/ui';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: '진행중' },
};
export default meta;
type Story = StoryObj<typeof Badge>;

/** 기본: navy light — 정보성 상태 표시 */
export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </Group>
  ),
};

/** 의미 색: navy=일반, green=성공, red=위험. accent 뱃지는 화면당 1종만(원칙 §2) */
export const Semantic: Story = {
  render: () => (
    <Group>
      <Badge>진행중</Badge>
      <Badge color="green" variant="light">완료</Badge>
      <Badge color="red" variant="light">실패</Badge>
      <Badge color="accent" variant="filled">NEW</Badge>
    </Group>
  ),
};
