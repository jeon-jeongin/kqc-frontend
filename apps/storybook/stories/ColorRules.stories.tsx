import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Text, Badge, Card, Group, Stack, Anchor, tokens } from '@kqc/ui';

/**
 * 팀 공유용: 오렌지 절제 규칙을 눈으로 비교.
 * DESIGN_PRINCIPLES.md §2 — "신호가 많아지면 신호가 아니다"
 */
const meta: Meta = { title: 'Guide/컬러 규칙 Do · Don’t', parameters: { layout: 'padded' } };
export default meta;

function Panel({
  kind, children, note,
}: { kind: 'do' | 'dont'; children: ReactNode; note: string }) {
  const isDo = kind === 'do';
  return (
    <Card style={{ borderColor: isDo ? tokens.color_green_500 : tokens.color_red_500, borderWidth: 2 }} w={380}>
      <Badge color={isDo ? 'green' : 'red'} variant="light" mb="md">
        {isDo ? 'DO — 이렇게' : "DON'T — 이러지 않기"}
      </Badge>
      <Stack gap="md">{children}</Stack>
      <Text size="xs" c="dimmed" mt="md">{note}</Text>
    </Card>
  );
}

export const CTA는_화면당_1개: StoryObj = {
  render: () => (
    <Group align="stretch" gap="lg">
      <Panel kind="do" note="오렌지 = '이 화면의 최우선 행동' 신호. 하나뿐이라 즉시 눈에 들어온다.">
        <Text fw={700}>요금제 안내</Text>
        <Group>
          <Button variant="outline">상담 문의</Button>
          <Button>자세히 보기</Button>
          <Button color="accent">무료로 시작하기</Button>
        </Group>
      </Panel>

      <Panel kind="dont" note="전부 오렌지 = 아무것도 강조되지 않음. 게다가 브랜드 인상(네이비)이 사라진다.">
        <Text fw={700}>요금제 안내</Text>
        <Group>
          <Button color="accent" variant="outline">상담 문의</Button>
          <Button color="accent">자세히 보기</Button>
          <Button color="accent">무료로 시작하기</Button>
        </Group>
      </Panel>
    </Group>
  ),
};

export const 텍스트에_오렌지_금지: StoryObj = {
  render: () => (
    <Group align="stretch" gap="lg">
      <Panel kind="do" note="본문은 gray.900, 링크·강조는 navy. 대비 4.5:1 이상 확보.">
        <Text>
          큐빗 캘리브레이션이 완료되었습니다.{' '}
          <Anchor>상세 리포트 보기</Anchor>
        </Text>
        <Text fw={700} c="navy">이번 주 가동률 99.2%</Text>
      </Panel>

      <Panel kind="dont" note="#EA733D는 흰 배경 대비 약 3:1 — 본문/링크로 쓰면 접근성 미달(WCAG AA 실패).">
        <Text>
          큐빗 캘리브레이션이 완료되었습니다.{' '}
          <Anchor c="#EA733D" underline="always">상세 리포트 보기</Anchor>
        </Text>
        <Text fw={700} c="#EA733D">이번 주 가동률 99.2%</Text>
      </Panel>
    </Group>
  ),
};

export const 에러는_red_오렌지_아님: StoryObj = {
  render: () => (
    <Group align="stretch" gap="lg">
      <Panel kind="do" note="오렌지=강조, red=위험. 의미를 섞지 않아야 사용자가 색을 신뢰한다.">
        <Group>
          <Badge color="red" variant="light">결제 실패</Badge>
          <Badge>진행중</Badge>
          <Badge color="green" variant="light">완료</Badge>
        </Group>
      </Panel>

      <Panel kind="dont" note="에러를 오렌지로 쓰면 '강조'와 '위험'이 구분 불가 — 진짜 CTA의 신호도 죽는다.">
        <Group>
          <Badge color="accent" variant="filled">결제 실패</Badge>
          <Badge color="accent" variant="light">진행중</Badge>
          <Badge color="accent" variant="outline">완료</Badge>
        </Group>
      </Panel>
    </Group>
  ),
};
