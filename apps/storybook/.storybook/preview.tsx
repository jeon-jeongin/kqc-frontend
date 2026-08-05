import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from '@kqc/ui';
import '@kqc/ui/styles.css';
import '@kqc/ui/fonts.css';
import './preview.css';

const preview: Preview = {
  // 툴바의 해/달 아이콘으로 라이트/다크 전환
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
        document.body.style.background =
          scheme === 'dark' ? 'var(--mantine-color-dark-8)' : 'var(--mantine-color-gray-0)';
      }, [scheme]);
      return (
      <ThemeProvider forceColorScheme={scheme}>
        {/* 배경은 칠하지 않는다 — 캔버스(body) 위에 컴포넌트가 바로 앉아야
            다크에서 스토리 뒤에 밝은 상자가 비쳐 보이지 않는다 */}
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
