import { Badge } from '@kqc/ui';
import type { TaskStatus } from './schemas';

const color: Record<TaskStatus, string> = {
  진행중: 'navy',
  완료: 'green',
  실패: 'red',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return <Badge color={color[status]}>{status}</Badge>;
}
