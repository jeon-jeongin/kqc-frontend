import { Badge } from '@kqc/ui';
import type { HsmKeyStatus } from './schemas';

const color: Record<HsmKeyStatus, string> = {
  활성: 'green',
  '만료 예정': 'yellow',
  폐기: 'gray', // 수명 종료는 오류가 아님 — DESIGN_PRINCIPLES §2
};

export function KeyStatusBadge({ status }: { status: HsmKeyStatus }) {
  return <Badge color={color[status]}>{status}</Badge>;
}
