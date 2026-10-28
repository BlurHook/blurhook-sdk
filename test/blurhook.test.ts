import {afterEach,describe,expect,it,vi} from 'vitest';
import {createBlurHook,BlurHook,BLURHOOK_DEPLOYMENT,parseQuoteRequest,Zhook,RHC,type QuoteResponse} from '../src/index.js';
afterEach(()=>vi.restoreAllMocks());
describe('BlurHook integration',()=>{
  it('exports the deployed mainnet infrastructure and creates no wallet',()=>{
    const sdk=createBlurHook({includeDefaultPools:false});
    expect(sdk).toBeInstanceOf(BlurHook);
    expect(sdk.chain.id).toBe(4663);
    expect(BLURHOOK_DEPLOYMENT.adapter).toBe('0x1A184f25cc0C032fD6f6701eE4F1DCE359705715');
    expect(BLURHOOK_DEPLOYMENT.pools.map(p=>p.symbol)).toEqual(['ETH','USDG']);
    expect('sendTransaction' in sdk).toBe(false);
  });
  it('requires pinned hooks even when a caller tries to disable that check',async()=>{
    const quote=vi.spyOn(Zhook.prototype,'quote').mockResolvedValue({} as QuoteResponse);
    await createBlurHook().quote({tokenIn:'ETH',tokenOut:RHC.usdg,amount:'0.001',pinnedHooksOnly:false});
    expect(quote.mock.calls[0][0]).toMatchObject({pinnedHooksOnly:true,deadlineSeconds:180});
  });
  it('keeps historical quote guards and the requested block',async()=>{
    const quote=vi.spyOn(Zhook.prototype,'quoteAt').mockResolvedValue({} as QuoteResponse);
    await createBlurHook().quoteAt(123n,{tokenIn:'ETH',tokenOut:RHC.usdg,amount:'0.001',hooks:false,pinnedHooksOnly:false});
    expect(quote.mock.calls[0]).toEqual([123n,expect.objectContaining({hooks:false,pinnedHooksOnly:true})]);
  });
  it('normalizes fractional HTTP amounts and limits approvals to a validated request',()=>{
    expect(parseQuoteRequest(new URLSearchParams({tokenIn:'ETH',tokenOut:RHC.usdg,amount:'.001'}))).toMatchObject({amount:'0.001',feeBps:0,pinnedHooksOnly:true});
  });
  it.each([{amount:'0'},{amount:'-1'},{amount:'NaN'},{amount:'1',slippageBps:'301'},{amount:'1',feeBps:'51'},{amount:'1',feeBps:'1',feeRecipient:'0x0000000000000000000000000000000000000000'}])('rejects invalid quote input %j',extra=>{
    const fields=Object.entries({tokenIn:'ETH',tokenOut:RHC.usdg,...extra}).filter((row):row is [string,string]=>row[1]!==undefined);
    expect(()=>parseQuoteRequest(new URLSearchParams(fields))).toThrow();
  });
});
