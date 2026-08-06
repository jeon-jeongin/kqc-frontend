# FRONTEND GUIDE — 앱 개발 공통 규약

**앱/화면을 만드는 사람**을 위한 문서다. 페이지 배치는 [PAGE_RECIPES.md](PAGE_RECIPES.md),
규칙의 근거는 [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md), 참조 구현은 [apps/dashboard](../apps/dashboard/).

## 0. 강제 vs 자유 — 이 경계선이 전부다

**강제는 딱 3개.** 이 3개만 지키면 나머지는 자유롭게 개발한다.

| # | 규칙 | 강제 장치 |
|---|---|---|
| ① | UI는 `@kqc/ui`에서만 import — `@mantine/*` 직접 import 금지. 아이콘도 `@kqc/ui/icons`에서 ([tabler.io/icons](https://tabler.io/icons)에서 검색) | ESLint가 빌드에서 차단 |
| ② | 색 규칙: 색은 기본적으로 지정하지 않음 · 오렌지는 화면당 CTA 1개 · 스킴 고정 색 금지 | [DESIGN_PRINCIPLES §2·§5](DESIGN_PRINCIPLES.md) + 코드리뷰 |
| ③ | 서버 통신은 `api()` + zod 스키마 경계를 통해서만 (fetch/axios 직접 호출 금지) | 코드리뷰 |

**자유 영역**: 페이지 구성, 컴포넌트 조합, 지역 상태 설계, 비즈니스 로직, 새 feature 구조.
규칙에 없는 새로운 패턴이 필요하면 만들어 쓰고, **두 번 반복되면** 시스템에 올린다(아래 6절).
*틀은 확장 경로가 있을 때만 틀이 아니다 — 이 문서의 모든 규칙에는 확장 경로가 있다.*

## 1. 앱 표준 구조

```
src/
├─ main.tsx              진입: ThemeProvider + QueryClientProvider + Router
├─ app/                  앱 전역 설정 (queryClient, router)
├─ layouts/              AppShell 헤더+사이드바 (+다크 토글)
├─ pages/                라우트당 1파일 — 조립만 하고 로직은 features에
├─ features/<이름>/      feature 단위: schemas(zod) + queries(Query) + 부속 컴포넌트
│  └─ _template/         새 feature의 복사 원본
├─ stores/               Zustand (클라이언트 전역만)
├─ lib/api.ts            모든 통신의 단일 통로 (zod 검증 강제)
└─ mocks/                백엔드 전 더미
```

## 2. 상태 관리 결정표 (어디에 두는가)

| 상태 종류 | 도구 | 위치 | 예시 |
|---|---|---|---|
| 서버 상태 (API 데이터) | TanStack Query | `features/*/queries.ts` | 작업 목록, 등록 |
| 클라이언트 전역 | Zustand | `stores/` | 사이드바 접힘 |
| 지역 상태 (한 화면) | useState / useReducer | 컴포넌트 안 | 목록 필터, 폼 입력 |
| 정적 전역값 (테마 등) | Context | Mantine ThemeProvider가 담당 | 컬러 스킴 |
| 검증 | zod | `features/*/schemas.ts` | API 응답·폼 입력 |

판단이 어려우면 위에서부터: **서버에서 온 데이터면 무조건 Query, 두 화면 이상이 쓰면 Zustand, 아니면 useState.**
서버 데이터를 Zustand에 복사하지 않는다 — 캐시·동기화는 Query의 일이다.

## 3. 데이터 흐름 (강제 규칙 ③의 구체적 모습)

```
페이지 → useXxxQuery() → api(path, schema) → VITE_API_URL 있음? fetch : mock
                                              └→ zod schema.parse ← 응답은 여기를 통과해야만 앱에 들어옴
```

- 백엔드 연결: `.env`에 `VITE_API_URL=https://...` 한 줄 — mock이 자동으로 실제 fetch로 바뀐다
- 쿼리 키는 feature의 `queries.ts`에 정의된 `xxxKeys`만 사용 — 임의 문자열 금지

## 4. 새 feature 만들기

**`src/features/_template/`을 복사해서 시작한다.** 절차(복사 → 치환 → 스키마 → mock → 조립)와
CRUD·폼 스니펫은 [_template README](../apps/dashboard/src/features/_template/README.md)가 단일 출처다.
실제 예시는 [tasks feature](../apps/dashboard/src/features/tasks/) +
[TasksPage](../apps/dashboard/src/pages/TasksPage.tsx) (폼 검증·mutation은 `CreateTaskModal` 참고).
페이지 배치는 [PAGE_RECIPES.md](PAGE_RECIPES.md)의 유형(1~5)을 먼저 고른다.

## 5. 화면 만들기 순서

1. [PAGE_RECIPES.md](PAGE_RECIPES.md)에서 유형(1~5)을 고르고 표본 파일을 복사해 시작
2. 레이아웃(헤더+사이드바)은 Storybook `Patterns/AppShell`, 설정 화면은 `Patterns/설정 화면` 이식
3. **색은 기본적으로 지정하지 않는다** — 버튼·링크·뱃지는 자동으로 navy.
   보조 텍스트만 `c="dimmed"`, 화면의 최우선 행동 1개만 `color="accent"`
4. **다크 모드는 규칙을 따르면 공짜** — §5의 스킴-인지 참조만 쓰면 별도 다크 작업이 없다
5. Card·Modal·Group·Stack은 테마 기본값에 이미 KQC 규칙이 들어 있으므로 그대로 쓴다

## 6. 커스텀 사다리 — 위로 갈수록 마지막 수단

1. **prop으로 해결**: `size`, `variant`, `color` (대부분 여기서 끝)
2. **한 화면 한정**: `c`, `bg`, `p` 등 스타일 prop — 단 §2·§5 규칙 안에서
3. **같은 커스텀이 두 번째 반복되면**: 앱에 복붙하지 말고 디자인 시스템으로 올린다
   ([CONTRIBUTING.md](../CONTRIBUTING.md)의 3단계 사다리).
   *두 번 반복되면 그건 취향이 아니라 패턴이고, 패턴은 시스템 소관이다.*
4. **금지선**: `@mantine/*` 직접 import, 브랜드 원색 변조, `theme.other`의 hex를 다크 대응 화면에 사용

## 7. 새 앱 만들기 (frontend 등)

1. `apps/dashboard`를 `apps/<이름>`으로 복사
2. `package.json`의 name 변경 (`@kqc/<이름>`), 포트 변경
3. `src/pages/`·`src/features/`를 비우고 **`features/_template/`만 남긴다**
   (`layouts/AppLayout.tsx`의 NAV 배열도 빈 배열로)
4. `src/mocks/db.ts`는 빈 mockFetch로 초기화
5. `eslint.config.js`는 그대로 (한 줄: `export { default } from '@kqc/eslint-config';`)
6. 루트에서 `pnpm install` → `pnpm --filter @kqc/<이름> dev`

## 8. 완성 기준 (배포 전 셀프 체크)

- [ ] `pnpm build` + `pnpm lint` 통과
- [ ] Light/Dark 양쪽에서 깨지는 색 없음
- [ ] 화면당 오렌지 1개 이하
- [ ] 한 화면에 글자 크기 3~4개 이하, 임의 px 간격 없음 ([PAGE_RECIPES 30초 점검](PAGE_RECIPES.md))

## 9. Claude(AI)와 개발하기

핵심은 하나다: **참조 파일을 명시하면 Claude가 이 프로젝트의 패턴을 그대로 따른다.**
패턴을 매번 말로 설명하지 말고, 아래처럼 기준 파일을 지목한다.

### 새 feature 만들기

```
src/features/_template을 복사해서 reports feature를 만들어줘.
- schemas.ts 필드: { id, title, author, createdAt }, API 경로는 /reports
- src/mocks/db.ts의 mockFetch에 mock 분기도 추가 (tasks 분기 참고)
- docs/FRONTEND_GUIDE.md의 강제 3규칙 준수
```

### 새 페이지 만들기 (목록 화면)

```
ReportsPage를 만들어줘.
- src/pages/TasksPage.tsx와 같은 구조 (TableToolbar + Table + TablePagination)
- features/reports의 훅 사용, 직접 fetch 금지
- src/app/router.tsx와 layouts/AppLayout.tsx의 NAV에도 등록
```

### 등록 폼 추가

```
ReportsPage에 등록 모달을 추가해줘.
src/pages/TasksPage.tsx의 CreateTaskModal 패턴을 따라
(useState + zod safeParse + mutation, 에러는 필드별 표시).
```

### 검수 요령

Claude가 만든 코드도 사람이 쓴 코드와 같은 기준으로 본다 —
**강제 3규칙(§0)과 §8 완성 기준 체크리스트를 그대로 적용**하고, `pnpm build`가 통과하는지 확인하면 끝.
