(function(e){function t(t){for(var o,r,l=t[0],s=t[1],u=t[2],c=0,d=[];c<l.length;c++)r=l[c],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&d.push(a[r][0]),a[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);m&&m(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},a={app:0},i=[];function l(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"68e57e52"}[e]+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={about:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({about:"about"}[e]||e)+"."+{about:"c9acaf67"}[e]+".css",a=s.p+o,i=document.getElementsByTagName("link"),l=0;l<i.length;l++){var u=i[l],c=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(c===o||c===a))return t()}var d=document.getElementsByTagName("style");for(l=0;l<d.length;l++){u=d[l],c=u.getAttribute("data-href");if(c===o||c===a)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],m.parentNode.removeChild(m),n(i)},m.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=i);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=l(e);var d=new Error;u=function(t){c.onerror=c.onload=null,clearTimeout(m);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",d.name="ChunkLoadError",d.type=o,d.request=r,n[1](d)}a[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:c})}),12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var m=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1be5":function(e,t,n){"use strict";n("f092")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("a026"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[e.loggedin?n("Navigation"):e._e(),e.loggedin?n("Header"):e._e(),e.isIdle?n("ModalIdle"):e._e(),n("v-main",[n("router-view")],1)],1)},a=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{staticClass:"primary darken-1 white--text font-weight-bold",attrs:{app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-h6 white--text font-weight-bold"},[e._v(" PBL IDENTITY ")]),n("v-list-item-subtitle",{staticClass:"white--text"},[e._v(" version 1.0 ")])],1)],1),n("v-divider"),n("v-list",{attrs:{dense:"",nav:""}},e._l(e.items,(function(t){return n("v-list-item",{key:t.title,attrs:{to:t.to,link:""}},[n("v-list-item-icon",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-content",{staticClass:"white--text font-weight-bold"},[n("v-list-item-title",[e._v(e._s(t.title))])],1)],1)})),1)],1)},l=[],s={data:function(){return{drawer:null,items:[{title:"Acceuil",icon:"mdi-view-home",to:"/"},{title:"Abonnés",icon:"mdi-view-dashboard",to:"/client"},{title:"Visites",icon:"mdi-image",to:"/visite-page"},{title:"Entreprises",icon:"mdi-view-dashboard",to:"/entreprise"},{title:"Changer mot de passe",icon:"mdi-help-box",to:"/compte"},{title:"Utilisateurs",icon:"mdi-help-box",to:"/user"},{title:"Login",icon:"mdi-help-box",to:"/login"}],right:null}}},u=s,c=n("2877"),d=n("6544"),m=n.n(d),f=n("ce7e"),p=n("132d"),g=n("8860"),h=n("da13"),v=n("5d23"),b=n("34c3"),_=n("f774"),w=Object(c["a"])(u,i,l,!1,null,null,null),y=w.exports;m()(w,{VDivider:f["a"],VIcon:p["a"],VList:g["a"],VListItem:h["a"],VListItemContent:v["a"],VListItemIcon:b["a"],VListItemSubtitle:v["b"],VListItemTitle:v["c"],VNavigationDrawer:_["a"]});var I=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app-bar",{staticClass:"primary darken-1  white--text",attrs:{app:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!e.drawer}}}),n("v-toolbar-title",[e._v("Bienvenue "+e._s(e.username)+", "+e._s(e.role))])],1)},S=[],k={data:function(){return{drawer:null,username:"",role:""}},created:function(){this.username=localStorage.getItem("nom"),this.role=localStorage.getItem("role"),console.log("USER ",this.$store.state)},methods:{logout:function(){localStorage.setItem("user_id",user.id),localStorage.setItem("login",user.login),localStorage.setItem("nom",user.nom),localStorage.setItem("role",user.role),localStorage.setItem("token",user.token)}}},E=k,x=n("40dc"),C=n("5bc1"),O=n("2a7f"),L=Object(c["a"])(E,I,S,!1,null,null,null),V=L.exports;m()(L,{VAppBar:x["a"],VAppBarNavIcon:C["a"],VToolbarTitle:O["a"]});var j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"overlay"},[n("div",{staticClass:"modal"},[e._m(0),n("div",{staticClass:"p-3"},[n("p",[e._v("Vous serez déconnecté pour inactivité.")]),n("p",[e._v(e._s(e.time)+" secondes restantes")])])])])},T=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"modal__title"},[n("span",[e._v("Expiration de la session")])])}],A={data:function(){return{time:1e4}},created:function(){var e=this,t=setInterval((function(){e.time-=1e3,e.$store.state.idleVue.isIdle||clearInterval(t),e.time<1&&(clearInterval(t),e.$router.push("/login"))}),1e3)}},$=A,N=(n("1be5"),Object(c["a"])($,j,T,!1,null,"199c5f44",null)),P=N.exports,B={components:{Navigation:y,Header:V,ModalIdle:P},data:function(){return{loggedin:!1}},created:function(){localStorage.getItem("token")&&(this.loggedin=localStorage.getItem("user_id").length>0),console.log("LOGGEDIN ",this.loggedin),this.loggedin||this.$router.push("/login")},computed:{isIdle:function(){return this.$store.state.idleVue.isIdle}}},M=B,D=n("7496"),H=n("f6c4"),G=Object(c["a"])(M,r,a,!1,null,null,null),U=G.exports;m()(G,{VApp:D["a"],VMain:H["a"]});n("d3b7"),n("3ca3"),n("ddb0");var q=n("8c4f"),J=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},z=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},[n("h2",[e._v("Acceuil")])])}],F={name:"Home",data:function(){return{username:"",role:""}},created:function(){this.username=localStorage.getItem("nom"),this.role=localStorage.getItem("role"),localStorage.getItem("user_id")||this.$router.push("/login")}},K=F,R=(n("5fb9"),Object(c["a"])(K,J,z,!1,null,"3cd2091c",null)),Y=R.exports;o["a"].use(q["a"]);var Q=[{path:"/",name:"Home",component:Y},{path:"/client",name:"Client",component:function(){return n.e("about").then(n.bind(null,"7b94"))}},{path:"/client-detail",name:"client-detail",component:function(){return n.e("about").then(n.bind(null,"c84b"))}},{path:"/visite-page",name:"visite-page",component:function(){return n.e("about").then(n.bind(null,"64b4"))}},{path:"/user",name:"user",component:function(){return n.e("about").then(n.bind(null,"1511"))}},{path:"/entreprise",name:"Entreprise",component:function(){return n.e("about").then(n.bind(null,"2da4"))}},{path:"/login",name:"Login",component:function(){return n.e("about").then(n.bind(null,"a55b"))}},{path:"/logout",name:"Logout",component:function(){return n.e("about").then(n.bind(null,"a55b"))}},{path:"/upload",name:"upload",component:function(){return n.e("about").then(n.bind(null,"3a68"))}}],W=new q["a"]({mode:"history",base:"/",routes:Q}),X=W,Z=n("f309");o["a"].use(Z["a"]);var ee=new Z["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:{base:"#569fd3",darken1:"0d3552",darken2:"011b2d",lighten1:"ddecf6",lighten2:"f4f7f9"},secondary:{base:"#5f6062",darken1:"04070e",lighten1:"e5e5e5"},accent:"#78496a",error:"#b32317",info:"#005595",success:"#8a8d35",warning:"#d06f1a"}}}}),te=n("dcb8"),ne=n.n(te),oe=n("2f62");o["a"].use(oe["a"]);var re=new oe["a"].Store({state:{user:{loggedin:!1,id:0,nom:"",role:"",token:"",login:""}},mutations:{login:function(e,t){console.log("LOGIN ",t),e.user.loggedin=!0,e.user.nom=t.nom,e.user.role=t.role,e.user.token=t.token,e.user.login=t.login,console.log("STATE ",e.user)},logout:function(e){console.log("Logout",e.user),e.user.loggedin=!1,e.user.id="",e.user.nom="",e.user.role="",e.user.token="",e.user.login="",localStorage.clear()}},actions:{},modules:{}});o["a"].config.productionTip=!1;var ae=new o["a"];o["a"].use(ne.a,{eventEmitter:ae,store:re,idleTime:6e5,startAtIdle:!1}),new o["a"]({router:X,store:re,vuetify:ee,render:function(e){return e(U)}}).$mount("#app")},"5fb9":function(e,t,n){"use strict";n("f20e")},f092:function(e,t,n){},f20e:function(e,t,n){}});
//# sourceMappingURL=app.1bd7ded4.js.map