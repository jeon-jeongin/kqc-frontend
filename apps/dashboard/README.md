# @kqc/dashboard — 대시보드 (참조 구현)

디자인 시스템의 첫 소비 앱이자 참조 구현. 화면 코드가 어떻게 생겨야 하는지 보여주는 표본이다.
스택: Vite + React 19 + TypeScript.

**코드 규약(상태 관리·데이터 흐름·새 feature 절차)은 [docs/FRONTEND_GUIDE.md](../../docs/FRONTEND_GUIDE.md)** —
이 앱은 그 규약대로 작성되어 있다. 페이지 배치는 [docs/PAGE_RECIPES.md](../../docs/PAGE_RECIPES.md)의 유형 1·2·5 표본.

```bash
pnpm --filter @kqc/dashboard dev      # http://localhost:5173
pnpm --filter @kqc/dashboard build    # tsc --noEmit + vite build
pnpm --filter @kqc/dashboard lint
```

## 이 앱 고유의 것

- **mock 동작**: 백엔드 없이 동작한다. `src/mocks/db.ts`(인메모리, 300ms 지연)가 응답을 만들고,
  `.env`에 `VITE_API_URL=https://...` 한 줄을 추가하면 `lib/api.ts`가 자동으로 실제 fetch로 전환한다
- **화면 구성**: 대시보드(유형 1) · 작업 관리(유형 2) · 로그(유형 5) · 키 관리(유형 2 변형)
- 데모 데이터(양자컴퓨팅 운영 콘솔 컨셉)는 전부 mock — 실제 도메인으로 교체해도 구조는 그대로
