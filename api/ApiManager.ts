import type { APIRequestContext } from '@playwright/test';
import { PostmanAPI } from './Postman.api';
import { MvideoAPI } from './Mvideo.api';
import { FakeStoreAPI } from './FakeStore.api';

// API Registry (entrypoint), i.eL  api.postman, api.mvideoAPI
export class ApiManager {
  readonly postman: PostmanAPI;
  readonly mvideo: MvideoAPI;
  readonly fakeStore: FakeStoreAPI;

  constructor(request: APIRequestContext) {
    this.postman = new PostmanAPI(request);
    this.mvideo = new MvideoAPI(request);
    this.fakeStore = new FakeStoreAPI(request);
  }
}
