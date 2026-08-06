import {
  createTheme, rem, defaultVariantColorsResolver,
  type VariantColorsResolver, type MantineColorsTuple, type MantineTheme,
  type CSSVariablesResolver,
} from '@mantine/core';

/**
 * 단일 소스: kqc-design-tokens.json / 사용 규칙: DESIGN_PRINCIPLES.md
 * 모든 팔레트가 같은 사다리 위에 있어 primaryShade 하나가 전 팔레트에 통한다.
 */

const gray: MantineColorsTuple = [
  '#F8F9FB', '#F1F3F6', '#E4E8EE', '#CFD6DE', '#AAB4C0',
  '#8593A3', '#64748B', '#475569', '#2E3A4A', '#1B2430',
];
const navy: MantineColorsTuple = [
  '#EBF0FA', '#CDDBF3', '#AEC5EE', '#90AFE8', '#7299E2',
  '#5482DC', '#356AD6', '#2354B6', '#0D378F', '#012169',
];
const red: MantineColorsTuple = [
  '#FDEBEB', '#FACFCE', '#F9B0AF', '#F88F90', '#FA666D',
  '#FA2349', '#DC133C', '#B30D2F', '#81061F', '#540412',
];
const orange: MantineColorsTuple = [
  '#FCECE6', '#FAD0BF', '#F9B294', '#F89165', '#F56C28',
  '#DB590F', '#BD4C0C', '#993C07', '#6E2903', '#491903',
];
/** 노랑만 사다리가 밝은 쪽으로 치우쳐 있다 — sRGB에서 노랑은 밝아야 노랑이다 */
const yellow: MantineColorsTuple = [
  '#FEF5EA', '#FCE4C4', '#FBD095', '#FAB853', '#EAA326',
  '#D28F14', '#B27910', '#8C5F0A', '#634105', '#3A2503',
];
const green: MantineColorsTuple = [
  '#E9F3EA', '#C4E2C7', '#9DD2A3', '#71C17E', '#44AF5B',
  '#39964E', '#2F7E40', '#226631', '#11471F', '#073413',
];
const teal: MantineColorsTuple = [
  '#E4F4F3', '#B5E4E1', '#7DD4D0', '#4FC1BD', '#44A9A5',
  '#3A918E', '#2F7A78', '#226360', '#124544', '#073130',
];
const purple: MantineColorsTuple = [
  '#F3EDFA', '#E2D3F5', '#D2B8F3', '#C39CF0', '#B480EC',
  '#A464E3', '#914FCD', '#7A36B3', '#5A1B8B', '#3A0A5D',
];

/** 다크 표면. Mantine의 `dark` 슬롯을 덮어쓴다 (기본값은 채도 0이라 우리 gray와 어긋난다) */
const surface: MantineColorsTuple = [
  // index 2 = 다크 dimmed 텍스트. 가장 밝은 표면(인풋 #2A2F34) 위에서 4.6:1이 되도록 잡았다.
  '#C7C9CD', '#B6B9BC', '#94979C', '#666A6E', '#3E4347',
  '#373C40', '#2A2F34', '#202429', '#1B1F24', '#111419',
];

/** 다크 filled hover. 600보다 밝으면서 흰 라벨 4.5:1을 지키는 상한값 */
const darkHover: Record<string, string> = {
  navy: '#3E71D7', red: '#E6143F', orange: '#C6500D',
  green: '#318544', teal: '#32807E', purple: '#9655D4',
};

/** 다크 `light` variant 배경 [기본, hover]. Mantine 계산식은 표면보다 어두워져 뱃지가 파여 보인다 */
const darkLight: Record<string, [string, string]> = {
  gray: ['#4B5157', '#575D63'],
  navy: ['#41516C', '#4C5D7C'],
  red: ['#6A4646', '#7A5151'],
  orange: ['#69483B', '#785444'],
  yellow: ['#614C30', '#6F5839'],
  green: ['#3B563F', '#456349'],
  teal: ['#295755', '#326562'],
  purple: ['#584A68', '#655677'],
};

const hairline = 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))';
const shellBorder = 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))';
const inputBg = 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))';
/**
 * 컴포넌트 표면(카드·모달). 페이지보다 한 톤 밝다(다크) / 어둡다(라이트).
 * 다크 값은 filled 버튼이 이 위에서 3:1을 유지하는 상한이다 — 더 밝히면 버튼이 묻힌다.
 */
const surfaceBg = 'light-dark(var(--mantine-color-gray-0), #21252A)';

/**
 * 차트 시리즈 순서 — 팔레트 순(무채색 제외). 스킴별 단계 전환은 global.css의 light-dark().
 * 시리즈가 8개 이상이면 색을 늘리지 말고 차트를 쪼갠다.
 */
export const CHART_PALETTES = ['navy', 'red', 'green', 'orange', 'teal', 'yellow', 'purple'] as const;
export const CHART_SERIES = CHART_PALETTES.map((_, i) => `var(--kqc-chart-${i + 1})`);

const brandFont = "NanumSquare, 'Pretendard Variable', Pretendard, -apple-system, sans-serif";
const bodyFont = "'Pretendard Variable', Pretendard, NanumSquare, -apple-system, sans-serif";
const monoFont = "'JetBrains Mono', 'D2Coding', monospace";

const kqcVariantColorResolver: VariantColorsResolver = (input) => {
  const defaults = defaultVariantColorsResolver(input);

  // 노랑은 밝아서 흰 라벨이 2.0:1까지 떨어진다 → 어두운 라벨로 뒤집고,
  // 밝은 면이 흰 배경에 묻히지 않게 보더를 붙인다.
  if (input.color === 'yellow' && input.variant === 'filled') {
    return {
      ...defaults,
      background: 'var(--mantine-color-yellow-4)',
      hover: 'var(--mantine-color-yellow-5)',
      color: 'var(--mantine-color-yellow-9)',
      border: `${rem(1)} solid var(--mantine-color-yellow-6)`,
    };
  }
  return defaults;
};

export const theme = createTheme({
  // `dark`는 Mantine이 다크 표면에 쓰는 예약 슬롯이다 — surface 램프로 덮어쓴다.
  colors: { gray, navy, red, orange, yellow, green, teal, purple, dark: surface },
  primaryColor: 'navy',
  primaryShade: { light: 7, dark: 6 },
  variantColorResolver: kqcVariantColorResolver,

  fontFamily: bodyFont,
  fontFamilyMonospace: monoFont,
  headings: {
    fontFamily: bodyFont,
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(38), lineHeight: '1.25' },
      h2: { fontSize: rem(30), lineHeight: '1.25' },
      h3: { fontSize: rem(24), lineHeight: '1.4' },
      h4: { fontSize: rem(20), lineHeight: '1.4' },
      h5: { fontSize: rem(16), lineHeight: '1.4' },
    },
  },
  fontSizes: {
    xs: rem(12), sm: rem(14), md: rem(16), lg: rem(18), xl: rem(20),
  },
  lineHeights: {
    xs: '1.5', sm: '1.5', md: '1.5', lg: '1.65', xl: '1.65',
  },

  spacing: {
    // md(20) = 컴포넌트 기준 단위 — 패딩·블록 간격·gap 전부 여기에 맞춘다.
    xs: rem(4), sm: rem(8), md: rem(20), lg: rem(24), xl: rem(32),
  },
  defaultRadius: 'sm',
  radius: {
    xs: rem(4),  // 보정용
    sm: rem(6),  // control (버튼·인풋)
    md: rem(8),  // image
    lg: rem(12), // card
    xl: rem(16), // modal
  },
  shadows: {
    xs: '0 1px 2px rgba(27,36,48,0.06)',
    sm: '0 2px 8px rgba(27,36,48,0.08)',
    md: '0 8px 24px rgba(27,36,48,0.12)',
    lg: '0 16px 48px rgba(1,33,105,0.16)',
    xl: '0 16px 48px rgba(1,33,105,0.16)',
  },
  breakpoints: {
    xs: '480px', sm: '768px', md: '1024px', lg: '1280px', xl: '1440px',
  },

  components: {
    Button: {
      defaultProps: { radius: 'sm', size: 'sm' },
      // lg(48)는 모바일 터치 타겟 44px을 충족시키는 크기다
      vars: (_theme: MantineTheme, props: { size?: string }) => {
        const heights: Record<string, number> = { sm: 32, md: 40, lg: 48 };
        const paddings: Record<string, number> = { sm: 12, md: 16, lg: 20 };
        const h = heights[props.size as string];
        if (!h) return { root: {} };
        return {
          root: {
            '--button-height': rem(h),
            '--button-padding-x': rem(paddings[props.size as string]),
          },
        };
      },
    },
    Group: { defaultProps: { gap: 'sm' } },
    Stack: { defaultProps: { gap: 'md' } },
    InputWrapper: {
      styles: {
        label: { marginBottom: rem(8) },
        description: { marginTop: rem(-4), marginBottom: rem(8) },
        error: { marginTop: rem(4) },
      },
    },
    // filled variant는 보더가 transparent다. 배경은 Mantine 기본(gray.1)이 카드(gray.0)와
    // 구분되지 않아 한 단계 내렸다.
    Input: {
      vars: (_theme: MantineTheme, props: { size?: string }) => {
        const heights: Record<string, number> = { sm: 32, md: 40, lg: 48 };
        const bg = { '--input-bg': inputBg };
        const h = heights[props.size as string];
        if (!h) return { wrapper: bg };
        return { wrapper: { ...bg, '--input-height': rem(h) } };
      },
    },
    Anchor: { defaultProps: { c: 'navy', underline: 'hover' } }, // 인덱스 없이 → 스킴 자동 전환
    // 선택 시 체크 아이콘 없이 배경색으로만 구분. 아이콘 자리를 지우면서 선택/미선택 패딩도 맞춘다.
    Chip: {
      styles: { iconWrapper: { display: 'none' } },
      vars: () => ({ root: { '--chip-checked-padding': 'var(--chip-padding)' } }),
    },
    // 배경 없이 타이틀 색으로만 의미를 전달한다. -text는 스킴별로 대비가 맞는 단계다.
    Alert: {
      defaultProps: { variant: 'transparent' },
      styles: (_t: MantineTheme, props: { color?: string }) => ({
        title: {
          fontSize: rem(18),
          fontWeight: 700,
          color: `var(--mantine-color-${props.color ?? 'navy'}-text)`,
        },
        label: { display: 'flex', alignItems: 'center', gap: rem(6) },
      }),
    },
    Badge: { defaultProps: { color: 'navy', variant: 'light' } },
    // 도넛 모양 인디케이터 제거 → 꽉 찬 원
    Switch: { defaultProps: { withThumbIndicator: false } },
    // 점 3개. 순차 지연은 global.css (Mantine 기본은 1·3이 같이 움직인다)
    Loader: { defaultProps: { type: 'dots' }, classNames: { root: 'kqc-loader' } },
    Tooltip: { styles: { tooltip: { paddingInline: rem(12) } } },
    Notification: {
      defaultProps: { color: 'navy' },
      // Mantine 기본이 shadow.lg인데 우리 lg는 히어로 전용 토큰 → 알림엔 과함. sm으로 고정
      styles: { root: { boxShadow: 'var(--mantine-shadow-sm)' } },
    },
    Paper: { styles: { root: { '--paper-border-color': hairline } } },
    // 보더 없음이 기본 — 카드는 페이지보다 한 톤 어두운 배경으로만 구분한다(양쪽 스킴 동일 방향).
    // 다크에서 카드를 밝히면 primary 버튼이 카드 대비 3:1 아래로 떨어진다.
    // withBorder를 명시하면 hairline 색으로 그린다.
    Card: {
      defaultProps: { radius: 'lg', padding: 'md', withBorder: false },
      styles: {
        root: {
          '--paper-border-color': hairline,
          background: surfaceBg,
        },
      },
    },
    Table: { styles: { table: { '--table-border-color': hairline } } },
    Divider: { styles: { root: { '--divider-color': hairline } } },
    Modal: {
      defaultProps: { radius: 'xl', padding: rem(20), shadow: 'md', centered: true, zIndex: 400 },
      styles: {
        content: { background: surfaceBg },
        header: { background: surfaceBg, paddingBottom: rem(12), minHeight: 0 },
        // Mantine 기본은 16/400이라 필드 라벨(14/500)보다 약해 보인다
        title: { fontSize: rem(18), fontWeight: 700, lineHeight: 1.4 },
      },
    },
    TextInput: { defaultProps: { radius: 'sm', variant: 'filled' } },
    Textarea: { defaultProps: { radius: 'sm', variant: 'filled' } },
    NumberInput: { defaultProps: { radius: 'sm', variant: 'filled' } },
    Select: { defaultProps: { radius: 'sm', variant: 'filled', checkIconPosition: 'right' } },
    MultiSelect: { defaultProps: { radius: 'sm', variant: 'filled', checkIconPosition: 'right' } },
    // 콘텐츠 영역은 배경을 칠하지 않는다 — body 색이 그대로 비친다
    AppShell: {
      styles: {
        root: { '--app-shell-border-color': shellBorder },
        main: { display: 'flex', flexDirection: 'column' },
      },
    },
    NavLink: { defaultProps: { color: 'gray' } },
    // 배경·보더 규칙은 global.css (선택된 것만 배경을 갖게 하려면 상태 선택자가 필요)
    Pagination: {
      defaultProps: { size: 'sm', siblings: 1 },
      classNames: { control: 'kqc-pagination-control' },
    },
  },

  /* 라이트 스킴 고정 hex. 다크 대응 화면에서는 Mantine CSS 변수나 light-dark()만 쓸 것 */
  other: {
    text: { primary: gray[9], secondary: gray[6], muted: gray[4], brand: navy[9] },
    action: { primary: navy[7], primaryHover: navy[8], primaryDark: navy[6], primaryHoverDark: darkHover.navy },
    bg: { page: gray[0], surface: '#FFFFFF', subtle: gray[1], brandSubtle: navy[0] },
    border: { default: gray[2], strong: gray[3], focus: navy[7], focusDark: navy[6] },
    typography: {
      display: { fontFamily: brandFont, fontWeight: 800, fontSize: rem(48), lineHeight: 1.25, letterSpacing: '-0.02em' },
      overline: { fontFamily: bodyFont, fontWeight: 700, fontSize: rem(11), lineHeight: 1.4, letterSpacing: '0.06em', textTransform: 'uppercase' },
      code: { fontFamily: monoFont, fontSize: rem(14), lineHeight: 1.5 },
    },
    space: {
      stackSm: rem(8), stackMd: rem(20), stackLg: rem(24),
      sectionSm: rem(48), sectionLg: rem(80),
      insetControl: rem(12), insetCard: rem(20), insetModal: rem(20),
    },
    motion: {
      fast: '120ms', normal: '200ms', slow: '320ms',
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
    chart: {
      series: CHART_SERIES,
      grid: gray[2], axisText: gray[6],
    },
    zIndex: { dropdown: 100, sticky: 200, overlay: 300, modal: 400, toast: 500 },
  },
});

/**
 * Mantine의 예약 슬롯은 인덱스가 하드코딩돼 있어서 우리 램프를 끼우면 엉뚱한 단계를 집어간다.
 * 다크 `-filled-hover`는 오히려 어두워지고, `error`는 red.8, `success`는 teal.8,
 * `anchor`는 Mantine 기본 blue를 가리킨다. 팔레트를 추가하면 이 슬롯들을 다시 확인할 것.
 */
export const kqcCssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-error': red[7],
    '--mantine-color-success': green[7],
    '--mantine-color-anchor': navy[7],
  },
  dark: Object.fromEntries([
    ...Object.entries(darkHover).map(([name, v]) => [`--mantine-color-${name}-filled-hover`, v]),
    ...Object.entries(darkLight).flatMap(([name, [bg, hover]]) => [
      [`--mantine-color-${name}-light`, bg],
      [`--mantine-color-${name}-light-hover`, hover],
    ]),
    // 페이지는 카드보다 어둡게 — 카드는 버튼 대비 때문에 위로 못 올라간다
    ['--mantine-color-body', surface[8]],
    ['--mantine-color-error', red[4]],
    ['--mantine-color-success', green[4]],
    ['--mantine-color-anchor', navy[4]],
  ]),
});
