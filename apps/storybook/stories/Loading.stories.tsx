import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader, Skeleton, Group, Stack, Card, Text } from '@kqc/ui';

const meta: Meta = { title: 'Components/Loading' };
export default meta;

/** Loader: 짧은 대기(버튼·소영역). 색은 navy 고정 */
export const Loaders: StoryObj = {
  render: () => (
    <Group align="center">
      <Loader size="sm" />
      <Loader size="md" />
      <Loader size="lg" />
    </Group>
  ),
};

/** Skeleton: 레이아웃을 아는 콘텐츠 로딩 — 실제 배치와 동일한 형태로 */
export const Skeletons: StoryObj = {
  render: () => (
    <Card w={320}>
      <Group mb="md">
        <Skeleton height={40} circle />
        <Stack gap={6} style={{ flex: 1 }}>
          <Skeleton height={12} width="60%" />
          <Skeleton height={10} width="40%" />
        </Stack>
      </Group>
      <Skeleton height={10} mb={8} />
      <Skeleton height={10} mb={8} />
      <Skeleton height={10} width="70%" />
      <Text size="xs" c="dimmed" mt="md">↑ 카드 실제 구조와 동일한 뼈대</Text>
    </Card>
  ),
};
