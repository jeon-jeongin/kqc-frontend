# CONTRIBUTING — KQC 디자인 시스템 기여·사용 가이드

사람과 AI 공통 문서. 화면이나 컴포넌트를 만들기 전에 이 문서와 [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)를 먼저 읽는다.
규칙의 근거·세부 수치는 DESIGN_PRINCIPLES.md가 단일 출처이고, 이 문서는 "어디를 어떻게 고치는가"를 다룬다.

## 1. 구조 — 무엇이 어디에 사는가

```
kqc-design-system/
├─ DESIGN_PRINCIPLES.md     규칙의 단일 출처 (색 절제 §2, 타이포 §3, 간격 §4, 다크 §5, 접근성 §6)
├─ packages/
│  ├─ tokens/               @kqc/tokens — 값의 단일 출처
│  │  └─ kqc-design-tokens.json   브랜드 색·간격 원본 (Figma와 동기화)
│  └─ ui/                   @kqc/ui — 팀이 사용하는 유일한 패키지
│     └─ src/
│        ├─ index.ts        공개 출입구 — 여기 export된 것만 앱에서 사용 가능
│        ├─ theme.ts        심장부: 팔레트, 컴포넌트 기본값, 색 규칙 강제 로직
│        ├─ ThemeProvider.tsx
│        ├─ global.css      전역 접근성 (포커스 링 등)
│        ├─ fonts.css + fonts/   브랜드 폰트 (opt-in entry)
│        └─ components/     자체 래핑이 필요했던 것만 (TextButton 패턴)
└─ apps/
   └─ storybook/stories/    문서이자 회귀 테스트 — 컴포넌트당 1파일
```

계층은 한 방향으로 흐른다: **tokens(값) → theme.ts(규칙) → index.ts(공개) → 앱(사용)**.
Mantine v9은 @kqc/ui 내부에 격리되어 있다 — 서비스 코드는 Mantine의 존재를 몰라야 한다.

## 2. 절대 규칙 (사람·AI 공통)

| 규칙 | 근거 |
|---|---|
| 서비스 코드는 `@kqc/ui`에서만 import — `@mantine/*` 직접 import 금지 | README ESLint 규칙 |
| 브랜드 원색 변조 금지: navy `#012169`(팔레트 index 7), accent `#EA733D`(index 5) | 가이드북 BS 07·09 |
| 오렌지(accent)는 **화면당 핵심 CTA 1개** + 소면적 인디케이터만 | §2 |
| raw hex·`gray.6` 같은 스킴 고정 색 금지 — 본문은 색 지정 없음, 보조는 `c="dimmed"`, 브랜드 텍스트·링크는 `c="navy"`(인덱스 없이), 배경은 `light-dark()` | §5 |
| 차트 시리즈 순서: `'navy'` → `'navy.2'` → `'gray.5'`, 강조 `'accent.5'` 차트당 1개. `navy.4`·`navy.7` 시리즈 금지 | §5-4 |
| red/green filled는 양쪽 스킴 원색 유지 — `color="red"`만 쓰면 theme이 처리 | §5-8 |
| 간격은 별칭만: Group 기본 8 / Stack 기본 16 (theme이 강제) — 임의 px 지양 | §4 |

## 3. 디자인 시스템에 추가하기 (기여자)

**3단계 사다리 — 가장 낮은 단계에서 해결하고 멈춘다:**

1. **Mantine에 이미 있는가?** → [packages/ui/src/index.ts](packages/ui/src/index.ts)에 re-export 한 줄
2. **KQC 기본값(radius·색·간격)이 필요한가?** → [theme.ts](packages/ui/src/theme.ts)의 `components`에 `defaultProps`/`styles` (Card·Modal이 예시)
3. **자체 동작·API가 필요한가?** → 그때만 `components/`에 래핑 파일 ([TextButton.tsx](packages/ui/src/components/TextButton.tsx)가 본보기)

색·간격 **값** 자체를 바꾸는 경우: 코드가 아니라 `packages/tokens/kqc-design-tokens.json` 수정
→ theme.ts 반영 → DESIGN_PRINCIPLES.md 갱신. 셋이 항상 함께 움직인다.

**마무리 (생략 불가):**
- `apps/storybook/stories/`에 스토리 추가 — 기존 Button.stories.tsx 구조(기본 + Variants 그룹)를 따른다
- `pnpm build` 통과
- Storybook 툴바로 **Light/Dark 양쪽** 확인

## 4. 앱에서 커스텀하기 (소비자)

**사다리 — 위로 갈수록 마지막 수단:**

1. **prop으로 해결**: `size`, `variant`, `color` (대부분 여기서 끝)
2. **한 화면 한정**: `c`, `bg`, `p` 등 스타일 prop — 단 §2·§5 규칙 안에서
3. **같은 커스텀이 두 번째 반복되면**: 앱에 복붙하지 말고 디자인 시스템으로 올린다(3절의 2·3단계).
   *두 번 반복되면 그건 취향이 아니라 패턴이고, 패턴은 시스템 소관이다.*
4. **금지선**: `@mantine/*` 직접 import, 브랜드 원색 변조, `theme.other`의 hex를 다크 대응 화면에 사용

## 5. 화면 만들기 레시피 (AI 에이전트용)

새 화면 요청은 [PAGE_RECIPES.md](PAGE_RECIPES.md)의 유형(1~4)을 먼저 고르고, 그 표본 파일을 복사해 시작한다.
그 외 공통 순서:

```tsx
// 1. 앱 셸 (최상단 1회)
import { ThemeProvider } from '@kqc/ui';
import '@kqc/ui/styles.css';
import '@kqc/ui/fonts.css';

// 2. 화면 코드 — 항상 @kqc/ui에서만
import { Button, Card, Table, Badge, Text, Title, Group, Stack } from '@kqc/ui';
```

- **레이아웃**: 헤더+사이드바는 Storybook `Patterns/AppShell` 스토리를 그대로 이식
- **설정·콘솔 화면**: `Patterns/설정 화면` 스토리 이식 — 그루핑·글자 3크기·행 배치 규칙은 §7
- **색은 기본적으로 지정하지 않는다** — 버튼·링크·뱃지는 자동으로 navy. 보조 텍스트만 `c="dimmed"`,
  화면의 최우선 행동 1개만 `color="accent"`
- **다크 모드는 규칙을 따르면 공짜** — §5의 스킴-인지 참조만 쓰면 별도 다크 작업이 없다
- Card·Modal·Group·Stack은 테마 기본값에 이미 KQC 규칙이 들어 있으므로 그대로 쓴다
- 완성 기준: `pnpm build` 통과 + Light/Dark 스크린샷에서 깨지는 색 없음 + 화면당 오렌지 1개 확인

## 6. 배포 전 체크리스트

- [ ] `pnpm build` 성공 (tokens → ui → storybook)
- [ ] `pnpm --filter @kqc/storybook exec tsc --noEmit` 통과
- [ ] Storybook Light/Dark 양쪽에서 신규·수정 스토리 확인
- [ ] 규칙 변경이 있었다면 DESIGN_PRINCIPLES.md 갱신
- [ ] `pnpm changeset`으로 변경 기록 (배포 파이프라인 가동 후)
