import type { ReactNode } from 'react';
import { MantineProvider, type MantineProviderProps } from '@mantine/core';
import { theme, kqcCssVariablesResolver } from './theme';

export interface ThemeProviderProps
  extends Omit<MantineProviderProps, 'theme' | 'classNamesPrefix'> {
  children: ReactNode;
}

/** 앱 최상단에서 한 번만 감싼다. 리모트 앱은 Provider 없이 컴포넌트만 import. */
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
