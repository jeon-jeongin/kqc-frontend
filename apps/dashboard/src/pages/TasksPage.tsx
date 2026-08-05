import { useState } from 'react';
import {
  Button, Card, Divider, Group, Modal, Select, SegmentedControl, Skeleton, Stack,
  Table, Text, TextInput, Title,
  TableToolbar, TablePagination, usePagedList,
} from '@kqc/ui';
import { useDisclosure } from '@kqc/ui';
import { useTasksQuery, useCreateTaskMutation } from '../features/tasks/queries';
import { TaskCreateSchema, TASK_PARTS } from '../features/tasks/schemas';
import { StatusBadge } from '../features/tasks/StatusBadge';

function CreateTaskModal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const createTask = useCreateTaskMutation();
  const [name, setName] = useState('');
  const [part, setPart] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; part?: string }>({});

  const submit = () => {
    const parsed = TaskCreateSchema.safeParse({ name, part });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as 'name' | 'part'] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    createTask.mutate(parsed.data, {
      onSuccess: () => {
        setName('');
        setPart(null);
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="새 작업 등록" size="sm">
      <Stack gap="md">
        <TextInput
          label="작업 이름"
          placeholder="예: 8월 캘리브레이션"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          error={errors.name}
        />
        <Select
          label="담당 파트"
          placeholder="선택"
          data={[...TASK_PARTS]}
          value={part}
          onChange={setPart}
          error={errors.part}
        />
        <Divider />
        <Group justify="flex-end">
          <Button variant="subtle" color="gray" onClick={onClose}>취소</Button>
          <Button onClick={submit} loading={createTask.isPending}>등록</Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export function TasksPage() {
  const { data: tasks, isPending } = useTasksQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');

  const visible = tasks?.filter(
    (t) =>
      (filter === '전체' || t.status === filter) &&
      (search === '' || t.name.includes(search) || t.id.includes(search)),
  );
  const { pageItems, page, setPage, totalPages, totalCount, pageSize, setPageSize } =
    usePagedList(visible, 10);
  const count = (s: string) => tasks?.filter((t) => t.status === s).length ?? 0;

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={3}>작업 관리</Title>
          <Text size="xs" c="dimmed">전체 {tasks?.length ?? 0}건 · 진행중 {count('진행중')}건 · 완료 {count('완료')}건</Text>
        </div>
        <Button onClick={open}>새 작업</Button>
      </Group>

      <Card>
        <TableToolbar
          filters={
            <SegmentedControl
              value={filter}
              onChange={setFilter}
              data={['전체', '진행중', '완료', '실패']}
            />
          }
          search={
            <TextInput
              placeholder="이름 또는 ID 검색"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              w={240}
              size="sm"
              aria-label="작업 검색"
            />
          }
        />

        {isPending ? (
          <Skeleton h={360} />
        ) : (
          <>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>이름</Table.Th>
                  <Table.Th>파트</Table.Th>
                  <Table.Th>상태</Table.Th>
                  <Table.Th>등록일</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {pageItems.map((t) => (
                  <Table.Tr key={t.id}>
                    <Table.Td w={110}><Text ff="monospace" size="sm">{t.id}</Text></Table.Td>
                    <Table.Td><Text size="sm">{t.name}</Text></Table.Td>
                    <Table.Td w={100}><Text size="sm" c="dimmed">{t.part}</Text></Table.Td>
                    <Table.Td w={100}><StatusBadge status={t.status} /></Table.Td>
                    <Table.Td w={120}><Text size="sm" c="dimmed">{t.date}</Text></Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <TablePagination
              page={page}
              totalPages={totalPages}
              totalCount={totalCount}
              onChange={setPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </>
        )}
      </Card>

      <CreateTaskModal opened={opened} onClose={close} />
    </Stack>
  );
}
