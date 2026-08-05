// Provider & 테마
export { ThemeProvider } from './ThemeProvider';
export { theme } from './theme';
export { tokens } from '@kqc/tokens';

// 컴포넌트 (서비스 코드는 반드시 @kqc/ui에서만 import — @mantine/* 직접 import 금지)
export { Button, type ButtonProps } from './components/Button';
export { TextButton, type TextButtonProps } from './components/TextButton';
export { TableToolbar } from './components/TableToolbar';
export { TablePagination } from './components/TablePagination';
export { usePagedList } from './usePagedList';
export {
  Text, Title, Anchor, Badge, Card, Modal, Tabs,
  TextInput, Select, Checkbox, Radio, Switch, Textarea,
  Group, Stack, Grid, Container, Divider, Tooltip, Table,
  Notification, Loader, Skeleton, Menu, Avatar, Alert,
  SegmentedControl, Progress, Stepper, Slider, NumberInput,
  ActionIcon, Drawer, Rating, AppShell, NavLink, ScrollArea, Burger, Box,
  Pagination, Chip, MultiSelect, TagsInput,
  type TextProps, type TitleProps, type CardProps, type ModalProps,
} from '@mantine/core';

// 자주 쓰는 훅
export { useDisclosure, useMediaQuery, useDebouncedValue } from '@mantine/hooks';
export { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

// 날짜 입력 (@mantine/dates) — 필터 툴바의 기간 선택 등
export { DateInput, DatePickerInput, DatesProvider } from '@mantine/dates';

// 차트 (@mantine/charts — Recharts 래핑). 색은 theme.other.chart 순서만 사용
export {
  BarChart, LineChart, AreaChart, DonutChart, PieChart, Sparkline,
} from '@mantine/charts';
