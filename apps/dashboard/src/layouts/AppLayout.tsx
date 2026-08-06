import { Link, Outlet, useLocation } from 'react-router';
import {
  AppShell, NavLink, Group, Stack, Avatar, ScrollArea, ActionIcon,
  useMantineColorScheme, useComputedColorScheme,
} from '@kqc/ui';
import { IconSun, IconMoon, IconLayoutSidebar } from '@kqc/ui/icons';
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
    <Link
      to="/"
      aria-label="대시보드로 이동"
      style={{
        color: 'light-dark(var(--mantine-color-navy-9), var(--mantine-color-gray-0))',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <BrandSignature />
    </Link>
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
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <ActionIcon
              variant="subtle"
              color="gray"
              aria-label={sidebarOpened ? '사이드바 접기' : '사이드바 펼치기'}
              onClick={toggleSidebar}
            >
              <IconLayoutSidebar size={16} />
            </ActionIcon>
            <BrandLogo />
          </Group>
          <Group gap="sm">
            <SchemeToggle />
            <Avatar color="navy" radius="xl" size="sm">홍</Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Navbar 8 + NavLink 12 = 20 → 헤더 px="md"(20)의 토글 버튼과 좌측 정렬 일치 */}
      <AppShell.Navbar p="sm">
        <AppShell.Section grow component={ScrollArea}>
          <Stack gap={4}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                component={Link}
                to={item.to}
                label={item.label}
                variant="light"
                active={item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)}
                styles={{ root: { paddingBlock: 6, paddingInline: 12, borderRadius: 'var(--mantine-radius-sm)' } }}
              />
            ))}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
