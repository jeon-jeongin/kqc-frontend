/**
 * kqc-design-tokens.json -> dist/tokens.css (CSS 변수) + dist/tokens.js/.d.ts
 * 의존성 없는 최소 빌더. 추후 Style Dictionary로 교체 가능.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('./kqc-design-tokens.json', import.meta.url), 'utf8'));
mkdirSync(new URL('./dist', import.meta.url), { recursive: true });

const cssVars = [];
const flat = {};

function px(v) { return /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v); }

function walk(obj, path) {
  for (const [key, node] of Object.entries(obj)) {
    if (node && typeof node === 'object' && 'value' in node) {
      const name = [...path, key].join('-');
      let value = node.value;
      if (typeof value === 'object') continue; // typography 복합 토큰은 CSS 변수 생략 (테마에서 사용)
      value = String(value).replace(/\{([^}]+)\}/g, (_, ref) => `var(--kqc-${ref.replaceAll('.', '-')})`);
      if (['spacing', 'borderRadius', 'fontSizes', 'sizing'].includes(node.type)) value = px(value);
      cssVars.push(`  --kqc-${name}: ${value};`);
      flat[name.replaceAll('-', '_')] = value;
    } else if (node && typeof node === 'object') {
      walk(node, [...path, key]);
    }
  }
}

walk(tokens.global, []);
walk(tokens.semantic, []);

writeFileSync(new URL('./dist/tokens.css', import.meta.url), `:root {\n${cssVars.join('\n')}\n}\n`);
writeFileSync(new URL('./dist/tokens.js', import.meta.url), `export const tokens = ${JSON.stringify(flat, null, 2)};\n`);
writeFileSync(new URL('./dist/tokens.d.ts', import.meta.url), `export declare const tokens: Record<string, string>;\n`);
console.log(`@kqc/tokens: ${cssVars.length} CSS variables generated`);
