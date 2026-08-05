import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { ItemListSchema, ItemSchema, type ItemCreateInput } from './schemas';

/* 쿼리 키는 feature당 여기 한 곳에만 — 무효화가 키 계층(all → list/detail)을 따라간다 */
export const itemKeys = {
  all: ['items'] as const,
  list: () => [...itemKeys.all, 'list'] as const,
  detail: (id: string) => [...itemKeys.all, 'detail', id] as const,
};

export function useItemsQuery() {
  return useQuery({
    queryKey: itemKeys.list(),
    queryFn: () => api('/items', ItemListSchema),
  });
}

export function useItemQuery(id: string) {
  return useQuery({
    queryKey: itemKeys.detail(id),
    queryFn: () => api(`/items/${id}`, ItemSchema),
  });
}

export function useCreateItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ItemCreateInput) =>
      api('/items', ItemSchema, { method: 'POST', body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: itemKeys.all }),
  });
}
