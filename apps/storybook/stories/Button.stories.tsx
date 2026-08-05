import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Group } from '@kqc/ui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: '확인' },
};
export default meta;
type Story = StoryObj<typeof Button>;

/** 기본 버튼 — 브랜드 네이비 #012169 */
export const Primary: Story = {};

/** 핵심 CTA 전용 — 화면당 최대 1개 (DESIGN_PRINCIPLES §2) */
export const AccentCTA: Story = {
  args: { color: 'accent', children: '지금 신청하기' },
};

/** 위험(파괴적) 액션은 red — 오렌지 아님 (원칙 §2: 오렌지=강조, red=위험) */
export const Variants: Story = {
  render: () => (
    <Group>
      <Button>기본 (navy)</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button color="accent">핵심 CTA</Button>
      <Button color="red">삭제</Button>
      <Button color="red" variant="light">삭제 (보조)</Button>
    </Group>
  ),
};

/** 크기: sm / md(기본) / lg. 모바일 주요 버튼은 lg (터치 타겟 44px 근접) */
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
      <Button color="accent" loading>제출</Button>
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
