# BlurHook SDK

Read-only routing and public deployment information for BlurHook on Robinhood Chain (4663). Quotes, route construction, contract checks and simulation use public chain data. The SDK never holds a key, signs or broadcasts.

This package extends the MIT-licensed [ZeroHook SDK](https://github.com/zerohooktrade/zhook-sdk). The upstream routing engine is credited in LICENSE, NOTICE and UPSTREAM.json. BlurHook adds `createBlurHook`, guarded routing defaults, the app's HTTP quote-request validation and BlurHook's own contract directory. Legacy exports remain for compatibility.

## Build and test

Node 22.13 or newer:

```sh
git clone https://github.com/BlurHook/blurhook-sdk.git
cd blurhook-sdk
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
```

Offline tests use synthetic/replayed data. Live RPC tests are opt-in through their documented environment setting; none signs or submits a swap. Integration examples stop at unsigned calldata. Routing is limited to indexed supported venues, and a successful simulation cannot guarantee a future transaction will succeed.

## Use

The GitHub release supplies a built npm tarball. No npm-registry publication is claimed. Install that release asset, or build the source and use `npm install /path/to/blurhook-sdk` from your project.

```ts
import {createBlurHook,BLURHOOK_DEPLOYMENT,RHC} from '@blurhook/sdk';
const sdk=createBlurHook();
const quote=await sdk.quote({tokenIn:'ETH',tokenOut:RHC.usdg,amount:'0.001',slippageBps:50});
console.log(quote.amountOut,quote.minOut,quote.tx);
console.log(BLURHOOK_DEPLOYMENT.adapter);
```

`createBlurHook` enforces pinned-hook checks and a default 180-second quote deadline. Exact token allowances still require explicit amounts when constructing approval transactions. Public contract metadata does not construct a private proof or activate private spending. External private deposits use BlurHook operator approvals; this is not 0xbow screening.

Contracts, ABIs, reproducible deployment builds and the privacy/audit scope are in [blurhook-contracts](https://github.com/BlurHook/blurhook-contracts). The custom trading adapter has not had an independent audit. The fee fields in the deployment snapshot are not a permanent fee promise or token contract.
