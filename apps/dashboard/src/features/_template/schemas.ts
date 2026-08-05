import { z } from 'zod';

/* 새 feature 틀 — 사용법은 이 폴더의 README.md
   복사 후 일괄 치환: Item → 엔티티명, item → 소문자명, /items → 실제 API 경로 */

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
export const ItemListSchema = z.array(ItemSchema);
export type Item = z.infer<typeof ItemSchema>;

export const ItemCreateSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
});
export type ItemCreateInput = z.infer<typeof ItemCreateSchema>;
