# feature 틀 — 복사해서 시작

이 폴더가 새 feature의 표준 형태다. `features/tasks/`가 이 틀로 만든 실제 예시.

## 사용법

1. 폴더 복사: `_template` → `features/<이름>` (예: `reports`)
2. 파일 안에서 일괄 치환: `Item` → `Report`, `item` → `report`, `/items` → `/reports`
3. `schemas.ts`의 필드를 실제 API 응답에 맞게 수정 — **스키마가 곧 API 계약**
4. `src/mocks/db.ts`에 mock 응답 추가 (백엔드가 이미 있으면 생략)
5. 페이지에서 조립 (아래 스니펫)

## 페이지 조립 — 조회

```tsx
import { useItemsQuery } from '../features/items/queries';

function ItemsPage() {
  const { data, isPending } = useItemsQuery();
  if (isPending) return <Skeleton h={240} />;
  return <>{data.map((item) => /* ... */)}</>;
}
```

## 페이지 조립 — 등록 폼 (zod 검증 → mutation)

```tsx
const createItem = useCreateItemMutation();
const [name, setName] = useState('');                 // 폼 입력 = 지역 상태
const [errors, setErrors] = useState<{ name?: string }>({});

const submit = () => {
  const parsed = ItemCreateSchema.safeParse({ name });
  if (!parsed.success) {
    const fieldErrors: typeof errors = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as 'name'] ??= issue.message;
    }
    setErrors(fieldErrors);
    return;
  }
  setErrors({});
  createItem.mutate(parsed.data, { onSuccess: () => setName('') });
};
// <TextInput error={errors.name} /> · <Button loading={createItem.isPending} />
```

## 상태를 어디에 둘지

| 이 데이터는… | 도구 |
|---|---|
| 서버에서 왔다 | 이 폴더의 queries.ts (Zustand에 복사 금지) |
| 두 화면 이상이 쓴다 | `stores/`에 Zustand 스토어 추가 (stores/ui.ts 형태) |
| 이 화면만 쓴다 | 컴포넌트 안 useState |

## 체크리스트

- [ ] UI는 `@kqc/ui`에서만 import
- [ ] api() 밖에서 fetch/axios 직접 호출 금지
- [ ] 쿼리 키는 queries.ts의 `xxxKeys` 외 임의 문자열 금지
- [ ] 색·간격은 DESIGN_PRINCIPLES §2·§5·§7 준수 (기본은 색 지정 안 함)
