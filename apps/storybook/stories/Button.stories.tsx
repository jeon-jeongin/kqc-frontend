import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Group } from '@kqc/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: '확인' },
};
export default meta;
type Story = StoryObj<typeof Button>;

/** 기본 버튼 — navy */
export const Primary: Story = {};

/** 위험(파괴적) 액션은 red */
export const Variants: Story = {
  render: () => (
    <Group>
      <Button>기본 (navy)</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button color="red">삭제</Button>
      <Button color="red" variant="light">삭제 (보조)</Button>
    </Group>
  ),
};

/** 크기: sm / md(기본) / lg */
export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Group>
  ),
};

/** 부모 너비 전체 차지 — 모바일 하단 CTA 등 */
export const FullWidth: Story = {
  args: { fullWidth: true, size: 'lg', children: '동의하고 계속하기' },
};

/** 로딩 중에는 클릭 불가, 너비 유지 */
export const Loading: Story = {
  render: () => (
    <Group>
      <Button loading>저장</Button>
      <Button color="red" loading>삭제</Button>
    </Group>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Group>
      <Button disabled>저장</Button>
      <Button variant="outline" disabled>취소</Button>
    </Group>
  ),
};
