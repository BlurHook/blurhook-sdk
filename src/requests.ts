// SPDX-License-Identifier: MIT
import {getAddress,isAddress} from "viem";
import {NATIVE,type Address} from "./chain.js";
export class BlurHookRequestError extends Error { constructor(public status:number,message:string){super(message);this.name="BlurHookRequestError";} }
const address=(s:string)=>{if(!isAddress(s,{strict:false}))throw new BlurHookRequestError(400,"Invalid wallet or token address");return getAddress(s.toLowerCase()) as Address;};
const token=(s:string)=>s==="ETH"||s.toLowerCase()===NATIVE?"ETH":address(s);
const integer = (p: URLSearchParams, key: string, min: number, max: number, fallback: number) => {const n = Number(p.get(key) ?? fallback); if (!Number.isSafeInteger(n) || n < min || n > max) throw new BlurHookRequestError(400, `${key} must be between ${min} and ${max}`); return n;};
export function parseQuoteRequest(p: URLSearchParams) {
 let amount = p.get('amount') ?? '';
 if(amount.startsWith('.')) amount = '0'+amount;
 if(amount.endsWith('.')) amount = amount.slice(0,-1);
 if (!/^\d{1,38}(\.\d{1,36})?$/.test(amount) || !/[1-9]/.test(amount)) throw new BlurHookRequestError(400, 'Enter a positive decimal amount');
 const feeBps=integer(p,'feeBps',0,50,0);
 const feeRecipient=feeBps>0?address(p.get('feeRecipient')??''):undefined;
 if(feeRecipient&&/^0x0{40}$/i.test(feeRecipient))throw new BlurHookRequestError(400,'Fee recipient cannot be the zero address.');
 return {tokenIn: token(p.get('tokenIn') ?? ''), tokenOut: token(p.get('tokenOut') ?? ''), amount, slippageBps: integer(p,'slippageBps',1,300,50), hooks: p.get('hooks') !== '0', ...(p.has('from') ? {from: address(p.get('from')!)} : {}), feeBps,...(feeRecipient?{feeRecipient}:{}),deadlineSeconds: 180, pinnedHooksOnly: true};
}
