import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, Group, Stack } from '@kqc/ui';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};
export default meta;
type Story = StoryObj<typeof Radio>;

/** 단독 사용 금지 — 항상 Radio.Group으로 묶어 name/상태 관리.
 *  선택지 사이 간격: 가로 stackMd(16) — 라벨-선택지 간격은 테마가 자동(8) */
export const InGroup: Story = {
  render: () => (
    <Radio.Group label="결제 수단" defaultValue="card" withAsterisk>
      <Group gap="md">
        <Radio value="card" label="카드" />
        <Radio value="transfer" label="계좌이체" />
        <Radio value="vbank" label="가상계좌" />
      </Group>
    </Radio.Group>
  ),
};

/** 세로 선택지 사이 = stackSm(8) */
export const Vertical: Story = {
  render: () => (
    <Radio.Group label="공개 범위" defaultValue="team">
      <Stack gap="sm">
        <Radio value="all" label="전체 공개" />
        <Radio value="team" label="팀에만 공개" />
        <Radio value="private" label="비공개" description="나만 볼 수 있습니다" />
      </Stack>
    </Radio.Group>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Radio.Group label="요금제" defaultValue="basic">
      <Group gap="md">
        <Radio value="basic" label="Basic" />
        <Radio value="pro" label="Pro (준비중)" disabled />
      </Group>
    </Radio.Group>
  ),
};
