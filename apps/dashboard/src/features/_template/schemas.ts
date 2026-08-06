import { z } from 'zod';

/**
 * 새 feature 틀 — 복사 후 일괄 치환:
 * Item → 엔티티명, item → 소문자명, /items → API 경로
 * README.md 참고
 */

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

// 수정 입력이 등록과 달라지는 시점에 별도 z.object로 분리
export const ItemUpdateSchema = ItemCreateSchema;
export type ItemUpdateInput = z.infer<typeof ItemUpdateSchema>;
