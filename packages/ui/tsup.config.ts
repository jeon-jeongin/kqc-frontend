import { defineConfig } from 'tsup';
import { copyFileSync, cpSync, writeFileSync } from 'node:fs';

export default defineConfig({
  entry: ['src/index.ts', 'src/icons.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    // Mantine 기본 스타일 + KQC 토큰 CSS를 하나로 제공
    copyFileSync('node_modules/@mantine/core/styles.css', 'dist/mantine.css');
    copyFileSync('../tokens/dist/tokens.css', 'dist/tokens.css');
    copyFileSync('node_modules/@mantine/charts/styles.css', 'dist/charts.css');
    copyFileSync('node_modules/@mantine/dates/styles.css', 'dist/dates.css');
    copyFileSync('src/global.css', 'dist/global.css');
    writeFileSync(
      'dist/styles.css',
      "@import './mantine.css';\n@import './charts.css';\n@import './dates.css';\n@import './tokens.css';\n@import './global.css';\n",
    );
    // 브랜드 폰트 (opt-in entry)
    copyFileSync('src/fonts.css', 'dist/fonts.css');
    cpSync('src/fonts', 'dist/fonts', { recursive: true });
  },
});
