import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notification, Stack } from '@kqc/ui';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
};
export default meta;
type Story = StoryObj<typeof Notification>;

/** 토스트 형태. 실제 앱에서는 @mantine/notifications로 화면 우하단 표시 */
export const Semantic: Story = {
  render: () => (
    <Stack w={360}>
      <Notification title="저장됨" withCloseButton={false}>
        작업이 저장되었습니다.
      </Notification>
      <Notification color="green" title="배포 완료" withCloseButton={false}>
        v1.2.0이 프로덕션에 반영되었습니다.
      </Notification>
      <Notification color="red" title="오류" withCloseButton={false}>
        요청을 처리하지 못했습니다.
      </Notification>
      <Notification loading title="업로드 중" withCloseButton={false}>
        파일 3개를 업로드하고 있습니다…
      </Notification>
    </Stack>
  ),
};
