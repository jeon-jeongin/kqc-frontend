import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge, Button, Card, Chip, Divider, Group, Modal, MultiSelect, Select, SegmentedControl,
  Stack, Table, TagsInput, Text, TextInput, DatePickerInput,
  TableToolbar, TablePagination, usePagedList, useDisclosure,
} from '@kqc/ui';

/**
 * 목록 화면 표준 조합 (PAGE_RECIPES 유형 2):
 * - 툴바: 좌측 필터, 우측 검색 (TableToolbar)
 * - 하단: 가운데 페이지네이션, 우측 페이지당 개수 (TablePagination + usePagedList)
 * 필터 위젯 선택 기준 — 상태 3~5개: SegmentedControl / 옵션 많음: Select / 다중: Chip.Group
 */
const meta: Meta = { title: 'Patterns/테이블 필터·페이지네이션', parameters: { layout: 'padded' } };
export default meta;

const PARTS = ['플랫폼', '인프라', '리서치'];
const rows = Array.from({ length: 23 }, (_, i) => ({
  id: `QX-${1041 - i}`,
  name: `작업 항목 ${i + 1}`,
  part: PARTS[i % 3],
  status: i % 7 === 1 ? '실패' : i % 3 === 0 ? '진행중' : '완료',
}));

export const 전체_조합: StoryObj = {
  render: function Render() {
    const [status, setStatus] = useState('전체');
    const [parts, setParts] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    const visible = rows.filter(
      (r) =>
        (status === '전체' || r.status === status) &&
        (parts.length === 0 || parts.includes(r.part)) &&
        (search === '' || r.name.includes(search) || r.id.includes(search)),
    );
    const { pageItems, page, setPage, totalPages } = usePagedList(visible, 6);

    return (
      <Card w={720}>
        <TableToolbar
          filters={
            <>
              <SegmentedControl value={status} onChange={setStatus} data={['전체', '진행중', '완료', '실패']} />
              <Chip.Group multiple value={parts} onChange={setParts}>
                <Group gap={6}>
                  {PARTS.map((p) => <Chip key={p} value={p} size="xs" radius="sm">{p}</Chip>)}
                </Group>
              </Chip.Group>
            </>
          }
          search={
            <TextInput
              placeholder="이름 또는 ID 검색"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              w={200}
              size="sm"
            />
          }
        />
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Tbody>
            {pageItems.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td w={100}><Text ff="monospace" size="sm">{r.id}</Text></Table.Td>
                <Table.Td><Text size="sm">{r.name}</Text></Table.Td>
                <Table.Td w={90}><Text size="sm" c="dimmed">{r.part}</Text></Table.Td>
                <Table.Td w={90}>
                  <Badge color={r.status === '완료' ? 'green' : r.status === '실패' ? 'red' : 'navy'}>
                    {r.status}
                  </Badge>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          pageSize={6}
          onPageSizeChange={() => {}}
          pageSizeOptions={[6, 12, 24]}
        />
      </Card>
    );
  },
};

/** 날짜 필터 — 기간은 DatePickerInput type="range" 하나로 (프리셋이 필요하면 presets prop) */
export const 날짜_필터: StoryObj = {
  render: function Render() {
    const [range, setRange] = useState<[string | null, string | null]>(['2026-08-01', '2026-08-05']);
    return (
      <Card w={640}>
        <TableToolbar
          filters={
            <>
              <SegmentedControl data={['전체', '진행중', '완료']} />
              <DatePickerInput
                type="range"
                value={range}
                onChange={setRange}
                size="sm"
                w={240}
                valueFormat="YYYY-MM-DD"
                aria-label="기간"
              />
            </>
          }
        />
        <Text size="xs" c="dimmed">기간 필터가 있는 목록은 툴바에서 SegmentedControl 다음 자리에 둔다.</Text>
      </Card>
    );
  },
};

/**
 * 필터가 4개를 넘으면 (Notion 방식) 주 필터 1~2개만 툴바에 노출하고
 * 나머지는 "필터" 버튼 → Modal. 적용된 조건은 툴바에 Chip으로 항상 표시한다.
 */
export const 필터_많을_때_모달: StoryObj = {
  render: function Render() {
    const [opened, { open, close }] = useDisclosure(false);
    const [applied, setApplied] = useState<string[]>(['파트: 인프라', '기간: 최근 30일']);
    return (
      <Card w={640}>
        <TableToolbar
          filters={
            <>
              <SegmentedControl data={['전체', '진행중', '완료']} />
              <Button variant="outline" size="sm" onClick={open}>필터 {applied.length > 0 && `(${applied.length})`}</Button>
              {applied.map((f) => (
                <Chip key={f} checked size="xs" radius="sm" onChange={() => setApplied(applied.filter((x) => x !== f))}>
                  {f}
                </Chip>
              ))}
            </>
          }
          search={<TextInput placeholder="검색" w={180} size="sm" />}
        />
        <Text size="xs" c="dimmed">칩을 눌러 개별 조건을 해제할 수 있다 — 전체 초기화를 강요하지 않는다.</Text>

        <Modal opened={opened} onClose={close} title="상세 필터" size="sm">
          <Stack gap="md">
            <Select label="담당 파트" data={['전체', '플랫폼', '인프라', '리서치']} defaultValue="인프라" size="sm" />
            <Select label="등록 기간" data={['오늘', '최근 7일', '최근 30일', '직접 입력']} defaultValue="최근 30일" size="sm" />
            <Select label="정렬" data={['최신순', '이름순']} defaultValue="최신순" size="sm" />
            <Divider />
            <Group justify="flex-end">
              <Button variant="subtle" color="gray" onClick={close}>초기화</Button>
              <Button onClick={close}>적용</Button>
            </Group>
          </Stack>
        </Modal>
      </Card>
    );
  },
};

/** 옵션이 많거나 가변이면 SegmentedControl 대신 Select */
export const 필터_위젯_선택_기준: StoryObj = {
  render: () => (
    <Group align="flex-start" gap="md">
      <Card w={300}>
        <Text size="sm" fw={700} mb="xs">상태 3~5개 고정</Text>
        <SegmentedControl data={['전체', '진행중', '완료']} />
        <Text size="xs" c="dimmed" mt="xs">SegmentedControl — 한눈에 보이고 클릭 1회</Text>
      </Card>
      <Card w={300}>
        <Text size="sm" fw={700} mb="xs">옵션 6개 이상 · 가변</Text>
        <Select data={['전체', '활성', '만료 예정', '폐기', '보류', '검토중']} defaultValue="전체" size="sm" />
        <Text size="xs" c="dimmed" mt="xs">Select — 공간 절약</Text>
      </Card>
      <Card w={300}>
        <Text size="sm" fw={700} mb="xs">다중 선택 — 옵션 소수·고정</Text>
        <Chip.Group multiple>
          <Group gap={6}>
            {PARTS.map((p) => <Chip key={p} value={p} size="xs" radius="sm">{p}</Chip>)}
          </Group>
        </Chip.Group>
        <Text size="xs" c="dimmed" mt="xs">Chip.Group — 전부 보이고 토글 1회</Text>
      </Card>
      <Card w={300}>
        <Text size="sm" fw={700} mb="xs">다중 선택 — 옵션 많거나 가변</Text>
        <MultiSelect
          data={['account-service', 'billing-service', 'fulfillment-service', 'status-confirmation', 'auth-service', 'report-service']}
          defaultValue={['billing-service']}
          placeholder="서비스 선택"
          searchable
          clearable
          size="sm"
        />
        <Text size="xs" c="dimmed" mt="xs">MultiSelect — 검색해서 넣고, 핀의 X로 개별 제거</Text>
      </Card>
      <Card w={300}>
        <Text size="sm" fw={700} mb="xs">자유 입력 태그</Text>
        <TagsInput
          defaultValue={['calibration', 'urgent']}
          placeholder="입력 후 Enter"
          size="sm"
        />
        <Text size="xs" c="dimmed" mt="xs">TagsInput — 옵션 없이 직접 입력·제거</Text>
      </Card>
    </Group>
  ),
};
