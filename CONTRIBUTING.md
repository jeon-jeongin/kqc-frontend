# CONTRIBUTING — KQC 디자인 시스템 기여 가이드

**디자인 시스템 자체를 고치는 사람**(사람·AI 공통)을 위한 문서다.
앱/화면을 만드는 사람은 [docs/FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md)를 본다.
규칙의 근거·세부 수치는 [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md)가 단일 출처이고, 이 문서는 "어디를 어떻게 고치는가"를 다룬다.

## 1. 구조 — 무엇이 어디에 사는가

```
kqc-design-system/
├─ docs/
│  ├─ DESIGN_PRINCIPLES.md  규칙의 단일 출처 (색 절제 §2, 타이포 §3, 간격 §4, 다크 §5, 접근성 §6)
│  ├─ PAGE_RECIPES.md       페이지 조립 레시피 (화면 만드는 사람용)
│  ├─ FRONTEND_GUIDE.md     앱 코드 규약 (화면 만드는 사람용)
│  └─ REFERENCE.md          TDS 매핑·MFE·데모 코스
├─ packages/
│  ├─ tokens/               @kqc/tokens — 값의 단일 출처
│  │  └─ kqc-design-tokens.json   브랜드 색·간격 원본 (Figma와 동기화)
│  ├─ ui/                   @kqc/ui — 팀이 사용하는 유일한 UI 패키지
│  │  └─ src/
│  │     ├─ index.ts        공개 출입구 — 여기 export된 것만 앱에서 사용 가능
│  │     ├─ theme.ts        심장부: 팔레트, 컴포넌트 기본값, 색 규칙 강제 로직
│  │     ├─ ThemeProvider.tsx
│  │     ├─ global.css      전역 접근성 (포커스 링 등)
│  │     ├─ fonts.css + fonts/   브랜드 폰트 (opt-in entry)
│  │     └─ components/     자체 래핑이 필요했던 것만 (TextButton 패턴)
│  └─ eslint-config/        @kqc/eslint-config — 규칙의 강제 장치 (@mantine/* 차단)
└─ apps/
   ├─ storybook/stories/    문서이자 회귀 테스트 — 컴포넌트당 1파일
   └─ dashboard/            참조 구현 (화면 코드의 표본)
```

계층은 한 방향으로 흐른다: **tokens(값) → theme.ts(규칙) → index.ts(공개) → 앱(사용)**.
Mantine v9은 @kqc/ui 내부에 격리되어 있다 — 서비스 코드는 Mantine의 존재를 몰라야 한다.

## 2. 절대 규칙 (사람·AI 공통)

| 규칙 | 근거 |
|---|---|
| 서비스 코드는 `@kqc/ui`에서만 import — `@mantine/*` 직접 import 금지 | @kqc/eslint-config가 차단 |
| 브랜드 원색 변조 금지: navy `#012169`(팔레트 index 9) | 가이드북 BS 07 |
| UI 색은 gray + navy + 기능색(red/yellow/green)만. 나머지 팔레트는 참고용 | §2 |
| raw hex·`gray.6` 같은 스킴 고정 색 금지 — 본문은 색 지정 없음, 보조는 `c="dimmed"`, 브랜드 텍스트·링크는 `c="navy"`(인덱스 없이), 배경은 `light-dark()` | §5 |
| 차트 시리즈 순서: `'navy'` → `'navy.2'` → `'gray.5'`. `navy.6`·`navy.7` 시리즈 금지 | §5-4 |
| 색은 이름만 — `color="red"`처럼. 인덱스를 박으면 다크에서 대비가 무너진다 | §5-2 |
| 간격은 별칭만: Group 기본 8 / Stack 기본 16 (theme이 강제) — 임의 px 지양 | §4 |

## 3. 디자인 시스템에 추가하기

**3단계 사다리 — 가장 낮은 단계에서 해결하고 멈춘다:**

1. **Mantine에 이미 있는가?** → [packages/ui/src/index.ts](packages/ui/src/index.ts)에 re-export 한 줄
2. **KQC 기본값(radius·색·간격)이 필요한가?** → [theme.ts](packages/ui/src/theme.ts)의 `components`에 `defaultProps`/`styles` (Card·Modal이 예시)
3. **자체 동작·API가 필요한가?** → 그때만 `components/`에 래핑 파일 ([TextButton.tsx](packages/ui/src/components/TextButton.tsx)가 본보기)

**마무리 (생략 불가):**
- `apps/storybook/stories/`에 스토리 추가 — 기존 Button.stories.tsx 구조(기본 + 규칙 설명 주석 + Variants 그룹)를 따른다
- `pnpm build` + `pnpm lint` 통과
- Storybook 툴바로 **Light/Dark 양쪽** 확인

### AI(Claude Code)에게 시키는 법

```
docs/DESIGN_PRINCIPLES.md 를 먼저 읽고, <컴포넌트명> 을 추가해줘.
1. Mantine v9 공식 문서에서 해당 컴포넌트 확인
2. 단순 re-export로 충분하면 src/index.ts 에만 추가,
   규칙이 필요하면 src/components/ 에 래핑 파일 생성 (Button.tsx 패턴)
3. 테마 기본값이 필요하면 theme.ts 의 components 에 추가 (화면 레벨 스타일 금지)
4. apps/storybook/stories 에 스토리 추가 — 기존 Button.stories.tsx 와 같은 구조
5. pnpm build 와 pnpm lint 로 검증
```

## 4. 토큰(값)을 수정할 때

색·간격 **값** 자체를 바꾸는 경우: 코드가 아니라 토큰이 출발점이다. 셋이 항상 함께 움직인다.

1. `packages/tokens/kqc-design-tokens.json` 수정
2. Figma Tokens Studio에서 같은 JSON import (또는 Git 동기화 설정)
3. `pnpm build` — CSS 변수와 @kqc/ui 재빌드
4. 색상/타이포 **정책** 변경이면 [docs/DESIGN_PRINCIPLES.md](docs/DESIGN_PRINCIPLES.md)도 함께 갱신

## 5. 배포 전 체크리스트

- [ ] `pnpm build` 성공 (tokens → ui → apps)
- [ ] `pnpm lint` 통과
- [ ] `pnpm --filter @kqc/storybook exec tsc --noEmit` 통과
- [ ] Storybook Light/Dark 양쪽에서 신규·수정 스토리 확인
- [ ] 규칙 변경이 있었다면 docs/DESIGN_PRINCIPLES.md 갱신
- [ ] `pnpm changeset`으로 변경 기록 (배포 파이프라인 가동 후)
