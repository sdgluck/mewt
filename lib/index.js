module.exports=function a(b){let c=Array.isArray(b),e=c?(i)=>[].concat(i):(i)=>Object.assign({},i),f=(i)=>(...j)=>{let k=e(b),l=k[i](...j);return'push pop shift unshift'.includes(i)?[l,a(k)]:Array.isArray(l)?a(l):l},g,h={$set:(i,j)=>(g=e(b),g[i]=j,a(g)),$unset:(i)=>(g=e(b),delete g[i],a(g))};if(!c&&'object'!=typeof b)throw new Error('mewt accepts array or object');return new Proxy(b,{set:()=>{throw new Error(`${c?'array':'object'} is immutable`)},get:(i,j)=>{return h[j]?h[j]:b[j]&&({}.hasOwnProperty.call(b,j)?b[j]:f(j))}})};