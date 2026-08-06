import { Link, Outlet, useLocation } from 'react-router';
import {
  AppShell, NavLink, Group, Avatar, ScrollArea, Burger, ActionIcon,
  useMantineColorScheme, useComputedColorScheme,
} from '@kqc/ui';
import { IconSun, IconMoon } from '@kqc/ui/icons';
import { useUiStore } from '../stores/ui';
import { BrandSignature } from './BrandSignature';

const NAV = [
  { to: '/', label: '대시보드' },
  { to: '/tasks', label: '작업 관리' },
  { to: '/logs', label: '로그' },
  { to: '/keys', label: '키 관리' },
];

function BrandLogo() {
  return (
    <div
      style={{
        color: 'light-dark(var(--mantine-color-navy-7), var(--mantine-color-gray-0))',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BrandSignature />
    </div>
  );
}

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

export function AppLayout() {
  const { sidebarOpened, toggleSidebar } = useUiStore();
  const { pathname } = useLocation();

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { desktop: !sidebarOpened, mobile: !sidebarOpened },
      }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between">
          <Group gap="sm">
            {/* opened를 넘기지 않아 펼침 상태에서도 X로 바뀌지 않는다 */}
            <Burger opened={false} onClick={toggleSidebar} size="sm" aria-label="사이드바 토글" />
            <BrandLogo />
          </Group>
          <Group gap="sm">
            <SchemeToggle />
            <Avatar color="navy" radius="xl" size="sm">홍</Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar 8 + NavLink 16 = 24 → 헤더 px="lg"(24)의 햄버거와 좌측 정렬 일치 */}
      <AppShell.Navbar p="sm">
        <AppShell.Section grow component={ScrollArea}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              component={Link}
              to={item.to}
              label={item.label}
              variant="light"
              active={item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)}
              styles={{ root: { paddingInline: 16, borderRadius: 'var(--mantine-radius-sm)' } }}
            />
          ))}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* 배경·flex는 테마 AppShell 기본값 (packages/ui/src/theme.ts) */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
