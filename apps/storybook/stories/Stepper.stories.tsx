import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '@kqc/ui';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
};
export default meta;
type Story = StoryObj<typeof Stepper>;

/** 현재 스텝 = 오렌지 (원칙 §2 허용 2번: 소면적 상태 인디케이터). 완료 스텝은 navy */
export const Default: Story = {
  render: () => (
    <Stepper active={1} color="accent.5" completedIcon={undefined} w={560}>
      <Stepper.Step label="신청" description="정보 입력" />
      <Stepper.Step label="검토" description="담당자 확인" />
      <Stepper.Step label="완료" description="결과 안내" />
    </Stepper>
  ),
};

export const Small: Story = {
  render: () => (
    <Stepper active={2} size="sm" color="accent.5" w={480}>
      <Stepper.Step label="약관 동의" />
      <Stepper.Step label="정보 입력" />
      <Stepper.Step label="확인" />
    </Stepper>
  ),
};
