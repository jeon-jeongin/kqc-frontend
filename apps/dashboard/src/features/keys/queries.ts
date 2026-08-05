import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { HsmKeyListSchema, HsmKeySchema, type KeyCreateInput } from './schemas';

export const keyKeys = {
  all: ['keys'] as const,
  list: () => [...keyKeys.all, 'list'] as const,
};

export function useKeysQuery() {
  return useQuery({
    queryKey: keyKeys.list(),
    queryFn: () => api('/keys', HsmKeyListSchema),
  });
}

export function useCreateKeyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: KeyCreateInput) =>
      api('/keys', HsmKeySchema, { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keyKeys.all }),
  });
}
