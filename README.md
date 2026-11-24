# OpalHook SDK

> Formerly BlurHook. First public release: **28 October 2026** (`v0.1.0`).
> The OpalHook rebrand is dated **24 November 2026**. Existing repository URLs and
> `@blurhook/*` package identifiers remain in use for compatibility. Original
> commits, release tags and release assets are retained. The new API names below
> require v0.1.1 or a build from this source; the v0.1.0 tarballs stay unchanged.


Read-only routing and public deployment information for OpalHook on Robinhood Chain (4663). Quotes, route construction, contract checks and simulation use public chain data. The SDK never holds a key, signs or broadcasts.

This package extends the MIT-licensed [ZeroHook SDK](https://github.com/zerohooktrade/zhook-sdk). The upstream routing engine is credited in LICENSE, NOTICE and UPSTREAM.json. OpalHook adds `createOpalHook`, guarded routing defaults, the app's HTTP quote-request validation and OpalHook's own contract directory. Legacy exports remain for compatibility.

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
import {createOpalHook,OPALHOOK_DEPLOYMENT,RHC} from '@blurhook/sdk';
const sdk=createOpalHook();
const quote=await sdk.quote({tokenIn:'ETH',tokenOut:RHC.usdg,amount:'0.001',slippageBps:50});
console.log(quote.amountOut,quote.minOut,quote.tx);
console.log(OPALHOOK_DEPLOYMENT.adapter);
```

`createOpalHook` enforces pinned-hook checks and a default 180-second quote deadline. Exact token allowances still require explicit amounts when constructing approval transactions. Public contract metadata does not construct a private proof or activate private spending. External private deposits use OpalHook operator approvals; this is not 0xbow screening.

Deployed addresses are included in `deployments/robinhood-4663.json` and can be inspected on the [Robinhood Chain explorer](https://robinhoodchain.blockscout.com/). The custom trading adapter has not had an independent audit. The fee fields in the deployment snapshot are not a permanent fee promise or token contract.

## Compatibility

`OpalHook`, `createOpalHook`, `OPALHOOK_DEPLOYMENT`, `OpalHookOptions` and `OpalHookRequestError` alias the existing guarded implementation. `BlurHook`, `createBlurHook`, `BLURHOOK_DEPLOYMENT`, `BlurHookOptions` and `BlurHookRequestError` remain exported. No contract redeployment or vault migration is required.
