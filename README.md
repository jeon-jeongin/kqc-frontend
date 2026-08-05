# KQC Design System

KQC 브랜드 가이드(Main #012169 / Point #EA733D)를 단일 소스로 하는 React 디자인 시스템 모노레포.

## 구조

```
packages/tokens    @kqc/tokens — 디자인 토큰 단일 소스 (Figma variables와 동기화)
packages/ui        @kqc/ui — Mantine v9 래핑 + KQC 테마 (Mantine은 내부 dependency로 격리)
apps/storybook     플레이그라운드 + 문서
apps/dashboard     대시보드 앱 — 첫 소비 앱이자 참조 구현 (Query+Zustand+zod, 상세는 자체 README)
DESIGN_PRINCIPLES.md   사용 규칙 (포인트 컬러 절제, 타이포 역할, 간격 별칭)
CONTRIBUTING.md        기여·커스텀 가이드 (사람·AI 공통 — 추가/수정 전 필독)
PAGE_RECIPES.md        페이지 조립 레시피 — 화면 4유형 + 표본 코드 (팀원은 이것만 봐도 됨)
```

## 시작하기

```bash
corepack enable          # pnpm 활성화 (Node 18+)
pnpm install
pnpm build               # tokens -> ui 순서로 빌드 (Turborepo가 의존 순서 처리)
pnpm storybook           # http://localhost:6006
```

## 서비스에서 사용하기

```tsx
// 앱 최상단 (MFE라면 app-shell에서 한 번만)
import { ThemeProvider } from '@kqc/ui';
import '@kqc/ui/styles.css';
import '@kqc/ui/fonts.css';

<ThemeProvider>
  <App />
</ThemeProvider>

// 화면 코드 — 반드시 @kqc/ui에서만 import
import { Button, TextInput, Card } from '@kqc/ui';
```

폰트 구성: NanumSquare(제목·디스플레이, 가이드북 BS 10 지정서체, 패키지 번들) +
Pretendard Variable(본문, dynamic subset — 쓰인 글자 조각만 다운로드).

**금지:** 서비스 코드에서 `@mantine/*` 직접 import. ESLint에 다음 규칙을 추가하세요:

```json
"no-restricted-imports": ["error", { "patterns": [{
  "group": ["@mantine/*"],
  "message": "@kqc/ui 를 통해서만 사용하세요"
}]}]
```

## MFE(module federation) 설정

- shared에 `@kqc/ui`를 **singleton**으로 선언
- `@mantine/*`은 shared에 넣지 않음 (@kqc/ui 안에 격리되어 있음)
- ThemeProvider는 셸에서 1회, 리모트 앱은 컴포넌트만 import

## 컴포넌트 추가 절차 (Claude Code용)

새 컴포넌트가 필요하면 Claude Code에 아래 프롬프트를 사용:

```
DESIGN_PRINCIPLES.md 를 먼저 읽고, <컴포넌트명> 을 추가해줘.
1. Mantine v9 공식 문서에서 해당 컴포넌트 확인
2. 단순 re-export로 충분하면 src/index.ts 에만 추가,
   규칙이 필요하면 src/components/ 에 래핑 파일 생성 (Button.tsx 패턴)
3. 테마 기본값이 필요하면 theme.ts 의 components 에 추가 (화면 레벨 스타일 금지)
4. apps/storybook/stories 에 스토리 추가 — 기존 Button.stories.tsx 와 같은 구조:
   기본 스토리 + 규칙 설명 주석 + Variants 그룹
5. pnpm build 로 검증
```

## 배포 (사내 레지스트리)

1. `.npmrc` 의 GitHub Packages 설정 주석 해제, 조직명 교체
2. 변경 후 `pnpm changeset` 으로 changelog 작성 → PR
3. main 병합 시 Changesets GitHub Action이 Release PR 생성 → 병합하면 배포
   (`.github/workflows/release.yml` 은 팀 CI 정책에 맞게 추가)

## 토큰 수정 시 (중요)

1. `packages/tokens/kqc-design-tokens.json` 수정
2. Figma Tokens Studio에서 같은 JSON import (또는 Git 동기화 설정)
3. `pnpm build` — CSS 변수와 @kqc/ui 재빌드
4. 색상/타이포 정책 변경이면 DESIGN_PRINCIPLES.md 도 함께 갱신

## 팀 공유 데모 (15분 코스)

1. **Guide/컬러 규칙 Do·Don't** — 기억할 규칙은 하나: **오렌지는 화면당 핵심 CTA 1개**
2. **Foundations** — 팔레트·타이포 전체 (세부 근거는 DESIGN_PRINCIPLES.md)
3. **Patterns/AppShell** — 앱 공통 레이아웃, 실전 화면은 apps/dashboard 참고
4. 개발자 온보딩은 한 줄: `import { Button } from '@kqc/ui'` — `@mantine/*` 직접 import 금지

## 변경 이력 메모

- theme.ts: `variantColorResolver` 추가 — `color="accent"`가 항상 브랜드 원색 #EA733D(index 5)로 렌더되도록 강제 (primaryShade 7이 accent에 잘못 적용되던 문제 수정)
- global.css: 포커스 링 navy.500 2px (원칙 §5), prefers-reduced-motion 대응 — styles.css에 자동 포함

## TDS 컴포넌트 매핑 (참고: tossmini-docs.toss.im/tds-mobile)

문서 구성 방식(크기 → variant → 상태)만 차용. 색·수치는 KQC 토큰 기준.

| TDS | KQC (@kqc/ui) | 비고 |
|---|---|---|
| Button / Text Button / Icon Button | Button / TextButton / ActionIcon | TextButton은 자체 래핑 |
| TextField / TextArea / Search Field | TextInput / Textarea / TextInput+leftSection | Search는 조합 패턴 |
| Checkbox / Switch / Segmented Control / Slider | 동일 이름 | |
| Numeric Spinner / Stepper | NumberInput | |
| Progress Bar / Progress Stepper | Progress / Stepper | 현재 스텝 = accent (원칙 §2) |
| Tab / Badge / Tooltip / Skeleton / Loader | Tabs / 동일 이름 | |
| Modal / Dialog / Bottom Sheet | Modal / Drawer(position="bottom") | |
| Toast | Notification | 실제 앱은 @mantine/notifications |
| Table Row / Menu / Rating | Table / Menu / Rating | |
| Keypad·Agreement·Asset·BottomCTA·Board Row·Bubble·Post·Result·Top·Grid List | 제외 | 토스 앱 전용 패턴 |
