import { createBrowserRouter } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { TasksPage } from '../pages/TasksPage';
import { LogsPage } from '../pages/LogsPage';
import { KeysPage } from '../pages/KeysPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'tasks', Component: TasksPage },
      { path: 'logs', Component: LogsPage },
      { path: 'keys', Component: KeysPage },
    ],
  },
]);
