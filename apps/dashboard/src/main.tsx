import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from '@kqc/ui';
import '@kqc/ui/styles.css';
import '@kqc/ui/fonts.css';
import { queryClient } from './app/queryClient';
import { router } from './app/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultColorScheme="auto">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
