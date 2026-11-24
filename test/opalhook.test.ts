import {describe,expect,it} from 'vitest';
import {OpalHook,BlurHook,createOpalHook,createBlurHook,OPALHOOK_DEPLOYMENT,BLURHOOK_DEPLOYMENT,OpalHookRequestError,BlurHookRequestError,parseQuoteRequest} from '../src/index.js';
describe('OpalHook compatibility',()=>{
 it('shares the guarded implementation and deployed infrastructure with legacy callers',()=>{
  expect(OpalHook).toBe(BlurHook);
  expect(createOpalHook).toBe(createBlurHook);
  expect(OPALHOOK_DEPLOYMENT).toBe(BLURHOOK_DEPLOYMENT);
  expect(createOpalHook({includeDefaultPools:false})).toBeInstanceOf(BlurHook);
 });
 it('preserves request-error identity for existing catch handlers',()=>{
  expect(OpalHookRequestError).toBe(BlurHookRequestError);
  expect(()=>parseQuoteRequest(new URLSearchParams())).toThrow(OpalHookRequestError);
 });
});
