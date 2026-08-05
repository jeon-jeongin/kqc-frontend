import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@kqc/ui';

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

const meta: Meta<typeof TextInput> = {
  title: 'Components/SearchField',
  component: TextInput,
};
export default meta;
type Story = StoryObj<typeof TextInput>;

/** 별도 컴포넌트 아님 — TextInput + leftSection 조합 패턴 (TDS Search Field 대응) */
export const Default: Story = {
  args: {
    placeholder: '작업 검색',
    leftSection: <SearchIcon />,
    w: 280,
    'aria-label': '검색',
  },
};

export const Rounded: Story = {
  args: {
    placeholder: '검색',
    leftSection: <SearchIcon />,
    radius: 'xl',
    w: 280,
    'aria-label': '검색',
  },
};
