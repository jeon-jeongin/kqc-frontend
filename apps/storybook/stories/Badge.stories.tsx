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

/**
 * 앱 상태 배지 규약 (대시보드·작업 관리·키 관리와 동일) —
 * 진행중=navy(기본) · 완료/활성/사용중=green · 실패/회수 필요=red · 만료 예정=yellow(경고) · 폐기=gray
 */
export const Semantic: Story = {
  render: () => (
    <Group>
      <Badge>진행중</Badge>
      <Badge color="green">완료</Badge>
      <Badge color="red">실패</Badge>
      <Badge color="yellow">만료 예정</Badge>
      <Badge color="gray">폐기</Badge>
    </Group>
  ),
};
