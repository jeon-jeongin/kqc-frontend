import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionIcon, Group, Tooltip } from '@kqc/ui';

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.02a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.02a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.02a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z" />
    </svg>
  );
}

const meta: Meta<typeof ActionIcon> = {
  title: 'Components/ActionIcon',
  component: ActionIcon,
};
export default meta;
type Story = StoryObj<typeof ActionIcon>;

/** 아이콘만 있는 버튼 — 반드시 aria-label + Tooltip (접근성) */
export const Default: Story = {
  render: () => (
    <Tooltip label="설정">
      <ActionIcon variant="subtle" aria-label="설정"><GearIcon /></ActionIcon>
    </Tooltip>
  ),
};

export const Variants: Story = {
  render: () => (
    <Group>
      <ActionIcon aria-label="설정"><GearIcon /></ActionIcon>
      <ActionIcon variant="light" aria-label="설정"><GearIcon /></ActionIcon>
      <ActionIcon variant="outline" aria-label="설정"><GearIcon /></ActionIcon>
      <ActionIcon variant="subtle" aria-label="설정"><GearIcon /></ActionIcon>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group align="center">
      <ActionIcon size="sm" variant="light" aria-label="설정"><GearIcon /></ActionIcon>
      <ActionIcon size="md" variant="light" aria-label="설정"><GearIcon /></ActionIcon>
      <ActionIcon size="lg" variant="light" aria-label="설정"><GearIcon /></ActionIcon>
    </Group>
  ),
};
