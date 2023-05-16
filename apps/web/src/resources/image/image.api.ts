import { useQuery } from 'react-query';

import { apiService } from 'services';
import router from 'next/router';
import { RoutePath } from 'routes';

export function useList() {
  const list = () => apiService.get('/images');

  return useQuery(['images.list'], list);
}

export function useGet(id: string) {
  const get = () => apiService.get(`/images/${id}`);

  return useQuery(['images.entity', id], get, {
    enabled: !!id,
    onError: (err: any) => {
      if (err.status === 404) {
        router.push(RoutePath.NotFound);
      }
    },
  });
}
