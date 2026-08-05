import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Stack } from '@kqc/ui';

const data = ['플랫폼', '인프라', '리서치'];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { label: '담당 파트', placeholder: '선택', data },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Stack w={280}>
      <Select size="sm" label="Small" data={data} placeholder="선택" />
      <Select size="md" label="Medium (기본)" data={data} placeholder="선택" />
      <Select size="lg" label="Large" data={data} placeholder="선택" />
    </Stack>
  ),
};

/** 검색 가능 — 항목 10개 이상이면 searchable 권장 */
export const Searchable: Story = {
  args: { searchable: true, nothingFoundMessage: '결과 없음' },
};

export const Error: Story = {
  args: { error: '필수 항목입니다.', withAsterisk: true },
};

export const Disabled: Story = {
  args: { disabled: true, value: '플랫폼' },
};
