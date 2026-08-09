import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AppShell, NavLink, Text, Title, Group, Stack, Avatar, ScrollArea, Badge, ActionIcon,
  BrandSignature, useDisclosure, useMantineColorScheme, useComputedColorScheme,
} from '@kqc/ui';
import { IconSun, IconMoon, IconLayoutSidebar } from '@kqc/ui/icons';

/**
 * 패턴: 앱 공통 레이아웃 (헤더 + 사이드바) — apps/dashboard의 AppLayout.tsx와 동일 구성.
 * 새 앱은 이 스토리를 이식하면 대시보드와 같은 레이아웃으로 시작한다.
 * MFE에서는 app-shell 앱이 이 패턴을 소유하고, 리모트 앱은 본문만 채운다.
 */
const meta: Meta = {
  title: 'Patterns/AppShell',
  parameters: { layout: 'fullscreen' },
};
export default meta;

function SchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computed = useComputedColorScheme('light');
  const dark = computed === 'dark';
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      onClick={() => setColorScheme(dark ? 'light' : 'dark')}
    >
      {dark ? <IconSun size={16} /> : <IconMoon size={16} />}
    </ActionIcon>
  );
}

/** 헤더 + 셸 골격. 실제 앱(AppLayout.tsx)은 로고를 라우터 Link로 감싼다. */
function Frame({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { desktop: !opened, mobile: !opened },
      }}
      padding="md"
      h={560}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label={opened ? '사이드바 접기' : '사이드바 펼치기'}
              onClick={toggle}
            >
              <IconLayoutSidebar size={16} />
            </ActionIcon>
            <span
              style={{
                color: 'light-dark(var(--mantine-color-navy-9), var(--mantine-color-gray-0))',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BrandSignature />
            </span>
          </Group>
          <Group gap="sm">
            <SchemeToggle />
            <Avatar color="navy" radius="xl" size="sm">홍</Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar 8 + NavLink 12 = 20 → 헤더 px="md"(20)의 토글 버튼과 좌측 정렬 일치 */}
      <AppShell.Navbar p="sm">{nav}</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

const NAV = ['대시보드', '작업 관리', '로그', '키 관리'];
const navLinkStyles = {
  root: { paddingBlock: 6, paddingInline: 12, borderRadius: 'var(--mantine-radius-sm)' },
};

/** 대시보드 실물 미러 — 라우팅만 useState로 대체 */
export const Sidebar: StoryObj = {
  render: function Render() {
    const [active, setActive] = useState('대시보드');
    return (
      <Frame
        nav={
          <AppShell.Section grow component={ScrollArea}>
            <Stack gap={4}>
              {NAV.map((label) => (
                <NavLink
                  key={label}
                  label={label}
                  variant="light"
                  active={label === active}
                  onClick={() => setActive(label)}
                  styles={navLinkStyles}
                />
              ))}
            </Stack>
          </AppShell.Section>
        }
      >
        <Title order={3} mb="sm">{active}</Title>
        <Text size="sm" c="dimmed">
          헤더의 토글로 사이드바가 접히고, 달/해 아이콘으로 컬러 스킴이 전환됩니다.
        </Text>
      </Frame>
    );
  },
};

/** 확장 데모: 카운트 배지 · 중첩 메뉴 · 하단 고정 섹션 — 필요할 때만 가져다 쓴다 */
export const NavExtras: StoryObj = {
  name: '확장 데모',
  render: function Render() {
    return (
      <Frame
        nav={
          <>
            <AppShell.Section grow component={ScrollArea}>
              <Stack gap={4}>
                <NavLink label="대시보드" variant="light" active styles={navLinkStyles} />
                <NavLink label="작업 관리" variant="light" styles={navLinkStyles} />
                <NavLink
                  label="리포트"
                  variant="light"
                  styles={navLinkStyles}
                  rightSection={<Badge size="sm">3</Badge>}
                />
                <NavLink
                  label="설정"
                  variant="light"
                  styles={navLinkStyles}
                  childrenOffset={28}
                  defaultOpened
                >
                  <NavLink label="팀 관리" variant="light" styles={navLinkStyles} />
                  <NavLink label="API 키" variant="light" styles={navLinkStyles} />
                </NavLink>
              </Stack>
            </AppShell.Section>
            <AppShell.Section>
              <NavLink label="도움말" c="dimmed" variant="light" styles={navLinkStyles} />
            </AppShell.Section>
          </>
        }
      >
        <Title order={3} mb="sm">확장 데모</Title>
        <Text size="sm" c="dimmed">
          카운트 배지, "설정" 클릭으로 접히는 하위 메뉴, 하단 고정 섹션 예시입니다.
        </Text>
      </Frame>
    );
  },
};
