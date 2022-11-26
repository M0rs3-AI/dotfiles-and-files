import{n as ee,i as yt,g as re,a as ne,V as Vt}from"./vueConfig.20091e32.js";const B=re(),ie={name:"App",mounted(){this.loadConfig(),B.on("route",t=>{document.body.oncontextmenu=e=>{e.preventDefault()},this.$route.name==t?B.emit("routed"):this.$router.push("/"+t)}).on("language",t=>{this.$i18n.locale=t}),B.emit("init")},data(){return{config:{resultTheme:"default"}}},methods:{loadConfig(){yt()&&(this.config=yt())}},destroyed(){B.destroy()}};var ae=function(){var e=this,r=e._self._c;return r("div",{class:e.config.resultTheme,attrs:{id:"app"}},[r("router-view")],1)},oe=[],se=ee(ie,ae,oe,!1,null,null,null,null);const ue=se.exports;/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */function T(t,e){for(var r in e)t[r]=e[r];return t}var ce=/[!'()*]/g,fe=function(t){return"%"+t.charCodeAt(0).toString(16)},pe=/%2C/g,V=function(t){return encodeURIComponent(t).replace(ce,fe).replace(pe,",")};function it(t){try{return decodeURIComponent(t)}catch{}return t}function he(t,e,r){e===void 0&&(e={});var i=r||le,n;try{n=i(t||"")}catch{n={}}for(var a in e){var o=e[a];n[a]=Array.isArray(o)?o.map(gt):gt(o)}return n}var gt=function(t){return t==null||typeof t=="object"?t:String(t)};function le(t){var e={};return t=t.trim().replace(/^(\?|#|&)/,""),t&&t.split("&").forEach(function(r){var i=r.replace(/\+/g," ").split("="),n=it(i.shift()),a=i.length>0?it(i.join("=")):null;e[n]===void 0?e[n]=a:Array.isArray(e[n])?e[n].push(a):e[n]=[e[n],a]}),e}function ve(t){var e=t?Object.keys(t).map(function(r){var i=t[r];if(i===void 0)return"";if(i===null)return V(r);if(Array.isArray(i)){var n=[];return i.forEach(function(a){a!==void 0&&(a===null?n.push(V(r)):n.push(V(r)+"="+V(a)))}),n.join("&")}return V(r)+"="+V(i)}).filter(function(r){return r.length>0}).join("&"):null;return e?"?"+e:""}var D=/\/?$/;function Q(t,e,r,i){var n=i&&i.options.stringifyQuery,a=e.query||{};try{a=at(a)}catch{}var o={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:a,params:e.params||{},fullPath:_t(e,n),matched:t?de(t):[]};return r&&(o.redirectedFrom=_t(r,n)),Object.freeze(o)}function at(t){if(Array.isArray(t))return t.map(at);if(t&&typeof t=="object"){var e={};for(var r in t)e[r]=at(t[r]);return e}else return t}var $=Q(null,{path:"/"});function de(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function _t(t,e){var r=t.path,i=t.query;i===void 0&&(i={});var n=t.hash;n===void 0&&(n="");var a=e||ve;return(r||"/")+a(i)+n}function qt(t,e,r){return e===$?t===e:e?t.path&&e.path?t.path.replace(D,"")===e.path.replace(D,"")&&(r||t.hash===e.hash&&H(t.query,e.query)):t.name&&e.name?t.name===e.name&&(r||t.hash===e.hash&&H(t.query,e.query)&&H(t.params,e.params)):!1:!1}function H(t,e){if(t===void 0&&(t={}),e===void 0&&(e={}),!t||!e)return t===e;var r=Object.keys(t).sort(),i=Object.keys(e).sort();return r.length!==i.length?!1:r.every(function(n,a){var o=t[n],s=i[a];if(s!==n)return!1;var c=e[n];return o==null||c==null?o===c:typeof o=="object"&&typeof c=="object"?H(o,c):String(o)===String(c)})}function me(t,e){return t.path.replace(D,"/").indexOf(e.path.replace(D,"/"))===0&&(!e.hash||t.hash===e.hash)&&ye(t.query,e.query)}function ye(t,e){for(var r in e)if(!(r in t))return!1;return!0}function jt(t){for(var e=0;e<t.matched.length;e++){var r=t.matched[e];for(var i in r.instances){var n=r.instances[i],a=r.enteredCbs[i];if(!(!n||!a)){delete r.enteredCbs[i];for(var o=0;o<a.length;o++)n._isBeingDestroyed||a[o](n)}}}}var ge={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,r){var i=r.props,n=r.children,a=r.parent,o=r.data;o.routerView=!0;for(var s=a.$createElement,c=i.name,u=a.$route,h=a._routerViewCache||(a._routerViewCache={}),v=0,m=!1;a&&a._routerRoot!==a;){var d=a.$vnode?a.$vnode.data:{};d.routerView&&v++,d.keepAlive&&a._directInactive&&a._inactive&&(m=!0),a=a.$parent}if(o.routerViewDepth=v,m){var l=h[c],f=l&&l.component;return f?(l.configProps&&wt(f,o,l.route,l.configProps),s(f,o,n)):s()}var p=u.matched[v],y=p&&p.components[c];if(!p||!y)return h[c]=null,s();h[c]={component:y},o.registerRouteInstance=function(g,R){var E=p.instances[c];(R&&E!==g||!R&&E===g)&&(p.instances[c]=R)},(o.hook||(o.hook={})).prepatch=function(g,R){p.instances[c]=R.componentInstance},o.hook.init=function(g){g.data.keepAlive&&g.componentInstance&&g.componentInstance!==p.instances[c]&&(p.instances[c]=g.componentInstance),jt(u)};var w=p.props&&p.props[c];return w&&(T(h[c],{route:u,configProps:w}),wt(y,o,u,w)),s(y,o,n)}};function wt(t,e,r,i){var n=e.props=_e(r,i);if(n){n=e.props=T({},n);var a=e.attrs=e.attrs||{};for(var o in n)(!t.props||!(o in t.props))&&(a[o]=n[o],delete n[o])}}function _e(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}function Ut(t,e,r){var i=t.charAt(0);if(i==="/")return t;if(i==="?"||i==="#")return e+t;var n=e.split("/");(!r||!n[n.length-1])&&n.pop();for(var a=t.replace(/^\//,"").split("/"),o=0;o<a.length;o++){var s=a[o];s===".."?n.pop():s!=="."&&n.push(s)}return n[0]!==""&&n.unshift(""),n.join("/")}function we(t){var e="",r="",i=t.indexOf("#");i>=0&&(e=t.slice(i),t=t.slice(0,i));var n=t.indexOf("?");return n>=0&&(r=t.slice(n+1),t=t.slice(0,n)),{path:t,query:r,hash:e}}function C(t){return t.replace(/\/(?:\s*\/)+/g,"/")}var W=Array.isArray||function(t){return Object.prototype.toString.call(t)=="[object Array]"},j=Bt,Re=ft,Ee=Te,be=kt,xe=Mt,Pe=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function ft(t,e){for(var r=[],i=0,n=0,a="",o=e&&e.delimiter||"/",s;(s=Pe.exec(t))!=null;){var c=s[0],u=s[1],h=s.index;if(a+=t.slice(n,h),n=h+c.length,u){a+=u[1];continue}var v=t[n],m=s[2],d=s[3],l=s[4],f=s[5],p=s[6],y=s[7];a&&(r.push(a),a="");var w=m!=null&&v!=null&&v!==m,g=p==="+"||p==="*",R=p==="?"||p==="*",E=s[2]||o,b=l||f;r.push({name:d||i++,prefix:m||"",delimiter:E,optional:R,repeat:g,partial:w,asterisk:!!y,pattern:b?Ce(b):y?".*":"[^"+z(E)+"]+?"})}return n<t.length&&(a+=t.substr(n)),a&&r.push(a),r}function Te(t,e){return kt(ft(t,e),e)}function Ae(t){return encodeURI(t).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function Le(t){return encodeURI(t).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function kt(t,e){for(var r=new Array(t.length),i=0;i<t.length;i++)typeof t[i]=="object"&&(r[i]=new RegExp("^(?:"+t[i].pattern+")$",ht(e)));return function(n,a){for(var o="",s=n||{},c=a||{},u=c.pretty?Ae:encodeURIComponent,h=0;h<t.length;h++){var v=t[h];if(typeof v=="string"){o+=v;continue}var m=s[v.name],d;if(m==null)if(v.optional){v.partial&&(o+=v.prefix);continue}else throw new TypeError('Expected "'+v.name+'" to be defined');if(W(m)){if(!v.repeat)throw new TypeError('Expected "'+v.name+'" to not repeat, but received `'+JSON.stringify(m)+"`");if(m.length===0){if(v.optional)continue;throw new TypeError('Expected "'+v.name+'" to not be empty')}for(var l=0;l<m.length;l++){if(d=u(m[l]),!r[h].test(d))throw new TypeError('Expected all "'+v.name+'" to match "'+v.pattern+'", but received `'+JSON.stringify(d)+"`");o+=(l===0?v.prefix:v.delimiter)+d}continue}if(d=v.asterisk?Le(m):u(m),!r[h].test(d))throw new TypeError('Expected "'+v.name+'" to match "'+v.pattern+'", but received "'+d+'"');o+=v.prefix+d}return o}}function z(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function Ce(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function pt(t,e){return t.keys=e,t}function ht(t){return t&&t.sensitive?"":"i"}function Oe(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var i=0;i<r.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return pt(t,e)}function Se(t,e,r){for(var i=[],n=0;n<t.length;n++)i.push(Bt(t[n],e,r).source);var a=new RegExp("(?:"+i.join("|")+")",ht(r));return pt(a,e)}function $e(t,e,r){return Mt(ft(t,r),e,r)}function Mt(t,e,r){W(e)||(r=e||r,e=[]),r=r||{};for(var i=r.strict,n=r.end!==!1,a="",o=0;o<t.length;o++){var s=t[o];if(typeof s=="string")a+=z(s);else{var c=z(s.prefix),u="(?:"+s.pattern+")";e.push(s),s.repeat&&(u+="(?:"+c+u+")*"),s.optional?s.partial?u=c+"("+u+")?":u="(?:"+c+"("+u+"))?":u=c+"("+u+")",a+=u}}var h=z(r.delimiter||"/"),v=a.slice(-h.length)===h;return i||(a=(v?a.slice(0,-h.length):a)+"(?:"+h+"(?=$))?"),n?a+="$":a+=i&&v?"":"(?="+h+"|$)",pt(new RegExp("^"+a,ht(r)),e)}function Bt(t,e,r){return W(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?Oe(t,e):W(t)?Se(t,e,r):$e(t,e,r)}j.parse=Re;j.compile=Ee;j.tokensToFunction=be;j.tokensToRegExp=xe;var Rt=Object.create(null);function F(t,e,r){e=e||{};try{var i=Rt[t]||(Rt[t]=j.compile(t));return typeof e.pathMatch=="string"&&(e[0]=e.pathMatch),i(e,{pretty:!0})}catch{return""}finally{delete e[0]}}function lt(t,e,r,i){var n=typeof t=="string"?{path:t}:t;if(n._normalized)return n;if(n.name){n=T({},t);var a=n.params;return a&&typeof a=="object"&&(n.params=T({},a)),n}if(!n.path&&n.params&&e){n=T({},n),n._normalized=!0;var o=T(T({},e.params),n.params);if(e.name)n.name=e.name,n.params=o;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;n.path=F(s,o,"path "+e.path)}return n}var c=we(n.path||""),u=e&&e.path||"/",h=c.path?Ut(c.path,u,r||n.append):u,v=he(c.query,n.query,i&&i.options.parseQuery),m=n.hash||c.hash;return m&&m.charAt(0)!=="#"&&(m="#"+m),{_normalized:!0,path:h,query:v,hash:m}}var Ie=[String,Object],Ve=[String,Array],Et=function(){},qe={name:"RouterLink",props:{to:{type:Ie,required:!0},tag:{type:String,default:"a"},custom:Boolean,exact:Boolean,exactPath:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:Ve,default:"click"}},render:function(e){var r=this,i=this.$router,n=this.$route,a=i.resolve(this.to,n,this.append),o=a.location,s=a.route,c=a.href,u={},h=i.options.linkActiveClass,v=i.options.linkExactActiveClass,m=h==null?"router-link-active":h,d=v==null?"router-link-exact-active":v,l=this.activeClass==null?m:this.activeClass,f=this.exactActiveClass==null?d:this.exactActiveClass,p=s.redirectedFrom?Q(null,lt(s.redirectedFrom),null,i):s;u[f]=qt(n,p,this.exactPath),u[l]=this.exact||this.exactPath?u[f]:me(n,p);var y=u[f]?this.ariaCurrentValue:null,w=function(nt){bt(nt)&&(r.replace?i.replace(o,Et):i.push(o,Et))},g={click:bt};Array.isArray(this.event)?this.event.forEach(function(nt){g[nt]=w}):g[this.event]=w;var R={class:u},E=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:c,route:s,navigate:w,isActive:u[l],isExactActive:u[f]});if(E){if(E.length===1)return E[0];if(E.length>1||!E.length)return E.length===0?e():e("span",{},E)}if(this.tag==="a")R.on=g,R.attrs={href:c,"aria-current":y};else{var b=Nt(this.$slots.default);if(b){b.isStatic=!1;var x=b.data=T({},b.data);x.on=x.on||{};for(var L in x.on){var rt=x.on[L];L in g&&(x.on[L]=Array.isArray(rt)?rt:[rt])}for(var M in g)M in x.on?x.on[M].push(g[M]):x.on[M]=w;var mt=b.data.attrs=T({},b.data.attrs);mt.href=c,mt["aria-current"]=y}else R.on=g}return e(this.tag,R,this.$slots.default)}};function bt(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function Nt(t){if(t){for(var e,r=0;r<t.length;r++)if(e=t[r],e.tag==="a"||e.children&&(e=Nt(e.children)))return e}}var J;function ot(t){if(!(ot.installed&&J===t)){ot.installed=!0,J=t;var e=function(n){return n!==void 0},r=function(n,a){var o=n.$options._parentVnode;e(o)&&e(o=o.data)&&e(o=o.registerRouteInstance)&&o(n,a)};t.mixin({beforeCreate:function(){e(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),t.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,r(this,this)},destroyed:function(){r(this)}}),Object.defineProperty(t.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(t.prototype,"$route",{get:function(){return this._routerRoot._route}}),t.component("RouterView",ge),t.component("RouterLink",qe);var i=t.config.optionMergeStrategies;i.beforeRouteEnter=i.beforeRouteLeave=i.beforeRouteUpdate=i.created}}var k=typeof window<"u";function N(t,e,r,i,n){var a=e||[],o=r||Object.create(null),s=i||Object.create(null);t.forEach(function(h){st(a,o,s,h,n)});for(var c=0,u=a.length;c<u;c++)a[c]==="*"&&(a.push(a.splice(c,1)[0]),u--,c--);return{pathList:a,pathMap:o,nameMap:s}}function st(t,e,r,i,n,a){var o=i.path,s=i.name,c=i.pathToRegexpOptions||{},u=Ue(o,n,c.strict);typeof i.caseSensitive=="boolean"&&(c.sensitive=i.caseSensitive);var h={path:u,regex:je(u,c),components:i.components||{default:i.component},alias:i.alias?typeof i.alias=="string"?[i.alias]:i.alias:[],instances:{},enteredCbs:{},name:s,parent:n,matchAs:a,redirect:i.redirect,beforeEnter:i.beforeEnter,meta:i.meta||{},props:i.props==null?{}:i.components?i.props:{default:i.props}};if(i.children&&i.children.forEach(function(f){var p=a?C(a+"/"+f.path):void 0;st(t,e,r,f,h,p)}),e[h.path]||(t.push(h.path),e[h.path]=h),i.alias!==void 0)for(var v=Array.isArray(i.alias)?i.alias:[i.alias],m=0;m<v.length;++m){var d=v[m],l={path:d,children:i.children};st(t,e,r,l,n,h.path||"/")}s&&(r[s]||(r[s]=h))}function je(t,e){var r=j(t,[],e);return r}function Ue(t,e,r){return r||(t=t.replace(/\/$/,"")),t[0]==="/"||e==null?t:C(e.path+"/"+t)}function ke(t,e){var r=N(t),i=r.pathList,n=r.pathMap,a=r.nameMap;function o(d){N(d,i,n,a)}function s(d,l){var f=typeof d!="object"?a[d]:void 0;N([l||d],i,n,a,f),f&&f.alias.length&&N(f.alias.map(function(p){return{path:p,children:[l]}}),i,n,a,f)}function c(){return i.map(function(d){return n[d]})}function u(d,l,f){var p=lt(d,l,!1,e),y=p.name;if(y){var w=a[y];if(!w)return m(null,p);var g=w.regex.keys.filter(function(L){return!L.optional}).map(function(L){return L.name});if(typeof p.params!="object"&&(p.params={}),l&&typeof l.params=="object")for(var R in l.params)!(R in p.params)&&g.indexOf(R)>-1&&(p.params[R]=l.params[R]);return p.path=F(w.path,p.params),m(w,p,f)}else if(p.path){p.params={};for(var E=0;E<i.length;E++){var b=i[E],x=n[b];if(Me(x.regex,p.path,p.params))return m(x,p,f)}}return m(null,p)}function h(d,l){var f=d.redirect,p=typeof f=="function"?f(Q(d,l,null,e)):f;if(typeof p=="string"&&(p={path:p}),!p||typeof p!="object")return m(null,l);var y=p,w=y.name,g=y.path,R=l.query,E=l.hash,b=l.params;if(R=y.hasOwnProperty("query")?y.query:R,E=y.hasOwnProperty("hash")?y.hash:E,b=y.hasOwnProperty("params")?y.params:b,w)return a[w],u({_normalized:!0,name:w,query:R,hash:E,params:b},void 0,l);if(g){var x=Be(g,d),L=F(x,b);return u({_normalized:!0,path:L,query:R,hash:E},void 0,l)}else return m(null,l)}function v(d,l,f){var p=F(f,l.params),y=u({_normalized:!0,path:p});if(y){var w=y.matched,g=w[w.length-1];return l.params=y.params,m(g,l)}return m(null,l)}function m(d,l,f){return d&&d.redirect?h(d,f||l):d&&d.matchAs?v(d,l,d.matchAs):Q(d,l,f,e)}return{match:u,addRoute:s,getRoutes:c,addRoutes:o}}function Me(t,e,r){var i=e.match(t);if(i){if(!r)return!0}else return!1;for(var n=1,a=i.length;n<a;++n){var o=t.keys[n-1];o&&(r[o.name||"pathMatch"]=typeof i[n]=="string"?it(i[n]):i[n])}return!0}function Be(t,e){return Ut(t,e.parent?e.parent.path:"/",!0)}var Ne=k&&window.performance&&window.performance.now?window.performance:Date;function Ht(){return Ne.now().toFixed(3)}var zt=Ht();function Z(){return zt}function Ft(t){return zt=t}var Gt=Object.create(null);function Kt(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),r=T({},window.history.state);return r.key=Z(),window.history.replaceState(r,"",e),window.addEventListener("popstate",xt),function(){window.removeEventListener("popstate",xt)}}function O(t,e,r,i){if(!!t.app){var n=t.options.scrollBehavior;!n||t.app.$nextTick(function(){var a=He(),o=n.call(t,e,r,i?a:null);!o||(typeof o.then=="function"?o.then(function(s){At(s,a)}).catch(function(s){}):At(o,a))})}}function Dt(){var t=Z();t&&(Gt[t]={x:window.pageXOffset,y:window.pageYOffset})}function xt(t){Dt(),t.state&&t.state.key&&Ft(t.state.key)}function He(){var t=Z();if(t)return Gt[t]}function ze(t,e){var r=document.documentElement,i=r.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-i.left-e.x,y:n.top-i.top-e.y}}function Pt(t){return q(t.x)||q(t.y)}function Tt(t){return{x:q(t.x)?t.x:window.pageXOffset,y:q(t.y)?t.y:window.pageYOffset}}function Fe(t){return{x:q(t.x)?t.x:0,y:q(t.y)?t.y:0}}function q(t){return typeof t=="number"}var Ge=/^#\d/;function At(t,e){var r=typeof t=="object";if(r&&typeof t.selector=="string"){var i=Ge.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(i){var n=t.offset&&typeof t.offset=="object"?t.offset:{};n=Fe(n),e=ze(i,n)}else Pt(t)&&(e=Tt(t))}else r&&Pt(t)&&(e=Tt(t));e&&("scrollBehavior"in document.documentElement.style?window.scrollTo({left:e.x,top:e.y,behavior:t.behavior}):window.scrollTo(e.x,e.y))}var S=k&&function(){var t=window.navigator.userAgent;return(t.indexOf("Android 2.")!==-1||t.indexOf("Android 4.0")!==-1)&&t.indexOf("Mobile Safari")!==-1&&t.indexOf("Chrome")===-1&&t.indexOf("Windows Phone")===-1?!1:window.history&&typeof window.history.pushState=="function"}();function X(t,e){Dt();var r=window.history;try{if(e){var i=T({},r.state);i.key=Z(),r.replaceState(i,"",t)}else r.pushState({key:Ft(Ht())},"",t)}catch{window.location[e?"replace":"assign"](t)}}function ut(t){X(t,!0)}var I={redirected:2,aborted:4,cancelled:8,duplicated:16};function Ke(t,e){return tt(t,e,I.redirected,'Redirected when going from "'+t.fullPath+'" to "'+Je(e)+'" via a navigation guard.')}function De(t,e){var r=tt(t,e,I.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".');return r.name="NavigationDuplicated",r}function Lt(t,e){return tt(t,e,I.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Qe(t,e){return tt(t,e,I.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}function tt(t,e,r,i){var n=new Error(i);return n._isRouter=!0,n.from=t,n.to=e,n.type=r,n}var We=["params","query","hash"];function Je(t){if(typeof t=="string")return t;if("path"in t)return t.path;var e={};return We.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}function Y(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function et(t,e){return Y(t)&&t._isRouter&&(e==null||t.type===e)}function Ct(t,e,r){var i=function(n){n>=t.length?r():t[n]?e(t[n],function(){i(n+1)}):i(n+1)};i(0)}function Xe(t){return function(e,r,i){var n=!1,a=0,o=null;Qt(t,function(s,c,u,h){if(typeof s=="function"&&s.cid===void 0){n=!0,a++;var v=Ot(function(f){Ze(f)&&(f=f.default),s.resolved=typeof f=="function"?f:J.extend(f),u.components[h]=f,a--,a<=0&&i()}),m=Ot(function(f){var p="Failed to resolve async component "+h+": "+f;o||(o=Y(f)?f:new Error(p),i(o))}),d;try{d=s(v,m)}catch(f){m(f)}if(d)if(typeof d.then=="function")d.then(v,m);else{var l=d.component;l&&typeof l.then=="function"&&l.then(v,m)}}}),n||i()}}function Qt(t,e){return Wt(t.map(function(r){return Object.keys(r.components).map(function(i){return e(r.components[i],r.instances[i],r,i)})}))}function Wt(t){return Array.prototype.concat.apply([],t)}var Ye=typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol";function Ze(t){return t.__esModule||Ye&&t[Symbol.toStringTag]==="Module"}function Ot(t){var e=!1;return function(){for(var r=[],i=arguments.length;i--;)r[i]=arguments[i];if(!e)return e=!0,t.apply(this,r)}}var A=function(e,r){this.router=e,this.base=tr(r),this.current=$,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};A.prototype.listen=function(e){this.cb=e};A.prototype.onReady=function(e,r){this.ready?e():(this.readyCbs.push(e),r&&this.readyErrorCbs.push(r))};A.prototype.onError=function(e){this.errorCbs.push(e)};A.prototype.transitionTo=function(e,r,i){var n=this,a;try{a=this.router.match(e,this.current)}catch(s){throw this.errorCbs.forEach(function(c){c(s)}),s}var o=this.current;this.confirmTransition(a,function(){n.updateRoute(a),r&&r(a),n.ensureURL(),n.router.afterHooks.forEach(function(s){s&&s(a,o)}),n.ready||(n.ready=!0,n.readyCbs.forEach(function(s){s(a)}))},function(s){i&&i(s),s&&!n.ready&&(!et(s,I.redirected)||o!==$)&&(n.ready=!0,n.readyErrorCbs.forEach(function(c){c(s)}))})};A.prototype.confirmTransition=function(e,r,i){var n=this,a=this.current;this.pending=e;var o=function(f){!et(f)&&Y(f)&&(n.errorCbs.length?n.errorCbs.forEach(function(p){p(f)}):console.error(f)),i&&i(f)},s=e.matched.length-1,c=a.matched.length-1;if(qt(e,a)&&s===c&&e.matched[s]===a.matched[c])return this.ensureURL(),e.hash&&O(this.router,a,e,!1),o(De(a,e));var u=er(this.current.matched,e.matched),h=u.updated,v=u.deactivated,m=u.activated,d=[].concat(nr(v),this.router.beforeHooks,ir(h),m.map(function(f){return f.beforeEnter}),Xe(m)),l=function(f,p){if(n.pending!==e)return o(Lt(a,e));try{f(e,a,function(y){y===!1?(n.ensureURL(!0),o(Qe(a,e))):Y(y)?(n.ensureURL(!0),o(y)):typeof y=="string"||typeof y=="object"&&(typeof y.path=="string"||typeof y.name=="string")?(o(Ke(a,e)),typeof y=="object"&&y.replace?n.replace(y):n.push(y)):p(y)})}catch(y){o(y)}};Ct(d,l,function(){var f=ar(m),p=f.concat(n.router.resolveHooks);Ct(p,l,function(){if(n.pending!==e)return o(Lt(a,e));n.pending=null,r(e),n.router.app&&n.router.app.$nextTick(function(){jt(e)})})})};A.prototype.updateRoute=function(e){this.current=e,this.cb&&this.cb(e)};A.prototype.setupListeners=function(){};A.prototype.teardown=function(){this.listeners.forEach(function(e){e()}),this.listeners=[],this.current=$,this.pending=null};function tr(t){if(!t)if(k){var e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^https?:\/\/[^\/]+/,"")}else t="/";return t.charAt(0)!=="/"&&(t="/"+t),t.replace(/\/$/,"")}function er(t,e){var r,i=Math.max(t.length,e.length);for(r=0;r<i&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}function vt(t,e,r,i){var n=Qt(t,function(a,o,s,c){var u=rr(a,e);if(u)return Array.isArray(u)?u.map(function(h){return r(h,o,s,c)}):r(u,o,s,c)});return Wt(i?n.reverse():n)}function rr(t,e){return typeof t!="function"&&(t=J.extend(t)),t.options[e]}function nr(t){return vt(t,"beforeRouteLeave",Jt,!0)}function ir(t){return vt(t,"beforeRouteUpdate",Jt)}function Jt(t,e){if(e)return function(){return t.apply(e,arguments)}}function ar(t){return vt(t,"beforeRouteEnter",function(e,r,i,n){return or(e,i,n)})}function or(t,e,r){return function(n,a,o){return t(n,a,function(s){typeof s=="function"&&(e.enteredCbs[r]||(e.enteredCbs[r]=[]),e.enteredCbs[r].push(s)),o(s)})}}var Xt=function(t){function e(r,i){t.call(this,r,i),this._startLocation=U(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var i=this;if(!(this.listeners.length>0)){var n=this.router,a=n.options.scrollBehavior,o=S&&a;o&&this.listeners.push(Kt());var s=function(){var c=i.current,u=U(i.base);i.current===$&&u===i._startLocation||i.transitionTo(u,function(h){o&&O(n,h,c,!0)})};window.addEventListener("popstate",s),this.listeners.push(function(){window.removeEventListener("popstate",s)})}},e.prototype.go=function(i){window.history.go(i)},e.prototype.push=function(i,n,a){var o=this,s=this,c=s.current;this.transitionTo(i,function(u){X(C(o.base+u.fullPath)),O(o.router,u,c,!1),n&&n(u)},a)},e.prototype.replace=function(i,n,a){var o=this,s=this,c=s.current;this.transitionTo(i,function(u){ut(C(o.base+u.fullPath)),O(o.router,u,c,!1),n&&n(u)},a)},e.prototype.ensureURL=function(i){if(U(this.base)!==this.current.fullPath){var n=C(this.base+this.current.fullPath);i?X(n):ut(n)}},e.prototype.getCurrentLocation=function(){return U(this.base)},e}(A);function U(t){var e=window.location.pathname,r=e.toLowerCase(),i=t.toLowerCase();return t&&(r===i||r.indexOf(C(i+"/"))===0)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Yt=function(t){function e(r,i,n){t.call(this,r,i),!(n&&sr(this.base))&&St()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var i=this;if(!(this.listeners.length>0)){var n=this.router,a=n.options.scrollBehavior,o=S&&a;o&&this.listeners.push(Kt());var s=function(){var u=i.current;!St()||i.transitionTo(G(),function(h){o&&O(i.router,h,u,!0),S||K(h.fullPath)})},c=S?"popstate":"hashchange";window.addEventListener(c,s),this.listeners.push(function(){window.removeEventListener(c,s)})}},e.prototype.push=function(i,n,a){var o=this,s=this,c=s.current;this.transitionTo(i,function(u){$t(u.fullPath),O(o.router,u,c,!1),n&&n(u)},a)},e.prototype.replace=function(i,n,a){var o=this,s=this,c=s.current;this.transitionTo(i,function(u){K(u.fullPath),O(o.router,u,c,!1),n&&n(u)},a)},e.prototype.go=function(i){window.history.go(i)},e.prototype.ensureURL=function(i){var n=this.current.fullPath;G()!==n&&(i?$t(n):K(n))},e.prototype.getCurrentLocation=function(){return G()},e}(A);function sr(t){var e=U(t);if(!/^\/#/.test(e))return window.location.replace(C(t+"/#"+e)),!0}function St(){var t=G();return t.charAt(0)==="/"?!0:(K("/"+t),!1)}function G(){var t=window.location.href,e=t.indexOf("#");return e<0?"":(t=t.slice(e+1),t)}function ct(t){var e=window.location.href,r=e.indexOf("#"),i=r>=0?e.slice(0,r):e;return i+"#"+t}function $t(t){S?X(ct(t)):window.location.hash=t}function K(t){S?ut(ct(t)):window.location.replace(ct(t))}var ur=function(t){function e(r,i){t.call(this,r,i),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(i,n,a){var o=this;this.transitionTo(i,function(s){o.stack=o.stack.slice(0,o.index+1).concat(s),o.index++,n&&n(s)},a)},e.prototype.replace=function(i,n,a){var o=this;this.transitionTo(i,function(s){o.stack=o.stack.slice(0,o.index).concat(s),n&&n(s)},a)},e.prototype.go=function(i){var n=this,a=this.index+i;if(!(a<0||a>=this.stack.length)){var o=this.stack[a];this.confirmTransition(o,function(){var s=n.current;n.index=a,n.updateRoute(o),n.router.afterHooks.forEach(function(c){c&&c(o,s)})},function(s){et(s,I.duplicated)&&(n.index=a)})}},e.prototype.getCurrentLocation=function(){var i=this.stack[this.stack.length-1];return i?i.fullPath:"/"},e.prototype.ensureURL=function(){},e}(A),_=function(e){e===void 0&&(e={}),this.app=null,this.apps=[],this.options=e,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=ke(e.routes||[],this);var r=e.mode||"hash";switch(this.fallback=r==="history"&&!S&&e.fallback!==!1,this.fallback&&(r="hash"),k||(r="abstract"),this.mode=r,r){case"history":this.history=new Xt(this,e.base);break;case"hash":this.history=new Yt(this,e.base,this.fallback);break;case"abstract":this.history=new ur(this,e.base);break}},Zt={currentRoute:{configurable:!0}};_.prototype.match=function(e,r,i){return this.matcher.match(e,r,i)};Zt.currentRoute.get=function(){return this.history&&this.history.current};_.prototype.init=function(e){var r=this;if(this.apps.push(e),e.$once("hook:destroyed",function(){var o=r.apps.indexOf(e);o>-1&&r.apps.splice(o,1),r.app===e&&(r.app=r.apps[0]||null),r.app||r.history.teardown()}),!this.app){this.app=e;var i=this.history;if(i instanceof Xt||i instanceof Yt){var n=function(o){var s=i.current,c=r.options.scrollBehavior,u=S&&c;u&&"fullPath"in o&&O(r,o,s,!1)},a=function(o){i.setupListeners(),n(o)};i.transitionTo(i.getCurrentLocation(),a,a)}i.listen(function(o){r.apps.forEach(function(s){s._route=o})})}};_.prototype.beforeEach=function(e){return dt(this.beforeHooks,e)};_.prototype.beforeResolve=function(e){return dt(this.resolveHooks,e)};_.prototype.afterEach=function(e){return dt(this.afterHooks,e)};_.prototype.onReady=function(e,r){this.history.onReady(e,r)};_.prototype.onError=function(e){this.history.onError(e)};_.prototype.push=function(e,r,i){var n=this;if(!r&&!i&&typeof Promise<"u")return new Promise(function(a,o){n.history.push(e,a,o)});this.history.push(e,r,i)};_.prototype.replace=function(e,r,i){var n=this;if(!r&&!i&&typeof Promise<"u")return new Promise(function(a,o){n.history.replace(e,a,o)});this.history.replace(e,r,i)};_.prototype.go=function(e){this.history.go(e)};_.prototype.back=function(){this.go(-1)};_.prototype.forward=function(){this.go(1)};_.prototype.getMatchedComponents=function(e){var r=e?e.matched?e:this.resolve(e).route:this.currentRoute;return r?[].concat.apply([],r.matched.map(function(i){return Object.keys(i.components).map(function(n){return i.components[n]})})):[]};_.prototype.resolve=function(e,r,i){r=r||this.history.current;var n=lt(e,r,i,this),a=this.match(n,r),o=a.redirectedFrom||a.fullPath,s=this.history.base,c=cr(s,o,this.mode);return{location:n,route:a,href:c,normalizedTo:n,resolved:a}};_.prototype.getRoutes=function(){return this.matcher.getRoutes()};_.prototype.addRoute=function(e,r){this.matcher.addRoute(e,r),this.history.current!==$&&this.history.transitionTo(this.history.getCurrentLocation())};_.prototype.addRoutes=function(e){this.matcher.addRoutes(e),this.history.current!==$&&this.history.transitionTo(this.history.getCurrentLocation())};Object.defineProperties(_.prototype,Zt);var te=_;function dt(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}function cr(t,e,r){var i=r==="hash"?"#"+e:e;return t?C(t+"/"+i):i}_.install=ot;_.version="3.6.5";_.isNavigationFailure=et;_.NavigationFailureType=I;_.START_LOCATION=$;k&&window.Vue&&window.Vue.use(_);const fr="modulepreload",pr=function(t,e){return new URL(t,e).href},It={},P=function(e,r,i){if(!r||r.length===0)return e();const n=document.getElementsByTagName("link");return Promise.all(r.map(a=>{if(a=pr(a,i),a in It)return;It[a]=!0;const o=a.endsWith(".css"),s=o?'[rel="stylesheet"]':"";if(!!i)for(let h=n.length-1;h>=0;h--){const v=n[h];if(v.href===a&&(!o||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${s}`))return;const u=document.createElement("link");if(u.rel=o?"stylesheet":fr,o||(u.as="script",u.crossOrigin=""),u.href=a,document.head.appendChild(u),o)return new Promise((h,v)=>{u.addEventListener("load",h),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>e())},hr=new te({routes:[{path:"/connect",component:()=>P(()=>import("./connect.10de0467.js"),["./connect.10de0467.js","./switch.4bff6577.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./focus.d0673314.js","./select.878b0325.js","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./checkbox.988775e5.js","./index.45082dd6.js","./arrayUtil.e6340b6d.js","./dialog.0fcdf3fd.js","./notify.01023055.js","./connect.473a0a9e.css"],import.meta.url),name:"connect"},{path:"/status",component:()=>P(()=>import("./status.f751ca0e.js"),["./status.f751ca0e.js","./g2.07f392da.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./vscodeInject.c877a60d.js","./umy-table.common.a6b28601.js","./index.f6f68cea.js","./index.45082dd6.js","./index.0138aacd.js","./umy-table.922a866b.css","./status.d666e12b.css"],import.meta.url),name:"status"},{path:"/design",component:()=>P(()=>import("./design.329d7117.js"),["./design.329d7117.js","./vscodeInject.c877a60d.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./select.878b0325.js","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./focus.d0673314.js","./form.a7bc62be.js","./dialog.0fcdf3fd.js","./checkbox.988775e5.js","./notify.01023055.js","./umy-table.common.a6b28601.js","./index.45082dd6.js","./index.0138aacd.js","./umy-table.922a866b.css","./codeMirror.068e734c.js","./codeMirror.a8ec6891.css","./stringUtil.46430abd.js","./arrayUtil.e6340b6d.js","./design.e63ef7c6.css"],import.meta.url),name:"design"},{path:"/structDiff",component:()=>P(()=>import("./structDiff.74748434.js"),["./structDiff.74748434.js","./select.878b0325.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./focus.d0673314.js","./form.a7bc62be.js","./notify.01023055.js","./vscodeInject.c877a60d.js","./umy-table.common.a6b28601.js","./index.45082dd6.js","./index.0138aacd.js","./umy-table.922a866b.css","./structDiff.00970bda.css"],import.meta.url),name:"structDiff"},{path:"/keyView",component:()=>P(()=>import("./keyView.5cc13f1c.js"),["./keyView.5cc13f1c.js","./table.51f704ae.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./checkbox.988775e5.js","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./checkbox-group.7b0b8ccb.js","./index.0138aacd.js","./form.a7bc62be.js","./dialog.0fcdf3fd.js","./pagination.fd2a3fbe.js","./select.878b0325.js","./focus.d0673314.js","./codeMirror.068e734c.js","./codeMirror.a8ec6891.css","./notify.01023055.js","./keyView.05cc20b1.css"],import.meta.url),name:"keyView"},{path:"/redisStatus",component:()=>P(()=>import("./redisStatus.42979b7f.js"),["./redisStatus.42979b7f.js","./table.51f704ae.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./checkbox.988775e5.js","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./checkbox-group.7b0b8ccb.js","./index.0138aacd.js","./switch.4bff6577.js","./focus.d0673314.js","./redisStatus.39461590.css"],import.meta.url),name:"redisStatus"},{path:"/forward",component:()=>P(()=>import("./forward.e31ec2f4.js"),["./forward.e31ec2f4.js","./form.a7bc62be.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./dialog.0fcdf3fd.js","./table.51f704ae.js","./checkbox.988775e5.js","./scrollbar.2d2ca056.js","./index.f6f68cea.js","./checkbox-group.7b0b8ccb.js","./index.0138aacd.js","./vscodeInject.c877a60d.js","./forward.ec31b4d4.css"],import.meta.url),name:"forward"},{path:"/xterm",component:()=>P(()=>import("./xterm.3f65c06e.js"),["./xterm.3f65c06e.js","./vscodeInject.c877a60d.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./xterm.5009ef97.css"],import.meta.url),name:"xterm"},{path:"/sshStatus",component:()=>P(()=>import("./sshStatus.6434692f.js"),["./sshStatus.6434692f.js","./g2.07f392da.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./vscodeInject.c877a60d.js","./sshStatus.c83c11e6.css"],import.meta.url),name:"sshStatus"},{path:"/plan",component:()=>P(()=>import("./Plan.c3a6e621.js"),["./Plan.c3a6e621.js","./dialog.0fcdf3fd.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./Login.564e991a.js","./vscodeInject.c877a60d.js","./notify.01023055.js","./Login.6a37db81.css","./Plan.a6a1c85f.css"],import.meta.url),name:"plan"},{path:"/console",component:()=>P(()=>import("./console.1d529f33.js"),["./console.1d529f33.js","./dialog.0fcdf3fd.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./Login.564e991a.js","./vscodeInject.c877a60d.js","./notify.01023055.js","./Login.6a37db81.css","./checkbox.988775e5.js","./console.a59866bb.css"],import.meta.url),name:"console"},{path:"/document",component:()=>P(()=>import("./document.98aecf98.js"),["./document.98aecf98.js","./dialog.0fcdf3fd.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./Login.564e991a.js","./vscodeInject.c877a60d.js","./notify.01023055.js","./Login.6a37db81.css","./document.10d6a35c.css"],import.meta.url),name:"document"},{path:"/changeLog",component:()=>P(()=>import("./updates.ab40bdfd.js"),["./updates.ab40bdfd.js","./dialog.0fcdf3fd.js","./vueConfig.20091e32.js","./vueConfig.eb9643ee.css","./Login.564e991a.js","./vscodeInject.c877a60d.js","./notify.01023055.js","./Login.6a37db81.css","./updates.10d6a35c.css"],import.meta.url),name:"changeLog"}]}),lr=ne();Vt.use(te);new Vt({el:"#app",i18n:lr,components:{App:ue},router:hr,template:"<App/>"});
