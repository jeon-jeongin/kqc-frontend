import { Link, Outlet, useLocation } from 'react-router';
import {
  AppShell, NavLink, Group, Avatar, ScrollArea, Burger, ActionIcon,
  useMantineColorScheme, useComputedColorScheme,
} from '@kqc/ui';
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
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      )}
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

      <AppShell.Main style={{ background: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
