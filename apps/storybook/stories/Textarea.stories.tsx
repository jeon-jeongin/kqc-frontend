import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@kqc/ui';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  args: { label: '메모', placeholder: '내용을 입력하세요', w: 320 },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

/** 내용에 따라 높이 자동 확장 (2~6줄) */
export const Autosize: Story = {
  args: { autosize: true, minRows: 2, maxRows: 6 },
};

export const Error: Story = {
  args: { error: '10자 이상 입력해 주세요.' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '수정할 수 없는 메모' },
};
