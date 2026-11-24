# OpalHook SDK

Read-only routing and public deployment information for OpalHook on Robinhood Chain (4663). Quotes, route construction, contract checks and simulation use public chain data. The SDK never holds a key, signs or broadcasts.

This package extends the MIT-licensed [ZeroHook SDK](https://github.com/zerohooktrade/zhook-sdk). The upstream routing engine is credited in LICENSE, NOTICE and UPSTREAM.json. OpalHook adds `createOpalHook`, guarded routing defaults, the app's HTTP quote-request validation and OpalHook's own contract directory. Legacy exports remain for compatibility.

## Build and test

Node 22.13 or newer:

```sh
git clone https://github.com/BlurHook/blurhook-sdk.git opalhook-sdk
cd opalhook-sdk
npm ci --ignore-scripts
npm run typecheck
npm run build
npm test
```

Offline tests use synthetic/replayed data. Live RPC tests are opt-in through their documented environment setting; none signs or submits a swap. Integration examples stop at unsigned calldata. Routing is limited to indexed supported venues, and a successful simulation cannot guarantee a future transaction will succeed.

## Use

Build the current source and run `npm install /path/to/opalhook-sdk` from your project to use the OpalHook exports below.

```ts
import {createOpalHook,OPALHOOK_DEPLOYMENT,RHC} from '@blurhook/sdk';
const sdk=createOpalHook();
const quote=await sdk.quote({tokenIn:'ETH',tokenOut:RHC.usdg,amount:'0.001',slippageBps:50});
console.log(quote.amountOut,quote.minOut,quote.tx);
console.log(OPALHOOK_DEPLOYMENT.adapter);
```

`createOpalHook` enforces pinned-hook checks and a default 180-second quote deadline. Exact token allowances still require explicit amounts when constructing approval transactions. Public contract metadata does not construct a private proof or activate private spending. External private deposits use OpalHook operator approvals; this is not 0xbow screening.

Deployed addresses are included in `deployments/robinhood-4663.json` and can be inspected on the [Robinhood Chain explorer](https://robinhoodchain.blockscout.com/). The custom trading adapter has not had an independent audit. The fee fields in the deployment snapshot are not a permanent fee promise or token contract.

## Compatibility

The first public release shipped on **28 October 2026** as `v0.1.0` under the BlurHook name. The OpalHook rebrand followed on **24 November 2026**. The original GitHub release is available for integrations that use it. Build from current source to use the OpalHook names in this README. The current source version is `v0.1.1` and is not published as a GitHub release or npm registry package. The repository URL and `@blurhook/*` package identifiers still work.

`OpalHook`, `createOpalHook`, `OPALHOOK_DEPLOYMENT`, `OpalHookOptions` and `OpalHookRequestError` alias the existing guarded implementation. `BlurHook`, `createBlurHook`, `BLURHOOK_DEPLOYMENT`, `BlurHookOptions` and `BlurHookRequestError` remain exported. No contract redeployment or vault migration is required.
