import { z } from 'zod';

export const LOG_LEVELS = ['INFO', 'WARN', 'ERROR'] as const;

export const LogSchema = z.object({
  id: z.string(),
  time: z.string(),
  level: z.enum(LOG_LEVELS),
  hostname: z.string(),
  service: z.string(),
  message: z.string(),
});
export const LogListSchema = z.array(LogSchema);

export type Log = z.infer<typeof LogSchema>;
export type LogLevel = Log['level'];
