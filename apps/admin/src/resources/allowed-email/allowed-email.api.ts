import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

export function useList() {
  const list = () => apiService.get('/allowed-emails');

  return useQuery(['allowed-emails.list'], list);
}

export function useCreate() {
  const create = (data: any) => apiService.post('/allowed-emails', data);

  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('allowed-emails.list');
    },
  });
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`/allowed-emails/${id}`);

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('allowed-emails.list');
    },
  });
}
