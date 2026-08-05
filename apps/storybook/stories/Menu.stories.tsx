import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, Button } from '@kqc/ui';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};
export default meta;
type Story = StoryObj<typeof Menu>;

/** 파괴적 항목은 red + 구분선으로 분리 */
export const Default: Story = {
  render: () => (
    <Menu shadow="sm" width={180}>
      <Menu.Target>
        <Button variant="outline">더보기</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>수정</Menu.Item>
        <Menu.Item>복제</Menu.Item>
        <Menu.Item disabled>공유 (준비중)</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red">삭제</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ),
};
