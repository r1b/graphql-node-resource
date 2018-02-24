import HttpApi from '../src/api/HttpApi';
import apiFetch from '../src/api/fetch';

function getData({ data, meta } = {}) {
  if (meta) data.meta = meta; // eslint-disable-line no-param-reassign
  return data;
}

export class MockApi extends HttpApi {
  constructor() {
    super({
      apiBase: '/v1',
      origin: 'https://gateway',
      externalOrigin: 'https://example.com',
    });
  }
  async request(method, url, data?) {
    const resp = await apiFetch({ method, url, data: { data } });
    if (resp.status === 204) return null;
    return getData(await resp.json());
  }
}