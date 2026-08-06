import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput, Stack } from '@kqc/ui';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: { label: '이름', placeholder: '홍길동' },
};
export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

/** 크기: sm / md(기본) / lg */
export const Sizes: Story = {
  render: () => (
    <Stack w={280}>
      <TextInput size="sm" label="Small" placeholder="sm" />
      <TextInput size="md" label="Medium (기본)" placeholder="md" />
      <TextInput size="lg" label="Large" placeholder="lg" />
    </Stack>
  ),
};

/** 라벨/설명/필수 표시 */
export const WithDescription: Story = {
  args: { description: '실명을 입력해 주세요.', withAsterisk: true },
};

/** 에러 상태 */
export const Error: Story = {
  args: { error: '이름을 입력해 주세요.', withAsterisk: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: '홍길동' },
};
