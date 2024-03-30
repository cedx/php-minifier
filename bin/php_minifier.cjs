#!/usr/bin/env node
"use strict";var vt=Object.create;var Ue=Object.defineProperty;var Lt=Object.getOwnPropertyDescriptor;var Ot=Object.getOwnPropertyNames;var Pt=Object.getPrototypeOf,kt=Object.prototype.hasOwnProperty;var Z=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var Nt=(e,r,t,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let n of Ot(r))!kt.call(e,n)&&n!==t&&Ue(e,n,{get:()=>r[n],enumerable:!(a=Lt(r,n))||a.enumerable});return e};var ne=(e,r,t)=>(t=e!=null?vt(Pt(e)):{},Nt(r||!e||!e.__esModule?Ue(t,"default",{value:e,enumerable:!0}):t,e));var ie=Z((kr,je)=>{"use strict";var It=require("path"),W="\\\\/",qe=`[^${W}]`,j="\\.",Dt="\\+",Mt="\\?",ye="\\/",Bt="(?=.)",Ke="[^/]",He=`(?:${ye}|$)`,Xe=`(?:^|${ye})`,ve=`${j}{1,2}${He}`,Gt=`(?!${j})`,Ft=`(?!${Xe}${ve})`,Ut=`(?!${j}{0,1}${He})`,qt=`(?!${ve})`,Kt=`[^.${ye}]`,Xt=`${Ke}*?`,We={DOT_LITERAL:j,PLUS_LITERAL:Dt,QMARK_LITERAL:Mt,SLASH_LITERAL:ye,ONE_CHAR:Bt,QMARK:Ke,END_ANCHOR:He,DOTS_SLASH:ve,NO_DOT:Gt,NO_DOTS:Ft,NO_DOT_SLASH:Ut,NO_DOTS_SLASH:qt,QMARK_NO_DOT:Kt,STAR:Xt,START_ANCHOR:Xe},Wt={...We,SLASH_LITERAL:`[${W}]`,QMARK:qe,STAR:`${qe}*?`,DOTS_SLASH:`${j}{1,2}(?:[${W}]|$)`,NO_DOT:`(?!${j})`,NO_DOTS:`(?!(?:^|[${W}])${j}{1,2}(?:[${W}]|$))`,NO_DOT_SLASH:`(?!${j}{0,1}(?:[${W}]|$))`,NO_DOTS_SLASH:`(?!${j}{1,2}(?:[${W}]|$))`,QMARK_NO_DOT:`[^.${W}]`,START_ANCHOR:`(?:^|[${W}])`,END_ANCHOR:`(?:[${W}]|$)`},jt={alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"};je.exports={MAX_LENGTH:1024*64,POSIX_REGEX_SOURCE:jt,REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,SEP:It.sep,extglobChars(e){return{"!":{type:"negate",open:"(?:(?!(?:",close:`))${e.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}},globChars(e){return e===!0?Wt:We}}});var _e=Z(M=>{"use strict";var Qt=require("path"),Yt=process.platform==="win32",{REGEX_BACKSLASH:Vt,REGEX_REMOVE_BACKSLASH:zt,REGEX_SPECIAL_CHARS:Zt,REGEX_SPECIAL_CHARS_GLOBAL:Jt}=ie();M.isObject=e=>e!==null&&typeof e=="object"&&!Array.isArray(e);M.hasRegexChars=e=>Zt.test(e);M.isRegexChar=e=>e.length===1&&M.hasRegexChars(e);M.escapeRegex=e=>e.replace(Jt,"\\$1");M.toPosixSlashes=e=>e.replace(Vt,"/");M.removeBackslashes=e=>e.replace(zt,r=>r==="\\"?"":r);M.supportsLookbehinds=()=>{let e=process.version.slice(1).split(".").map(Number);return e.length===3&&e[0]>=9||e[0]===8&&e[1]>=10};M.isWindows=e=>e&&typeof e.windows=="boolean"?e.windows:Yt===!0||Qt.sep==="\\";M.escapeLast=(e,r,t)=>{let a=e.lastIndexOf(r,t);return a===-1?e:e[a-1]==="\\"?M.escapeLast(e,r,a-1):`${e.slice(0,a)}\\${e.slice(a)}`};M.removePrefix=(e,r={})=>{let t=e;return t.startsWith("./")&&(t=t.slice(2),r.prefix="./"),t};M.wrapOutput=(e,r={},t={})=>{let a=t.contains?"":"^",n=t.contains?"":"$",l=`${a}(?:${e})${n}`;return r.negated===!0&&(l=`(?:^(?!${l}).*$)`),l}});var tt=Z((Ir,et)=>{"use strict";var Qe=_e(),{CHAR_ASTERISK:Le,CHAR_AT:er,CHAR_BACKWARD_SLASH:ae,CHAR_COMMA:tr,CHAR_DOT:Oe,CHAR_EXCLAMATION_MARK:Pe,CHAR_FORWARD_SLASH:Je,CHAR_LEFT_CURLY_BRACE:ke,CHAR_LEFT_PARENTHESES:Ne,CHAR_LEFT_SQUARE_BRACKET:rr,CHAR_PLUS:sr,CHAR_QUESTION_MARK:Ye,CHAR_RIGHT_CURLY_BRACE:or,CHAR_RIGHT_PARENTHESES:Ve,CHAR_RIGHT_SQUARE_BRACKET:nr}=ie(),ze=e=>e===Je||e===ae,Ze=e=>{e.isPrefix!==!0&&(e.depth=e.isGlobstar?1/0:1)},ir=(e,r)=>{let t=r||{},a=e.length-1,n=t.parts===!0||t.scanToEnd===!0,l=[],p=[],d=[],y=e,T=-1,A=0,v=0,O=!1,k=!1,E=!1,w=!1,Q=!1,U=!1,F=!1,C=!1,q=!1,P=!1,Y=0,N,f,m={value:"",depth:0,isGlob:!1},L=()=>T>=a,i=()=>y.charCodeAt(T+1),x=()=>(N=f,y.charCodeAt(++T));for(;T<a;){f=x();let I;if(f===ae){F=m.backslashes=!0,f=x(),f===ke&&(U=!0);continue}if(U===!0||f===ke){for(Y++;L()!==!0&&(f=x());){if(f===ae){F=m.backslashes=!0,x();continue}if(f===ke){Y++;continue}if(U!==!0&&f===Oe&&(f=x())===Oe){if(O=m.isBrace=!0,E=m.isGlob=!0,P=!0,n===!0)continue;break}if(U!==!0&&f===tr){if(O=m.isBrace=!0,E=m.isGlob=!0,P=!0,n===!0)continue;break}if(f===or&&(Y--,Y===0)){U=!1,O=m.isBrace=!0,P=!0;break}}if(n===!0)continue;break}if(f===Je){if(l.push(T),p.push(m),m={value:"",depth:0,isGlob:!1},P===!0)continue;if(N===Oe&&T===A+1){A+=2;continue}v=T+1;continue}if(t.noext!==!0&&(f===sr||f===er||f===Le||f===Ye||f===Pe)===!0&&i()===Ne){if(E=m.isGlob=!0,w=m.isExtglob=!0,P=!0,f===Pe&&T===A&&(q=!0),n===!0){for(;L()!==!0&&(f=x());){if(f===ae){F=m.backslashes=!0,f=x();continue}if(f===Ve){E=m.isGlob=!0,P=!0;break}}continue}break}if(f===Le){if(N===Le&&(Q=m.isGlobstar=!0),E=m.isGlob=!0,P=!0,n===!0)continue;break}if(f===Ye){if(E=m.isGlob=!0,P=!0,n===!0)continue;break}if(f===rr){for(;L()!==!0&&(I=x());){if(I===ae){F=m.backslashes=!0,x();continue}if(I===nr){k=m.isBracket=!0,E=m.isGlob=!0,P=!0;break}}if(n===!0)continue;break}if(t.nonegate!==!0&&f===Pe&&T===A){C=m.negated=!0,A++;continue}if(t.noparen!==!0&&f===Ne){if(E=m.isGlob=!0,n===!0){for(;L()!==!0&&(f=x());){if(f===Ne){F=m.backslashes=!0,f=x();continue}if(f===Ve){P=!0;break}}continue}break}if(E===!0){if(P=!0,n===!0)continue;break}}t.noext===!0&&(w=!1,E=!1);let R=y,V="",s="";A>0&&(V=y.slice(0,A),y=y.slice(A),v-=A),R&&E===!0&&v>0?(R=y.slice(0,v),s=y.slice(v)):E===!0?(R="",s=y):R=y,R&&R!==""&&R!=="/"&&R!==y&&ze(R.charCodeAt(R.length-1))&&(R=R.slice(0,-1)),t.unescape===!0&&(s&&(s=Qe.removeBackslashes(s)),R&&F===!0&&(R=Qe.removeBackslashes(R)));let o={prefix:V,input:e,start:A,base:R,glob:s,isBrace:O,isBracket:k,isGlob:E,isExtglob:w,isGlobstar:Q,negated:C,negatedExtglob:q};if(t.tokens===!0&&(o.maxDepth=0,ze(f)||p.push(m),o.tokens=p),t.parts===!0||t.tokens===!0){let I;for(let g=0;g<l.length;g++){let K=I?I+1:A,X=l[g],B=e.slice(K,X);t.tokens&&(g===0&&A!==0?(p[g].isPrefix=!0,p[g].value=V):p[g].value=B,Ze(p[g]),o.maxDepth+=p[g].depth),(g!==0||B!=="")&&d.push(B),I=X}if(I&&I+1<e.length){let g=e.slice(I+1);d.push(g),t.tokens&&(p[p.length-1].value=g,Ze(p[p.length-1]),o.maxDepth+=p[p.length-1].depth)}o.slashes=l,o.parts=d}return o};et.exports=ir});var ot=Z((Dr,st)=>{"use strict";var ge=ie(),G=_e(),{MAX_LENGTH:me,POSIX_REGEX_SOURCE:ar,REGEX_NON_SPECIAL_CHARS:ur,REGEX_SPECIAL_CHARS_BACKREF:cr,REPLACEMENTS:rt}=ge,lr=(e,r)=>{if(typeof r.expandRange=="function")return r.expandRange(...e,r);e.sort();let t=`[${e.join("-")}]`;try{new RegExp(t)}catch{return e.map(n=>G.escapeRegex(n)).join("..")}return t},ee=(e,r)=>`Missing ${e}: "${r}" - use "\\\\${r}" to match literal characters`,Ie=(e,r)=>{if(typeof e!="string")throw new TypeError("Expected a string");e=rt[e]||e;let t={...r},a=typeof t.maxLength=="number"?Math.min(me,t.maxLength):me,n=e.length;if(n>a)throw new SyntaxError(`Input length: ${n}, exceeds maximum allowed length: ${a}`);let l={type:"bos",value:"",output:t.prepend||""},p=[l],d=t.capture?"":"?:",y=G.isWindows(r),T=ge.globChars(y),A=ge.extglobChars(T),{DOT_LITERAL:v,PLUS_LITERAL:O,SLASH_LITERAL:k,ONE_CHAR:E,DOTS_SLASH:w,NO_DOT:Q,NO_DOT_SLASH:U,NO_DOTS_SLASH:F,QMARK:C,QMARK_NO_DOT:q,STAR:P,START_ANCHOR:Y}=T,N=c=>`(${d}(?:(?!${Y}${c.dot?w:v}).)*?)`,f=t.dot?"":Q,m=t.dot?C:q,L=t.bash===!0?N(t):P;t.capture&&(L=`(${L})`),typeof t.noext=="boolean"&&(t.noextglob=t.noext);let i={input:e,index:-1,start:0,dot:t.dot===!0,consumed:"",output:"",prefix:"",backtrack:!1,negated:!1,brackets:0,braces:0,parens:0,quotes:0,globstar:!1,tokens:p};e=G.removePrefix(e,i),n=e.length;let x=[],R=[],V=[],s=l,o,I=()=>i.index===n-1,g=i.peek=(c=1)=>e[i.index+c],K=i.advance=()=>e[++i.index]||"",X=()=>e.slice(i.index+1),B=(c="",b=0)=>{i.consumed+=c,i.index+=b},pe=c=>{i.output+=c.output!=null?c.output:c.value,B(c.value)},Tt=()=>{let c=1;for(;g()==="!"&&(g(2)!=="("||g(3)==="?");)K(),i.start++,c++;return c%2===0?!1:(i.negated=!0,i.start++,!0)},fe=c=>{i[c]++,V.push(c)},z=c=>{i[c]--,V.pop()},_=c=>{if(s.type==="globstar"){let b=i.braces>0&&(c.type==="comma"||c.type==="brace"),u=c.extglob===!0||x.length&&(c.type==="pipe"||c.type==="paren");c.type!=="slash"&&c.type!=="paren"&&!b&&!u&&(i.output=i.output.slice(0,-s.output.length),s.type="star",s.value="*",s.output=L,i.output+=s.output)}if(x.length&&c.type!=="paren"&&(x[x.length-1].inner+=c.value),(c.value||c.output)&&pe(c),s&&s.type==="text"&&c.type==="text"){s.value+=c.value,s.output=(s.output||"")+c.value;return}c.prev=s,p.push(c),s=c},he=(c,b)=>{let u={...A[b],conditions:1,inner:""};u.prev=s,u.parens=i.parens,u.output=i.output;let h=(t.capture?"(":"")+u.open;fe("parens"),_({type:c,value:b,output:i.output?"":E}),_({type:"paren",extglob:!0,value:K(),output:h}),x.push(u)},Ht=c=>{let b=c.close+(t.capture?")":""),u;if(c.type==="negate"){let h=L;if(c.inner&&c.inner.length>1&&c.inner.includes("/")&&(h=N(t)),(h!==L||I()||/^\)+$/.test(X()))&&(b=c.close=`)$))${h}`),c.inner.includes("*")&&(u=X())&&/^\.[^\\/.]+$/.test(u)){let S=Ie(u,{...r,fastpaths:!1}).output;b=c.close=`)${S})${h})`}c.prev.type==="bos"&&(i.negatedExtglob=!0)}_({type:"paren",extglob:!0,value:o,output:b}),z("parens")};if(t.fastpaths!==!1&&!/(^[*!]|[/()[\]{}"])/.test(e)){let c=!1,b=e.replace(cr,(u,h,S,D,H,Te)=>D==="\\"?(c=!0,u):D==="?"?h?h+D+(H?C.repeat(H.length):""):Te===0?m+(H?C.repeat(H.length):""):C.repeat(S.length):D==="."?v.repeat(S.length):D==="*"?h?h+D+(H?L:""):L:h?u:`\\${u}`);return c===!0&&(t.unescape===!0?b=b.replace(/\\/g,""):b=b.replace(/\\+/g,u=>u.length%2===0?"\\\\":u?"\\":"")),b===e&&t.contains===!0?(i.output=e,i):(i.output=G.wrapOutput(b,i,r),i)}for(;!I();){if(o=K(),o==="\0")continue;if(o==="\\"){let u=g();if(u==="/"&&t.bash!==!0||u==="."||u===";")continue;if(!u){o+="\\",_({type:"text",value:o});continue}let h=/^\\+/.exec(X()),S=0;if(h&&h[0].length>2&&(S=h[0].length,i.index+=S,S%2!==0&&(o+="\\")),t.unescape===!0?o=K():o+=K(),i.brackets===0){_({type:"text",value:o});continue}}if(i.brackets>0&&(o!=="]"||s.value==="["||s.value==="[^")){if(t.posix!==!1&&o===":"){let u=s.value.slice(1);if(u.includes("[")&&(s.posix=!0,u.includes(":"))){let h=s.value.lastIndexOf("["),S=s.value.slice(0,h),D=s.value.slice(h+2),H=ar[D];if(H){s.value=S+H,i.backtrack=!0,K(),!l.output&&p.indexOf(s)===1&&(l.output=E);continue}}}(o==="["&&g()!==":"||o==="-"&&g()==="]")&&(o=`\\${o}`),o==="]"&&(s.value==="["||s.value==="[^")&&(o=`\\${o}`),t.posix===!0&&o==="!"&&s.value==="["&&(o="^"),s.value+=o,pe({value:o});continue}if(i.quotes===1&&o!=='"'){o=G.escapeRegex(o),s.value+=o,pe({value:o});continue}if(o==='"'){i.quotes=i.quotes===1?0:1,t.keepQuotes===!0&&_({type:"text",value:o});continue}if(o==="("){fe("parens"),_({type:"paren",value:o});continue}if(o===")"){if(i.parens===0&&t.strictBrackets===!0)throw new SyntaxError(ee("opening","("));let u=x[x.length-1];if(u&&i.parens===u.parens+1){Ht(x.pop());continue}_({type:"paren",value:o,output:i.parens?")":"\\)"}),z("parens");continue}if(o==="["){if(t.nobracket===!0||!X().includes("]")){if(t.nobracket!==!0&&t.strictBrackets===!0)throw new SyntaxError(ee("closing","]"));o=`\\${o}`}else fe("brackets");_({type:"bracket",value:o});continue}if(o==="]"){if(t.nobracket===!0||s&&s.type==="bracket"&&s.value.length===1){_({type:"text",value:o,output:`\\${o}`});continue}if(i.brackets===0){if(t.strictBrackets===!0)throw new SyntaxError(ee("opening","["));_({type:"text",value:o,output:`\\${o}`});continue}z("brackets");let u=s.value.slice(1);if(s.posix!==!0&&u[0]==="^"&&!u.includes("/")&&(o=`/${o}`),s.value+=o,pe({value:o}),t.literalBrackets===!1||G.hasRegexChars(u))continue;let h=G.escapeRegex(s.value);if(i.output=i.output.slice(0,-s.value.length),t.literalBrackets===!0){i.output+=h,s.value=h;continue}s.value=`(${d}${h}|${s.value})`,i.output+=s.value;continue}if(o==="{"&&t.nobrace!==!0){fe("braces");let u={type:"brace",value:o,output:"(",outputIndex:i.output.length,tokensIndex:i.tokens.length};R.push(u),_(u);continue}if(o==="}"){let u=R[R.length-1];if(t.nobrace===!0||!u){_({type:"text",value:o,output:o});continue}let h=")";if(u.dots===!0){let S=p.slice(),D=[];for(let H=S.length-1;H>=0&&(p.pop(),S[H].type!=="brace");H--)S[H].type!=="dots"&&D.unshift(S[H].value);h=lr(D,t),i.backtrack=!0}if(u.comma!==!0&&u.dots!==!0){let S=i.output.slice(0,u.outputIndex),D=i.tokens.slice(u.tokensIndex);u.value=u.output="\\{",o=h="\\}",i.output=S;for(let H of D)i.output+=H.output||H.value}_({type:"brace",value:o,output:h}),z("braces"),R.pop();continue}if(o==="|"){x.length>0&&x[x.length-1].conditions++,_({type:"text",value:o});continue}if(o===","){let u=o,h=R[R.length-1];h&&V[V.length-1]==="braces"&&(h.comma=!0,u="|"),_({type:"comma",value:o,output:u});continue}if(o==="/"){if(s.type==="dot"&&i.index===i.start+1){i.start=i.index+1,i.consumed="",i.output="",p.pop(),s=l;continue}_({type:"slash",value:o,output:k});continue}if(o==="."){if(i.braces>0&&s.type==="dot"){s.value==="."&&(s.output=v);let u=R[R.length-1];s.type="dots",s.output+=o,s.value+=o,u.dots=!0;continue}if(i.braces+i.parens===0&&s.type!=="bos"&&s.type!=="slash"){_({type:"text",value:o,output:v});continue}_({type:"dot",value:o,output:v});continue}if(o==="?"){if(!(s&&s.value==="(")&&t.noextglob!==!0&&g()==="("&&g(2)!=="?"){he("qmark",o);continue}if(s&&s.type==="paren"){let h=g(),S=o;if(h==="<"&&!G.supportsLookbehinds())throw new Error("Node.js v10 or higher is required for regex lookbehinds");(s.value==="("&&!/[!=<:]/.test(h)||h==="<"&&!/<([!=]|\w+>)/.test(X()))&&(S=`\\${o}`),_({type:"text",value:o,output:S});continue}if(t.dot!==!0&&(s.type==="slash"||s.type==="bos")){_({type:"qmark",value:o,output:q});continue}_({type:"qmark",value:o,output:C});continue}if(o==="!"){if(t.noextglob!==!0&&g()==="("&&(g(2)!=="?"||!/[!=<:]/.test(g(3)))){he("negate",o);continue}if(t.nonegate!==!0&&i.index===0){Tt();continue}}if(o==="+"){if(t.noextglob!==!0&&g()==="("&&g(2)!=="?"){he("plus",o);continue}if(s&&s.value==="("||t.regex===!1){_({type:"plus",value:o,output:O});continue}if(s&&(s.type==="bracket"||s.type==="paren"||s.type==="brace")||i.parens>0){_({type:"plus",value:o});continue}_({type:"plus",value:O});continue}if(o==="@"){if(t.noextglob!==!0&&g()==="("&&g(2)!=="?"){_({type:"at",extglob:!0,value:o,output:""});continue}_({type:"text",value:o});continue}if(o!=="*"){(o==="$"||o==="^")&&(o=`\\${o}`);let u=ur.exec(X());u&&(o+=u[0],i.index+=u[0].length),_({type:"text",value:o});continue}if(s&&(s.type==="globstar"||s.star===!0)){s.type="star",s.star=!0,s.value+=o,s.output=L,i.backtrack=!0,i.globstar=!0,B(o);continue}let c=X();if(t.noextglob!==!0&&/^\([^?]/.test(c)){he("star",o);continue}if(s.type==="star"){if(t.noglobstar===!0){B(o);continue}let u=s.prev,h=u.prev,S=u.type==="slash"||u.type==="bos",D=h&&(h.type==="star"||h.type==="globstar");if(t.bash===!0&&(!S||c[0]&&c[0]!=="/")){_({type:"star",value:o,output:""});continue}let H=i.braces>0&&(u.type==="comma"||u.type==="brace"),Te=x.length&&(u.type==="pipe"||u.type==="paren");if(!S&&u.type!=="paren"&&!H&&!Te){_({type:"star",value:o,output:""});continue}for(;c.slice(0,3)==="/**";){let de=e[i.index+4];if(de&&de!=="/")break;c=c.slice(3),B("/**",3)}if(u.type==="bos"&&I()){s.type="globstar",s.value+=o,s.output=N(t),i.output=s.output,i.globstar=!0,B(o);continue}if(u.type==="slash"&&u.prev.type!=="bos"&&!D&&I()){i.output=i.output.slice(0,-(u.output+s.output).length),u.output=`(?:${u.output}`,s.type="globstar",s.output=N(t)+(t.strictSlashes?")":"|$)"),s.value+=o,i.globstar=!0,i.output+=u.output+s.output,B(o);continue}if(u.type==="slash"&&u.prev.type!=="bos"&&c[0]==="/"){let de=c[1]!==void 0?"|$":"";i.output=i.output.slice(0,-(u.output+s.output).length),u.output=`(?:${u.output}`,s.type="globstar",s.output=`${N(t)}${k}|${k}${de})`,s.value+=o,i.output+=u.output+s.output,i.globstar=!0,B(o+K()),_({type:"slash",value:"/",output:""});continue}if(u.type==="bos"&&c[0]==="/"){s.type="globstar",s.value+=o,s.output=`(?:^|${k}|${N(t)}${k})`,i.output=s.output,i.globstar=!0,B(o+K()),_({type:"slash",value:"/",output:""});continue}i.output=i.output.slice(0,-s.output.length),s.type="globstar",s.output=N(t),s.value+=o,i.output+=s.output,i.globstar=!0,B(o);continue}let b={type:"star",value:o,output:L};if(t.bash===!0){b.output=".*?",(s.type==="bos"||s.type==="slash")&&(b.output=f+b.output),_(b);continue}if(s&&(s.type==="bracket"||s.type==="paren")&&t.regex===!0){b.output=o,_(b);continue}(i.index===i.start||s.type==="slash"||s.type==="dot")&&(s.type==="dot"?(i.output+=U,s.output+=U):t.dot===!0?(i.output+=F,s.output+=F):(i.output+=f,s.output+=f),g()!=="*"&&(i.output+=E,s.output+=E)),_(b)}for(;i.brackets>0;){if(t.strictBrackets===!0)throw new SyntaxError(ee("closing","]"));i.output=G.escapeLast(i.output,"["),z("brackets")}for(;i.parens>0;){if(t.strictBrackets===!0)throw new SyntaxError(ee("closing",")"));i.output=G.escapeLast(i.output,"("),z("parens")}for(;i.braces>0;){if(t.strictBrackets===!0)throw new SyntaxError(ee("closing","}"));i.output=G.escapeLast(i.output,"{"),z("braces")}if(t.strictSlashes!==!0&&(s.type==="star"||s.type==="bracket")&&_({type:"maybe_slash",value:"",output:`${k}?`}),i.backtrack===!0){i.output="";for(let c of i.tokens)i.output+=c.output!=null?c.output:c.value,c.suffix&&(i.output+=c.suffix)}return i};Ie.fastpaths=(e,r)=>{let t={...r},a=typeof t.maxLength=="number"?Math.min(me,t.maxLength):me,n=e.length;if(n>a)throw new SyntaxError(`Input length: ${n}, exceeds maximum allowed length: ${a}`);e=rt[e]||e;let l=G.isWindows(r),{DOT_LITERAL:p,SLASH_LITERAL:d,ONE_CHAR:y,DOTS_SLASH:T,NO_DOT:A,NO_DOTS:v,NO_DOTS_SLASH:O,STAR:k,START_ANCHOR:E}=ge.globChars(l),w=t.dot?v:A,Q=t.dot?O:A,U=t.capture?"":"?:",F={negated:!1,prefix:""},C=t.bash===!0?".*?":k;t.capture&&(C=`(${C})`);let q=f=>f.noglobstar===!0?C:`(${U}(?:(?!${E}${f.dot?T:p}).)*?)`,P=f=>{switch(f){case"*":return`${w}${y}${C}`;case".*":return`${p}${y}${C}`;case"*.*":return`${w}${C}${p}${y}${C}`;case"*/*":return`${w}${C}${d}${y}${Q}${C}`;case"**":return w+q(t);case"**/*":return`(?:${w}${q(t)}${d})?${Q}${y}${C}`;case"**/*.*":return`(?:${w}${q(t)}${d})?${Q}${C}${p}${y}${C}`;case"**/.*":return`(?:${w}${q(t)}${d})?${p}${y}${C}`;default:{let m=/^(.*?)\.(\w+)$/.exec(f);if(!m)return;let L=P(m[1]);return L?L+p+m[2]:void 0}}},Y=G.removePrefix(e,F),N=P(Y);return N&&t.strictSlashes!==!0&&(N+=`${d}?`),N};st.exports=Ie});var it=Z((Mr,nt)=>{"use strict";var pr=require("path"),fr=tt(),De=ot(),Me=_e(),hr=ie(),dr=e=>e&&typeof e=="object"&&!Array.isArray(e),$=(e,r,t=!1)=>{if(Array.isArray(e)){let A=e.map(O=>$(O,r,t));return O=>{for(let k of A){let E=k(O);if(E)return E}return!1}}let a=dr(e)&&e.tokens&&e.input;if(e===""||typeof e!="string"&&!a)throw new TypeError("Expected pattern to be a non-empty string");let n=r||{},l=Me.isWindows(r),p=a?$.compileRe(e,r):$.makeRe(e,r,!1,!0),d=p.state;delete p.state;let y=()=>!1;if(n.ignore){let A={...r,ignore:null,onMatch:null,onResult:null};y=$(n.ignore,A,t)}let T=(A,v=!1)=>{let{isMatch:O,match:k,output:E}=$.test(A,p,r,{glob:e,posix:l}),w={glob:e,state:d,regex:p,posix:l,input:A,output:E,match:k,isMatch:O};return typeof n.onResult=="function"&&n.onResult(w),O===!1?(w.isMatch=!1,v?w:!1):y(A)?(typeof n.onIgnore=="function"&&n.onIgnore(w),w.isMatch=!1,v?w:!1):(typeof n.onMatch=="function"&&n.onMatch(w),v?w:!0)};return t&&(T.state=d),T};$.test=(e,r,t,{glob:a,posix:n}={})=>{if(typeof e!="string")throw new TypeError("Expected input to be a string");if(e==="")return{isMatch:!1,output:""};let l=t||{},p=l.format||(n?Me.toPosixSlashes:null),d=e===a,y=d&&p?p(e):e;return d===!1&&(y=p?p(e):e,d=y===a),(d===!1||l.capture===!0)&&(l.matchBase===!0||l.basename===!0?d=$.matchBase(e,r,t,n):d=r.exec(y)),{isMatch:!!d,match:d,output:y}};$.matchBase=(e,r,t,a=Me.isWindows(t))=>(r instanceof RegExp?r:$.makeRe(r,t)).test(pr.basename(e));$.isMatch=(e,r,t)=>$(r,t)(e);$.parse=(e,r)=>Array.isArray(e)?e.map(t=>$.parse(t,r)):De(e,{...r,fastpaths:!1});$.scan=(e,r)=>fr(e,r);$.compileRe=(e,r,t=!1,a=!1)=>{if(t===!0)return e.output;let n=r||{},l=n.contains?"":"^",p=n.contains?"":"$",d=`${l}(?:${e.output})${p}`;e&&e.negated===!0&&(d=`^(?!${d}).*$`);let y=$.toRegex(d,r);return a===!0&&(y.state=e),y};$.makeRe=(e,r={},t=!1,a=!1)=>{if(!e||typeof e!="string")throw new TypeError("Expected a non-empty string");let n={negated:!1,fastpaths:!0};return r.fastpaths!==!1&&(e[0]==="."||e[0]==="*")&&(n.output=De.fastpaths(e,r)),n.output||(n=De(e,r)),$.compileRe(n,r,t,a)};$.toRegex=(e,r)=>{try{let t=r||{};return new RegExp(e,t.flags||(t.nocase?"i":""))}catch(t){if(r&&r.debug===!0)throw t;return/$^/}};$.constants=hr;nt.exports=$});var ut=Z((Br,at)=>{"use strict";at.exports=it()});var _t=Z((Gr,yt)=>{"use strict";var ce=require("fs"),{Readable:yr}=require("stream"),ue=require("path"),{promisify:be}=require("util"),Be=ut(),_r=be(ce.readdir),gr=be(ce.stat),ct=be(ce.lstat),mr=be(ce.realpath),Ar="!",ht="READDIRP_RECURSIVE_ERROR",Er=new Set(["ENOENT","EPERM","EACCES","ELOOP",ht]),Ge="files",dt="directories",Ee="files_directories",Ae="all",lt=[Ge,dt,Ee,Ae],Rr=e=>Er.has(e.code),[pt,br]=process.versions.node.split(".").slice(0,2).map(e=>Number.parseInt(e,10)),xr=process.platform==="win32"&&(pt>10||pt===10&&br>=5),ft=e=>{if(e!==void 0){if(typeof e=="function")return e;if(typeof e=="string"){let r=Be(e.trim());return t=>r(t.basename)}if(Array.isArray(e)){let r=[],t=[];for(let a of e){let n=a.trim();n.charAt(0)===Ar?t.push(Be(n.slice(1))):r.push(Be(n))}return t.length>0?r.length>0?a=>r.some(n=>n(a.basename))&&!t.some(n=>n(a.basename)):a=>!t.some(n=>n(a.basename)):a=>r.some(n=>n(a.basename))}}},Re=class e extends yr{static get defaultOptions(){return{root:".",fileFilter:r=>!0,directoryFilter:r=>!0,type:Ge,lstat:!1,depth:2147483648,alwaysStat:!1}}constructor(r={}){super({objectMode:!0,autoDestroy:!0,highWaterMark:r.highWaterMark||4096});let t={...e.defaultOptions,...r},{root:a,type:n}=t;this._fileFilter=ft(t.fileFilter),this._directoryFilter=ft(t.directoryFilter);let l=t.lstat?ct:gr;xr?this._stat=p=>l(p,{bigint:!0}):this._stat=l,this._maxDepth=t.depth,this._wantsDir=[dt,Ee,Ae].includes(n),this._wantsFile=[Ge,Ee,Ae].includes(n),this._wantsEverything=n===Ae,this._root=ue.resolve(a),this._isDirent="Dirent"in ce&&!t.alwaysStat,this._statsProp=this._isDirent?"dirent":"stats",this._rdOptions={encoding:"utf8",withFileTypes:this._isDirent},this.parents=[this._exploreDir(a,1)],this.reading=!1,this.parent=void 0}async _read(r){if(!this.reading){this.reading=!0;try{for(;!this.destroyed&&r>0;){let{path:t,depth:a,files:n=[]}=this.parent||{};if(n.length>0){let l=n.splice(0,r).map(p=>this._formatEntry(p,t));for(let p of await Promise.all(l)){if(this.destroyed)return;let d=await this._getEntryType(p);d==="directory"&&this._directoryFilter(p)?(a<=this._maxDepth&&this.parents.push(this._exploreDir(p.fullPath,a+1)),this._wantsDir&&(this.push(p),r--)):(d==="file"||this._includeAsFile(p))&&this._fileFilter(p)&&this._wantsFile&&(this.push(p),r--)}}else{let l=this.parents.pop();if(!l){this.push(null);break}if(this.parent=await l,this.destroyed)return}}}catch(t){this.destroy(t)}finally{this.reading=!1}}}async _exploreDir(r,t){let a;try{a=await _r(r,this._rdOptions)}catch(n){this._onError(n)}return{files:a,depth:t,path:r}}async _formatEntry(r,t){let a;try{let n=this._isDirent?r.name:r,l=ue.resolve(ue.join(t,n));a={path:ue.relative(this._root,l),fullPath:l,basename:n},a[this._statsProp]=this._isDirent?r:await this._stat(l)}catch(n){this._onError(n)}return a}_onError(r){Rr(r)&&!this.destroyed?this.emit("warn",r):this.destroy(r)}async _getEntryType(r){let t=r&&r[this._statsProp];if(t){if(t.isFile())return"file";if(t.isDirectory())return"directory";if(t&&t.isSymbolicLink()){let a=r.fullPath;try{let n=await mr(a),l=await ct(n);if(l.isFile())return"file";if(l.isDirectory()){let p=n.length;if(a.startsWith(n)&&a.substr(p,1)===ue.sep){let d=new Error(`Circular symlink detected: "${a}" points to "${n}"`);return d.code=ht,this._onError(d)}return"directory"}}catch(n){this._onError(n)}}}}_includeAsFile(r){let t=r&&r[this._statsProp];return t&&this._wantsEverything&&!t.isDirectory()}},te=(e,r={})=>{let t=r.entryType||r.type;if(t==="both"&&(t=Ee),t&&(r.type=t),e){if(typeof e!="string")throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");if(t&&!lt.includes(t))throw new Error(`readdirp: Invalid type passed. Use one of ${lt.join(", ")}`)}else throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");return r.root=e,new Re(r)},Sr=(e,r={})=>new Promise((t,a)=>{let n=[];te(e,r).on("data",l=>n.push(l)).on("end",()=>t(n)).on("error",l=>a(l))});te.promise=Sr;te.ReaddirpStream=Re;te.default=te;yt.exports=te});var $e=ne(require("node:console"),1),oe=require("node:fs/promises"),J=require("node:path"),wt=ne(require("node:process"),1),Ct=require("node:util"),$t=ne(_t(),1);var gt={bugs:"https://github.com/cedx/php-minifier/issues",description:"Minify PHP source code by removing comments and whitespace.",homepage:"https://docs.belin.io/php-minifier",license:"MIT",name:"@cedx/php-minifier",repository:"cedx/php-minifier",type:"module",version:"2.1.1",author:{email:"cedric@belin.io",name:"C\xE9dric Belin",url:"https://belin.io"},bin:{php_minifier:"./bin/php_minifier.cjs"},dependencies:{"fancy-log":"^2.0.0","get-port":"^7.1.0","plugin-error":"^2.0.1",readdirp:"^3.6.0"},devDependencies:{"@types/eslint__js":"^8.42.3","@types/fancy-log":"^2.0.2","@types/gulp":"^4.0.17","@types/node":"^20.12.2","@types/vinyl":"^2.0.11",del:"^7.1.0",esbuild:"^0.20.2",eslint:"^8.57.0",execa:"^8.0.1",gulp:"^5.0.0",typedoc:"^0.25.12",typescript:"^5.4.3","typescript-eslint":"^7.4.0",vinyl:"^3.0.0"},engines:{node:">=20.0.0"},exports:{types:"./lib/index.d.ts",import:"./lib/index.js"},files:["lib/","src/","www/"],keywords:["compress","gulp","gulpplugin","minify","php"],optionalDependencies:{gulp:">=4.0.0"},scripts:{prepack:"gulp",start:"gulp build && node bin/php_minifier.cjs --help",test:"gulp build && node --test --test-reporter=spec"}};var bt=require("node:child_process"),se=require("node:path"),xt=require("node:url");var Et=ne(require("node:net"),1),Rt=ne(require("node:os"),1),xe=class extends Error{constructor(r){super(`${r} is locked`)}},re={old:new Set,young:new Set},Cr=1e3*15;var le,$r=()=>{let e=Rt.default.networkInterfaces(),r=new Set([void 0,"0.0.0.0"]);for(let t of Object.values(e))for(let a of t)r.add(a.address);return r},mt=e=>new Promise((r,t)=>{let a=Et.default.createServer();a.unref(),a.on("error",t),a.listen(e,()=>{let{port:n}=a.address();a.close(()=>{r(n)})})}),At=async(e,r)=>{if(e.host||e.port===0)return mt(e);for(let t of r)try{await mt({port:e.port,host:t})}catch(a){if(!["EADDRNOTAVAIL","EINVAL"].includes(a.code))throw a}return e.port},Tr=function*(e){e&&(yield*e),yield 0};async function Fe(e){let r,t=new Set;if(e&&(e.port&&(r=typeof e.port=="number"?[e.port]:e.port),e.exclude)){let n=e.exclude;if(typeof n[Symbol.iterator]!="function")throw new TypeError("The `exclude` option must be an iterable.");for(let l of n){if(typeof l!="number")throw new TypeError("Each item in the `exclude` option must be a number corresponding to the port you want excluded.");if(!Number.isSafeInteger(l))throw new TypeError(`Number ${l} in the exclude option is not a safe integer and can't be used`)}t=new Set(n)}le===void 0&&(le=setTimeout(()=>{le=void 0,re.old=re.young,re.young=new Set},Cr),le.unref&&le.unref());let a=$r();for(let n of Tr(r))try{if(t.has(n))continue;let l=await At({...e,port:n},a);for(;re.old.has(l)||re.young.has(l);){if(n!==0)throw new xe(n);l=await At({...e,port:n},a)}return re.young.add(l),l}catch(l){if(!["EADDRINUSE","EACCES"].includes(l.code)&&!(l instanceof xe))throw l}throw new Error("No available ports found")}var Hr={},Se=class e{static#t="127.0.0.1";#s;#r=-1;#e=null;constructor(r="php"){this.#s=(0,se.normalize)(r)}close(){return this.#e?.kill(),this.#e=null,Promise.resolve()}async listen(){return this.#e?this.#r:(this.#r=await Fe(),new Promise((r,t)=>{let a=typeof module>"u"?(0,xt.fileURLToPath)(new URL("../www",Hr.url)):(0,se.join)(__dirname,"../www"),n=["-S",`${e.#t}:${this.#r}`,"-t",a];this.#e=(0,bt.spawn)(this.#s,n,{stdio:["ignore","pipe","ignore"]}),this.#e.on("error",t),this.#e.on("spawn",()=>setTimeout(()=>r(this.#r),1e3))}))}async transform(r){let t=await this.listen(),a=new URL(`http://${e.#t}:${t}/index.php`);a.searchParams.set("file",(0,se.resolve)(r));let n=await fetch(a);if(n.ok)return n.text();throw Error(`An error occurred while processing the script: ${r}`)}};var St=require("node:child_process"),Ce=require("node:path"),we=class{#t;constructor(r="php"){this.#t=(0,Ce.normalize)(r)}close(){return Promise.resolve()}async transform(r){return new Promise((a,n)=>(0,St.execFile)(this.#t,["-w",(0,Ce.resolve)(r)],{maxBuffer:20971520},(l,p)=>{l?n(l):a(p)}))}};var vr=`
Minify PHP source code by removing comments and whitespace.

Usage:
  npx @cedx/php-minifier [options] <input> <output>

Arguments:
  input            The path to the input directory.
  output           The path to the output directory.

Options:
  -b, --binary     The path to the PHP executable.
  -e, --extension  The extension of the PHP files to process. Defaults to "php".
  -m, --mode       The operation mode of the minifier. Defaults to "safe".
  -s, --silent     Value indicating whether to silence the minifier output.
  -h, --help       Display this help.
  -v, --version    Output the version number.
`;async function Lr(){let{positionals:e,values:r}=(0,Ct.parseArgs)({allowPositionals:!0,options:{binary:{short:"b",type:"string",default:"php"},extension:{short:"e",type:"string",default:"php"},help:{short:"h",type:"boolean",default:!1},mode:{short:"m",type:"string",default:"safe"},silent:{short:"s",type:"boolean",default:!1},version:{short:"v",type:"boolean",default:!1}}});if(r.help||r.version)return $e.default.log(r.version?gt.version:vr.trim());if(!e.length)throw Error("You must provide the path to the input directory.");let t=(0,J.resolve)(e[0]);try{await(0,oe.access)(t)}catch{throw Error("The input directory was not found.")}let a=e.length>1?(0,J.resolve)(e[1]):t;return Or(t,a,r)}async function Or(e,r,t={}){let a=t.binary??"php",n=t.extension??"php",l=t.mode??"safe",p=t.silent??!1,d=l=="fast"?new Se(a):new we(a);for await(let y of(0,$t.default)(e,{fileFilter:`*.${n}`})){p||$e.default.log(`Minifying: ${y.path}`);let T=await d.transform(y.fullPath),A=(0,J.join)(r,y.path);await(0,oe.mkdir)((0,J.dirname)(A),{recursive:!0}),await(0,oe.writeFile)(A,T)}return d.close()}Lr().catch(e=>{$e.default.error(e instanceof Error?e.message:e),wt.default.exitCode=1});
