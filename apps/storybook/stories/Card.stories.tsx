import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, Text, Badge, Group, Button } from '@kqc/ui';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

/** 기본: radius 12 + 패딩 20. 보더·그림자 없이 배경 한 톤 차이로만 구분 (테마 고정) */
export const Default: Story = {
  render: () => (
    <Card w={320}>
      <Group justify="space-between" mb="xs">
        <Text fw={700}>월간 인프라 점검</Text>
        <Badge color="green" variant="light">완료</Badge>
      </Group>
      <Text size="sm" c="dimmed">
        7월 정기 점검이 완료되었습니다. 이슈 0건.
      </Text>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card w={320}>
      <Text fw={700} mb="xs">API 키 발급</Text>
      <Text size="sm" c="dimmed" mb="md">
        외부 연동을 위한 키를 발급받으세요.
      </Text>
      <Button fullWidth>발급하기</Button>
    </Card>
  ),
};
