import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Title, Text, Card, Group, Stack, Divider, Switch, Select, Button,
} from '@kqc/ui';

/**
 * 패턴: 콘솔 설정 화면
 * - 중요도순 그룹 (일반 → 계정 → 사용량)
 * - 글자 크기 3개: 섹션 제목 h4 / 본문 md / 설명 xs dimmed
 * - 설정 행 = 설명 좌측, 컨트롤 우측 (토글 / 동작 버튼 / 드롭박스)
 */
const meta: Meta = { title: 'Patterns/설정 화면', parameters: { layout: 'padded' } };
export default meta;

function SettingRow({
  label, description, children,
}: { label: string; description?: string; children: ReactNode }) {
  return (
    <Group justify="space-between" align="center" wrap="nowrap" py={4}>
      <div>
        <Text>{label}</Text>
        {description && <Text size="xs" c="dimmed">{description}</Text>}
      </div>
      {children}
    </Group>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <Title order={4} mb="sm">{title}</Title>
      <Card padding="md">
        <Stack gap="xs">{children}</Stack>
      </Card>
    </div>
  );
}

export const 설정_페이지: StoryObj = {
  render: () => (
    <Stack gap="xl" w={640}>
      <Section title="일반">
        <SettingRow label="다크 모드" description="시스템 설정을 따르거나 직접 선택합니다">
          <Switch defaultChecked aria-label="다크 모드" />
        </SettingRow>
        <Divider />
        <SettingRow label="언어">
          <Select data={['한국어', 'English']} defaultValue="한국어" w={160} size="sm" aria-label="언어" />
        </SettingRow>
        <Divider />
        <SettingRow label="작업 완료 알림" description="담당 작업이 완료되면 알림을 받습니다">
          <Switch defaultChecked aria-label="작업 완료 알림" />
        </SettingRow>
      </Section>

      <Section title="계정">
        <SettingRow label="API 키" description="외부 연동에 사용하는 키를 확인합니다">
          <Button variant="outline" size="sm">Show</Button>
        </SettingRow>
        <Divider />
        <SettingRow label="데이터 내보내기" description="작업 이력 전체를 CSV로 받습니다">
          <Button variant="outline" size="sm">Export</Button>
        </SettingRow>
      </Section>

      <Section title="사용량">
        <SettingRow label="이번 달 캘리브레이션" description="한도 200회 중 사용량">
          <Text fw={700} c="navy">142회</Text>
        </SettingRow>
      </Section>
    </Stack>
  ),
};
