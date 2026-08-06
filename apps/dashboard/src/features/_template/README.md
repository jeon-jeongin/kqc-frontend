# feature 틀 — 복사해서 시작

이 폴더가 새 feature의 표준 형태다. [features/tasks](../tasks/) + [TasksPage.tsx](../../pages/TasksPage.tsx)가 이 틀로 만든 실제 예시.

## 파일 역할

| 파일 | 역할 | 제공하는 것 |
|---|---|---|
| `schemas.ts` | **API 계약** (zod) | `ItemSchema`(응답 형태) · `ItemCreateSchema`/`ItemUpdateSchema`(입력 검증 + 에러 메시지) |
| `queries.ts` | **서버 상태** (TanStack Query) | `useItemsQuery`(목록) · `useItemQuery`(상세) · `useCreateItemMutation` · `useUpdateItemMutation` · `useDeleteItemMutation` |
| 부속 컴포넌트 | 이 feature 전용 UI | `tasks/StatusBadge.tsx`처럼 필요할 때만 추가 |

서버 통신은 전부 `queries.ts` → [lib/api.ts](../../lib/api.ts)를 지난다.
응답이 `schemas.ts`를 통과하지 못하면 그 자리에서 에러 — **스키마가 곧 API 계약**인 이유.

## 사용 절차

1. **폴더 복사**: `_template` → `features/<이름>` (예: `reports`)
2. **일괄 치환** (Ctrl+H): `Item` → `Report`, `item` → `report`, `/items` → `/reports`
3. **API 응답 맞추기**: `schemas.ts`의 필드를 실제 API에 맞게 수정
4. **Mock 추가**: `src/mocks/db.ts`의 `mockFetch`에 분기 추가 (백엔드가 이미 있으면 생략)
   ```ts
   if (path === '/reports' && method === 'GET') return [...reports];
   if (path === '/reports' && method === 'POST') { /* tasks POST 분기 참고 */ }
   ```
5. **페이지 조립**: 아래 스니펫 참고. 배치 유형은 [PAGE_RECIPES.md](../../../../../docs/PAGE_RECIPES.md)에서 먼저 고른다

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

전체 흐름(모달 열기·닫기 포함)은 [TasksPage.tsx](../../pages/TasksPage.tsx)의 `CreateTaskModal`이 실제 예시.

## 페이지 조립 — 수정 · 삭제

```tsx
// 훅은 목록 레벨에서 한 번만 — id는 mutate 인자로 넘긴다
const updateItem = useUpdateItemMutation();
const deleteItem = useDeleteItemMutation();

updateItem.mutate({ id: item.id, name: '새 이름' });  // PATCH /items/:id
deleteItem.mutate(item.id);                           // DELETE /items/:id — 성공 시 목록 자동 갱신
```

mutation 성공 시 `itemKeys.all`이 무효화되어 목록·상세가 자동으로 다시 로드된다 — 수동 갱신 코드를 쓰지 않는다.

## 상태를 어디에 둘지

| 이 데이터는… | 도구 |
|---|---|
| 서버에서 왔다 | 이 폴더의 queries.ts (Zustand에 복사 금지) |
| 두 화면 이상이 쓴다 | `stores/`에 Zustand 스토어 추가 (stores/ui.ts 형태) |
| 이 화면만 쓴다 | 컴포넌트 안 useState |

## 체크리스트

- [ ] UI는 `@kqc/ui`에서만, 아이콘은 `@kqc/ui/icons`에서만 import
- [ ] api() 밖에서 fetch/axios 직접 호출 금지
- [ ] 쿼리 키는 queries.ts의 `xxxKeys` 외 임의 문자열 금지
- [ ] 색·간격은 DESIGN_PRINCIPLES §2·§5·§7 준수 (기본은 색 지정 안 함)
