# @kqc/dashboard — 대시보드 (콘솔형)

디자인 시스템의 첫 소비 앱이자 참조 구현. 스택: Vite + React 19 + TypeScript.

```bash
pnpm --filter @kqc/dashboard dev      # http://localhost:5173
pnpm --filter @kqc/dashboard build    # tsc --noEmit + vite build
```

## 상태 관리 결정표 (어디에 두는가)

| 상태 종류 | 도구 | 위치 | 예시 |
|---|---|---|---|
| 서버 상태 (API 데이터) | TanStack Query | `features/*/queries.ts` | 작업 목록, 등록 |
| 클라이언트 전역 | Zustand | `stores/` | 사이드바 접힘 |
| 지역 상태 (한 화면) | useState / useReducer | 컴포넌트 안 | 목록 필터, 폼 입력 |
| 정적 전역값 (테마 등) | Context | Mantine ThemeProvider가 담당 | 컬러 스킴 (로케일 필요 시 같은 방식) |
| 검증 | zod | `features/*/schemas.ts` | API 응답·폼 입력 |

판단이 어려우면 위에서부터: **서버에서 온 데이터면 무조건 Query, 두 화면 이상이 쓰면 Zustand, 아니면 useState.**
서버 데이터를 Zustand에 복사하지 않는다 — 캐시·동기화는 Query의 일이다.

## 데이터 흐름

```
페이지 → useXxxQuery() → api(path, schema) → VITE_API_URL 있음? fetch : mock
                                              └→ zod schema.parse ← 응답은 여기를 통과해야만 앱에 들어옴
```

- 백엔드 연결: `.env`에 `VITE_API_URL=https://...` 한 줄 — mock이 자동으로 실제 fetch로 바뀐다
- mock은 `src/mocks/db.ts` (인메모리, 300ms 지연)

## 구조

```
src/
├─ main.tsx              진입: ThemeProvider + QueryClientProvider + Router
├─ app/                  앱 전역 설정 (queryClient, router)
├─ layouts/AppLayout.tsx AppShell 헤더+사이드바 (+다크 토글)
├─ pages/                라우트당 1파일 — 조립만 하고 로직은 features에
├─ features/tasks/       feature 단위: schemas(zod) + queries(Query) + 부속 컴포넌트
├─ stores/               Zustand (클라이언트 전역만)
├─ lib/api.ts            모든 통신의 단일 통로 (zod 검증 강제)
└─ mocks/                백엔드 전 더미
```

## 새 feature 추가 절차

**`src/features/_template/`을 복사해서 시작한다** — 컴파일되는 틀 + 페이지 조립 스니펫 +
체크리스트가 들어 있다 (사용법은 그 폴더의 README). 요약:

1. `_template` 복사 → 이름 치환 (`Item` → 엔티티명)
2. `schemas.ts` 필드를 실제 API에 맞게 수정 (스키마 = API 계약)
3. `mocks/db.ts`에 mock 응답 추가
4. `pages/`에서 훅 호출해 조립 — UI는 반드시 `@kqc/ui`에서만 import
5. 화면 규칙은 [DESIGN_PRINCIPLES.md](../../DESIGN_PRINCIPLES.md) §7(콘솔 패턴)·§2(오렌지 절제)·§5(다크)
