import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppShell, NavLink, Text, Title, Group, Avatar, ScrollArea, Badge, Burger,
  useDisclosure,
} from '@kqc/ui';

/**
 * 패턴: 앱 공통 레이아웃 (헤더 + 사이드바).
 * MFE에서는 app-shell 앱이 이 패턴을 소유하고, 리모트 앱은 본문만 채운다.
 * 활성 메뉴 = navy light 배경. 사이드바에 accent 사용 금지 (원칙 §2).
 */
const meta: Meta = {
  title: 'Patterns/AppShell',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Sidebar: StoryObj = {
  render: function Render() {
    const [opened, { toggle }] = useDisclosure(true);
    return (
      <AppShell
        header={{ height: 56 }}
        navbar={{
          width: 240,
          breakpoint: 'sm',
          collapsed: { desktop: !opened, mobile: !opened },
        }}
        padding="lg"
        h={560}
      >
        <AppShell.Header>
          <Group h="100%" px="lg" justify="space-between">
            <Group gap="sm">
              <Burger opened={opened} onClick={toggle} size="sm" aria-label="사이드바 토글" />
              <Text fw={800} c="navy" size="lg">KQC</Text>
            </Group>
            <Avatar color="navy" radius="xl" size="sm">홍</Avatar>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="sm">
          <AppShell.Section grow component={ScrollArea}>
            <NavLink label="대시보드" active variant="light" />
            <NavLink label="작업 관리" />
            <NavLink
              label="리포트"
              rightSection={<Badge size="sm" variant="light">3</Badge>}
            />
            <NavLink label="설정" childrenOffset={28} defaultOpened>
              <NavLink label="팀 관리" />
              <NavLink label="API 키" />
            </NavLink>
          </AppShell.Section>
          <AppShell.Section>
            <NavLink label="도움말" c="dimmed" />
          </AppShell.Section>
        </AppShell.Navbar>

        {/* 배경은 테마 AppShell 기본값 — 앱에서 별도 지정 불필요 */}
        <AppShell.Main>
          <Title order={3} mb="sm">대시보드</Title>
          <Text size="sm" c="dimmed">
            헤더의 ☰ 버튼으로 사이드바 전체가 접히고, "설정" 클릭으로 하위 메뉴가 접힙니다.
          </Text>
        </AppShell.Main>
      </AppShell>
    );
  },
};
