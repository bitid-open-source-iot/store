(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"Tw+5":function(t,e,r){"use strict";r.r(e),r.d(e,"VerifyAccountModule",(function(){return C}));var i=r("ofXK"),o=r("NFeN"),n=r("qFsG"),s=r("d3UM"),c=r("bTqV"),a=r("/t3+"),m=r("kmnG"),b=r("Xa2L"),u=r("mrSG"),l=r("3Pt+"),d=r("fXoL"),f=r("tyNb"),p=r("9ZKQ"),h=r("5mtf"),g=r("IRyT"),y=r("dWDE");function v(t,e){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Bb(1),d.Cc(" ",t.errors.email," ")}}function w(t,e){if(1&t&&(d.Ub(0,"mat-error"),d.Ac(1),d.Tb()),2&t){const t=d.gc();d.Bb(1),d.Cc(" ",t.errors.code," ")}}function O(t,e){1&t&&d.Pb(0,"mat-progress-spinner",11)}const k=[{path:"",component:(()=>{class t{constructor(t,e,r,i,o,n){this.route=t,this.toast=e,this.router=r,this.history=i,this.service=o,this.formerror=n,this.form=new l.d({code:new l.b("",[l.q.required,l.q.min(1e5),l.q.max(999999),l.q.minLength(6),l.q.maxLength(6)]),email:new l.b("",[l.q.email,l.q.required])}),this.errors={code:"",email:""},this.subscriptions={}}back(){return Object(u.a)(this,void 0,void 0,(function*(){this.history.back()}))}submit(){return Object(u.a)(this,void 0,void 0,(function*(){this.loading=!0,this.form.disable();const t=yield this.service.verify({code:this.form.value.code,email:this.form.value.email});this.form.enable(),this.loading=!1,t.ok?this.router.navigate(["/signin"],{replaceUrl:!0}):this.toast.error(t.error.message)}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(t=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0)}),this.subscriptions.route=this.route.queryParams.subscribe(t=>{void 0!==t.code&&this.form.controls.code.setValue(t.code),void 0!==t.email&&this.form.controls.email.setValue(t.email),this.form.invalid||this.submit()})}ngOnDestroy(){this.subscriptions.form.unsubscribe(),this.subscriptions.route.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(d.Ob(f.a),d.Ob(p.a),d.Ob(f.c),d.Ob(h.a),d.Ob(g.a),d.Ob(y.a))},t.\u0275cmp=d.Ib({type:t,selectors:[["app-verify-account"]],decls:22,vars:5,consts:[["mat-icon-button","",1,"close-button",3,"click"],[3,"formGroup","ngSubmit"],["src","./assets/icons/icon-512x512.png","alt","Auth Icon"],["appearance","outline"],["text-uppercase",""],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],[4,"ngIf"],["matInput","","type","number","name","code","placeholder","code","formControlName","code","required",""],["type","submit","mat-flat-button","","color","primary"],["class","mat-spinner-negative","mode","indeterminate","diameter","30",4,"ngIf"],["type","button","mat-stroked-button","","color","primary","routerLink","/signin"],["mode","indeterminate","diameter","30",1,"mat-spinner-negative"]],template:function(t,e){1&t&&(d.Ub(0,"button",0),d.cc("click",(function(){return e.back()})),d.Ub(1,"mat-icon"),d.Ac(2," close "),d.Tb(),d.Tb(),d.Ub(3,"form",1),d.cc("ngSubmit",(function(){return!e.form.invalid&&!e.loading&&e.submit()})),d.Pb(4,"img",2),d.Ub(5,"mat-form-field",3),d.Ub(6,"mat-label",4),d.Ac(7," Email "),d.Tb(),d.Pb(8,"input",5),d.zc(9,v,2,1,"mat-error",6),d.Tb(),d.Ub(10,"mat-form-field",3),d.Ub(11,"mat-label",4),d.Ac(12," Verification Code "),d.Tb(),d.Pb(13,"input",7),d.Ub(14,"mat-hint"),d.Ac(15," Check your email for code! "),d.Tb(),d.zc(16,w,2,1,"mat-error",6),d.Tb(),d.Ub(17,"button",8),d.Ac(18),d.zc(19,O,1,0,"mat-progress-spinner",9),d.Tb(),d.Ub(20,"button",10),d.Ac(21," sign in "),d.Tb(),d.Tb()),2&t&&(d.Bb(3),d.nc("formGroup",e.form),d.Bb(6),d.nc("ngIf",e.errors.email),d.Bb(7),d.nc("ngIf",e.errors.code),d.Bb(2),d.Cc(" ",e.loading?"":"verify"," "),d.Bb(1),d.nc("ngIf",e.loading))},directives:[c.a,o.a,l.r,l.k,l.e,m.c,m.g,n.a,l.a,l.j,l.c,l.p,i.n,l.n,m.f,f.d,m.b,b.a],styles:["img[_ngcontent-%COMP%]{width:100px;display:block;margin:25px auto}form[_ngcontent-%COMP%]{width:400px;margin:auto}form[_ngcontent-%COMP%]   [mat-stroked-button][_ngcontent-%COMP%]{margin-top:20px}.close-button[_ngcontent-%COMP%]{top:8px;right:16px;z-index:10;position:fixed}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}"]}),t})()}];let x=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(e){return new(e||t)},imports:[[f.f.forChild(k)],f.f]}),t})(),C=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(e){return new(e||t)},imports:[[l.g,i.c,o.b,n.b,c.b,s.b,a.b,m.e,l.o,b.b,x]]}),t})()}}]);