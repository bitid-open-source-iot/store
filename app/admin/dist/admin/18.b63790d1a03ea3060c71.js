(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{Pn0e:function(t,e,i){"use strict";i.r(e),i.d(e,"SubscribersPageModule",(function(){return Ut}));var s=i("mrSG"),r=i("0IaG"),n=i("3Pt+"),a=i("fXoL"),o=i("dWDE"),l=i("/t3+"),c=i("kmnG"),h=i("bTqV"),d=i("NFeN"),u=i("qFsG"),p=i("ofXK"),f=i("d3UM"),m=i("FKr1");function b(t,e){if(1&t&&(a.Sb(0,"mat-error"),a.Cc(1),a.Rb()),2&t){const t=a.ec();a.Ab(1),a.Ec(" ",t.errors.email," ")}}function g(t,e){if(1&t&&(a.Sb(0,"mat-error"),a.Cc(1),a.Rb()),2&t){const t=a.ec();a.Ab(1),a.Ec(" ",t.errors.role," ")}}let y=(()=>{class t{constructor(t,e,i){this.dialog=t,this.config=e,this.formerror=i,this.form=new n.f({role:new n.c(1,[n.t.required]),email:new n.c(null,[n.t.required,n.t.email])}),this.errors={role:"",email:""},this.subscribers={}}close(){this.dialog.close(!1)}submit(){this.dialog.close(this.form.value)}ngOnInit(){this.subscribers.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),null!=this.config&&(null!=this.config.role&&this.form.controls.role.setValue(this.config.role),null!=this.config.email&&(this.form.controls.email.setValue(this.config.email),this.form.controls.email.disable()))}ngOnDestroy(){this.subscribers.form.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(r.d),a.Mb(r.a),a.Mb(o.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["user-editor-dialog"]],decls:29,vars:8,consts:[[1,"spacer"],["type","button","mat-icon-button","",3,"click"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],[4,"ngIf"],["name","role","placeholder","role","formControlName","role","required",""],[3,"value"],["disabled","",3,"value"],["type","submit","mat-flat-button","","color","primary"]],template:function(t,e){1&t&&(a.Sb(0,"mat-toolbar"),a.Sb(1,"mat-label",0),a.Cc(2," Manage User "),a.Rb(),a.Sb(3,"button",1),a.ac("click",(function(){return e.close()})),a.Sb(4,"mat-icon"),a.Cc(5,"close"),a.Rb(),a.Rb(),a.Rb(),a.Sb(6,"form",2),a.ac("ngSubmit",(function(){return!e.form.invalid&&e.submit()})),a.Sb(7,"mat-form-field",3),a.Sb(8,"mat-label"),a.Cc(9," Email "),a.Rb(),a.Nb(10,"input",4),a.Ac(11,b,2,1,"mat-error",5),a.Rb(),a.Sb(12,"mat-form-field",3),a.Sb(13,"mat-label"),a.Cc(14," Role "),a.Rb(),a.Sb(15,"mat-select",6),a.Sb(16,"mat-option",7),a.Cc(17," Read "),a.Rb(),a.Sb(18,"mat-option",7),a.Cc(19," Write "),a.Rb(),a.Sb(20,"mat-option",7),a.Cc(21," Read/Write "),a.Rb(),a.Sb(22,"mat-option",7),a.Cc(23," Admin "),a.Rb(),a.Sb(24,"mat-option",8),a.Cc(25," Owner "),a.Rb(),a.Rb(),a.Ac(26,g,2,1,"mat-error",5),a.Rb(),a.Sb(27,"button",9),a.Cc(28," submit "),a.Rb(),a.Rb()),2&t&&(a.Ab(6),a.kc("formGroup",e.form),a.Ab(5),a.kc("ngIf",e.errors.email),a.Ab(5),a.kc("value",1),a.Ab(2),a.kc("value",2),a.Ab(2),a.kc("value",3),a.Ab(2),a.kc("value",4),a.Ab(2),a.kc("value",5),a.Ab(2),a.kc("ngIf",e.errors.role))},directives:[l.a,c.f,h.a,d.a,n.u,n.n,n.g,c.c,u.a,n.b,n.m,n.e,n.s,p.m,f.a,m.k,c.b],styles:[".user-editor-dialog{width:500px!important}.user-editor-dialog .mat-dialog-container{padding:0 0 10px!important}.user-editor-dialog .mat-dialog-container mat-toolbar{display:flex;font-size:14px;margin-bottom:5px;justify-content:center}@media screen and (max-width:600px){.user-editor-dialog .mat-dialog-container{top:0;left:0;right:0;bottom:0;z-index:5000;position:fixed;border-radius:0}}"],encapsulation:2}),t})();var x=i("+0xr"),w=i("L7HW"),v=i("9ZKQ"),S=i("tyNb"),E=i("BhS5"),k=i("btHx"),A=i("XNiG"),C=i("2Vo4"),O=i("HDdC"),M=i("VRyK"),H=(i("7Hc7"),i("LRne"),i("xgIS"),i("pLZG")),R=(i("lJxs"),i("Kj3r"),i("eIep"),i("1G5W")),P=(i("IzEk"),i("vkgz"));const j={provide:a.b,useFactory:function(t,e){return()=>{if(Object(p.u)(e)){const e=Array.from(t.querySelectorAll(`[class*=${B}]`)),i=/\bflex-layout-.+?\b/g;e.forEach(t=>{t.classList.contains(B+"ssr")&&t.parentNode?t.parentNode.removeChild(t):t.className.replace(i,"")})}}},deps:[p.e,a.C],multi:!0},B="flex-layout-";let I=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},providers:[j]}),t})();class V{constructor(t=!1,e="all",i="",s="",r=0){this.matches=t,this.mediaQuery=e,this.mqAlias=i,this.suffix=s,this.priority=r,this.property=""}clone(){return new V(this.matches,this.mediaQuery,this.mqAlias,this.suffix)}}let _=(()=>{class t{constructor(){this.stylesheet=new Map}addStyleToElement(t,e,i){const s=this.stylesheet.get(t);s?s.set(e,i):this.stylesheet.set(t,new Map([[e,i]]))}clearStyles(){this.stylesheet.clear()}getStyleForElement(t,e){const i=this.stylesheet.get(t);let s="";if(i){const t=i.get(e);"number"!=typeof t&&"string"!=typeof t||(s=t+"")}return s}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=Object(a.Ib)({factory:function(){return new t},token:t,providedIn:"root"}),t})();const T={addFlexToParent:!0,addOrientationBps:!1,disableDefaultBps:!1,disableVendorPrefixes:!1,serverLoaded:!1,useColumnBasisZero:!0,printWithBreakpoints:[],mediaTriggerAutoRestore:!0,ssrObserveBreakpoints:[]},W=new a.r("Flex Layout token, config options for the library",{providedIn:"root",factory:()=>T}),L=new a.r("FlexLayoutServerLoaded",{providedIn:"root",factory:()=>!1}),Q=new a.r("Flex Layout token, collect all breakpoints into one provider",{providedIn:"root",factory:()=>null});function D(t,e){return t=t?t.clone():new V,e&&(t.mqAlias=e.alias,t.mediaQuery=e.mediaQuery,t.suffix=e.suffix,t.priority=e.priority),t}const N="inline",F=["row","column","row-reverse","column-reverse"];function K(t){if(t)switch(t.toLowerCase()){case"reverse":case"wrap-reverse":case"reverse-wrap":t="wrap-reverse";break;case"no":case"none":case"nowrap":t="nowrap";break;default:t="wrap"}return t}let $=(()=>{class t{constructor(t,e,i,s){this.elementRef=t,this.styleBuilder=e,this.styler=i,this.marshal=s,this.DIRECTIVE_KEY="",this.inputs=[],this.mru={},this.destroySubject=new A.a,this.styleCache=new Map}get parentElement(){return this.elementRef.nativeElement.parentElement}get nativeElement(){return this.elementRef.nativeElement}get activatedValue(){return this.marshal.getValue(this.nativeElement,this.DIRECTIVE_KEY)}set activatedValue(t){this.marshal.setValue(this.nativeElement,this.DIRECTIVE_KEY,t,this.marshal.activatedAlias)}ngOnChanges(t){Object.keys(t).forEach(e=>{if(-1!==this.inputs.indexOf(e)){const i=e.split(".").slice(1).join(".");this.setValue(t[e].currentValue,i)}})}ngOnDestroy(){this.destroySubject.next(),this.destroySubject.complete(),this.marshal.releaseElement(this.nativeElement)}init(t=[]){this.marshal.init(this.elementRef.nativeElement,this.DIRECTIVE_KEY,this.updateWithValue.bind(this),this.clearStyles.bind(this),t)}addStyles(t,e){const i=this.styleBuilder,s=i.shouldCache;let r=this.styleCache.get(t);r&&s||(r=i.buildStyles(t,e),s&&this.styleCache.set(t,r)),this.mru=Object.assign({},r),this.applyStyleToElement(r),i.sideEffect(t,r,e)}clearStyles(){Object.keys(this.mru).forEach(t=>{this.mru[t]=""}),this.applyStyleToElement(this.mru),this.mru={}}triggerUpdate(){this.marshal.triggerUpdate(this.nativeElement,this.DIRECTIVE_KEY)}getFlexFlowDirection(t,e=!1){if(t){const[i,s]=this.styler.getFlowDirection(t);if(!s&&e){const e=function(t){let[e,i,s]=function(t){t=t?t.toLowerCase():"";let[e,i,s]=t.split(" ");return F.find(t=>t===e)||(e=F[0]),i===N&&(i=s!==N?s:"",s=N),[e,K(i),!!s]}(t);return function(t,e=null,i=!1){return{display:i?"inline-flex":"flex","box-sizing":"border-box","flex-direction":t,"flex-wrap":e||null}}(e,i,s)}(i);this.styler.applyStyleToElements(e,[t])}return i.trim()}return"row"}hasWrap(t){return this.styler.hasWrap(t)}applyStyleToElement(t,e,i=this.nativeElement){this.styler.applyStyleToElement(i,t,e)}setValue(t,e){this.marshal.setValue(this.nativeElement,this.DIRECTIVE_KEY,t,e)}updateWithValue(t){this.currentValue!==t&&(this.addStyles(t),this.currentValue=t)}}return t.\u0275fac=function(t){a.Zb()},t.\u0275dir=a.Hb({type:t,features:[a.yb]}),t})();const q=[{alias:"xs",mediaQuery:"screen and (min-width: 0px) and (max-width: 599.98px)",priority:1e3},{alias:"sm",mediaQuery:"screen and (min-width: 600px) and (max-width: 959.98px)",priority:900},{alias:"md",mediaQuery:"screen and (min-width: 960px) and (max-width: 1279.98px)",priority:800},{alias:"lg",mediaQuery:"screen and (min-width: 1280px) and (max-width: 1919.98px)",priority:700},{alias:"xl",mediaQuery:"screen and (min-width: 1920px) and (max-width: 4999.98px)",priority:600},{alias:"lt-sm",overlapping:!0,mediaQuery:"screen and (max-width: 599.98px)",priority:950},{alias:"lt-md",overlapping:!0,mediaQuery:"screen and (max-width: 959.98px)",priority:850},{alias:"lt-lg",overlapping:!0,mediaQuery:"screen and (max-width: 1279.98px)",priority:750},{alias:"lt-xl",overlapping:!0,priority:650,mediaQuery:"screen and (max-width: 1919.98px)"},{alias:"gt-xs",overlapping:!0,mediaQuery:"screen and (min-width: 600px)",priority:-950},{alias:"gt-sm",overlapping:!0,mediaQuery:"screen and (min-width: 960px)",priority:-850},{alias:"gt-md",overlapping:!0,mediaQuery:"screen and (min-width: 1280px)",priority:-750},{alias:"gt-lg",overlapping:!0,mediaQuery:"screen and (min-width: 1920px)",priority:-650}],U="(orientation: portrait) and (max-width: 599.98px)",J="(orientation: landscape) and (max-width: 959.98px)",G="(orientation: portrait) and (min-width: 600px) and (max-width: 839.98px)",Y="(orientation: landscape) and (min-width: 960px) and (max-width: 1279.98px)",z="(orientation: portrait) and (min-width: 840px)",Z="(orientation: landscape) and (min-width: 1280px)",X={HANDSET:`${U}, ${J}`,TABLET:`${G} , ${Y}`,WEB:`${z}, ${Z} `,HANDSET_PORTRAIT:""+U,TABLET_PORTRAIT:G+" ",WEB_PORTRAIT:""+z,HANDSET_LANDSCAPE:""+J,TABLET_LANDSCAPE:""+Y,WEB_LANDSCAPE:""+Z},tt=[{alias:"handset",priority:2e3,mediaQuery:X.HANDSET},{alias:"handset.landscape",priority:2e3,mediaQuery:X.HANDSET_LANDSCAPE},{alias:"handset.portrait",priority:2e3,mediaQuery:X.HANDSET_PORTRAIT},{alias:"tablet",priority:2100,mediaQuery:X.TABLET},{alias:"tablet.landscape",priority:2100,mediaQuery:X.TABLET_LANDSCAPE},{alias:"tablet.portrait",priority:2100,mediaQuery:X.TABLET_PORTRAIT},{alias:"web",priority:2200,mediaQuery:X.WEB,overlapping:!0},{alias:"web.landscape",priority:2200,mediaQuery:X.WEB_LANDSCAPE,overlapping:!0},{alias:"web.portrait",priority:2200,mediaQuery:X.WEB_PORTRAIT,overlapping:!0}],et=/(\.|-|_)/g;function it(t){let e=t.length>0?t.charAt(0):"",i=t.length>1?t.slice(1):"";return e.toUpperCase()+i}const st=new a.r("Token (@angular/flex-layout) Breakpoints",{providedIn:"root",factory:()=>{const t=Object(a.V)(Q),e=Object(a.V)(W),i=[].concat.apply([],(t||[]).map(t=>Array.isArray(t)?t:[t]));return function(t,e=[]){const i={};return t.forEach(t=>{i[t.alias]=t}),e.forEach(t=>{i[t.alias]?function(t,...e){if(null==t)throw TypeError("Cannot convert undefined or null to object");for(let i of e)if(null!=i)for(let e in i)i.hasOwnProperty(e)&&(t[e]=i[e])}(i[t.alias],t):i[t.alias]=t}),function(t){return t.forEach(t=>{t.suffix||(t.suffix=t.alias.replace(et,"|").split("|").map(it).join(""),t.overlapping=!!t.overlapping)}),t}(Object.keys(i).map(t=>i[t]))}((e.disableDefaultBps?[]:q).concat(e.addOrientationBps?tt:[]),i)}});function rt(t,e){return(e&&e.priority||0)-(t&&t.priority||0)}function nt(t,e){return(t.priority||0)-(e.priority||0)}let at=(()=>{class t{constructor(t){this.findByMap=new Map,this.items=[...t].sort(nt)}findByAlias(t){return t?this.findWithPredicate(t,e=>e.alias==t):null}findByQuery(t){return this.findWithPredicate(t,e=>e.mediaQuery==t)}get overlappings(){return this.items.filter(t=>1==t.overlapping)}get aliases(){return this.items.map(t=>t.alias)}get suffixes(){return this.items.map(t=>t.suffix?t.suffix:"")}findWithPredicate(t,e){let i=this.findByMap.get(t);return i||(i=this.items.find(e)||null,this.findByMap.set(t,i)),i||null}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(st))},t.\u0275prov=Object(a.Ib)({factory:function(){return new t(Object(a.Wb)(st))},token:t,providedIn:"root"}),t})(),ot=(()=>{class t{constructor(t,e,i){this._zone=t,this._platformId=e,this._document=i,this.source=new C.a(new V(!0)),this.registry=new Map,this.pendingRemoveListenerFns=[],this._observable$=this.source.asObservable()}get activations(){const t=[];return this.registry.forEach((e,i)=>{e.matches&&t.push(i)}),t}isActive(t){const e=this.registry.get(t);return e?e.matches:this.registerQuery(t).some(t=>t.matches)}observe(t,e=!1){if(t&&t.length){const i=this._observable$.pipe(Object(H.a)(i=>!e||t.indexOf(i.mediaQuery)>-1)),s=new O.a(e=>{const i=this.registerQuery(t);if(i.length){const t=i.pop();i.forEach(t=>{e.next(t)}),this.source.next(t)}e.complete()});return Object(M.a)(s,i)}return this._observable$}registerQuery(t){const e=Array.isArray(t)?t:[t],i=[];return function(t,e){const i=t.filter(t=>!lt[t]);if(i.length>0){const t=i.join(", ");try{const s=e.createElement("style");s.setAttribute("type","text/css"),s.styleSheet||s.appendChild(e.createTextNode(`\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`)),e.head.appendChild(s),i.forEach(t=>lt[t]=s)}catch(s){console.error(s)}}}(e,this._document),e.forEach(t=>{const e=e=>{this._zone.run(()=>this.source.next(new V(e.matches,t)))};let s=this.registry.get(t);s||(s=this.buildMQL(t),s.addListener(e),this.pendingRemoveListenerFns.push(()=>s.removeListener(e)),this.registry.set(t,s)),s.matches&&i.push(new V(!0,t))}),i}ngOnDestroy(){let t;for(;t=this.pendingRemoveListenerFns.pop();)t()}buildMQL(t){return function(t,e){return e&&window.matchMedia("all").addListener?window.matchMedia(t):{matches:"all"===t||""===t,media:t,addListener:()=>{},removeListener:()=>{},onchange:null,addEventListener(){},removeEventListener(){},dispatchEvent:()=>!1}}(t,Object(p.u)(this._platformId))}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(a.A),a.Wb(a.C),a.Wb(p.e))},t.\u0275prov=Object(a.Ib)({factory:function(){return new t(Object(a.Wb)(a.A),Object(a.Wb)(a.C),Object(a.Wb)(p.e))},token:t,providedIn:"root"}),t})();const lt={},ct="print",ht={alias:ct,mediaQuery:ct,priority:1e3};let dt=(()=>{class t{constructor(t,e,i){this.breakpoints=t,this.layoutConfig=e,this._document=i,this.registeredBeforeAfterPrintHooks=!1,this.isPrintingBeforeAfterEvent=!1,this.beforePrintEventListeners=[],this.afterPrintEventListeners=[],this.isPrinting=!1,this.queue=new ut,this.deactivations=[]}withPrintQuery(t){return[...t,ct]}isPrintEvent(t){return t.mediaQuery.startsWith(ct)}get printAlias(){return this.layoutConfig.printWithBreakpoints||[]}get printBreakPoints(){return this.printAlias.map(t=>this.breakpoints.findByAlias(t)).filter(t=>null!==t)}getEventBreakpoints({mediaQuery:t}){const e=this.breakpoints.findByQuery(t);return(e?[...this.printBreakPoints,e]:this.printBreakPoints).sort(rt)}updateEvent(t){let e=this.breakpoints.findByQuery(t.mediaQuery);return this.isPrintEvent(t)&&(e=this.getEventBreakpoints(t)[0],t.mediaQuery=e?e.mediaQuery:""),D(t,e)}registerBeforeAfterPrintHooks(t){if(!this._document.defaultView||this.registeredBeforeAfterPrintHooks)return;this.registeredBeforeAfterPrintHooks=!0;const e=()=>{this.isPrinting||(this.isPrintingBeforeAfterEvent=!0,this.startPrinting(t,this.getEventBreakpoints(new V(!0,ct))),t.updateStyles())},i=()=>{this.isPrintingBeforeAfterEvent=!1,this.isPrinting&&(this.stopPrinting(t),t.updateStyles())};this._document.defaultView.addEventListener("beforeprint",e),this._document.defaultView.addEventListener("afterprint",i),this.beforePrintEventListeners.push(e),this.afterPrintEventListeners.push(i)}interceptEvents(t){return this.registerBeforeAfterPrintHooks(t),e=>{this.isPrintEvent(e)?e.matches&&!this.isPrinting?(this.startPrinting(t,this.getEventBreakpoints(e)),t.updateStyles()):e.matches||!this.isPrinting||this.isPrintingBeforeAfterEvent||(this.stopPrinting(t),t.updateStyles()):this.collectActivations(e)}}blockPropagation(){return t=>!(this.isPrinting||this.isPrintEvent(t))}startPrinting(t,e){this.isPrinting=!0,t.activatedBreakpoints=this.queue.addPrintBreakpoints(e)}stopPrinting(t){t.activatedBreakpoints=this.deactivations,this.deactivations=[],this.queue.clear(),this.isPrinting=!1}collectActivations(t){if(!this.isPrinting||this.isPrintingBeforeAfterEvent)if(t.matches)this.isPrintingBeforeAfterEvent||(this.deactivations=[]);else{const e=this.breakpoints.findByQuery(t.mediaQuery);e&&(this.deactivations.push(e),this.deactivations.sort(rt))}}ngOnDestroy(){this.beforePrintEventListeners.forEach(t=>this._document.defaultView.removeEventListener("beforeprint",t)),this.afterPrintEventListeners.forEach(t=>this._document.defaultView.removeEventListener("afterprint",t))}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(at),a.Wb(W),a.Wb(p.e))},t.\u0275prov=Object(a.Ib)({factory:function(){return new t(Object(a.Wb)(at),Object(a.Wb)(W),Object(a.Wb)(p.e))},token:t,providedIn:"root"}),t})();class ut{constructor(){this.printBreakpoints=[]}addPrintBreakpoints(t){return t.push(ht),t.sort(rt),t.forEach(t=>this.addBreakpoint(t)),this.printBreakpoints}addBreakpoint(t){t&&void 0===this.printBreakpoints.find(e=>e.mediaQuery===t.mediaQuery)&&(this.printBreakpoints=function(t){return!!t&&t.mediaQuery.startsWith(ct)}(t)?[t,...this.printBreakpoints]:[...this.printBreakpoints,t])}clear(){this.printBreakpoints=[]}}function pt(t){for(let e in t){let i=t[e]||"";switch(e){case"display":t.display="flex"===i?["-webkit-flex","flex"]:"inline-flex"===i?["-webkit-inline-flex","inline-flex"]:i;break;case"align-items":case"align-self":case"align-content":case"flex":case"flex-basis":case"flex-flow":case"flex-grow":case"flex-shrink":case"flex-wrap":case"justify-content":t["-webkit-"+e]=i;break;case"flex-direction":i=i||"row",t["-webkit-flex-direction"]=i,t["flex-direction"]=i;break;case"order":t.order=t["-webkit-"+e]=isNaN(+i)?"0":i}}return t}let ft=(()=>{class t{constructor(t,e,i,s){this._serverStylesheet=t,this._serverModuleLoaded=e,this._platformId=i,this.layoutConfig=s}applyStyleToElement(t,e,i=null){let s={};"string"==typeof e&&(s[e]=i,e=s),s=this.layoutConfig.disableVendorPrefixes?e:pt(e),this._applyMultiValueStyleToElement(s,t)}applyStyleToElements(t,e=[]){const i=this.layoutConfig.disableVendorPrefixes?t:pt(t);e.forEach(t=>{this._applyMultiValueStyleToElement(i,t)})}getFlowDirection(t){const e="flex-direction";let i=this.lookupStyle(t,e);return[i||"row",this.lookupInlineStyle(t,e)||Object(p.v)(this._platformId)&&this._serverModuleLoaded?i:""]}hasWrap(t){return"wrap"===this.lookupStyle(t,"flex-wrap")}lookupAttributeValue(t,e){return t.getAttribute(e)||""}lookupInlineStyle(t,e){return Object(p.u)(this._platformId)?t.style.getPropertyValue(e):this._getServerStyle(t,e)}lookupStyle(t,e,i=!1){let s="";return t&&((s=this.lookupInlineStyle(t,e))||(Object(p.u)(this._platformId)?i||(s=getComputedStyle(t).getPropertyValue(e)):this._serverModuleLoaded&&(s=this._serverStylesheet.getStyleForElement(t,e)))),s?s.trim():""}_applyMultiValueStyleToElement(t,e){Object.keys(t).sort().forEach(i=>{const s=t[i],r=Array.isArray(s)?s:[s];r.sort();for(let t of r)t=t?t+"":"",Object(p.u)(this._platformId)||!this._serverModuleLoaded?Object(p.u)(this._platformId)?e.style.setProperty(i,t):this._setServerStyle(e,i,t):this._serverStylesheet.addStyleToElement(e,i,t)})}_setServerStyle(t,e,i){e=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();const s=this._readStyleAttribute(t);s[e]=i||"",this._writeStyleAttribute(t,s)}_getServerStyle(t,e){return this._readStyleAttribute(t)[e]||""}_readStyleAttribute(t){const e={},i=t.getAttribute("style");if(i){const t=i.split(/;+/g);for(let i=0;i<t.length;i++){const s=t[i].trim();if(s.length>0){const t=s.indexOf(":");if(-1===t)throw new Error("Invalid CSS style: "+s);e[s.substr(0,t).trim()]=s.substr(t+1).trim()}}}return e}_writeStyleAttribute(t,e){let i="";for(const s in e)e[s]&&(i+=s+":"+e[s]+";");t.setAttribute("style",i)}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(_),a.Wb(L),a.Wb(a.C),a.Wb(W))},t.\u0275prov=Object(a.Ib)({factory:function(){return new t(Object(a.Wb)(_),Object(a.Wb)(L),Object(a.Wb)(a.C),Object(a.Wb)(W))},token:t,providedIn:"root"}),t})(),mt=(()=>{class t{constructor(t,e,i){this.matchMedia=t,this.breakpoints=e,this.hook=i,this.activatedBreakpoints=[],this.elementMap=new Map,this.elementKeyMap=new WeakMap,this.watcherMap=new WeakMap,this.updateMap=new WeakMap,this.clearMap=new WeakMap,this.subject=new A.a,this.observeActivations()}get activatedAlias(){return this.activatedBreakpoints[0]?this.activatedBreakpoints[0].alias:""}onMediaChange(t){const e=this.findByQuery(t.mediaQuery);e&&((t=D(t,e)).matches&&-1===this.activatedBreakpoints.indexOf(e)?(this.activatedBreakpoints.push(e),this.activatedBreakpoints.sort(rt),this.updateStyles()):t.matches||-1===this.activatedBreakpoints.indexOf(e)||(this.activatedBreakpoints.splice(this.activatedBreakpoints.indexOf(e),1),this.activatedBreakpoints.sort(rt),this.updateStyles()))}init(t,e,i,s,r=[]){bt(this.updateMap,t,e,i),bt(this.clearMap,t,e,s),this.buildElementKeyMap(t,e),this.watchExtraTriggers(t,e,r)}getValue(t,e,i){const s=this.elementMap.get(t);if(s){const t=void 0!==i?s.get(i):this.getActivatedValues(s,e);if(t)return t.get(e)}}hasValue(t,e){const i=this.elementMap.get(t);if(i){const t=this.getActivatedValues(i,e);if(t)return void 0!==t.get(e)||!1}return!1}setValue(t,e,i,s){let r=this.elementMap.get(t);if(r){const n=(r.get(s)||new Map).set(e,i);r.set(s,n),this.elementMap.set(t,r)}else r=(new Map).set(s,(new Map).set(e,i)),this.elementMap.set(t,r);const n=this.getValue(t,e);void 0!==n&&this.updateElement(t,e,n)}trackValue(t,e){return this.subject.asObservable().pipe(Object(H.a)(i=>i.element===t&&i.key===e))}updateStyles(){this.elementMap.forEach((t,e)=>{const i=new Set(this.elementKeyMap.get(e));let s=this.getActivatedValues(t);s&&s.forEach((t,s)=>{this.updateElement(e,s,t),i.delete(s)}),i.forEach(i=>{if(s=this.getActivatedValues(t,i),s){const t=s.get(i);this.updateElement(e,i,t)}else this.clearElement(e,i)})})}clearElement(t,e){const i=this.clearMap.get(t);if(i){const s=i.get(e);s&&(s(),this.subject.next({element:t,key:e,value:""}))}}updateElement(t,e,i){const s=this.updateMap.get(t);if(s){const r=s.get(e);r&&(r(i),this.subject.next({element:t,key:e,value:i}))}}releaseElement(t){const e=this.watcherMap.get(t);e&&(e.forEach(t=>t.unsubscribe()),this.watcherMap.delete(t));const i=this.elementMap.get(t);i&&(i.forEach((t,e)=>i.delete(e)),this.elementMap.delete(t))}triggerUpdate(t,e){const i=this.elementMap.get(t);if(i){const s=this.getActivatedValues(i,e);s&&(e?this.updateElement(t,e,s.get(e)):s.forEach((e,i)=>this.updateElement(t,i,e)))}}buildElementKeyMap(t,e){let i=this.elementKeyMap.get(t);i||(i=new Set,this.elementKeyMap.set(t,i)),i.add(e)}watchExtraTriggers(t,e,i){if(i&&i.length){let s=this.watcherMap.get(t);if(s||(s=new Map,this.watcherMap.set(t,s)),!s.get(e)){const r=Object(M.a)(...i).subscribe(()=>{const i=this.getValue(t,e);this.updateElement(t,e,i)});s.set(e,r)}}}findByQuery(t){return this.breakpoints.findByQuery(t)}getActivatedValues(t,e){for(let s=0;s<this.activatedBreakpoints.length;s++){const i=t.get(this.activatedBreakpoints[s].alias);if(i&&(void 0===e||i.has(e)&&null!=i.get(e)))return i}const i=t.get("");return void 0===e||i&&i.has(e)?i:void 0}observeActivations(){const t=this.breakpoints.items.map(t=>t.mediaQuery);this.matchMedia.observe(this.hook.withPrintQuery(t)).pipe(Object(P.a)(this.hook.interceptEvents(this)),Object(H.a)(this.hook.blockPropagation())).subscribe(this.onMediaChange.bind(this))}}return t.\u0275fac=function(e){return new(e||t)(a.Wb(ot),a.Wb(at),a.Wb(dt))},t.\u0275prov=Object(a.Ib)({factory:function(){return new t(Object(a.Wb)(ot),Object(a.Wb)(at),Object(a.Wb)(dt))},token:t,providedIn:"root"}),t})();function bt(t,e,i,s){if(void 0!==s){let r=t.get(e);r||(r=new Map,t.set(e,r)),r.set(i,s)}}var gt=i("8LU1");i("jhN1");let yt=(()=>{class t extends class{constructor(){this.shouldCache=!0}sideEffect(t,e,i){}}{buildStyles(t,e){return{display:"true"===t?e.display||(e.isServer?"initial":""):"none"}}}return t.\u0275fac=function(e){return xt(e||t)},t.\u0275prov=Object(a.Ib)({factory:function(){return new t},token:t,providedIn:"root"}),t})();const xt=a.Ub(yt);let wt=(()=>{class t extends ${constructor(t,e,i,s,r,n,a){super(t,e,i,s),this.layoutConfig=r,this.platformId=n,this.serverModuleLoaded=a,this.DIRECTIVE_KEY="show-hide",this.display="",this.hasLayout=!1,this.hasFlexChild=!1}ngAfterViewInit(){this.trackExtraTriggers();const t=Array.from(this.nativeElement.children);for(let i=0;i<t.length;i++)if(this.marshal.hasValue(t[i],"flex")){this.hasFlexChild=!0;break}vt.has(this.nativeElement)?this.display=vt.get(this.nativeElement):(this.display=this.getDisplayStyle(),vt.set(this.nativeElement,this.display)),this.init();const e=this.marshal.getValue(this.nativeElement,this.DIRECTIVE_KEY,"");void 0===e||""===e?this.setValue(!0,""):this.triggerUpdate()}ngOnChanges(t){Object.keys(t).forEach(e=>{if(-1!==this.inputs.indexOf(e)){const i=e.split("."),s=i.slice(1).join("."),r=t[e].currentValue;let n=""===r||0!==r&&Object(gt.c)(r);"fxHide"===i[0]&&(n=!n),this.setValue(n,s)}})}trackExtraTriggers(){this.hasLayout=this.marshal.hasValue(this.nativeElement,"layout"),["layout","layout-align"].forEach(t=>{this.marshal.trackValue(this.nativeElement,t).pipe(Object(R.a)(this.destroySubject)).subscribe(this.triggerUpdate.bind(this))})}getDisplayStyle(){return this.hasLayout||this.hasFlexChild&&this.layoutConfig.addFlexToParent?"flex":this.styler.lookupStyle(this.nativeElement,"display",!0)}updateWithValue(t=!0){if(""===t)return;const e=Object(p.v)(this.platformId);this.addStyles(t?"true":"false",{display:this.display,isServer:e}),e&&this.serverModuleLoaded&&this.nativeElement.style.setProperty("display",""),this.marshal.triggerUpdate(this.parentElement,"layout-gap")}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(a.l),a.Mb(yt),a.Mb(ft),a.Mb(mt),a.Mb(W),a.Mb(a.C),a.Mb(L))},t.\u0275dir=a.Hb({type:t,features:[a.xb,a.yb]}),t})();const vt=new WeakMap,St=["fxShow","fxShow.print","fxShow.xs","fxShow.sm","fxShow.md","fxShow.lg","fxShow.xl","fxShow.lt-sm","fxShow.lt-md","fxShow.lt-lg","fxShow.lt-xl","fxShow.gt-xs","fxShow.gt-sm","fxShow.gt-md","fxShow.gt-lg","fxHide","fxHide.print","fxHide.xs","fxHide.sm","fxHide.md","fxHide.lg","fxHide.xl","fxHide.lt-sm","fxHide.lt-md","fxHide.lt-lg","fxHide.lt-xl","fxHide.gt-xs","fxHide.gt-sm","fxHide.gt-md","fxHide.gt-lg"];let Et=(()=>{class t extends wt{constructor(){super(...arguments),this.inputs=St}}return t.\u0275fac=function(e){return kt(e||t)},t.\u0275dir=a.Hb({type:t,selectors:[["","fxShow",""],["","fxShow.print",""],["","fxShow.xs",""],["","fxShow.sm",""],["","fxShow.md",""],["","fxShow.lg",""],["","fxShow.xl",""],["","fxShow.lt-sm",""],["","fxShow.lt-md",""],["","fxShow.lt-lg",""],["","fxShow.lt-xl",""],["","fxShow.gt-xs",""],["","fxShow.gt-sm",""],["","fxShow.gt-md",""],["","fxShow.gt-lg",""],["","fxHide",""],["","fxHide.print",""],["","fxHide.xs",""],["","fxHide.sm",""],["","fxHide.md",""],["","fxHide.lg",""],["","fxHide.xl",""],["","fxHide.lt-sm",""],["","fxHide.lt-md",""],["","fxHide.lt-lg",""],["","fxHide.lt-xl",""],["","fxHide.gt-xs",""],["","fxHide.gt-sm",""],["","fxHide.gt-md",""],["","fxHide.gt-lg",""]],inputs:{fxShow:"fxShow","fxShow.print":"fxShow.print","fxShow.xs":"fxShow.xs","fxShow.sm":"fxShow.sm","fxShow.md":"fxShow.md","fxShow.lg":"fxShow.lg","fxShow.xl":"fxShow.xl","fxShow.lt-sm":"fxShow.lt-sm","fxShow.lt-md":"fxShow.lt-md","fxShow.lt-lg":"fxShow.lt-lg","fxShow.lt-xl":"fxShow.lt-xl","fxShow.gt-xs":"fxShow.gt-xs","fxShow.gt-sm":"fxShow.gt-sm","fxShow.gt-md":"fxShow.gt-md","fxShow.gt-lg":"fxShow.gt-lg",fxHide:"fxHide","fxHide.print":"fxHide.print","fxHide.xs":"fxHide.xs","fxHide.sm":"fxHide.sm","fxHide.md":"fxHide.md","fxHide.lg":"fxHide.lg","fxHide.xl":"fxHide.xl","fxHide.lt-sm":"fxHide.lt-sm","fxHide.lt-md":"fxHide.lt-md","fxHide.lt-lg":"fxHide.lt-lg","fxHide.lt-xl":"fxHide.lt-xl","fxHide.gt-xs":"fxHide.gt-xs","fxHide.gt-sm":"fxHide.gt-sm","fxHide.gt-md":"fxHide.gt-md","fxHide.gt-lg":"fxHide.gt-lg"},features:[a.xb]}),t})();const kt=a.Ub(Et);let At=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[I]]}),t})();var Ct=i("MutI");function Ot(t,e){1&t&&(a.Sb(0,"th",10),a.Cc(1," Email "),a.Rb())}function Mt(t,e){if(1&t&&(a.Sb(0,"td",11),a.Cc(1),a.Rb()),2&t){const t=e.$implicit;a.Ab(1),a.Ec(" ",t.email," ")}}function Ht(t,e){1&t&&(a.Sb(0,"th",10),a.Cc(1," Role "),a.Rb())}function Rt(t,e){if(1&t){const t=a.Tb();a.Sb(0,"td",11),a.Sb(1,"mat-select",12),a.ac("ngModelChange",(function(i){return a.rc(t),e.$implicit.role=i}))("ngModelChange",(function(i){a.rc(t);const s=e.$implicit;return a.ec().updatesubscriber(s.email,i)})),a.Sb(2,"mat-option",13),a.Cc(3," Read "),a.Rb(),a.Sb(4,"mat-option",13),a.Cc(5," Write "),a.Rb(),a.Sb(6,"mat-option",13),a.Cc(7," Read/Write "),a.Rb(),a.Sb(8,"mat-option",13),a.Cc(9," Admin "),a.Rb(),a.Sb(10,"mat-option",14),a.Cc(11," Owner "),a.Rb(),a.Rb(),a.Rb()}if(2&t){const t=e.$implicit,i=a.ec();a.Ab(1),a.kc("ngModel",t.role)("disabled",i.role<4||t.role>=i.role||5==t.role),a.Ab(1),a.kc("value",1),a.Ab(2),a.kc("value",2),a.Ab(2),a.kc("value",3),a.Ab(2),a.kc("value",4),a.Ab(2),a.kc("value",5)}}function Pt(t,e){1&t&&a.Nb(0,"th",10)}function jt(t,e){if(1&t){const t=a.Tb();a.Sb(0,"td",11),a.Sb(1,"button",15),a.ac("click",(function(){a.rc(t);const i=e.$implicit;return a.ec().unsubscribe(i.email)})),a.Sb(2,"mat-icon"),a.Cc(3," delete "),a.Rb(),a.Rb(),a.Rb()}if(2&t){const t=e.$implicit,i=a.ec();a.Ab(1),a.kc("disabled",i.role<4||t.role>=i.role||5==t.role)}}function Bt(t,e){1&t&&a.Nb(0,"tr",16)}function It(t,e){1&t&&a.Nb(0,"tr",17)}function Vt(t,e){if(1&t){const t=a.Tb();a.Sb(0,"mat-list-item",18),a.Sb(1,"mat-label"),a.Sb(2,"h3"),a.Cc(3),a.Rb(),a.Sb(4,"p"),a.Cc(5),a.Rb(),a.Rb(),a.Sb(6,"button",19),a.ac("click",(function(){a.rc(t);const i=e.$implicit;return a.ec().editor(i)})),a.Sb(7,"mat-icon"),a.Cc(8," edit "),a.Rb(),a.Rb(),a.Sb(9,"button",15),a.ac("click",(function(){a.rc(t);const i=e.$implicit;return a.ec().unsubscribe(i.email)})),a.Sb(10,"mat-icon"),a.Cc(11," delete "),a.Rb(),a.Rb(),a.Rb()}if(2&t){const t=e.$implicit,i=a.ec();a.Ab(3),a.Ec(" ",t.email," "),a.Ab(2),a.Gc(" ",1==t.role?"Read":""," ",2==t.role?"Write":""," ",3==t.role?"Read/Write":""," ",4==t.role?"Admin":""," ",5==t.role?"Owner":""," "),a.Ab(1),a.kc("disabled",i.role<4||t.role>=i.role||5==t.role),a.Ab(3),a.kc("disabled",i.role<4||t.role>=i.role||5==t.role)}}let _t=(()=>{class t{constructor(t,e,i,s,r,n){this.config=t,this.dialog=e,this.toast=i,this.route=s,this.buttons=r,this.stores=n,this.users=new x.o,this.columns=["email","role","options"],this.subscriptions={}}get(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t={filter:["role","users"]};let e;switch(this.type){case"store":e=this.stores,t.storeId=this.id}const i=yield e.get(t);i.ok?(this.role=i.result.role,this.users.data=i.result.users):this.users.data=[],this.loading=!1}))}share(t){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const e={role:t.role,email:t.email};let i;switch(this.type){case"store":i=this.stores,e.storeId=this.id}const s=yield i.share(e);s.ok?(this.users.data.push(t),this.users.data=JSON.parse(JSON.stringify(this.users.data)),this.toast.success("User was shared!")):this.toast.error(s.error.message),this.loading=!1}))}editor(t){return Object(s.a)(this,void 0,void 0,(function*(){(yield this.dialog.open(y,{data:t,panelClass:"user-editor-dialog"})).afterClosed().subscribe(e=>{e&&(t?this.updatesubscriber(t.email,e.role):this.share(e))})}))}unsubscribe(t){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const e={email:t};let i;switch(this.type){case"store":i=this.stores,e.storeId=this.id}const s=yield i.unsubscribe(e);if(s.ok){for(let e=0;e<this.users.data.length;e++)this.users.data[e].email==t&&this.users.data.splice(e,1);this.users.data=JSON.parse(JSON.stringify(this.users.data)),this.toast.success("User was removed!")}else this.toast.error(s.error.message);this.loading=!1}))}updatesubscriber(t,e){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const i={role:e,email:t};let s;switch(this.type){case"store":s=this.stores,i.storeId=this.id}const r=yield s.updatesubscriber(i);r.ok?this.toast.success("User was updated!"):this.toast.error(r.error.message),this.loading=!1}))}ngOnInit(){this.buttons.show("add"),this.buttons.show("close"),this.buttons.hide("search"),this.buttons.hide("filter"),this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.editor()}),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{window.history.back()}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{if(t){const t=this.route.snapshot.queryParams;this.id=t.id,this.type=t.type,this.get()}})}ngOnDestroy(){this.subscriptions.add.unsubscribe(),this.subscriptions.close.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(w.a),a.Mb(r.b),a.Mb(v.a),a.Mb(S.a),a.Mb(E.a),a.Mb(k.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["subscribers-page"]],decls:14,vars:5,consts:[["mat-table","","fxShow","","fxHide.xs","true",3,"dataSource"],["matColumnDef","email"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","role"],["matColumnDef","options"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["fxHide","","fxShow.xs","true"],["lines","full",4,"ngFor","ngForOf"],["mat-header-cell",""],["mat-cell",""],["required","",3,"ngModel","disabled","ngModelChange"],[3,"value"],["disabled","",3,"value"],["mat-icon-button","","color","warn",3,"disabled","click"],["mat-header-row",""],["mat-row",""],["lines","full"],["mat-icon-button","",3,"disabled","click"]],template:function(t,e){1&t&&(a.Sb(0,"table",0),a.Qb(1,1),a.Ac(2,Ot,2,0,"th",2),a.Ac(3,Mt,2,1,"td",3),a.Pb(),a.Qb(4,4),a.Ac(5,Ht,2,0,"th",2),a.Ac(6,Rt,12,7,"td",3),a.Pb(),a.Qb(7,5),a.Ac(8,Pt,1,0,"th",2),a.Ac(9,jt,4,1,"td",3),a.Pb(),a.Ac(10,Bt,1,0,"tr",6),a.Ac(11,It,1,0,"tr",7),a.Rb(),a.Sb(12,"mat-list",8),a.Ac(13,Vt,12,8,"mat-list-item",9),a.Rb()),2&t&&(a.kc("dataSource",e.users),a.Ab(10),a.kc("matHeaderRowDef",e.columns)("matHeaderRowDefSticky",!0),a.Ab(1),a.kc("matRowDefColumns",e.columns),a.Ab(2),a.kc("ngForOf",e.users.data))},directives:[x.n,Et,x.c,x.i,x.b,x.k,x.m,Ct.a,p.l,x.h,x.a,f.a,n.s,n.m,n.p,m.k,h.a,d.a,x.j,x.l,Ct.b,c.f],styles:[".mat-column-options[_ngcontent-%COMP%]{width:40px;padding-right:16px!important}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{width:100%}mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   mat-label[_ngcontent-%COMP%]{margin-right:auto}"]}),t})();var Tt=i("u47x"),Wt=i("GU7r"),Lt=i("+rOU"),Qt=(i("R1ws"),i("quSY"),i("PqYM"),i("R0Ic"),i("JX91"),i("/uUt"),i("nLfN"),i("FtGj"),i("cH1L"));i("vxfF");let Dt=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[p.c,m.h,Lt.g,m.p,Wt.c,Tt.a],m.h]}),t})(),Nt=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[I,Qt.a]]}),t})(),Ft=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[I]]}),t})(),Kt=(()=>{class t{constructor(t,e){Object(p.v)(e)&&!t&&console.warn("Warning: Flex Layout loaded on the server without FlexLayoutServerModule")}static withConfig(e,i=[]){return{ngModule:t,providers:e.serverLoaded?[{provide:W,useValue:Object.assign(Object.assign({},T),e)},{provide:Q,useValue:i,multi:!0},{provide:L,useValue:!0}]:[{provide:W,useValue:Object.assign(Object.assign({},T),e)},{provide:Q,useValue:i,multi:!0}]}}}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)(a.Wb(L),a.Wb(a.C))},imports:[[Nt,At,Ft],Nt,At,Ft]}),t})();var $t=i("H0Zp");const qt=[{path:"",component:_t}];let Ut=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[n.i,p.c,Dt,d.b,Ct.c,x.p,u.b,m.p,r.c,h.b,f.b,$t.a,l.b,Kt,c.e,n.r,S.e.forChild(qt)]]}),t})()}}]);