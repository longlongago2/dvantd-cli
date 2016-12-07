import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/products?${qs.stringify(params)}`); // 查询
}

export async function update(params) {
  // console.log(params.bordered); // 如果是restful接口就要获取参数，而不是像这个一股脑放到body里
  return request('/api/products', {
    method: 'PUT', // 更新
    body: qs.stringify(params), // 请求参数
  });
}

export async function toggleUpdate(params) {
  return request('api/toggle', {
    method: 'PUT',
    body: qs.stringify(params),
  });
}

export async function remove(params) {
  return request('/api/products', {
    method: 'DELETE', // 删除
    body: qs.stringify(params),
  });
}

export async function insert(params) {
  return request('/api/products', {
    method: 'POST', // 创建
    body: qs.stringify(params)
  });
}

