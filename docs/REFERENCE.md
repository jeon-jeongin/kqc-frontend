# REFERENCE — 참고자료

자주 보는 문서가 아니라, 필요할 때 찾아오는 자료 모음.
규칙의 근거는 [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md), 화면 조립은 [PAGE_RECIPES.md](PAGE_RECIPES.md).

## TDS 컴포넌트 매핑 (참고: tossmini-docs.toss.im/tds-mobile)

문서 구성 방식(크기 → variant → 상태)만 차용. 색·수치는 KQC 토큰 기준.

| TDS | KQC (@kqc/ui) | 비고 |
|---|---|---|
| Button / Text Button / Icon Button | Button / TextButton / ActionIcon | TextButton은 자체 래핑 |
| TextField / TextArea / Search Field | TextInput / Textarea / TextInput+leftSection | Search는 조합 패턴 |
| Checkbox / Switch / Segmented Control / Slider | 동일 이름 | |
| Numeric Spinner / Stepper | NumberInput | |
| Progress Bar / Progress Stepper | Progress / Stepper | |
| Tab / Badge / Tooltip / Skeleton / Loader | Tabs / 동일 이름 | |
| Modal / Dialog / Bottom Sheet | Modal / Drawer(position="bottom") | |
| Toast | Notification | 실제 앱은 @mantine/notifications |
| Table Row / Menu / Rating | Table / Menu / Rating | |
| Keypad·Agreement·Asset·BottomCTA·Board Row·Bubble·Post·Result·Top·Grid List | 제외 | 토스 앱 전용 패턴 |

## MFE(module federation) 설정

- shared에 `@kqc/ui`를 **singleton**으로 선언
- `@mantine/*`은 shared에 넣지 않음 (@kqc/ui 안에 격리되어 있음)
- ThemeProvider는 셸에서 1회, 리모트 앱은 컴포넌트만 import

## 팀 공유 데모 (15분 코스)

1. **Foundations** — 팔레트·타이포 전체 (세부 근거는 DESIGN_PRINCIPLES.md)
2. **Patterns/AppShell** — 앱 공통 레이아웃, 실전 화면은 apps/dashboard 참고
3. 개발자 온보딩은 한 줄: `import { Button } from '@kqc/ui'` — `@mantine/*` 직접 import는 ESLint가 차단
