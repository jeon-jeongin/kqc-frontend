import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Stack } from '@kqc/ui';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: '약관에 동의합니다' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <Checkbox size="sm" label="Small" defaultChecked />
      <Checkbox size="md" label="Medium (기본)" defaultChecked />
      <Checkbox size="lg" label="Large" defaultChecked />
    </Stack>
  ),
};

/** 체크/부분선택/비활성 상태 */
/** 선택지 사이 세로 간격 = stackSm(8) */
export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <Checkbox label="선택됨" defaultChecked />
      <Checkbox label="부분 선택 (전체선택 UI)" indeterminate />
      <Checkbox label="비활성" disabled />
      <Checkbox label="비활성 + 선택됨" disabled defaultChecked />
    </Stack>
  ),
};
