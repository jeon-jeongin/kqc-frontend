import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Group } from '@kqc/ui';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

/** 이미지 없으면 이니셜, 기본 색은 navy */
export const Default: Story = {
  render: () => (
    <Group>
      <Avatar color="navy" radius="xl">홍</Avatar>
      <Avatar color="navy" radius="xl">KQ</Avatar>
      <Avatar radius="xl" />
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <Avatar size="sm" color="navy" radius="xl">S</Avatar>
      <Avatar size="md" color="navy" radius="xl">M</Avatar>
      <Avatar size="lg" color="navy" radius="xl">L</Avatar>
    </Group>
  ),
};

/** 그룹: 참여자 표시 등 */
export const Grouped: Story = {
  render: () => (
    <Avatar.Group>
      <Avatar color="navy" radius="xl">김</Avatar>
      <Avatar color="navy" radius="xl">이</Avatar>
      <Avatar color="navy" radius="xl">박</Avatar>
      <Avatar radius="xl">+3</Avatar>
    </Avatar.Group>
  ),
};
