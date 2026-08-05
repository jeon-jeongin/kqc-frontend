import { z } from 'zod';

export const TASK_PARTS = ['플랫폼', '인프라', '리서치'] as const;
export const TASK_STATUSES = ['진행중', '완료', '실패'] as const;

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  part: z.enum(TASK_PARTS),
  status: z.enum(TASK_STATUSES),
  date: z.string(),
});
export const TaskListSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
export type TaskStatus = Task['status'];

export const TaskCreateSchema = z.object({
  name: z.string().min(1, '작업 이름을 입력하세요'),
  part: z.enum(TASK_PARTS, { message: '담당 파트를 선택하세요' }),
});
export type TaskCreateInput = z.infer<typeof TaskCreateSchema>;
