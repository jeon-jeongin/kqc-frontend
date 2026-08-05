import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, Button, Group } from '@kqc/ui';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

/** 짧은 보조 설명만. 중요한 정보를 툴팁에만 두지 않기 (접근성) */
export const Default: Story = {
  render: () => (
    <Tooltip label="CSV로 내려받습니다">
      <Button variant="outline">내보내기</Button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <Group>
      <Tooltip label="위" position="top"><Button variant="light">top</Button></Tooltip>
      <Tooltip label="아래" position="bottom"><Button variant="light">bottom</Button></Tooltip>
      <Tooltip label="오른쪽" position="right"><Button variant="light">right</Button></Tooltip>
    </Group>
  ),
};
