# KQC Design System

KQC 브랜드 가이드(Main #012169 / Point #EA733D)를 단일 소스로 하는 React 디자인 시스템 모노레포.

## 구조

```
packages/tokens         @kqc/tokens — 디자인 토큰 단일 소스 (Figma variables와 동기화)
packages/ui             @kqc/ui — Mantine v9 래핑 + KQC 테마 (Mantine은 내부에 격리)
packages/eslint-config  @kqc/eslint-config — 공통 ESLint (@mantine/* 직접 import 차단)
apps/storybook          UI 카탈로그 — 컴포넌트 사용법·규칙을 눈으로 확인 (전 직군용)
apps/dashboard          참조 구현 — 화면 코드를 어떻게 짜는지 보여주는 표본 (개발자용)
docs/                   문서 (아래 안내판 참고)
```

## 시작하기

```bash
corepack enable          # pnpm 활성화 (Node 18+)
pnpm install
pnpm build               # tokens → ui → apps 순서로 빌드 (Turborepo가 의존 순서 처리)
pnpm storybook           # UI 카탈로그 http://localhost:6006
pnpm --filter @kqc/dashboard dev   # 참조 구현 http://localhost:5173
```

## 어떤 문서를 봐야 하나

| 하려는 일 | 문서 |
|---|---|
| 앱/화면을 개발한다 (코드 규약) | [docs/FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md) |
| 페이지를 조립한다 (유형별 레시피) | [docs/PAGE_RECIPES.md](docs/PAGE_RECIPES.md) |
| 규칙의 근거가 궁금하다 (색·타이포·간격·다크) | [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md) |
| 디자인 시스템에 컴포넌트를 추가·수정한다 | [CONTRIBUTING.md](CONTRIBUTING.md) |
| TDS 매핑·MFE·팀 데모 코스 | [docs/REFERENCE.md](docs/REFERENCE.md) |

컴포넌트가 어떻게 생겼는지는 문서가 아니라 **Storybook**에서 본다 (`pnpm storybook`).

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

`@mantine/*` 직접 import는 금지이며 ESLint가 차단한다. 앱의 `eslint.config.js`는 한 줄:

```js
export { default } from '@kqc/eslint-config';
```

폰트 구성: NanumSquare(브랜딩 전용, 가이드북 BS 10 지정서체, 패키지 번들) +
Pretendard Variable(제품 UI 전체, dynamic subset) + JetBrains Mono(코드·수치).

## 배포 (사내 레지스트리 — 조직 결정 후 가동)

1. `.npmrc`의 GitHub Packages 설정 주석 해제, 조직명 교체
2. 변경 후 `pnpm changeset`으로 changelog 작성 → PR
3. main 병합 시 Changesets GitHub Action이 Release PR 생성 → 병합하면 배포
   (`.github/workflows/release.yml`은 팀 CI 정책에 맞게 추가)
