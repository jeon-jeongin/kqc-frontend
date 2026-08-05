import { z } from 'zod';

export const KEY_TYPES = ['RSA-2048', 'AES-256', 'ECDSA-P256'] as const;
export const KEY_STATUSES = ['활성', '만료 예정', '폐기'] as const;

export const HsmKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(KEY_TYPES),
  status: z.enum(KEY_STATUSES),
  created: z.string(),
  expires: z.string(),
});
export const HsmKeyListSchema = z.array(HsmKeySchema);

export type HsmKey = z.infer<typeof HsmKeySchema>;
export type HsmKeyStatus = HsmKey['status'];

export const KeyCreateSchema = z.object({
  name: z.string().min(1, '키 이름을 입력하세요'),
  type: z.enum(KEY_TYPES, { message: '키 유형을 선택하세요' }),
});
export type KeyCreateInput = z.infer<typeof KeyCreateSchema>;
