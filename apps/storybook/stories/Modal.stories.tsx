import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, Button, Text, Group, useDisclosure } from '@kqc/ui';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  // centered 레이아웃은 body를 flex로 만들어 Mantine 포털이 화면 밖으로 밀림 → padded 고정
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Modal>;

/** 기본: radius 16 / padding 24 / shadow md (테마 고정) */
export const Default: Story = {
  render: function Render() {
    const [opened, { open, close }] = useDisclosure(true);
    return (
      <>
        <Button onClick={open}>모달 열기</Button>
        <Modal opened={opened} onClose={close} title="작업 등록">
          <Text size="sm" c="dimmed" mb="lg">
            새 캘리브레이션 작업을 등록합니다. 등록 후 담당자에게 알림이 갑니다.
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={close}>취소</Button>
            <Button onClick={close}>등록</Button>
          </Group>
        </Modal>
      </>
    );
  },
};

/** 파괴적 액션 확인: 확인 버튼은 red */
export const Confirm: Story = {
  render: function Render() {
    const [opened, { open, close }] = useDisclosure(true);
    return (
      <>
        <Button color="red" variant="light" onClick={open}>작업 삭제</Button>
        <Modal opened={opened} onClose={close} title="정말 삭제할까요?" size="sm">
          <Text size="sm" c="dimmed" mb="lg">
            삭제한 작업은 복구할 수 없습니다.
          </Text>
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={close}>취소</Button>
            <Button color="red" onClick={close}>삭제</Button>
          </Group>
        </Modal>
      </>
    );
  },
};
