import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request('/api/users');
}

export async function update(params) {
  return request('/api/users', {
    method: 'put',
    body: qs.stringify(params),
  });
}
