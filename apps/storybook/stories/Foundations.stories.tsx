import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group, Stack, Text, Title, tokens } from '@kqc/ui';

const meta: Meta = { title: 'Foundations/Colors' };
export default meta;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <Stack gap={4} align="center">
    <div style={{ width: 56, height: 56, borderRadius: 8, background: value, border: '1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-4))' }} />
    <Text size="xs" c="dimmed">{name}</Text>
  </Stack>
);

const ramp = (prefix: string) =>
  Object.entries(tokens)
    .filter(([k]) => k.startsWith(`color_${prefix}_`))
    .map(([k, v]) => <Swatch key={k} name={k.split('_').pop()!} value={v} />);

const Section = ({ title, name }: { title: string; name: string }) => (
  <div>
    <Title order={4}>{title}</Title>
    <Group mt="sm">{ramp(name)}</Group>
  </div>
);

export const Palette: StoryObj = {
  render: () => (
    <Stack gap="lg">
      <Section name="gray" title="Gray" />
      <Section name="navy" title="Navy" />
      <Section name="red" title="Red" />
      <Section name="orange" title="Orange" />
      <Section name="yellow" title="Yellow" />
      <Section name="green" title="Green" />
      <Section name="teal" title="Teal" />
      <Section name="purple" title="Purple" />
      <Section name="background" title="Background" />
    </Stack>
  ),
};

export const Typography: StoryObj = {
  render: () => (
    <Stack gap="md" maw={640}>
      <Title order={1}>h1 — 페이지 제목 38px</Title>
      <Title order={2}>h2 — 섹션 제목 30px</Title>
      <Title order={3}>h3 — 서브 섹션 24px</Title>
      <Text size="lg">bodyLg 18px — 리드문과 아티클 장문에 사용합니다. 행간 1.65.</Text>
      <Text>bodyMd 16px — 기본 UI 본문입니다. 행간 1.5.</Text>
      <Text size="sm" c="dimmed">bodySm 14px — 보조 설명, 테이블 셀.</Text>
      <Text size="xs" c="dimmed">caption 12px — 타임스탬프, 헬퍼 텍스트.</Text>
    </Stack>
  ),
};
