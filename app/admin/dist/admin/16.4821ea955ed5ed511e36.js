(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{ZGGN:function(t,e,r){"use strict";r.r(e),r.d(e,"DepartmentsPageModule",(function(){return et}));var s=r("mrSG"),i=r("Dh3D"),o=r("36gI"),n=r("+0xr"),a=r("fXoL"),c=r("9ZKQ"),d=r("u0tM"),m=r("swrf"),b=r("tyNb"),l=r("G0b6"),h=r("BhS5"),u=r("WF9o"),p=r("4jEk"),f=r("ofXK"),g=r("bv9b"),v=r("bTqV"),w=r("NFeN");function I(t,e){1&t&&a.Nb(0,"mat-progress-bar",9)}function k(t,e){1&t&&(a.Sb(0,"th",10),a.Cc(1," Description "),a.Rb())}function y(t,e){if(1&t&&(a.Sb(0,"td",11),a.Cc(1),a.Rb()),2&t){const t=e.$implicit;a.Ab(1),a.Ec(" ",t.description," ")}}function S(t,e){1&t&&a.Nb(0,"th",12)}function R(t,e){if(1&t){const t=a.Tb();a.Sb(0,"td",11),a.Sb(1,"button",13),a.ac("click",(function(){a.rc(t);const r=e.$implicit;return a.ec().options(r)})),a.Sb(2,"mat-icon"),a.Cc(3," more_vert "),a.Rb(),a.Rb(),a.Rb()}}function A(t,e){1&t&&a.Nb(0,"tr",14)}function D(t,e){1&t&&a.Nb(0,"tr",15)}let C=(()=>{class t{constructor(t,e,r,s,i,o,a){this.toast=t,this.sheet=e,this.confirm=r,this.router=s,this.service=i,this.buttons=o,this.localstorage=a,this.columns=["description","options"],this.departments=new n.o,this.subscriptions={}}list(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.list({sort:{description:1},filter:["role","departmentId","description"]});this.departments.data=t.ok?t.result.map(t=>new o.a(t)):[],this.loading=!1}))}options(t){return Object(s.a)(this,void 0,void 0,(function*(){this.sheet.show({role:t.role,title:t.description,options:[{icon:"edit",title:"Edit department",handler:()=>{this.router.navigate(["/departments","editor"],{queryParams:{mode:"update",departmentId:t.departmentId}})},disabled:[0,1]},{icon:"delete",title:"Delete",danger:!0,handler:()=>{this.confirm.show({message:"Delete "+t.description,handler:()=>Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.service.delete({departmentId:t.departmentId});if(e.ok){for(let e=0;e<this.departments.data.length;e++)if(this.departments.data[e].departmentId==t.departmentId){this.departments.data.splice(e,1);break}this.departments.data=this.departments.data.map(t=>new o.a(t)),this.toast.success("department was removed!")}else this.toast.error(e.error.message);this.loading=!1}))})},disabled:[0,1,2,3,4]}]})}))}ngOnInit(){this.buttons.show("add"),this.buttons.hide("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.sort.active="description",this.sort.direction="desc",this.departments.sort=this.sort,this.subscriptions.add=this.buttons.add.click.subscribe(t=>{this.router.navigate(["/departments","editor"],{queryParams:{mode:"add"}})}),this.list()}ngOnDestroy(){this.subscriptions.add.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(c.a),a.Mb(d.a),a.Mb(m.a),a.Mb(b.b),a.Mb(l.a),a.Mb(h.a),a.Mb(u.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["departments-page"]],viewQuery:function(t,e){var r;1&t&&a.wc(i.a,!0),2&t&&a.oc(r=a.bc())&&(e.sort=r.first)},decls:11,vars:5,consts:[["mode","indeterminate",4,"ngIf"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","description"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","options"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mode","indeterminate"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""]],template:function(t,e){1&t&&(a.Sb(0,"mat-content"),a.Ac(1,I,1,0,"mat-progress-bar",0),a.Sb(2,"table",1),a.Qb(3,2),a.Ac(4,k,2,0,"th",3),a.Ac(5,y,2,1,"td",4),a.Pb(),a.Qb(6,5),a.Ac(7,S,1,0,"th",6),a.Ac(8,R,4,0,"td",4),a.Pb(),a.Ac(9,A,1,0,"tr",7),a.Ac(10,D,1,0,"tr",8),a.Rb(),a.Rb()),2&t&&(a.Ab(1),a.kc("ngIf",e.loading),a.Ab(1),a.kc("dataSource",e.departments),a.Ab(7),a.kc("matHeaderRowDef",e.columns)("matHeaderRowDefSticky",!0),a.Ab(1),a.kc("matRowDefColumns",e.columns))},directives:[p.a,f.m,n.n,i.a,n.c,n.i,n.b,n.k,n.m,g.a,n.h,i.b,n.a,v.a,w.a,n.j,n.l],styles:[""]}),t})();var M=r("o3Q1"),N=r("3Pt+"),O=r("btHx"),G=r("dWDE"),q=r("kmnG"),j=r("d3UM"),F=r("FKr1"),E=r("WJ5W"),H=r("qFsG"),P=r("ZRfb"),J=r("AbOq"),Q=r("roMP");function Z(t,e){1&t&&a.Nb(0,"mat-progress-bar",13)}function x(t,e){if(1&t&&(a.Sb(0,"mat-option",14),a.Cc(1),a.Rb()),2&t){const t=e.$implicit;a.kc("value",t.storeId)("disabled",t.role<2),a.Ab(1),a.Ec(" ",t.description," ")}}function K(t,e){if(1&t&&(a.Sb(0,"mat-error"),a.Cc(1),a.Rb()),2&t){const t=a.ec();a.Ab(1),a.Ec(" ",t.errors.storeId," ")}}function T(t,e){if(1&t&&(a.Sb(0,"mat-error"),a.Cc(1),a.Rb()),2&t){const t=a.ec();a.Ab(1),a.Ec(" ",t.errors.description," ")}}const V=function(t){return{description:t}};let W=(()=>{class t{constructor(t,e,r,s,i,n,a){this.toast=t,this.route=e,this.stores=r,this.router=s,this.service=i,this.buttons=n,this.formerror=a,this.form=new N.f({storeId:new N.c(null,[N.t.required]),description:new N.c(null,[N.t.required])}),this.errors={storeId:"",description:""},this.filter=new N.f({store:new N.c(null,[N.t.required])}),this.department=new o.a,this.subscriptions={}}get(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({filter:["role","storeId","description"],departmentId:this.departmentId});t.ok?(this.department=new o.a(t.result),this.department.role>2?(this.form.controls.storeId.setValue(this.department.storeId),this.form.controls.description.setValue(this.department.description)):(this.toast.error("Your role is not high enough to copy/edit this department!"),this.router.navigate(["/departments"]))):(this.toast.error(t.error.message),this.router.navigate(["/departments"])),this.loading=!1}))}load(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.stores.list({sort:{description:1},filter:["storeId","description"]});t.ok?this.stores.data=t.result.map(t=>new M.a(t)):(this.stores.data=[],this.toast.error(t.error.message)),this.loading=!1}))}submit(){return Object(s.a)(this,void 0,void 0,(function*(){this.loading=!0;let t=this.mode;"copy"==t&&(t="add",delete this.departmentId);const e=yield this.service[t]({storeId:this.form.value.storeId,description:this.form.value.description,departmentId:this.departmentId});e.ok?this.router.navigate(["/departments"]):this.toast.error(e.error.message),this.loading=!1}))}ngOnInit(){this.buttons.hide("add"),this.buttons.show("close"),this.buttons.hide("filter"),this.buttons.hide("search"),this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/departments"])});const t=this.route.snapshot.queryParams;this.mode=t.mode,this.departmentId=t.departmentId,(()=>{Object(s.a)(this,void 0,void 0,(function*(){"add"!=this.mode&&(yield this.get()),yield this.load()}))})()}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.close.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(a.Mb(c.a),a.Mb(b.a),a.Mb(O.a),a.Mb(b.b),a.Mb(l.a),a.Mb(h.a),a.Mb(G.a))},t.\u0275cmp=a.Gb({type:t,selectors:[["departments-editor-page"]],decls:24,vars:14,consts:[["mode","indeterminate",4,"ngIf"],[1,"container"],[3,"formGroup","ngSubmit"],["appearance","outline"],["name","storeId","formControlName","storeId","required",""],[3,"formGroup"],["placeholderLabel","filter stores","noEntriesFoundLabel","no stores found","formControlName","store"],[3,"value","disabled",4,"ngFor","ngForOf"],[4,"ngIf"],["matInput","","type","text","name","description","placeholder","description","formControlName","description","required",""],["type","submit",2,"display","none"],["button",""],["type","button","color","primary","mat-flat-button","",3,"click"],["mode","indeterminate"],[3,"value","disabled"]],template:function(t,e){if(1&t){const t=a.Tb();a.Sb(0,"mat-content"),a.Ac(1,Z,1,0,"mat-progress-bar",0),a.Sb(2,"div",1),a.Sb(3,"form",2),a.ac("ngSubmit",(function(){return!e.form.invalid&&!e.loading&&e.submit()})),a.Sb(4,"mat-form-field",3),a.Sb(5,"mat-label"),a.Cc(6," Store "),a.Rb(),a.Sb(7,"mat-select",4),a.Sb(8,"mat-option",5),a.Nb(9,"ngx-mat-select-search",6),a.Rb(),a.Ac(10,x,2,3,"mat-option",7),a.fc(11,"filterBy"),a.fc(12,"orderBy"),a.Rb(),a.Ac(13,K,2,1,"mat-error",8),a.Rb(),a.Sb(14,"mat-form-field",3),a.Sb(15,"mat-label"),a.Cc(16," Description "),a.Rb(),a.Nb(17,"input",9),a.Ac(18,T,2,1,"mat-error",8),a.Rb(),a.Nb(19,"button",10,11),a.Rb(),a.Rb(),a.Rb(),a.Sb(21,"mat-footer"),a.Sb(22,"button",12),a.ac("click",(function(){return a.rc(t),a.pc(20).click()})),a.Cc(23," submit "),a.Rb(),a.Rb()}2&t&&(a.Ab(1),a.kc("ngIf",e.loading),a.Ab(2),a.kc("formGroup",e.form),a.Ab(5),a.kc("formGroup",e.filter),a.Ab(2),a.kc("ngForOf",a.hc(11,6,a.hc(12,9,e.stores.data,"description"),a.mc(12,V,e.filter.value.store))),a.Ab(3),a.kc("ngIf",e.errors.storeId),a.Ab(5),a.kc("ngIf",e.errors.description))},directives:[p.a,f.m,N.u,N.n,N.g,q.c,q.f,j.a,N.m,N.e,N.s,F.k,E.a,f.l,H.a,N.b,P.a,v.a,g.a,q.b],pipes:[J.a,Q.a],styles:[""]}),t})();var B=r("5Yg0"),L=r("gyTc"),$=r("R32p"),z=r("A5z7"),X=r("tVzd"),Y=r("J89Z"),U=r("p/0r"),_=r("H0Zp");const tt=[{path:"",component:C},{path:"editor",component:W}];let et=(()=>{class t{}return t.\u0275mod=a.Kb({type:t}),t.\u0275inj=a.Jb({factory:function(e){return new(e||t)},imports:[[N.i,f.c,B.a,$.a,i.c,i.c,L.a,w.b,n.p,z.e,H.b,F.p,v.b,j.b,X.a,Y.a,U.a,_.a,q.e,N.r,g.b,E.b,b.e.forChild(tt)]]}),t})()}}]);