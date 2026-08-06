import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@kqc/ui';
import '@kqc/ui/styles.css';
import '@kqc/ui/fonts.css';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    scheme: {
      description: '컬러 스킴',
      toolbar: {
        title: 'Scheme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { scheme: 'light' },
  decorators: [
    (Story, ctx) => {
      const scheme = ctx.globals.scheme as 'light' | 'dark';
      React.useEffect(() => {
        // 앱 페이지 배경과 동일하게 — 카드 배경(한 톤 차이)이 캔버스에 묻히지 않는다
        document.body.style.background = 'var(--mantine-color-body)';
      }, [scheme]);
      return (
      <ThemeProvider forceColorScheme={scheme}>
        <div style={{ color: 'var(--mantine-color-text)', padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true }, // 배경은 스킴 토글이 단독 제어 (충돌 방지)
  },
};
export default preview;
