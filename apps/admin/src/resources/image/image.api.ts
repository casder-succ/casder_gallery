import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

export function useList() {
  const list = () => apiService.get('/images');

  return useQuery(['images.list'], list);
}

export function useGet(id: string) {
  const get = () => apiService.get(`/images/${id}`);

  return useQuery(['images.entity', id], get);
}

export function useCreate() {
  const create = (data: any) => apiService.post('/images', data);

  return useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries('images.list');
    },
  });
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`/images/${id}`);

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('images.list');
    },
  });
}
