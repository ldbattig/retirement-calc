import{f as ye,s as Re,n as ue,r as Be,c as tt}from"../chunks/scheduler.DdoG7fBL.js";import{S as Pe,i as De,e as a,s as i,t as k,c as r,a as v,y as T,f as u,b as L,d as f,o as e,g as Ve,h as t,z as A,A as x,j as et,B as W,u as Te,v as Ne,w as Ue,k as Ge,l as Se,x as je}from"../chunks/index.gvywylhJ.js";import{w as lt}from"../chunks/index.CUXjhjPf.js";const we=lt(30),xe=lt(65),Ee=lt(5e4),Ie=lt(3e4),wt=lt(70),xt=lt(30),ke=lt(2),Le=lt(4);wt.subscribe(l=>{l!==100-ye(xt)&&xt.set(100-l)});xt.subscribe(l=>{l!==100-ye(wt)&&wt.set(100-l)});function Fe(l,n,o,_,d,m,b){const N=n-l,V=o-_,B=d/100*.07+(100-d)/100*.03;let y=0;for(let C=0;C<N;C++)y+=V,y*=1+B;let M=y,g=0;for(;M>0;){const C=_*Math.pow(1+m/100,g);M-=C,M*=1+(B-b/100),g++}return{totalAssets:y,yearsLasted:Math.max(0,g-1)}}function He(l){let n,o,_="Retirement Calculator",d,m,b,N="Current Age",V,h,q,B,y,M,g,C,Et="Retirement Age",bt,w,gt,nt,p,At,z,Y,ce="Annual Income",Bt,U,Tt,J,K,me="Living Expenses",Nt,G,Ut,S,O,de="Stocks Allocation (%)",Gt,R,St,ot,It,jt,Ft,j,Q,pe="Bonds Allocation (%)",Ht,P,Wt,it,kt,qt,Mt,F,X,fe="Annual Inflation (%)",zt,E,Yt,ut,Lt,Jt,Kt,H,Z,he="Withdrawal Rate (%)",Ot,I,Qt,ct,yt,Xt,Zt,D,st,ve="Calculated Assets at Retirement",$t,at,te,Ct=l[7].toFixed(2)+"",Rt,ee,rt,_e="Years Assets Will Last",le,mt,Pt,ne,be;return{c(){n=a("div"),o=a("h1"),o.textContent=_,d=i(),m=a("div"),b=a("label"),b.textContent=N,V=i(),h=a("input"),q=i(),B=a("p"),y=k(l[6]),M=i(),g=a("div"),C=a("label"),C.textContent=Et,bt=i(),w=a("input"),gt=i(),nt=a("p"),p=k(l[5]),At=i(),z=a("div"),Y=a("label"),Y.textContent=ce,Bt=i(),U=a("input"),Tt=i(),J=a("div"),K=a("label"),K.textContent=me,Nt=i(),G=a("input"),Ut=i(),S=a("div"),O=a("label"),O.textContent=de,Gt=i(),R=a("input"),St=i(),ot=a("p"),It=k(l[2]),jt=k("%"),Ft=i(),j=a("div"),Q=a("label"),Q.textContent=pe,Ht=i(),P=a("input"),Wt=i(),it=a("p"),kt=k(l[9]),qt=k("%"),Mt=i(),F=a("div"),X=a("label"),X.textContent=fe,zt=i(),E=a("input"),Yt=i(),ut=a("p"),Lt=k(l[1]),Jt=k("%"),Kt=i(),H=a("div"),Z=a("label"),Z.textContent=he,Ot=i(),I=a("input"),Qt=i(),ct=a("p"),yt=k(l[0]),Xt=k("%"),Zt=i(),D=a("div"),st=a("h2"),st.textContent=ve,$t=i(),at=a("p"),te=k("$"),Rt=k(Ct),ee=i(),rt=a("h2"),rt.textContent=_e,le=i(),mt=a("p"),Pt=k(l[8]),this.h()},l(c){n=r(c,"DIV",{class:!0});var s=v(n);o=r(s,"H1",{class:!0,"data-svelte-h":!0}),T(o)!=="svelte-t7rg25"&&(o.textContent=_),d=u(s),m=r(s,"DIV",{class:!0});var dt=v(m);b=r(dt,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(b)!=="svelte-1txe016"&&(b.textContent=N),V=u(dt),h=r(dt,"INPUT",{type:!0,id:!0,min:!0,max:!0,class:!0}),q=u(dt),B=r(dt,"P",{});var ge=v(B);y=L(ge,l[6]),ge.forEach(f),dt.forEach(f),M=u(s),g=r(s,"DIV",{class:!0});var pt=v(g);C=r(pt,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(C)!=="svelte-r2gjp6"&&(C.textContent=Et),bt=u(pt),w=r(pt,"INPUT",{type:!0,id:!0,min:!0,max:!0,class:!0}),gt=u(pt),nt=r(pt,"P",{});var Ae=v(nt);p=L(Ae,l[5]),Ae.forEach(f),pt.forEach(f),At=u(s),z=r(s,"DIV",{class:!0});var Dt=v(z);Y=r(Dt,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(Y)!=="svelte-1ckw5fu"&&(Y.textContent=ce),Bt=u(Dt),U=r(Dt,"INPUT",{type:!0,id:!0,class:!0}),Dt.forEach(f),Tt=u(s),J=r(s,"DIV",{class:!0});var Vt=v(J);K=r(Vt,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(K)!=="svelte-1ucmkjm"&&(K.textContent=me),Nt=u(Vt),G=r(Vt,"INPUT",{type:!0,id:!0,class:!0}),Vt.forEach(f),Ut=u(s),S=r(s,"DIV",{class:!0});var ft=v(S);O=r(ft,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(O)!=="svelte-127m52x"&&(O.textContent=de),Gt=u(ft),R=r(ft,"INPUT",{type:!0,id:!0,min:!0,max:!0,class:!0}),St=u(ft),ot=r(ft,"P",{});var se=v(ot);It=L(se,l[2]),jt=L(se,"%"),se.forEach(f),ft.forEach(f),Ft=u(s),j=r(s,"DIV",{class:!0});var ht=v(j);Q=r(ht,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(Q)!=="svelte-oetf9h"&&(Q.textContent=pe),Ht=u(ht),P=r(ht,"INPUT",{type:!0,id:!0,min:!0,max:!0,class:!0}),Wt=u(ht),it=r(ht,"P",{});var ae=v(it);kt=L(ae,l[9]),qt=L(ae,"%"),ae.forEach(f),ht.forEach(f),Mt=u(s),F=r(s,"DIV",{class:!0});var vt=v(F);X=r(vt,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(X)!=="svelte-cqd2r0"&&(X.textContent=fe),zt=u(vt),E=r(vt,"INPUT",{type:!0,id:!0,min:!0,max:!0,step:!0,class:!0}),Yt=u(vt),ut=r(vt,"P",{});var re=v(ut);Lt=L(re,l[1]),Jt=L(re,"%"),re.forEach(f),vt.forEach(f),Kt=u(s),H=r(s,"DIV",{class:!0});var _t=v(H);Z=r(_t,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),T(Z)!=="svelte-nsdflu"&&(Z.textContent=he),Ot=u(_t),I=r(_t,"INPUT",{type:!0,id:!0,min:!0,max:!0,step:!0,class:!0}),Qt=u(_t),ct=r(_t,"P",{});var oe=v(ct);yt=L(oe,l[0]),Xt=L(oe,"%"),oe.forEach(f),_t.forEach(f),Zt=u(s),D=r(s,"DIV",{class:!0});var $=v(D);st=r($,"H2",{class:!0,"data-svelte-h":!0}),T(st)!=="svelte-wga5vh"&&(st.textContent=ve),$t=u($),at=r($,"P",{class:!0});var ie=v(at);te=L(ie,"$"),Rt=L(ie,Ct),ie.forEach(f),ee=u($),rt=r($,"H2",{class:!0,"data-svelte-h":!0}),T(rt)!=="svelte-wxb2dd"&&(rt.textContent=_e),le=u($),mt=r($,"P",{class:!0});var Ce=v(mt);Pt=L(Ce,l[8]),Ce.forEach(f),$.forEach(f),s.forEach(f),this.h()},h(){e(o,"class","text-2xl font-bold mb-4"),e(b,"for","currentAge"),e(b,"class","block text-sm font-medium text-gray-700"),e(h,"type","range"),e(h,"id","currentAge"),e(h,"min","20"),e(h,"max","100"),e(h,"class","mt-1 block w-full"),e(m,"class","mb-4"),e(C,"for","retirementAge"),e(C,"class","block text-sm font-medium text-gray-700"),e(w,"type","range"),e(w,"id","retirementAge"),e(w,"min","20"),e(w,"max","100"),e(w,"class","mt-1 block w-full"),e(g,"class","mb-4"),e(Y,"for","annualIncome"),e(Y,"class","block text-sm font-medium text-gray-700"),e(U,"type","number"),e(U,"id","annualIncome"),e(U,"class","mt-1 block w-full"),e(z,"class","mb-4"),e(K,"for","livingExpenses"),e(K,"class","block text-sm font-medium text-gray-700"),e(G,"type","number"),e(G,"id","livingExpenses"),e(G,"class","mt-1 block w-full"),e(J,"class","mb-4"),e(O,"for","stockAllocation"),e(O,"class","block text-sm font-medium text-gray-700"),e(R,"type","range"),e(R,"id","stockAllocation"),e(R,"min","0"),e(R,"max","100"),e(R,"class","mt-1 block w-full"),e(S,"class","mb-4"),e(Q,"for","bondAllocation"),e(Q,"class","block text-sm font-medium text-gray-700"),e(P,"type","range"),e(P,"id","bondAllocation"),e(P,"min","0"),e(P,"max","100"),e(P,"class","mt-1 block w-full"),e(j,"class","mb-4"),e(X,"for","annualInflation"),e(X,"class","block text-sm font-medium text-gray-700"),e(E,"type","range"),e(E,"id","annualInflation"),e(E,"min","0"),e(E,"max","10"),e(E,"step","0.1"),e(E,"class","mt-1 block w-full"),e(F,"class","mb-4"),e(Z,"for","withdrawalRate"),e(Z,"class","block text-sm font-medium text-gray-700"),e(I,"type","range"),e(I,"id","withdrawalRate"),e(I,"min","0"),e(I,"max","10"),e(I,"step","0.1"),e(I,"class","mt-1 block w-full"),e(H,"class","mb-4"),e(st,"class","text-xl font-semibold"),e(at,"class","text-lg font-bold"),e(rt,"class","text-xl font-semibold"),e(mt,"class","text-lg font-bold"),e(D,"class","mt-4 p-4 bg-gray-100 rounded"),e(n,"class","max-w-xl mx-auto p-4 bg-white shadow-md rounded-md")},m(c,s){Ve(c,n,s),t(n,o),t(n,d),t(n,m),t(m,b),t(m,V),t(m,h),A(h,l[6]),t(m,q),t(m,B),t(B,y),t(n,M),t(n,g),t(g,C),t(g,bt),t(g,w),A(w,l[5]),t(g,gt),t(g,nt),t(nt,p),t(n,At),t(n,z),t(z,Y),t(z,Bt),t(z,U),A(U,l[4]),t(n,Tt),t(n,J),t(J,K),t(J,Nt),t(J,G),A(G,l[3]),t(n,Ut),t(n,S),t(S,O),t(S,Gt),t(S,R),A(R,l[2]),t(S,St),t(S,ot),t(ot,It),t(ot,jt),t(n,Ft),t(n,j),t(j,Q),t(j,Ht),t(j,P),A(P,l[9]),t(j,Wt),t(j,it),t(it,kt),t(it,qt),t(n,Mt),t(n,F),t(F,X),t(F,zt),t(F,E),A(E,l[1]),t(F,Yt),t(F,ut),t(ut,Lt),t(ut,Jt),t(n,Kt),t(n,H),t(H,Z),t(H,Ot),t(H,I),A(I,l[0]),t(H,Qt),t(H,ct),t(ct,yt),t(ct,Xt),t(n,Zt),t(n,D),t(D,st),t(D,$t),t(D,at),t(at,te),t(at,Rt),t(D,ee),t(D,rt),t(D,le),t(D,mt),t(mt,Pt),ne||(be=[x(h,"change",l[10]),x(h,"input",l[10]),x(w,"change",l[11]),x(w,"input",l[11]),x(U,"input",l[12]),x(G,"input",l[13]),x(R,"change",l[14]),x(R,"input",l[14]),x(P,"change",l[15]),x(P,"input",l[15]),x(E,"change",l[16]),x(E,"input",l[16]),x(I,"change",l[17]),x(I,"input",l[17])],ne=!0)},p(c,[s]){s&64&&A(h,c[6]),s&64&&et(y,c[6]),s&32&&A(w,c[5]),s&32&&et(p,c[5]),s&16&&W(U.value)!==c[4]&&A(U,c[4]),s&8&&W(G.value)!==c[3]&&A(G,c[3]),s&4&&A(R,c[2]),s&4&&et(It,c[2]),s&512&&A(P,c[9]),s&512&&et(kt,c[9]),s&2&&A(E,c[1]),s&2&&et(Lt,c[1]),s&1&&A(I,c[0]),s&1&&et(yt,c[0]),s&128&&Ct!==(Ct=c[7].toFixed(2)+"")&&et(Rt,Ct),s&256&&et(Pt,c[8])},i:ue,o:ue,d(c){c&&f(n),ne=!1,Be(be)}}}function We(l,n,o){let _,d,m,b,N,V,h,q;tt(l,Le,p=>o(0,_=p)),tt(l,ke,p=>o(1,d=p)),tt(l,wt,p=>o(2,m=p)),tt(l,Ie,p=>o(3,b=p)),tt(l,Ee,p=>o(4,N=p)),tt(l,xe,p=>o(5,V=p)),tt(l,we,p=>o(6,h=p)),tt(l,xt,p=>o(9,q=p));let B=0,y=0;function M(){h=W(this.value),we.set(h)}function g(){V=W(this.value),xe.set(V)}function C(){N=W(this.value),Ee.set(N)}function Et(){b=W(this.value),Ie.set(b)}function bt(){m=W(this.value),wt.set(m)}function w(){q=W(this.value),xt.set(q)}function gt(){d=W(this.value),ke.set(d)}function nt(){_=W(this.value),Le.set(_)}return l.$$.update=()=>{if(l.$$.dirty&127){const{totalAssets:p,yearsLasted:At}=Fe(h,V,N,b,m,d,_);o(7,B=p),o(8,y=At)}},[_,d,m,b,N,V,h,B,y,q,M,g,C,Et,bt,w,gt,nt]}class qe extends Pe{constructor(n){super(),De(this,n,We,He,Re,{})}}function Me(l){let n,o,_;return o=new qe({}),{c(){n=a("div"),Te(o.$$.fragment),this.h()},l(d){n=r(d,"DIV",{class:!0});var m=v(n);Ne(o.$$.fragment,m),m.forEach(f),this.h()},h(){e(n,"class","p-4")},m(d,m){Ve(d,n,m),Ue(o,n,null),_=!0},p:ue,i(d){_||(Ge(o.$$.fragment,d),_=!0)},o(d){Se(o.$$.fragment,d),_=!1},d(d){d&&f(n),je(o)}}}class Ke extends Pe{constructor(n){super(),De(this,n,null,Me,Re,{})}}export{Ke as component};
