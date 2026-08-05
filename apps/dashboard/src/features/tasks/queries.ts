import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { TaskListSchema, TaskSchema, type TaskCreateInput } from './schemas';

export const taskKeys = {
  all: ['tasks'] as const,
  list: () => [...taskKeys.all, 'list'] as const,
};

export function useTasksQuery() {
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: () => api('/tasks', TaskListSchema),
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: TaskCreateInput) =>
      api('/tasks', TaskSchema, { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.all }),
  });
}
