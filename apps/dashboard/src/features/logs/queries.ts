import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { LogListSchema } from './schemas';

export const logKeys = {
  all: ['logs'] as const,
  list: () => [...logKeys.all, 'list'] as const,
};

export function useLogsQuery() {
  return useQuery({
    queryKey: logKeys.list(),
    queryFn: () => api('/logs', LogListSchema),
  });
}
