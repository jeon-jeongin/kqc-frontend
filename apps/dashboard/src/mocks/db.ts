/** 백엔드 연결 전 인메모리 mock. VITE_API_URL 설정 시 lib/api.ts가 자동으로 실제 fetch로 전환. */

interface MockTask {
  id: string;
  name: string;
  part: string;
  status: string;
  date: string;
}

const TASK_NAMES = [
  '큐빗 캘리브레이션 리포트', '고객사 SLA 검증', '월간 인프라 점검', '오류율 벤치마크 정리',
  '고객사 API 연동 검토', '냉각 시스템 점검', '펄스 시퀀스 튜닝', '백업 절차 리허설',
  '접근 권한 정기 감사', '게이트 충실도 측정', '네트워크 지연 분석', '온보딩 문서 갱신',
];
const TASK_PARTS = ['플랫폼', '인프라', '리서치'];

const tasks: MockTask[] = Array.from({ length: 22 }, (_, i) => ({
  id: `QX-${1041 - i}`,
  name: TASK_NAMES[i % TASK_NAMES.length],
  part: TASK_PARTS[i % TASK_PARTS.length],
  status: i % 7 === 1 ? '실패' : i % 3 === 0 ? '진행중' : '완료',
  date: new Date(Date.UTC(2026, 7, 1) - i * 86_400_000 * 2).toISOString().slice(0, 10),
}));

let nextId = 1042;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LOG_SEED = [
  { level: 'INFO', hostname: 'ip-172-31-12-239', service: 'account-service', message: 'Processing batch request for account billing cycles.' },
  { level: 'ERROR', hostname: 'ip-172-31-10-15', service: 'billing-service', message: 'Failed while submitting shipment: label not provided' },
  { level: 'WARN', hostname: 'ip-172-20-56-12', service: 'fulfillment-service', message: 'Integration command retry count exceeded. Connection reset by peer.' },
  { level: 'ERROR', hostname: 'ip-172-20-56-12', service: 'fulfillment-service', message: 'CRITICAL_ERROR: Process failure at shipping gateway during dispatch resolution.' },
  { level: 'INFO', hostname: 'ip-172-31-12-239', service: 'account-service', message: 'Connection established to Fulfillment-Service primary database instance.' },
  { level: 'INFO', hostname: 'ip-172-41-01-48', service: 'billing-service', message: 'Polling events from active message broker queue: "billing-transactions".' },
  { level: 'WARN', hostname: 'ip-172-31-12-239', service: 'account-service', message: 'Slow response from external geolocation API — took 1420ms.' },
  { level: 'INFO', hostname: 'ip-172-31-11-212', service: 'status-confirmation', message: 'Health check passed for all registered endpoints.' },
  { level: 'INFO', hostname: 'ip-172-31-27-38', service: 'status-confirmation', message: 'Scheduled snapshot completed for volume vol-0f3a.' },
];

const logs = Array.from({ length: 36 }, (_, i) => {
  const seed = LOG_SEED[i % LOG_SEED.length];
  const t = new Date(Date.UTC(2026, 7, 5, 7, 48, 13) - i * 47_000);
  return {
    id: `L-${String(i + 1).padStart(2, '0')}`,
    time: `${t.toISOString().slice(0, 10)} ${t.toISOString().slice(11, 19)}.${String(137 + i * 53).slice(-3)}`,
    ...seed,
  };
});

const keys = [
  { id: 'HSM-K-0012', name: 'api-gateway-tls', type: 'RSA-2048', status: '활성', created: '2026-01-12', expires: '2027-01-12' },
  { id: 'HSM-K-0011', name: 'payment-db-encryption', type: 'AES-256', status: '활성', created: '2026-02-03', expires: '2027-02-03' },
  { id: 'HSM-K-0010', name: 'firmware-signing', type: 'ECDSA-P256', status: '활성', created: '2025-11-20', expires: '2026-11-20' },
  { id: 'HSM-K-0009', name: 'partner-api-mtls', type: 'RSA-2048', status: '만료 예정', created: '2025-09-01', expires: '2026-09-01' },
  { id: 'HSM-K-0008', name: 'backup-archive', type: 'AES-256', status: '활성', created: '2026-03-15', expires: '2027-03-15' },
  { id: 'HSM-K-0007', name: 'session-token-signing', type: 'ECDSA-P256', status: '만료 예정', created: '2025-08-28', expires: '2026-08-28' },
  { id: 'HSM-K-0006', name: 'legacy-vpn-cert', type: 'RSA-2048', status: '폐기', created: '2024-06-10', expires: '2026-06-10' },
  { id: 'HSM-K-0005', name: 'audit-log-hmac', type: 'AES-256', status: '활성', created: '2026-04-22', expires: '2027-04-22' },
];

let nextKeyNo = 13;

export async function mockFetch(path: string, init?: RequestInit): Promise<unknown> {
  await delay(300);
  const method = init?.method ?? 'GET';

  if (path === '/keys' && method === 'GET') return [...keys];

  if (path === '/keys' && method === 'POST') {
    const body = JSON.parse(String(init?.body)) as { name: string; type: string };
    const created = new Date();
    const expires = new Date(created);
    expires.setFullYear(expires.getFullYear() + 1);
    const key = {
      id: `HSM-K-${String(nextKeyNo++).padStart(4, '0')}`,
      name: body.name,
      type: body.type,
      status: '활성',
      created: created.toISOString().slice(0, 10),
      expires: expires.toISOString().slice(0, 10),
    };
    keys.unshift(key);
    return key;
  }

  if (path === '/logs' && method === 'GET') return [...logs];

  if (path === '/tasks' && method === 'GET') return [...tasks];

  if (path === '/tasks' && method === 'POST') {
    const body = JSON.parse(String(init?.body)) as { name: string; part: string };
    const task: MockTask = {
      id: `QX-${nextId++}`,
      name: body.name,
      part: body.part,
      status: '진행중',
      date: new Date().toISOString().slice(0, 10),
    };
    tasks.unshift(task);
    return task;
  }

  throw new Error(`mock 미구현: ${method} ${path}`);
}
