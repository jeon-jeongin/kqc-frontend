import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, Text } from '@kqc/ui';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};
export default meta;
type Story = StoryObj<typeof Tabs>;

/** 활성 인디케이터만 오렌지 (소면적 상태 표시 — 원칙 §2 허용 2번) */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all" w={420}>
      <Tabs.List>
        <Tabs.Tab value="all">전체</Tabs.Tab>
        <Tabs.Tab value="mine">내 작업</Tabs.Tab>
        <Tabs.Tab value="done">완료</Tabs.Tab>
        <Tabs.Tab value="archived" disabled>보관됨</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="all" pt="md"><Text size="sm">전체 목록</Text></Tabs.Panel>
      <Tabs.Panel value="mine" pt="md"><Text size="sm">내 작업 목록</Text></Tabs.Panel>
      <Tabs.Panel value="done" pt="md"><Text size="sm">완료 목록</Text></Tabs.Panel>
    </Tabs>
  ),
};

/** 서브 내비게이션 등 2차 탭은 pills — 색은 navy로 낮춰 위계 구분 */
export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="week" variant="pills" color="navy" w={420}>
      <Tabs.List>
        <Tabs.Tab value="day">일간</Tabs.Tab>
        <Tabs.Tab value="week">주간</Tabs.Tab>
        <Tabs.Tab value="month">월간</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  ),
};
