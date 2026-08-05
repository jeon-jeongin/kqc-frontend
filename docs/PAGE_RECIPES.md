# PAGE RECIPES — 페이지 조립 레시피

디자인하지 말고 **조립**하라. 색·폰트 크기·간격·radius·그림자는 테마가 이미 정했다 —
팀원이 정할 것은 "어느 레시피인가"뿐이다. 우리 화면은 아래 5가지 유형으로 전부 커버된다.
(근거 규칙은 [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md), 데이터 연결은 [features/_template](../apps/dashboard/src/features/_template/))

## 모든 페이지의 공통 골격

```tsx
<Stack gap="md">                      {/* 페이지 = 항상 Stack gap="md" (16px) */}
  <Title order={3}>페이지 이름</Title>  {/* 페이지 제목 = 항상 h3, 하나만 */}
  {/* ...내용 블록들... */}
</Stack>
```

- 나란히 배치 = `<Group gap="md" align="stretch">` + 각 `<Card flex={1}>` — 이게 그리드의 전부
  (카드 그리드는 가로·세로 모두 16px — 스페이싱 스케일 밖 임의 값은 쓰지 않는다)
- 카드 안 제목 = `<Text fw={700}>`, 보조 설명 = `<Text size="xs" c="dimmed">`
- 화면 우상단 액션 = 페이지 제목과 `<Group justify="space-between">`로 묶는다
- 로딩 = `<Skeleton h={...} />` (스피너 지양)

## 유형 1 — 현황판 (Dashboard)

```
┌ 제목+인사 ──────────────── [기간 선택] ┐
│ [stat] [stat] [stat] [stat]           │   숫자 fw 800 navy · 증감 ▲green/▼red + dimmed 캡션
│ ┌ 대형 차트 (flex 2) ┐ ┌ 도넛+미니표 ┐ │   차트 시리즈 'navy'→'navy.2'
│ ┌ 최근 목록 카드 + "전체 보기" ───────┐ │
└───────────────────────────────────────┘
```
표본: [DashboardPage.tsx](../apps/dashboard/src/pages/DashboardPage.tsx) — 트렌드 StatCard 포함. 통째로 복사해서 시작.
차트 스타일(목표 기준선 = accent, 차트당 1개)은 Storybook `Components/Charts` 참고.

## 유형 2 — 목록 + 액션 (Table)

```
┌ 제목 + 요약 캡션 ──────── [주요 액션 버튼] ┐   등록/생성 = Modal (zod 폼)
│ ┌ 카드: TableToolbar (필터 좌 / 검색 우) ┐ │   상태 = Badge (navy/green/red, 경고 yellow)
│ │  전체 폭 테이블 (highlightOnHover)    │ │
│ │  TablePagination (총 건수 / 페이지)   │ │
└───────────────────────────────────────────┘
```
**필터·페이지네이션은 반드시 @kqc/ui 표준 조합으로** — `TableToolbar` + `usePagedList` + `TablePagination`.
필터 위젯 선택 기준: 상태 3~5개 고정 → SegmentedControl / 옵션 6개↑·가변 → Select /
다중 선택(옵션 소수·고정) → Chip.Group / 다중 선택(옵션 많거나 가변) → MultiSelect(검색해 넣고 X로 제거) /
자유 입력 태그 → TagsInput / 기간 → DatePickerInput type="range" / 텍스트 → TextInput(검색, 항상 우측).
**필터가 4개를 넘으면** 주 필터 1~2개만 노출하고 나머지는 "필터" 버튼 → Modal —
적용된 조건은 툴바에 Chip으로 항상 표시하고 개별 해제 가능하게 (전체 초기화 강요 금지).
페이지 크기는 10 기본, 선택지 [10/20/50] — `TablePagination`에 pageSize를 넘기면 "N개씩" 선택이 붙는다.
데모: Storybook `Patterns/테이블 필터·페이지네이션`.

표본: [TasksPage.tsx](../apps/dashboard/src/pages/TasksPage.tsx) — 필터·검색·페이지네이션 + Modal 등록.
변형(목록 + 사이드 분포 카드): [KeysPage.tsx](../apps/dashboard/src/pages/KeysPage.tsx),
다중 Chip 필터: [LogsPage.tsx](../apps/dashboard/src/pages/LogsPage.tsx).

## 유형 3 — 설정 (콘솔 §7)

```
┌ 제목 ────────────┐
│ 섹션 h4 (중요도순) │   행 = 설명 좌측 / 컨트롤 우측
│ ┌ Card ────────┐ │   컨트롤 3종만: 토글 · 동작 버튼(Show/Export) · 드롭박스
│ │ 라벨·설명  [⚙] │ │
└──────────────────┘
```
표본: Storybook `Patterns/설정 화면` (`SettingRow`/`Section` 복사).

## 유형 4 — 등록/상세 폼

- 필드 3개 이하 → 목록 옆 카드(유형 2의 폼 카드) 또는 Modal
- 필드 4개 이상 → 별도 페이지: `<Card maw={640}>` 안에 `<Stack gap="md">`로 필드 나열
- 버튼은 우하단 `<Group justify="flex-end">`: 취소(subtle gray) + 확인(기본 navy)
- 파괴적 확인은 `color="red"` — 오렌지 아님
- 검증은 zod `safeParse` → `error` prop ([_template README](../apps/dashboard/src/features/_template/README.md)의 폼 스니펫)

## 유형 5 — 로그/이벤트 뷰어 (New Relic 스타일)

```
┌ 제목 + 기간 ─────────── [레벨 필터] ┐
│ ┌ 발생 추이 카드 (미니 히스토그램) ┐ │   피크만 navy, 나머지 gray — light-dark()
│ ┌ 필터 칩 + 촘촘한 테이블 ───────┐ │   시각 2줄(날짜/시간 mono) · 레벨 Badge · 호스트 Anchor
└─────────────────────────────────┘     WARN=yellow (오렌지는 CTA 전용 §2)
```
표본: [LogsPage.tsx](../apps/dashboard/src/pages/LogsPage.tsx) — `VolumeTimeline`(div 히스토그램)·`LevelBadge` 포함.

## 팀원이 정하지 않는 것 (이미 정해져 있음)

| 항목 | 이미 정해진 값 |
|---|---|
| 색 | 지정 안 하면 navy. 상태는 Badge 3색. 오렌지는 화면당 CTA 1개 |
| 글자 크기 | 역할 5개 고정: 페이지 제목 24(h3) · 디스플레이 숫자 20(xl fw800) · 카드 제목 16(fw700) · 본문 14(sm) · 캡션 12(xs dimmed). 설정류 콘텐츠 화면은 3개(제목/본문/캡션)로 충분 |
| 간격 | Stack 16 · Group 8 · 페이지 블록 lg(24) — 임의 px 금지 |
| 카드·모달 모양 | radius·패딩·그림자 = 테마 기본값 그대로 |
| 다크 모드 | 규칙만 지키면 자동 (§5) |

## 완성 전 30초 점검 — "어딘가 어색하다" 싶을 때

1. 임의 px 간격을 준 곳이 있나 → 지우고 기본값
2. 한 화면에 글자 크기가 4개 이상인가 → 3개로
3. 오렌지가 2곳 이상인가 → 1곳만
4. 색 지정을 굳이 한 곳이 있나 → 지워보면 대부분 나아진다
5. 정렬 축이 흔들리나 → 모든 블록이 같은 좌측선에서 시작하는지
6. 그래도 어색하면 → 같은 유형의 레퍼런스(§7: Claude 콘솔, GitHub Settings)에서 같은 화면을 찾아 배치만 따라 한다

## 레퍼런스를 카탈로그로 쓰는 법

새 화면 요구가 오면 창작하지 말고, 검증된 레퍼런스 사이트의 사이드바를 눌러 보며
"우리에게 필요한 화면"을 고르고 → 우리 유형으로 번역한다. 실제 번역 사례:

| 레퍼런스 화면 ([mantine-analytics-dashboard](https://mantine-analytics-dashboard.netlify.app/dashboard/default) 등) | 우리 유형 | 결과물 |
|---|---|---|
| Default dashboard | 유형 1 | 대시보드 |
| Orders / Customers 류 목록 | 유형 2 | 작업 관리 |
| File manager | 유형 2 변형 | **키 관리** (파일→HSM 키로 도메인만 교체) |
| Settings | 유형 3 | Patterns/설정 화면 |
| New Relic Logs | 유형 5 | 로그 |

번역 규칙: **구조(배치)만 가져오고 색·간격·타이포는 우리 시스템 그대로.**
레퍼런스의 색 수가 우리 규칙(§2)보다 많으면 줄이는 쪽이 항상 맞다.
새 유형이 탄생하면 이 문서에 유형 N으로 등록해 다음 사람의 카탈로그를 넓힌다.

## AI에게 시키는 법

> "PAGE_RECIPES.md의 유형 2(목록+액션)로 '멤버 관리' 페이지를 만들어줘.
> 데이터는 features/_template 복사해서 members feature로."

레퍼런스 화면을 옮길 때는:

> "이 스크린샷(또는 링크)을 유형 2 변형으로 번역해줘 — 구조만 가져오고
> 색·간격은 우리 시스템 기본값. 완성되면 PAGE_RECIPES에 등록해줘."

유형 번호 + 표본 파일만 지목하면 통일성은 자동으로 따라온다.
