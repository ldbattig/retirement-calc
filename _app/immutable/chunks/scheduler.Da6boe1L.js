function j(){}const nt=t=>t;function T(t,e){for(const n in e)t[n]=e[n];return t}function B(t){return t()}function rt(){return Object.create(null)}function L(t){t.forEach(B)}function M(t){return typeof t=="function"}function it(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let m;function ct(t,e){return t===e?!0:(m||(m=document.createElement("a")),m.href=e,t===m.href)}function st(t){return Object.keys(t).length===0}function A(t,...e){if(t==null){for(const r of e)r(void 0);return j}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function lt(t){let e;return A(t,n=>e=n)(),e}function ot(t,e,n){t.$$.on_destroy.push(A(e,n))}function ut(t,e,n,r){if(t){const i=C(t,e,n,r);return t[0](i)}}function C(t,e,n,r){return t[1]&&r?T(n.ctx.slice(),t[1](r(e))):n.ctx}function at(t,e,n,r){if(t[2]&&r){const i=t[2](r(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const o=[],c=Math.max(e.dirty.length,i.length);for(let l=0;l<c;l+=1)o[l]=e.dirty[l]|i[l];return o}return e.dirty|i}return e.dirty}function ft(t,e,n,r,i,o){if(i){const c=C(e,n,r,o);t.p(c,i)}}function _t(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function dt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function ht(t,e){const n={};e=new Set(e);for(const r in t)!e.has(r)&&r[0]!=="$"&&(n[r]=t[r]);return n}function mt(t){const e={};for(const n in t)e[n]=!0;return e}function pt(t){return t&&M(t.destroy)?t.destroy:j}let y=!1;function yt(){y=!0}function bt(){y=!1}function H(t,e,n,r){for(;t<e;){const i=t+(e-t>>1);n(i)<=r?t=i+1:e=i}return t}function I(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<e.length;u++){const a=e[u];a.claim_order!==void 0&&s.push(a)}e=s}const n=new Int32Array(e.length+1),r=new Int32Array(e.length);n[0]=-1;let i=0;for(let s=0;s<e.length;s++){const u=e[s].claim_order,a=(i>0&&e[n[i]].claim_order<=u?i+1:H(1,i,q=>e[n[q]].claim_order,u))-1;r[s]=n[a]+1;const E=a+1;n[E]=s,i=Math.max(E,i)}const o=[],c=[];let l=e.length-1;for(let s=n[i]+1;s!=0;s=r[s-1]){for(o.push(e[s-1]);l>=s;l--)c.push(e[l]);l--}for(;l>=0;l--)c.push(e[l]);o.reverse(),c.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<c.length;s++){for(;u<o.length&&c[s].claim_order>=o[u].claim_order;)u++;const a=u<o.length?o[u]:null;t.insertBefore(c[s],a)}}function R(t,e){t.appendChild(e)}function z(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function gt(t){const e=O("style");return e.textContent="/* empty */",F(z(t),e),e.sheet}function F(t,e){return R(t.head||t,e),e.sheet}function U(t,e){if(y){for(I(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function xt(t,e,n){y&&!n?U(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function wt(t){t.parentNode&&t.parentNode.removeChild(t)}function O(t){return document.createElement(t)}function W(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function v(t){return document.createTextNode(t)}function vt(){return v(" ")}function kt(){return v("")}function Et(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function k(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const G=["width","height"];function J(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const r in e)e[r]==null?t.removeAttribute(r):r==="style"?t.style.cssText=e[r]:r==="__value"?t.value=t[r]=e[r]:n[r]&&n[r].set&&G.indexOf(r)===-1?t[r]=e[r]:k(t,r,e[r])}function Nt(t,e){for(const n in e)k(t,n,e[n])}function K(t,e){Object.keys(e).forEach(n=>{Q(t,n,e[n])})}function Q(t,e,n){const r=e.toLowerCase();r in t?t[r]=typeof t[r]=="boolean"&&n===""?!0:n:e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:k(t,e,n)}function jt(t){return/-/.test(t)?K:J}function At(t){return t.dataset.svelteH}function Ct(t){return t===""?null:+t}function Ot(t){return Array.from(t.childNodes)}function V(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function S(t,e,n,r,i=!1){V(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,i||(t.claim_info.last_index=c),l}}for(let c=t.claim_info.last_index-1;c>=0;c--){const l=t[c];if(e(l)){const s=n(l);return s===void 0?t.splice(c,1):t[c]=s,i?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,l}}return r()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function D(t,e,n,r){return S(t,i=>i.nodeName===e,i=>{const o=[];for(let c=0;c<i.attributes.length;c++){const l=i.attributes[c];n[l.name]||o.push(l.name)}o.forEach(c=>i.removeAttribute(c))},()=>r(e))}function St(t,e,n){return D(t,e,n,O)}function Dt(t,e,n){return D(t,e,n,W)}function X(t,e){return S(t,n=>n.nodeType===3,n=>{const r=""+e;if(n.data.startsWith(r)){if(n.data.length!==r.length)return n.splitText(r.length)}else n.data=r},()=>v(e),!0)}function Pt(t){return X(t," ")}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Tt(t,e){t.value=e??""}function Bt(t,e,n,r){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function Y(t,e,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:r})}function Lt(t,e){return new t(e)}let p;function b(t){p=t}function h(){if(!p)throw new Error("Function called outside component initialization");return p}function Mt(t){h().$$.on_mount.push(t)}function Ht(t){h().$$.after_update.push(t)}function It(){const t=h();return(e,n,{cancelable:r=!1}={})=>{const i=t.$$.callbacks[e];if(i){const o=Y(e,n,{cancelable:r});return i.slice().forEach(c=>{c.call(t,o)}),!o.defaultPrevented}return!0}}function Rt(t,e){return h().$$.context.set(t,e),e}function zt(t){return h().$$.context.get(t)}function Ft(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(r=>r.call(this,e))}const d=[],N=[];let _=[];const x=[],P=Promise.resolve();let w=!1;function Z(){w||(w=!0,P.then(tt))}function Ut(){return Z(),P}function $(t){_.push(t)}function Wt(t){x.push(t)}const g=new Set;let f=0;function tt(){if(f!==0)return;const t=p;do{try{for(;f<d.length;){const e=d[f];f++,b(e),et(e.$$)}}catch(e){throw d.length=0,f=0,e}for(b(null),d.length=0,f=0;N.length;)N.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];g.has(n)||(g.add(n),n())}_.length=0}while(d.length);for(;x.length;)x.pop()();w=!1,g.clear(),b(t)}function et(t){if(t.fragment!==null){t.update(),L(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach($)}}function Gt(t){const e=[],n=[];_.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),_=e}export{Et as $,z as A,gt as B,L as C,M as D,$ as E,Y as F,nt as G,rt as H,tt as I,st as J,Gt as K,p as L,b as M,B as N,d as O,Z as P,yt as Q,bt as R,lt as S,ht as T,Rt as U,It as V,T as W,dt as X,Ft as Y,jt as Z,pt as _,vt as a,ct as a0,J as a1,mt as a2,zt as a3,Tt as a4,W as a5,Dt as a6,Nt as a7,At as a8,Wt as a9,Ct as aa,Ot as b,St as c,X as d,O as e,wt as f,Pt as g,U as h,xt as i,qt as j,ot as k,ut as l,_t as m,j as n,at as o,kt as p,Ht as q,Mt as r,it as s,v as t,ft as u,k as v,Bt as w,N as x,Lt as y,Ut as z};
