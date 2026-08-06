import type { ReactNode } from 'react';
import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import { theme, kqcCssVariablesResolver } from './theme';

export interface ThemeProviderProps
  extends Omit<MantineProviderProps, 'theme' | 'classNamesPrefix'> {
  children: ReactNode;
}

/**
 * KQC 디자인 시스템 Provider.
 * 앱 최상단(MFE라면 app-shell)에서 한 번만 감쌉니다.
 * 리모트 앱은 Provider 없이 컴포넌트만 import 하세요.
 *
 * 색상 스킴: defaultColorScheme="light" 기본.
 * 다크 모드 지원 앱은 defaultColorScheme="auto" 또는 useMantineColorScheme 토글 사용.
 */
export function ThemeProvider({ children, ...rest }: ThemeProviderProps) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={kqcCssVariablesResolver}
      classNamesPrefix="kqc"
      defaultColorScheme="light"
      {...rest}
    >
      {children}
    </MantineProvider>
  );
}
