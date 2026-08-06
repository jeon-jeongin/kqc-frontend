import type { z } from 'zod';
import { mockFetch } from '../mocks/db';

const BASE = import.meta.env.VITE_API_URL as string | undefined;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

/**
 * 모든 서버 통신의 단일 통로. VITE_API_URL이 없으면 mock으로 동작한다.
 * 응답은 zod 스키마를 통과해야만 앱에 들어온다 — 스키마가 곧 API 계약.
 */
export async function api<S extends z.ZodType>(
  path: string,
  schema: S,
  init?: RequestInit,
): Promise<z.infer<S>> {
  const raw = BASE ? await realFetch(path, init) : await mockFetch(path, init);
  return schema.parse(raw);
}

async function realFetch(path: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) throw new ApiError(`요청 실패: ${path}`, res.status);
  return res.json();
}
