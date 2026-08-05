import { Badge } from '@kqc/ui';
import type { LogLevel } from './schemas';

/* WARN은 yellow — 오렌지는 브랜드 CTA 전용이라 상태색으로 쓰지 않는다 (§2) */
const color: Record<LogLevel, string> = {
  INFO: 'navy',
  WARN: 'yellow',
  ERROR: 'red',
};

export function LevelBadge({ level }: { level: LogLevel }) {
  return <Badge color={color[level]} radius="sm">{level}</Badge>;
}
