import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput, Stack } from '@kqc/ui';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/NumberInput',
  component: NumberInput,
  args: { label: '수량', defaultValue: 1, min: 0, w: 200 },
};
export default meta;
type Story = StoryObj<typeof NumberInput>;

/** 숫자 전용 입력 + 증감 버튼 (TDS Numeric Spinner 대응) */
export const Default: Story = {};

export const MinMaxStep: Story = {
  args: { label: '큐빗 수', min: 1, max: 433, step: 10, defaultValue: 127 },
};

/** 금액 등: 천 단위 구분 */
export const Formatted: Story = {
  args: {
    label: '예산',
    defaultValue: 1500000,
    thousandSeparator: ',',
    suffix: '원',
    hideControls: true,
    w: 240,
  },
};

export const Error: Story = {
  args: { error: '1 이상 입력해 주세요.', defaultValue: 0 },
};
