import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch, Stack } from '@kqc/ui';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: '알림 받기' },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = { args: { defaultChecked: true } };

export const Sizes: Story = {
  render: () => (
    <Stack>
      <Switch size="sm" label="Small" defaultChecked />
      <Switch size="md" label="Medium (기본)" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </Stack>
  ),
};

/** Checkbox와 구분: Switch는 즉시 적용되는 on/off 설정에만 사용 */
export const States: Story = {
  render: () => (
    <Stack>
      <Switch label="켜짐" defaultChecked />
      <Switch label="꺼짐" />
      <Switch label="비활성" disabled />
      <Switch label="설명 포함" description="변경 즉시 저장됩니다" defaultChecked />
    </Stack>
  ),
};
