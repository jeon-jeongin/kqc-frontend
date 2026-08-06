import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, Badge, Text } from '@kqc/ui';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};
export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { id: 'QX-1041', name: '큐빗 캘리브레이션', status: '진행중', qubits: 127 },
  { id: 'QX-1038', name: '월간 인프라 점검', status: '완료', qubits: 433 },
  { id: 'QX-1035', name: 'API 연동 검토', status: '완료', qubits: 27 },
];

/** 수치 컬럼은 우측 정렬 + 모노스페이스 */
export const Default: Story = {
  render: () => (
    <Table w={520} verticalSpacing="sm">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>이름</Table.Th>
          <Table.Th>상태</Table.Th>
          <Table.Th style={{ textAlign: 'right' }}>Qubits</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map((r) => (
          <Table.Tr key={r.id}>
            <Table.Td><Text ff="monospace" size="sm">{r.id}</Text></Table.Td>
            <Table.Td>{r.name}</Table.Td>
            <Table.Td>
              <Badge color={r.status === '완료' ? 'green' : 'navy'} variant="light">
                {r.status}
              </Badge>
            </Table.Td>
            <Table.Td style={{ textAlign: 'right' }}>
              <Text ff="monospace" size="sm">{r.qubits}</Text>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  ),
};

/** 행이 많을 때: 줄무늬 + hover */
export const StripedHover: Story = {
  render: () => (
    <Table w={520} striped highlightOnHover verticalSpacing="xs">
      <Table.Tbody>
        {rows.map((r) => (
          <Table.Tr key={r.id}>
            <Table.Td>{r.id}</Table.Td>
            <Table.Td>{r.name}</Table.Td>
            <Table.Td>{r.status}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  ),
};
