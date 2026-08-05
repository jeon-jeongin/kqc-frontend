import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, Button, Text, Stack, useDisclosure } from '@kqc/ui';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  // centered 레이아웃은 body를 flex로 만들어 Mantine 포털이 화면 밖으로 밀림 → padded 고정
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

/** 웹의 사이드 패널. 모바일 뷰에서는 position="bottom" = TDS Bottom Sheet 대응 */
export const Side: Story = {
  render: function Render() {
    const [opened, { open, close }] = useDisclosure(true);
    return (
      <>
        <Button onClick={open}>필터 열기</Button>
        <Drawer opened={opened} onClose={close} title="필터" position="right">
          <Stack>
            <Text size="sm" c="dimmed">상태, 담당자, 기간 등의 필터 컨트롤이 들어갑니다.</Text>
            <Button onClick={close}>적용</Button>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const Bottom: Story = {
  render: function Render() {
    const [opened, { open, close }] = useDisclosure(true);
    return (
      <>
        <Button onClick={open}>바텀시트 열기</Button>
        <Drawer opened={opened} onClose={close} title="정렬 기준" position="bottom" size="40%">
          <Stack gap="sm">
            <Button variant="subtle" fullWidth onClick={close}>최신순</Button>
            <Button variant="subtle" fullWidth onClick={close}>이름순</Button>
            <Button variant="subtle" fullWidth onClick={close}>상태순</Button>
          </Stack>
        </Drawer>
      </>
    );
  },
};
