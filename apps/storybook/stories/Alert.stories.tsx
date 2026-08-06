import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, Stack } from '@kqc/ui';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
};
export default meta;
type Story = StoryObj<typeof Alert>;

/** 배경 없이 타이틀 색으로만 구분. navy=강조, green=성공, red=오류, yellow=경고 */
export const Semantic: Story = {
  render: () => (
    <Stack w={420}>
      <Alert color="navy" title="안내">
        8/10(월) 02:00~04:00 시스템 점검이 예정되어 있습니다.
      </Alert>
      <Alert color="green" title="저장 완료">
        변경 사항이 저장되었습니다.
      </Alert>
      <Alert color="red" title="연결 실패">
        서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.
      </Alert>
    </Stack>
  ),
};

/** X 버튼 = 사용자가 직접 닫을 수 있음. 읽고 치워도 되는 공지성 알림에만 사용.
 *  폼 에러처럼 "해결해야 사라지는" 알림에는 X를 달지 않는다 (닫아도 문제는 남으므로) */
export const Dismissible: Story = {
  render: () => (
    <Alert color="navy" title="새 기능 안내" withCloseButton w={420}>
      대시보드에 필터 기능이 추가되었습니다.
    </Alert>
  ),
};
