// SPDX-License-Identifier: MIT
import deployment from '../deployments/robinhood-4663.json';
import { Zhook, type ZhookOptions } from './zhook.js';
import { createClient } from './rpc.js';
import { RHC } from './chain.js';
import type { QuoteParams } from './quote.js';
export type BlurHookOptions = ZhookOptions;
export const BLURHOOK_DEPLOYMENT = deployment;
/** Read-only routing entry point with the guards used by BlurHook's backend. */
export class BlurHook extends Zhook {
  constructor(options: BlurHookOptions = {}) {
    super({ ...options, client: options.client ?? createClient({rpcUrls: options.rpcUrls ?? RHC.rpcs, timeoutMs: 10_000}) });
  }
  override quote(params: QuoteParams) {
    return super.quote({...params, pinnedHooksOnly:true, deadlineSeconds:params.deadlineSeconds ?? 180});
  }
  override quoteAt(block:bigint, params:QuoteParams) {
    return super.quoteAt(block,{...params,pinnedHooksOnly:true,deadlineSeconds:params.deadlineSeconds ?? 180});
  }
}
export const createBlurHook = (options:BlurHookOptions = {}) => new BlurHook(options);
