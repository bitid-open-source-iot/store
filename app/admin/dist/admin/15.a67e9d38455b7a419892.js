(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{SUx8:function(t,e,s){"use strict";s.r(e),s.d(e,"CustomersPageModule",(function(){return ot}));var o=s("mrSG");class r{constructor(t){void 0!==t&&null!=t&&(void 0!==t.role&&null!=t.role&&(this.role=t.role),void 0!==t.email&&null!=t.email&&(this.email=t.email),void 0!==t.status&&null!=t.status&&(this.status=t.status),void 0!==t.storeId&&null!=t.storeId&&(this.storeId=t.storeId),void 0!==t.customerId&&null!=t.customerId&&(this.customerId=t.customerId))}}var i=s("Dh3D"),a=s("+0xr"),c=s("fXoL"),n=s("9ZKQ"),d=s("u0tM"),u=s("swrf"),l=s("tyNb"),m=s("ZK1m"),b=s("BhS5"),h=s("WF9o"),f=s("4jEk"),p=s("ofXK"),g=s("bv9b"),v=s("bTqV"),I=s("NFeN");function w(t,e){1&t&&c.Nb(0,"mat-progress-bar",10)}function y(t,e){1&t&&(c.Sb(0,"th",11),c.Cc(1," Email "),c.Rb())}function S(t,e){if(1&t&&(c.Sb(0,"td",12),c.Cc(1),c.Rb()),2&t){const t=e.$implicit;c.Ab(1),c.Ec(" ",t.email," ")}}function k(t,e){1&t&&(c.Sb(0,"th",11),c.Cc(1," Status "),c.Rb())}function R(t,e){if(1&t&&(c.Sb(0,"td",12),c.Cc(1),c.Rb()),2&t){const t=e.$implicit;c.Ab(1),c.Ec(" ",t.status," ")}}function A(t,e){1&t&&c.Nb(0,"th",13)}function C(t,e){if(1&t){const t=c.Tb();c.Sb(0,"td",12),c.Sb(1,"button",14),c.ac("click",(function(){c.rc(t);const s=e.$implicit;return c.ec().options(s)})),c.Sb(2,"mat-icon"),c.Cc(3," more_vert "),c.Rb(),c.Rb(),c.Rb()}}function D(t,e){1&t&&c.Nb(0,"tr",15)}function M(t,e){1&t&&c.Nb(0,"tr",16)}let O=(()=>{class t{constructor(t,e,s,o,r,i,c){this.toast=t,this.sheet=e,this.confirm=s,this.router=o,this.service=r,this.buttons=i,this.localstorage=c,this.columns=["email","status","options"],this.customers=new a.o,this.subscriptions={}}list(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({sort:{description:1},filter:["role","email","status","customerId"]});this.customers.data=t.ok?t.result.map(t=>new r(t)):[],this.loading=!1}))}options(t){return Object(o.a)(this,void 0,void 0,(function*(){let e=[{icon:"edit",title:"Edit Customer",handler:()=>{this.router.navigate(["/customers","editor"],{queryParams:{mode:"update",customerId:t.customerId}})},disabled:[0,1]},{icon:"delete",title:"Delete",danger:!0,handler:()=>{this.confirm.show({message:"Delete "+t.email,handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.delete({customerId:t.customerId});if(e.ok){for(let e=0;e<this.customers.data.length;e++)if(this.customers.data[e].customerId==t.customerId){this.customers.data.splice(e,1);break}this.customers.data=this.customers.data.map(t=>new r(t)),this.toast.success("Customer was removed!")}else this.toast.error(e.error.message);this.loading=!1}))})},disabled:[0,1,2,3,4]}];"requested"==t.status&&e.unshift({icon:"done",title:"Accept Customer",handler:()=>Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.update({status:"accepted",storeId:t.storeId,customerId:t.customerId});e.ok?t.status="accepted":this.toast.error(e.error.message),this.loading=!1})),disabled:[0,1]}),this.sheet.show({role:t.role,title:t.email,options:e})}))}ngOnInit(){this.buttons.show("add"),this.buttons.hide("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.sort.active="description",this.sort.direction="desc",this.customers.sort=this.sort,this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.router.navigate(["/customers","editor"],{queryParams:{mode:"add"}})}),this.list()}ngOnDestroy(){this.subscriptions.add.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(n.a),c.Mb(d.a),c.Mb(u.a),c.Mb(l.b),c.Mb(m.a),c.Mb(b.a),c.Mb(h.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["customers-page"]],viewQuery:function(t,e){var s;1&t&&c.wc(i.a,!0),2&t&&c.oc(s=c.bc())&&(e.sort=s.first)},decls:14,vars:5,consts:[["mode","indeterminate",4,"ngIf"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","email"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","status"],["matColumnDef","options"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mode","indeterminate"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(c.Sb(0,"mat-content"),c.Ac(1,w,1,0,"mat-progress-bar",0),c.Sb(2,"table",1),c.Qb(3,2),c.Ac(4,y,2,0,"th",3),c.Ac(5,S,2,1,"td",4),c.Pb(),c.Qb(6,5),c.Ac(7,k,2,0,"th",3),c.Ac(8,R,2,1,"td",4),c.Pb(),c.Qb(9,6),c.Ac(10,A,1,0,"th",7),c.Ac(11,C,4,0,"td",4),c.Pb(),c.Ac(12,D,1,0,"tr",8),c.Ac(13,M,1,0,"tr",9),c.Rb(),c.Rb()),2&t&&(c.Ab(1),c.kc("ngIf",e.loading),c.Ab(1),c.kc("dataSource",e.customers),c.Ab(10),c.kc("matHeaderRowDef",e.columns)("matHeaderRowDefSticky",!0),c.Ab(1),c.kc("matRowDefColumns",e.columns))},directives:[f.a,p.m,a.n,i.a,a.c,a.i,a.b,a.k,a.m,g.a,a.h,i.b,a.a,v.a,I.a,a.j,a.l],styles:[""]}),t})();var N=s("o3Q1"),j=s("3Pt+"),q=s("btHx"),E=s("dWDE"),x=s("kmnG"),P=s("d3UM"),F=s("FKr1"),G=s("WJ5W"),H=s("qFsG"),Q=s("ZRfb"),J=s("AbOq"),K=s("roMP");function Z(t,e){1&t&&c.Nb(0,"mat-progress-bar",13)}function T(t,e){if(1&t&&(c.Sb(0,"mat-option",14),c.Cc(1),c.Rb()),2&t){const t=e.$implicit;c.kc("value",t.storeId)("disabled",t.role<2),c.Ab(1),c.Ec(" ",t.description," ")}}function V(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.storeId," ")}}function W(t,e){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.email," ")}}const $=function(t){return{description:t}};let B=(()=>{class t{constructor(t,e,s,o,i,a,c){this.toast=t,this.route=e,this.stores=s,this.router=o,this.service=i,this.buttons=a,this.formerror=c,this.form=new j.f({email:new j.c(null,[j.t.required]),storeId:new j.c(null,[j.t.required])}),this.errors={email:"",storeId:""},this.filter=new j.f({store:new j.c(null,[j.t.required])}),this.customer=new r,this.subscriptions={}}get(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({filter:["role","email","storeId"],customerId:this.customerId});t.ok?(this.customer=new r(t.result),this.customer.role>2?(this.form.controls.email.setValue(this.customer.email),this.form.controls.storeId.setValue(this.customer.storeId)):(this.toast.error("Your role is not high enough to copy/edit this customer!"),this.router.navigate(["/customers"]))):(this.toast.error(t.error.message),this.router.navigate(["/customers"])),this.loading=!1}))}load(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.stores.list({sort:{description:1},filter:["storeId","description"]});t.ok?this.stores.data=t.result.map(t=>new N.a(t)):(this.stores.data=[],this.toast.error(t.error.message)),this.loading=!1}))}submit(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;let t=this.mode;"copy"==t&&(t="add",delete this.customerId);const e=yield this.service[t]({email:this.form.value.email,storeId:this.form.value.storeId,customerId:this.customerId});e.ok?this.router.navigate(["/customers"]):this.toast.error(e.error.message),this.loading=!1}))}ngOnInit(){this.buttons.hide("add"),this.buttons.show("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/customers"])});const t=this.route.snapshot.queryParams;this.mode=t.mode,this.customerId=t.customerId,(()=>{Object(o.a)(this,void 0,void 0,(function*(){"add"!=this.mode&&(yield this.get()),yield this.load()}))})()}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.close.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Mb(n.a),c.Mb(l.a),c.Mb(q.a),c.Mb(l.b),c.Mb(m.a),c.Mb(b.a),c.Mb(E.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["customers-editor-page"]],decls:24,vars:14,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","storeId","formControlName","storeId","required",""],[3,"formGroup"],["placeholderLabel","filter stores","noEntriesFoundLabel","no stores found","formControlName","store"],[3,"value","disabled",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"],[3,"value","disabled"]],template:function(t,e){if(1&t){const t=c.Tb();c.Sb(0,"mat-content"),c.Ac(1,Z,1,0,"mat-progress-bar",0),c.Sb(2,"div",1),c.Sb(3,"form",2),c.ac("ngSubmit",(function(){return!e.form.invalid&&!e.loading&&e.submit()})),c.Sb(4,"mat-form-field",3),c.Sb(5,"mat-label"),c.Cc(6," Store "),c.Rb(),c.Sb(7,"mat-select",4),c.Sb(8,"mat-option",5),c.Nb(9,"ngx-mat-select-search",6),c.Rb(),c.Ac(10,T,2,3,"mat-option",7),c.fc(11,"filterBy"),c.fc(12,"orderBy"),c.Rb(),c.Ac(13,V,2,1,"mat-error",8),c.Rb(),c.Sb(14,"mat-form-field",3),c.Sb(15,"mat-label"),c.Cc(16," Email "),c.Rb(),c.Nb(17,"input",9),c.Ac(18,W,2,1,"mat-error",8),c.Rb(),c.Nb(19,"button",10,11),c.Rb(),c.Rb(),c.Rb(),c.Sb(21,"mat-footer"),c.Sb(22,"button",12),c.ac("click",(function(){return c.rc(t),c.pc(20).click()})),c.Cc(23," submit "),c.Rb(),c.Rb()}2&t&&(c.Ab(1),c.kc("ngIf",e.loading),c.Ab(2),c.kc("formGroup",e.form),c.Ab(5),c.kc("formGroup",e.filter),c.Ab(2),c.kc("ngForOf",c.hc(11,6,c.hc(12,9,e.stores.data,"description"),c.mc(12,$,e.filter.value.store))),c.Ab(3),c.kc("ngIf",e.errors.storeId),c.Ab(5),c.kc("ngIf",e.errors.email))},directives:[f.a,p.m,j.u,j.n,j.g,x.c,x.f,P.a,j.m,j.e,j.s,F.k,G.a,p.l,H.a,j.b,Q.a,v.a,g.a,x.b],pipes:[J.a,K.a],styles:[".logo[_ngcontent-%COMP%]{width:150px;height:150px;border:1px solid #e0e0e0;display:flex;margin:20px auto auto;align-items:center;border-radius:5px;justify-content:center;background-color:#fafafa}"]}),t})();var L=s("5Yg0"),z=s("gyTc"),U=s("R32p"),X=s("A5z7"),Y=s("tVzd"),_=s("J89Z"),tt=s("p/0r"),et=s("H0Zp");const st=[{path:"",component:O},{path:"editor",component:B}];let ot=(()=>{class t{}return t.\u0275mod=c.Kb({type:t}),t.\u0275inj=c.Jb({factory:function(e){return new(e||t)},imports:[[j.i,p.c,L.a,U.a,i.c,i.c,z.a,I.b,a.p,X.e,H.b,F.p,v.b,P.b,Y.a,_.a,tt.a,et.a,x.e,j.r,g.b,G.b,l.e.forChild(st)]]}),t})()}}]);