import {
  createTheme, rem, defaultVariantColorsResolver,
  type VariantColorsResolver, type MantineColorsTuple, type MantineTheme,
} from '@mantine/core';

/**
 * KQC 디자인 시스템 테마
 * 단일 소스: kqc-design-tokens.json / 사용 규칙: DESIGN_PRINCIPLES.md
 *
 * 컬러 정책
 * - primary = navy(#012169, index 7). 모든 기본 액션은 네이비.
 * - accent = orange(#EA733D, index 5). 화면당 핵심 CTA 1개 + 소면적 인디케이터만.
 */

const navy: MantineColorsTuple = [
  '#E9EEF9', '#C7D3EE', '#A2B5E0', '#7B95CF', '#5476BD',
  '#2F53A3', '#123A85', '#012169', '#011A54', '#011240',
];
const accent: MantineColorsTuple = [
  '#FDF1EA', '#F9DAC8', '#F4BFA0', '#F0A377', '#ED8B57',
  '#EA733D', '#D05F2B', '#AC4C20', '#863A17', '#5E280F',
];
const gray: MantineColorsTuple = [
  '#F8F9FB', '#F1F3F6', '#E4E8EE', '#CFD6DE', '#AAB4C0',
  '#8593A3', '#64748B', '#475569', '#2E3A4A', '#1B2430',
];

const brandFont = "NanumSquare, 'Pretendard Variable', Pretendard, -apple-system, sans-serif";
const bodyFont = "'Pretendard Variable', Pretendard, NanumSquare, -apple-system, sans-serif";
const monoFont = "'JetBrains Mono', 'D2Coding', monospace";

/**
 * accent(오렌지)는 primaryShade(7)가 아니라 브랜드 원색 index 5(#EA733D)를 쓰도록 강제.
 * 팀원이 color="accent"라고만 써도 항상 올바른 포인트 컬러가 보장된다.
 */
const kqcVariantColorResolver: VariantColorsResolver = (input) => {
  const defaults = defaultVariantColorsResolver(input);

  // 시맨틱 색(red=위험, green=성공)의 filled는 스킴과 무관하게 원색 유지.
  // primaryShade { dark: 4 }는 매우 어두운 navy(#012169)의 다크 가독성 보정일 뿐,
  // red/green까지 밝은 파스텔로 밀어 올릴 이유가 없다 (다크에서도 원색이 충분히 보임).
  if ((input.color === 'red' || input.color === 'green') && input.variant === 'filled') {
    return {
      ...defaults,
      background: `var(--mantine-color-${input.color}-7)`,
      hover: `var(--mantine-color-${input.color}-8)`,
      color: 'var(--mantine-color-white)',
    };
  }

  if (input.color === 'accent' || input.color === 'orange') {
    if (input.variant === 'filled') {
      return {
        ...defaults,
        background: 'var(--mantine-color-accent-5)', // #EA733D (PANTONE 4012C)
        hover: 'var(--mantine-color-accent-6)',      // #D05F2B = action.accentHover
        color: 'var(--mantine-color-white)',
      };
    }
    if (input.variant === 'light') {
      // 라이트=브랜드 accentSubtle(#FDF1EA) 고정 / 다크=Mantine 스킴 변수에 위임 (크림색 배경 고정 방지)
      return {
        ...defaults,
        background:
          'light-dark(var(--mantine-color-accent-0), var(--mantine-color-accent-light))',
        hover: 'light-dark(var(--mantine-color-accent-1), var(--mantine-color-accent-light-hover))',
        color: 'light-dark(var(--mantine-color-accent-8), var(--mantine-color-accent-light-color))',
      };
    }
  }
  return defaults;
};

export const theme = createTheme({
  colors: { navy, accent, gray },
  primaryColor: 'navy',
  primaryShade: { light: 7, dark: 4 }, // 라이트=원색 #012169 / 다크=#5476BD (다크 배경 대비 확보)
  variantColorResolver: kqcVariantColorResolver,

  /* ---------- 타이포그래피 (역할 기반) ---------- */
  fontFamily: bodyFont,
  fontFamilyMonospace: monoFont,
  // 제목도 Pretendard — 나눔스퀘어는 브랜딩(로고·히어로) 전용 (원칙 §3)
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

  /* ---------- 간격 · 형태 ---------- */
  spacing: {
    // Mantine 5키 = 자주 쓰는 별칭. 세부 값은 CSS 변수(tokens 빌드)로 보완.
    xs: rem(4), sm: rem(8), md: rem(16), lg: rem(24), xl: rem(32),
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

  /* ---------- 컴포넌트 기본값 ---------- */
  components: {
    Button: {
      defaultProps: { radius: 'sm' },
      // KQC 컨트롤 높이: sm 32 / md 40 / lg 48 (4px 그리드, lg는 터치 타겟 44px 충족)
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
    // ---- 간격 강제: 별칭 토큰을 컴포넌트 기본값으로 (원칙 §4) ----
    // Group(가로 나열: 버튼 그룹 등) 기본 gap = inlineSm(8)
    Group: { defaultProps: { gap: 'sm' } },
    // Stack(세로 나열: 폼 필드·카드 내부) 기본 gap = stackMd(16)
    Stack: { defaultProps: { gap: 'md' } },
    // 라벨↔인풋 = stackSm(8). description이 있으면 라벨-설명 4 / 설명-인풋 8로 배분.
    // 에러 메시지는 인풋 아래 inlineXs(4). TextInput/Select/NumberInput/Textarea 전체 공통.
    InputWrapper: {
      styles: {
        label: { marginBottom: rem(8) },
        description: { marginTop: rem(-4), marginBottom: rem(8) },
        error: { marginTop: rem(4) },
      },
    },
    // 모든 인풋류(TextInput/Select/NumberInput/Textarea 단일행 등) 공통 높이
    Input: {
      vars: (_theme: MantineTheme, props: { size?: string }) => {
        const heights: Record<string, number> = { sm: 32, md: 40, lg: 48 };
        const h = heights[props.size as string];
        if (!h) return { wrapper: {} };
        return { wrapper: { '--input-height': rem(h) } };
      },
    },
    Anchor: { defaultProps: { c: 'navy', underline: 'hover' } }, // 인덱스 없이 → 스킴 자동 전환
    Tabs: { defaultProps: { color: 'accent.5' } }, // 활성 인디케이터만 포인트
    Badge: { defaultProps: { color: 'navy', variant: 'light' } },
    Notification: {
      defaultProps: { color: 'navy' },
      // Mantine 기본이 shadow.lg인데 우리 lg는 히어로 전용 토큰 → 알림엔 과함. sm으로 고정
      styles: { root: { boxShadow: 'var(--mantine-shadow-sm)' } },
    },
    Card: { defaultProps: { radius: 'lg', padding: 'lg', withBorder: true, shadow: 'xs' } },
    Modal: {
      defaultProps: { radius: 'xl', padding: rem(24), shadow: 'md', centered: true, zIndex: 400 },
      styles: { header: { paddingBottom: rem(12), minHeight: 0 } },
    },
    TextInput: { defaultProps: { radius: 'sm' } },
    // 선택된 옵션 체크는 우측 끝 (라벨 정렬 유지)
    Select: { defaultProps: { radius: 'sm', checkIconPosition: 'right' } },
    MultiSelect: { defaultProps: { radius: 'sm', checkIconPosition: 'right' } },
    Title: { defaultProps: {} },
    // 사이드바 내비게이션: 활성 = navy light 배경 (accent 아님 — 원칙 §2)
    NavLink: { defaultProps: { color: 'navy' } },
    Pagination: { defaultProps: { size: 'sm', siblings: 1 } },
  },

  /* ---------- semantic 토큰 (커스텀 스타일 참조용) ----------
   * 주의: 아래 값은 라이트 스킴 고정 hex. 다크 대응 화면에서는
   * Mantine CSS 변수(--mantine-color-text, -dimmed, -body 등)나
   * light-dark() / c="navy" 방식만 사용할 것. */
  other: {
    text: { primary: gray[9], secondary: gray[6], muted: gray[4], brand: navy[7] },
    bg: {
      page: gray[0], surface: '#FFFFFF', subtle: gray[1],
      brandSubtle: navy[0], accentSubtle: accent[0],
    },
    border: { default: gray[2], strong: gray[3], focus: navy[5] },
    typography: {
      display: { fontFamily: brandFont, fontWeight: 800, fontSize: rem(48), lineHeight: 1.25, letterSpacing: '-0.02em' },
      overline: { fontFamily: bodyFont, fontWeight: 700, fontSize: rem(11), lineHeight: 1.4, letterSpacing: '0.06em', textTransform: 'uppercase' },
      code: { fontFamily: monoFont, fontSize: rem(14), lineHeight: 1.5 },
    },
    space: {
      stackSm: rem(8), stackMd: rem(16), stackLg: rem(24),
      sectionSm: rem(48), sectionLg: rem(80),
      insetControl: rem(12), insetCard: rem(24), insetModal: rem(24),
    },
    motion: {
      fast: '120ms', normal: '200ms', slow: '320ms',
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
    // 데이터 시각화: 시리즈는 이 순서대로만. 강조 시리즈(accent)는 차트당 1개 (원칙 §2)
    chart: {
      series: [navy[7], navy[4], gray[5], navy[2], gray[7]],
      accentSeries: accent[5],
      grid: gray[2], axisText: gray[6],
    },
    zIndex: { dropdown: 100, sticky: 200, overlay: 300, modal: 400, toast: 500 },
  },
});
