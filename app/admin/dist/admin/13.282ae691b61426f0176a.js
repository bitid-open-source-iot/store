(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{vDY7:function(t,o,e){"use strict";e.r(o),e.d(o,"CollectionPointsPageModule",(function(){return it}));var s=e("mrSG"),r=e("Dh3D");class i{constructor(t){this.address={street:"",suburb:"",country:"",cityTown:"",postalCode:""},void 0!==t&&null!=t&&(void 0!==t.address&&null!=t.address&&(void 0!==t.address.street&&null!=t.address.street&&(this.address.street=t.address.street),void 0!==t.address.suburb&&null!=t.address.suburb&&(this.address.suburb=t.address.suburb),void 0!==t.address.country&&null!=t.address.country&&(this.address.country=t.address.country),void 0!==t.address.cityTown&&null!=t.address.cityTown&&(this.address.cityTown=t.address.cityTown),void 0!==t.address.postalCode&&null!=t.address.postalCode&&(this.address.postalCode=t.address.postalCode)),void 0!==t.role&&null!=t.role&&(this.role=t.role),void 0!==t.storeId&&null!=t.storeId&&(this.storeId=t.storeId),void 0!==t.description&&null!=t.description&&(this.description=t.description),void 0!==t.collectionpointId&&null!=t.collectionpointId&&(this.collectionpointId=t.collectionpointId))}}var n=e("+0xr"),c=e("fXoL"),a=e("9ZKQ"),d=e("u0tM"),l=e("swrf"),b=e("tyNb"),u=e("J4rr"),m=e("BhS5"),p=e("WF9o"),h=e("4jEk"),f=e("ofXK"),y=e("bv9b"),v=e("bTqV"),g=e("NFeN");function w(t,o){1&t&&c.Nb(0,"mat-progress-bar",9)}function C(t,o){1&t&&(c.Sb(0,"th",10),c.Cc(1," Description "),c.Rb())}function I(t,o){if(1&t&&(c.Sb(0,"td",11),c.Cc(1),c.Rb()),2&t){const t=o.$implicit;c.Ab(1),c.Ec(" ",t.description," ")}}function S(t,o){1&t&&c.Nb(0,"th",12)}function R(t,o){if(1&t){const t=c.Tb();c.Sb(0,"td",11),c.Sb(1,"button",13),c.ac("click",(function(){c.rc(t);const e=o.$implicit;return c.ec().options(e)})),c.Sb(2,"mat-icon"),c.Cc(3," more_vert "),c.Rb(),c.Rb(),c.Rb()}}function A(t,o){1&t&&c.Nb(0,"tr",14)}function k(t,o){1&t&&c.Nb(0,"tr",15)}let N=(()=>{class t{constructor(t,o,e,s,r,i,c){this.toast=t,this.sheet=o,this.confirm=e,this.router=s,this.service=r,this.buttons=i,this.localstorage=c,this.columns=["description","options"],this.subscriptions={},this.collectionpoints=new n.o}list(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({sort:{description:1},filter:["role","collectionpointId","description"]});this.collectionpoints.data=t.ok?t.result.map(t=>new i(t)):[],this.loading=!1}))}options(t){return Object(s.a)(this,void 0,void 0,(function*(){this.sheet.show({role:t.role,title:t.description,options:[{icon:"edit",title:"Edit Collection Point",handler:()=>{this.router.navigate(["/collection-points","editor"],{queryParams:{mode:"update",collectionpointId:t.collectionpointId}})},disabled:[0,1]},{icon:"delete",title:"Delete",danger:!0,handler:()=>{this.confirm.show({message:"Delete "+t.description,handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const o=yield this.service.delete({collectionpointId:t.collectionpointId});if(o.ok){for(let o=0;o<this.collectionpoints.data.length;o++)if(this.collectionpoints.data[o].collectionpointId==t.collectionpointId){this.collectionpoints.data.splice(o,1);break}this.collectionpoints.data=this.collectionpoints.data.map(t=>new i(t)),this.toast.success("Collection point was removed!")}else this.toast.error(o.error.message);this.loading=!1}))})},disabled:[0,1,2,3,4]}]})}))}ngOnInit(){this.buttons.show("add"),this.buttons.hide("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.sort.active="description",this.sort.direction="desc",this.collectionpoints.sort=this.sort,this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.router.navigate(["/collection-points","editor"],{queryParams:{mode:"add"}})}),this.list()}ngOnDestroy(){this.subscriptions.add.unsubscribe()}}return t.\u0275fac=function(o){return new(o||t)(c.Mb(a.a),c.Mb(d.a),c.Mb(l.a),c.Mb(b.b),c.Mb(u.a),c.Mb(m.a),c.Mb(p.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["collection-points-page"]],viewQuery:function(t,o){var e;1&t&&c.wc(r.a,!0),2&t&&c.oc(e=c.bc())&&(o.sort=e.first)},decls:11,vars:5,consts:[["mode","indeterminate",4,"ngIf"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","description"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","options"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mode","indeterminate"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,o){1&t&&(c.Sb(0,"mat-content"),c.Ac(1,w,1,0,"mat-progress-bar",0),c.Sb(2,"table",1),c.Qb(3,2),c.Ac(4,C,2,0,"th",3),c.Ac(5,I,2,1,"td",4),c.Pb(),c.Qb(6,5),c.Ac(7,S,1,0,"th",6),c.Ac(8,R,4,0,"td",4),c.Pb(),c.Ac(9,A,1,0,"tr",7),c.Ac(10,k,1,0,"tr",8),c.Rb(),c.Rb()),2&t&&(c.Ab(1),c.kc("ngIf",o.loading),c.Ab(1),c.kc("dataSource",o.collectionpoints),c.Ab(7),c.kc("matHeaderRowDef",o.columns)("matHeaderRowDefSticky",!0),c.Ab(1),c.kc("matRowDefColumns",o.columns))},directives:[h.a,f.m,n.n,r.a,n.c,n.i,n.b,n.k,n.m,y.a,n.h,r.b,n.a,v.a,g.a,n.j,n.l],styles:[""]}),t})();var D=e("o3Q1"),q=e("3Pt+"),T=e("btHx"),M=e("dWDE"),O=e("kmnG"),E=e("d3UM"),G=e("FKr1"),P=e("WJ5W"),j=e("qFsG"),x=e("ZRfb"),F=e("AbOq"),V=e("roMP");function H(t,o){1&t&&c.Nb(0,"mat-progress-bar",20)}function J(t,o){if(1&t&&(c.Sb(0,"mat-option",21),c.Cc(1),c.Rb()),2&t){const t=o.$implicit;c.kc("value",t.storeId)("disabled",t.role<2),c.Ab(1),c.Ec(" ",t.description," ")}}function Q(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.storeId," ")}}function K(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.description," ")}}function W(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.address.street," ")}}function Z(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.address.suburb," ")}}function B(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.address.cityTown," ")}}function L(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.address.postalCode," ")}}function Y(t,o){if(1&t&&(c.Sb(0,"mat-error"),c.Cc(1),c.Rb()),2&t){const t=c.ec();c.Ab(1),c.Ec(" ",t.errors.address.country," ")}}const $=function(t){return{description:t}};let X=(()=>{class t{constructor(t,o,e,s,r,n,c){this.toast=t,this.route=o,this.stores=e,this.router=s,this.service=r,this.buttons=n,this.formerror=c,this.form=new q.f({address:new q.f({street:new q.c(null,[q.t.required]),suburb:new q.c(null,[q.t.required]),country:new q.c(null,[q.t.required]),cityTown:new q.c(null,[q.t.required]),postalCode:new q.c(null,[q.t.required])}),storeId:new q.c(null,[q.t.required]),description:new q.c(null,[q.t.required])}),this.errors={address:{street:"",suburb:"",country:"",cityTown:"",postalCode:""},storeId:"",description:""},this.filter=new q.f({store:new q.c(null,[q.t.required])}),this.subscriptions={},this.collectionpoint=new i}get(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({filter:["role","phone","email","address","storeId","description","collectionpointId"],collectionpointId:this.collectionpointId});t.ok?(this.collectionpoint=new i(t.result),this.collectionpoint.role>2?(this.form.controls.address.controls.street.setValue(this.collectionpoint.address.street),this.form.controls.address.controls.suburb.setValue(this.collectionpoint.address.suburb),this.form.controls.address.controls.country.setValue(this.collectionpoint.address.country),this.form.controls.address.controls.cityTown.setValue(this.collectionpoint.address.cityTown),this.form.controls.address.controls.postalCode.setValue(this.collectionpoint.address.postalCode),this.form.controls.storeId.setValue(this.collectionpoint.storeId),this.form.controls.description.setValue(this.collectionpoint.description)):(this.toast.error("Your role is not high enough to copy/edit this collection point!"),this.router.navigate(["/collection-points"]))):(this.toast.error(t.error.message),this.router.navigate(["/collection-points"])),this.loading=!1}))}load(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.stores.list({sort:{description:1},filter:["storeId","description"]});t.ok?this.stores.data=t.result.map(t=>new D.a(t)):(this.stores.data=[],this.toast.error(t.error.message)),this.loading=!1}))}submit(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;let t=this.mode;"copy"==t&&(t="add",delete this.collectionpointId);const o=yield this.service[t]({address:{street:this.form.value.address.street,suburb:this.form.value.address.suburb,country:this.form.value.address.country,cityTown:this.form.value.address.cityTown,postalCode:this.form.value.address.postalCode},storeId:this.form.value.storeId,description:this.form.value.description,collectionpointId:this.collectionpointId});o.ok?this.router.navigate(["/collection-points"]):this.toast.error(o.error.message),this.loading=!1}))}ngOnInit(){this.buttons.hide("add"),this.buttons.show("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/collection-points"])});const t=this.route.snapshot.queryParams;this.mode=t.mode,this.collectionpointId=t.collectionpointId,(()=>{Object(s.a)(this,void 0,void 0,(function*(){"add"!=this.mode&&(yield this.get()),yield this.load()}))})()}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.close.unsubscribe()}}return t.\u0275fac=function(o){return new(o||t)(c.Mb(a.a),c.Mb(b.a),c.Mb(T.a),c.Mb(b.b),c.Mb(u.a),c.Mb(m.a),c.Mb(M.a))},t.\u0275cmp=c.Gb({type:t,selectors:[["collection-points-editor-page"]],decls:53,vars:19,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","storeId","formControlName","storeId","required",""],[3,"formGroup"],["placeholderLabel","filter stores","noEntriesFoundLabel","no stores found","formControlName","store"],[3,"value","disabled",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","type","text","name","description","placeholder","description","formControlName","description","required",""],["formGroupName","address"],["matInput","","type","text","name","street","placeholder","street","formControlName","street","required",""],["matInput","","type","text","name","suburb","placeholder","suburb","formControlName","suburb","required",""],["matInput","","type","text","name","cityTown","placeholder","city/town","formControlName","cityTown","required",""],["matInput","","type","text","name","postalCode","placeholder","postal code","formControlName","postalCode","required",""],["appearance","outline","formGroupName","address"],["matInput","","type","text","name","country","placeholder","country","formControlName","country","required",""],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"],[3,"value","disabled"]],template:function(t,o){if(1&t){const t=c.Tb();c.Sb(0,"mat-content"),c.Ac(1,H,1,0,"mat-progress-bar",0),c.Sb(2,"div",1),c.Sb(3,"form",2),c.ac("ngSubmit",(function(){return!o.form.invalid&&!o.loading&&o.submit()})),c.Sb(4,"mat-form-field",3),c.Sb(5,"mat-label"),c.Cc(6," Store "),c.Rb(),c.Sb(7,"mat-select",4),c.Sb(8,"mat-option",5),c.Nb(9,"ngx-mat-select-search",6),c.Rb(),c.Ac(10,J,2,3,"mat-option",7),c.fc(11,"filterBy"),c.fc(12,"orderBy"),c.Rb(),c.Ac(13,Q,2,1,"mat-error",8),c.Rb(),c.Sb(14,"mat-form-field",3),c.Sb(15,"mat-label"),c.Cc(16," Description "),c.Rb(),c.Nb(17,"input",9),c.Ac(18,K,2,1,"mat-error",8),c.Rb(),c.Sb(19,"h2"),c.Cc(20," Address "),c.Rb(),c.Sb(21,"section",10),c.Sb(22,"mat-form-field",3),c.Sb(23,"mat-label"),c.Cc(24," Street "),c.Rb(),c.Nb(25,"input",11),c.Ac(26,W,2,1,"mat-error",8),c.Rb(),c.Sb(27,"mat-form-field",3),c.Sb(28,"mat-label"),c.Cc(29," Suburb "),c.Rb(),c.Nb(30,"input",12),c.Ac(31,Z,2,1,"mat-error",8),c.Rb(),c.Rb(),c.Sb(32,"section",10),c.Sb(33,"mat-form-field",3),c.Sb(34,"mat-label"),c.Cc(35," City/Town "),c.Rb(),c.Nb(36,"input",13),c.Ac(37,B,2,1,"mat-error",8),c.Rb(),c.Sb(38,"mat-form-field",3),c.Sb(39,"mat-label"),c.Cc(40," Postal Code "),c.Rb(),c.Nb(41,"input",14),c.Ac(42,L,2,1,"mat-error",8),c.Rb(),c.Rb(),c.Sb(43,"mat-form-field",15),c.Sb(44,"mat-label"),c.Cc(45," Country "),c.Rb(),c.Nb(46,"input",16),c.Ac(47,Y,2,1,"mat-error",8),c.Rb(),c.Nb(48,"button",17,18),c.Rb(),c.Rb(),c.Rb(),c.Sb(50,"mat-footer"),c.Sb(51,"button",19),c.ac("click",(function(){return c.rc(t),c.pc(49).click()})),c.Cc(52," submit "),c.Rb(),c.Rb()}2&t&&(c.Ab(1),c.kc("ngIf",o.loading),c.Ab(2),c.kc("formGroup",o.form),c.Ab(5),c.kc("formGroup",o.filter),c.Ab(2),c.kc("ngForOf",c.hc(11,11,c.hc(12,14,o.stores.data,"description"),c.mc(17,$,o.filter.value.store))),c.Ab(3),c.kc("ngIf",o.errors.storeId),c.Ab(5),c.kc("ngIf",o.errors.description),c.Ab(8),c.kc("ngIf",o.errors.address.street),c.Ab(5),c.kc("ngIf",o.errors.address.suburb),c.Ab(6),c.kc("ngIf",o.errors.address.cityTown),c.Ab(5),c.kc("ngIf",o.errors.address.postalCode),c.Ab(5),c.kc("ngIf",o.errors.address.country))},directives:[h.a,f.m,q.u,q.n,q.g,O.c,O.f,E.a,q.m,q.e,q.s,G.k,P.a,f.l,j.a,q.b,q.h,x.a,v.a,y.a,O.b],pipes:[F.a,V.a],styles:[""]}),t})();var z=e("5Yg0"),U=e("gyTc"),_=e("R32p"),tt=e("tVzd"),ot=e("J89Z"),et=e("p/0r"),st=e("H0Zp");const rt=[{path:"",component:N},{path:"editor",component:X}];let it=(()=>{class t{}return t.\u0275mod=c.Kb({type:t}),t.\u0275inj=c.Jb({factory:function(o){return new(o||t)},imports:[[q.i,f.c,z.a,_.a,r.c,r.c,U.a,g.b,n.p,j.b,ot.a,G.p,v.b,E.b,tt.a,st.a,et.a,O.e,q.r,y.b,P.b,b.e.forChild(rt)]]}),t})()}}]);