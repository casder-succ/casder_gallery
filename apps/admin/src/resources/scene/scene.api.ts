import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

export function useList(pictureId: string) {
  const list = () => apiService.get('/scenes', { pictureId });

  return useQuery(['scenes.list', pictureId], list);
}

export function useCreate() {
  const create = (data: any) => apiService.post('/scenes', data);

  return useMutation(create);
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`/scenes/${id}`);

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('scenes.list');
    },
  });
}
