# OpalHook SDK migration guide

The first public release shipped as [v0.1.0](https://github.com/opalhook/opalhook-sdk/releases/tag/v0.1.0) on 28 October 2026 under the BlurHook name. The OpalHook rebrand followed on 24 November 2026. The v0.1.0 and [v0.1.1](https://github.com/opalhook/opalhook-sdk/releases/tag/v0.1.1) release assets install as `@blurhook/sdk` and remain available for existing integrations.

When upgrading to [OpalHook v0.1.2](https://github.com/opalhook/opalhook-sdk/releases/tag/v0.1.2), follow the [install instructions](README.md) and use `@opalhook/sdk` as the package name. The new scope is a separate npm dependency key. If your project has an entry for the earlier package, update it when you switch.

## Supported aliases

| OpalHook | Legacy |
| --- | --- |
| `OpalHook` | `BlurHook` |
| `createOpalHook` | `createBlurHook` |
| `OPALHOOK_DEPLOYMENT` | `BLURHOOK_DEPLOYMENT` |
| `OpalHookOptions` | `BlurHookOptions` |
| `OpalHookRequestError` | `BlurHookRequestError` |

Both sets of exports use the same guarded implementation and deployment directory. An SDK upgrade requires no contract redeployment or vault migration.
