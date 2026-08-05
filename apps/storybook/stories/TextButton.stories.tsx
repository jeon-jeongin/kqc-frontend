import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextButton, Group } from '@kqc/ui';

const meta: Meta<typeof TextButton> = {
  title: 'Components/TextButton',
  component: TextButton,
  args: { children: '전체 보기' },
};
export default meta;
type Story = StoryObj<typeof TextButton>;

/** 배경 없는 보조 액션. 링크(Anchor)와 구분: 페이지 이동이 아니라 동작 실행일 때 */
export const Default: Story = {};

/** 크기: 텍스트 크기 토큰 그대로 (12/14/16/18/20) */
export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <TextButton size="xs">텍스트 버튼</TextButton>
      <TextButton size="sm">텍스트 버튼</TextButton>
      <TextButton size="md">텍스트 버튼</TextButton>
      <TextButton size="lg">텍스트 버튼</TextButton>
      <TextButton size="xl">텍스트 버튼</TextButton>
    </Group>
  ),
};

/** arrow: "더 보기"류 이동 암시 */
export const Arrow: Story = {
  render: () => (
    <Group align="center">
      <TextButton size="sm" variant="arrow">전체 보기</TextButton>
      <TextButton size="md" variant="arrow">전체 보기</TextButton>
      <TextButton size="lg" variant="arrow">전체 보기</TextButton>
    </Group>
  ),
};

/** underline: 본문 안에 섞일 때 클릭 가능함을 명시 */
export const Underline: Story = {
  args: { variant: 'underline', children: '약관 전문 보기' },
};

export const Disabled: Story = {
  render: () => (
    <Group align="center">
      <TextButton disabled>전체 보기</TextButton>
      <TextButton variant="arrow" disabled>전체 보기</TextButton>
    </Group>
  ),
};
