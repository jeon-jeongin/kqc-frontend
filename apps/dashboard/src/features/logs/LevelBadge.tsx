import { Badge } from '@kqc/ui';
import type { LogLevel } from './schemas';

const color: Record<LogLevel, string> = {
  INFO: 'navy',
  WARN: 'yellow',
  ERROR: 'red',
};

export function LevelBadge({ level }: { level: LogLevel }) {
  return <Badge color={color[level]} radius="sm">{level}</Badge>;
}
