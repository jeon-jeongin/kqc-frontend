import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  // SB9부터 essentials(툴바·Controls 등)는 코어에 내장 — 별도 애드온 불필요
  addons: [],
  framework: { name: '@storybook/react-vite', options: {} },
  typescript: {
    // prop 타입에서 Controls 자동 생성 (Mantine prop 포함)
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mantine)/.test(prop.parent.fileName) : true,
    },
  },
};
export default config;
