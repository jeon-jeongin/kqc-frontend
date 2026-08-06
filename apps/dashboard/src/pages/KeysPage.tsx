import { useState } from 'react';
import {
  Button, Card, DonutChart, Group, Modal, Select, Skeleton, Stack, Table, Text,
  TextInput, Title,
  TableToolbar, TablePagination, usePagedList,
} from '@kqc/ui';
import { useDisclosure } from '@kqc/ui';
import { useKeysQuery, useCreateKeyMutation } from '../features/keys/queries';
import { KeyCreateSchema, KEY_TYPES } from '../features/keys/schemas';
import { KeyStatusBadge } from '../features/keys/KeyStatusBadge';

const TYPE_COLORS = ['navy', 'navy.2', 'gray.4'];

function CreateKeyModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const createKey = useCreateKeyMutation();
  const [name, setName] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; type?: string }>({});

  const submit = () => {
    const parsed = KeyCreateSchema.safeParse({ name, type });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as 'name' | 'type'] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    createKey.mutate(parsed.data, {
      onSuccess: () => {
        setName('');
        setType(null);
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="새 키 생성" size="sm">
      <Stack gap="md">
        <TextInput
          label="키 이름"
          placeholder="예: api-gateway-tls"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          error={errors.name}
        />
        <Select
          label="키 유형"
          placeholder="선택"
          data={[...KEY_TYPES]}
          value={type}
          onChange={setType}
          error={errors.type}
        />
        <Group justify="flex-end">
          <Button variant="subtle" color="gray" onClick={onClose}>취소</Button>
          <Button onClick={submit} loading={createKey.isPending}>생성</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export function KeysPage() {
  const { data: keys, isPending } = useKeysQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<string | null>('전체');
  const [search, setSearch] = useState('');

  const visible = keys?.filter(
    (k) =>
      (status === '전체' || k.status === status) &&
      (search === '' || k.name.includes(search) || k.id.includes(search)),
  );
  const { pageItems, page, setPage, totalPages, pageSize, setPageSize } =
    usePagedList(visible, 5);
  const count = (s: string) => keys?.filter((k) => k.status === s).length ?? 0;
  const byType = KEY_TYPES.map((t, i) => ({
    name: t,
    value: keys?.filter((k) => k.type === t).length ?? 0,
    color: TYPE_COLORS[i],
  }));

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={3}>키 관리</Title>
          <Text size="xs" c="dimmed">HSM slot-01 · PKCS#11</Text>
        </div>
        <Button onClick={open}>새 키 생성</Button>
      </Group>

      {isPending ? (
        <Group gap="md">
          <Skeleton h={90} flex={1} />
          <Skeleton h={90} flex={1} />
          <Skeleton h={90} flex={1} />
        </Group>
      ) : (
        <Group gap="md" align="stretch">
          <Card flex={1}>
            <Text size="xs" c="dimmed">전체 키</Text>
            <Text size="xl" fw={800} c="navy">{keys?.length ?? 0}개</Text>
          </Card>
          <Card flex={1}>
            <Text size="xs" c="dimmed">활성</Text>
            <Text size="xl" fw={800} c="navy">{count('활성')}개</Text>
          </Card>
          <Card flex={1}>
            <Text size="xs" c="dimmed">만료 예정 (90일 이내)</Text>
            <Text size="xl" fw={800} c="navy">{count('만료 예정')}개</Text>
          </Card>
        </Group>
      )}

      <Group gap="md" align="flex-start">
        <Card flex={2}>
          <TableToolbar
            filters={
              <Select
                data={['전체', '활성', '만료 예정', '폐기']}
                value={status}
                onChange={setStatus}
                w={120}
                size="sm"
                aria-label="상태 필터"
              />
            }
            search={
              <TextInput
                placeholder="이름 또는 ID 검색"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                w={200}
                size="sm"
                aria-label="키 검색"
              />
            }
          />
          {isPending ? (
            <Skeleton h={300} />
          ) : (
            <>
              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>키 ID</Table.Th>
                    <Table.Th>이름</Table.Th>
                    <Table.Th>유형</Table.Th>
                    <Table.Th>상태</Table.Th>
                    <Table.Th>만료일</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pageItems.map((k) => (
                    <Table.Tr key={k.id}>
                      <Table.Td><Text ff="monospace" size="sm">{k.id}</Text></Table.Td>
                      <Table.Td><Text size="sm">{k.name}</Text></Table.Td>
                      <Table.Td><Text size="sm" ff="monospace" c="dimmed">{k.type}</Text></Table.Td>
                      <Table.Td><KeyStatusBadge status={k.status} /></Table.Td>
                      <Table.Td><Text size="sm" c="dimmed">{k.expires}</Text></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              <TablePagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                pageSizeOptions={[5, 10, 20]}
              />
            </>
          )}
        </Card>

        <Card flex={1} maw={300}>
          <Text fw={700} mb="md">유형별 분포</Text>
          <Group justify="center">
            <DonutChart size={120} thickness={18} withLabelsLine={false} data={byType} />
          </Group>
          <Table verticalSpacing="xs" mt="md">
            <Table.Tbody>
              {byType.map((t) => (
                <Table.Tr key={t.name}>
                  <Table.Td><Text size="sm" ff="monospace">{t.name}</Text></Table.Td>
                  <Table.Td ta="right"><Text size="sm" fw={700} c="navy">{t.value}개</Text></Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Group>

      <CreateKeyModal opened={opened} onClose={close} />
    </Stack>
  );
}
