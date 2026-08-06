import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Anchor } from '@mantine/core';

/** 배경 없는 텍스트 액션. 페이지 이동이면 Anchor, 동작 실행이면 이 컴포넌트. */
export interface TextButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'clear' | 'arrow';
}

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  function TextButton({ size = 'md', variant = 'clear', disabled, children, style, ...rest }, ref) {
    return (
      <Anchor
        component="button"
        type="button"
        ref={ref as never}
        fz={size}
        fw={700}
        underline="never"
        c={disabled ? 'dimmed' : 'navy'}
        disabled={disabled}
        style={{
          background: 'none',
          border: 0,
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25em',
          lineHeight: 1.4,
          ...style,
        }}
        {...rest}
      >
        {children}
        {variant === 'arrow' && (
          <svg width="0.7em" height="0.7em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Anchor>
    );
  },
);
