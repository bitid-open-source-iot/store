(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{Xlj8:function(t,e,n){"use strict";n.r(e),n.d(e,"OrdersPageModule",(function(){return D}));var o=n("mrSG"),r=n("AT7E"),i=n("fXoL"),c=n("9ZKQ"),s=n("sSVM"),d=n("ooDN"),a=n("BhS5"),b=n("4jEk"),p=n("ofXK"),g=n("bTqV"),l=n("tyNb");const h=function(t){return{orderId:t}};function m(t,e){if(1&t&&(i.Qb(0,"button",8),i.yc(1," Pay "),i.Pb()),2&t){const t=i.cc().$implicit;i.ic("queryParams",i.jc(1,h,t.orderId))}}function u(t,e){if(1&t){const t=i.Rb();i.Qb(0,"button",9),i.Yb("click",(function(){i.oc(t);const e=i.cc().$implicit;return i.cc().remove(e)})),i.yc(1," Remove "),i.Pb()}}function P(t,e){if(1&t&&(i.Qb(0,"button",10),i.yc(1," View "),i.Pb()),2&t){const t=i.cc().$implicit;i.ic("queryParams",i.jc(1,h,t.orderId))}}const f=function(t){return["/product",t]};function C(t,e){if(1&t&&i.Lb(0,"div",11),2&t){const t=e.$implicit;i.uc("background-image","url("+t.image+")"),i.ic("routerLink",i.jc(3,f,t.productId))}}function y(t,e){if(1&t&&(i.Qb(0,"div",2),i.Qb(1,"header"),i.Qb(2,"h4"),i.yc(3),i.dc(4,"date"),i.Pb(),i.xc(5,m,2,3,"button",3),i.xc(6,u,2,0,"button",4),i.xc(7,P,2,3,"button",5),i.Pb(),i.Qb(8,"div",6),i.xc(9,C,1,5,"div",7),i.Pb(),i.Pb()),2&t){const t=e.$implicit;i.zb(3),i.Bc(" ",t.status,", ",i.fc(4,6,t.date[t.status],"dd MMM yyyy")," "),i.zb(2),i.ic("ngIf","initialized"==t.status),i.zb(1),i.ic("ngIf","initialized"==t.status),i.zb(1),i.ic("ngIf","paid"==t.status||"delivered"==t.status),i.zb(2),i.ic("ngForOf",t.products)}}let O=(()=>{class t{constructor(t,e,n,o){this.toast=t,this.orders=e,this.config=n,this.buttons=o,this.subscriptions={}}list(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.orders.list({});this.orders.data=t.ok?t.result.map(t=>new r.a(t)):[],this.loading=!1}))}remove(t){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const e=yield this.orders.delete({orderId:t.orderId});if(e.ok){for(let e=0;e<this.orders.data.length;e++)if(this.orders.data[e].orderId==t.orderId){this.orders.data.splice(e,1);break}this.orders.data=e.result.map(t=>new r.a(t)),this.toast.success("Order was removed!")}else this.toast.error("There was an issue deleting your order!");this.loading=!1}))}ngOnInit(){this.buttons.hide("cart"),this.buttons.hide("close"),this.buttons.hide("search"),this.buttons.hide("wishlist"),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{t&&this.list()})}ngOnDestroy(){this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(i.Kb(c.a),i.Kb(s.a),i.Kb(d.a),i.Kb(a.a))},t.\u0275cmp=i.Eb({type:t,selectors:[["orders-page"]],decls:3,vars:1,consts:[[1,"container"],["class","order",4,"ngFor","ngForOf"],[1,"order"],["mat-stroked-button","","routerLink","/checkout",3,"queryParams",4,"ngIf"],["mat-stroked-button","",3,"click",4,"ngIf"],["mat-stroked-button","","routerLink","viewer",3,"queryParams",4,"ngIf"],[1,"products"],["class","product",3,"background-image","routerLink",4,"ngFor","ngForOf"],["mat-stroked-button","","routerLink","/checkout",3,"queryParams"],["mat-stroked-button","",3,"click"],["mat-stroked-button","","routerLink","viewer",3,"queryParams"],[1,"product",3,"routerLink"]],template:function(t,e){1&t&&(i.Qb(0,"mat-content"),i.Qb(1,"div",0),i.xc(2,y,10,9,"div",1),i.Pb(),i.Pb()),2&t&&(i.zb(2),i.ic("ngForOf",e.orders.data))},directives:[b.a,p.m,p.n,g.b,l.d],pipes:[p.f],styles:["mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]{margin:5px 2.5px;display:flex;border-radius:4px;flex-direction:column;background-color:#fff}mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{padding:8px 16px;display:flex;align-items:center;border-bottom:1px solid #e0e0e0;flex-direction:row}mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{flex:1 auto;font-weight:500;text-transform:capitalize}mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{max-width:150px}mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]   .products[_ngcontent-%COMP%]{display:flex;padding:8px 16px;flex-wrap:nowrap;overflow-y:auto;align-items:center;flex-direction:row}mat-content[_ngcontent-%COMP%]   .order[_ngcontent-%COMP%]   .products[_ngcontent-%COMP%]   .product[_ngcontent-%COMP%]{width:calc(100px - 5px);margin:2.5px;border:1px solid #e0e0e0;outline:none;padding-top:calc(100px - 5px);border-radius:5px;background-size:cover;background-repeat:no-repeat;background-position:50%}"]}),t})();var x=n("wgY5"),M=n("5JmO"),_=n.n(M),z=n("TruH"),Q=n.n(z),w=n("o3Q1"),v=n("9S2p"),S=n("tIeV"),I=n("MutI");function k(t,e){if(1&t&&(i.Qb(0,"mat-list-item",6),i.Lb(1,"img",7),i.Qb(2,"section"),i.Qb(3,"label"),i.yc(4),i.Pb(),i.Qb(5,"span"),i.yc(6),i.dc(7,"currency"),i.Qb(8,"b"),i.yc(9),i.Pb(),i.Pb(),i.Pb(),i.Pb()),2&t){const t=e.$implicit;i.zb(1),i.ic("src",t.image,i.qc)("alt",t.title),i.zb(3),i.Ac(" ",t.title," "),i.zb(2),i.Ac(" ",i.fc(7,5,t.price,"R")," "),i.zb(3),i.Ac("Qty: ",t.quantity,"")}}function T(t,e){1&t&&(i.Qb(0,"h2"),i.yc(1," Shipping "),i.Pb())}function A(t,e){if(1&t&&(i.Qb(0,"div",8),i.Qb(1,"table"),i.Qb(2,"tr"),i.Qb(3,"th"),i.yc(4," Method "),i.Pb(),i.Qb(5,"td"),i.yc(6),i.Pb(),i.Pb(),i.Qb(7,"tr"),i.Qb(8,"th",9),i.yc(9," Address "),i.Pb(),i.Pb(),i.Qb(10,"tr"),i.Qb(11,"td",9),i.yc(12),i.Pb(),i.Pb(),i.Qb(13,"tr"),i.Qb(14,"td",9),i.yc(15),i.Pb(),i.Pb(),i.Qb(16,"tr"),i.Qb(17,"td",9),i.yc(18),i.Pb(),i.Pb(),i.Qb(19,"tr"),i.Qb(20,"td",9),i.yc(21),i.Pb(),i.Pb(),i.Qb(22,"tr"),i.Qb(23,"td",9),i.yc(24),i.Pb(),i.Pb(),i.Pb(),i.Pb()),2&t){const t=i.cc();i.zb(6),i.Ac(" ",t.order.shipping.method," "),i.zb(6),i.Ac(" ",t.order.shipping.address.street," "),i.zb(3),i.Ac(" ",t.order.shipping.address.suburb," "),i.zb(3),i.Ac(" ",t.order.shipping.address.cityTown," "),i.zb(3),i.Ac(" ",t.order.shipping.address.postalCode," "),i.zb(3),i.Ac(" ",t.order.shipping.address.additionalInfo," ")}}function j(t,e){if(1&t&&(i.Qb(0,"tr"),i.Qb(1,"th"),i.yc(2," Shipping "),i.Pb(),i.Qb(3,"td"),i.yc(4),i.dc(5,"currency"),i.Pb(),i.Pb()),2&t){const t=i.cc();i.zb(4),i.Ac(" ",i.fc(5,1,t.order.payment.shipping,"R")," ")}}_.a.vfs=Q.a.pdfMake.vfs;let R=(()=>{class t{constructor(t,e,n,o,i,c,s){this.toast=t,this.route=e,this.config=n,this.router=o,this.service=i,this.buttons=c,this.download=s,this.store=new w.a,this.order=new r.a,this.subscriptions={}}pdf(){return Object(o.a)(this,void 0,void 0,(function*(){Object(v.a)(this.store.logo,t=>{let e=[{margin:[0,0,0,20],columns:[{width:"*",table:{body:[[{width:50,image:t,border:[!1,!1,!1,!1]}],[{text:this.store.description,bold:!0,border:[!1,!1,!1,!1],fontSize:18}],[{text:this.store.address.street.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.store.address.suburb.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.store.address.cityTown.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.store.address.postalCode.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:"VAT: "+this.store.address.vat.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:"REG: "+this.store.address.reg.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}]]}},{width:"auto",table:{body:[[{text:"",border:[!1,!1,!1,!1]},{text:"INVOICE",bold:!0,border:[!1,!1,!1,!1],fontSize:18,alignment:"right"}],[{text:"DATE",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:x(this.order.date.paid).format("YYYY/MM/DD"),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}],[{text:"ORDER ID",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:this.order.orderId.toUpperCase(),border:[!1,!1,!1,!1],alignment:"right",fontSize:10}]]}}]},{margin:[0,0,0,20],columns:[{width:"48%",table:{body:[[{text:"BILL TO",bold:!0,border:[!1,!1,!1,!0],fontSize:10}],[{bold:!0,text:[this.order.recipient.name.first.toLocaleUpperCase()," ",this.order.recipient.name.last.toLocaleUpperCase(),this.order.recipient.company.name?" (":"",this.order.recipient.company.name,this.order.recipient.company.name?")":""].join(""),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.recipient.number,border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.recipient.email,border:[!1,!1,!1,!1],fontSize:10}]],widths:["*"]}},{text:"",width:"4%"}]},{margin:[0,0,0,20],table:{body:[[{text:"DESCRIPTION",bold:!0,margin:[0,0,10,0],border:[!1,!1,!1,!0],fontSize:10},{text:"QTY",bold:!0,margin:[0,0,10,0],border:[!1,!1,!1,!0],fontSize:10,alignment:"right"},{text:"PRICE",bold:!0,margin:[0,0,10,0],border:[!1,!1,!1,!0],fontSize:10,alignment:"right"},{text:"TOTAL",bold:!0,border:[!1,!1,!1,!0],fontSize:10,alignment:"right"}]],widths:["*","auto","auto","auto"]}},{margin:[0,0,0,20],columns:[{text:"",width:"*"},{width:"48%",table:{body:[[{text:"SUBTOTAL",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:["R",this.order.payment.subtotal.toFixed(2)].join(""),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}],[{text:"SHIPPING",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:["R",this.order.payment.shipping.toFixed(2)].join(""),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}],[{text:"DISCOUNT",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:["R",this.order.payment.discount.toFixed(2)].join(""),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}],[{text:"VAT (15%)",bold:!0,border:[!1,!1,!1,!1],fontSize:10},{text:["R",this.order.payment.vat.toFixed(2)].join(""),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}],[{text:"TOTAL",bold:!0,border:[!1,!0,!1,!0],fontSize:10},{text:["R",this.order.payment.total.toFixed(2)].join(""),bold:!0,border:[!1,!0,!1,!0],fontSize:10,alignment:"right"}]],widths:["*","auto"]}}]}];void 0!==this.order.recipient.company&&null!=this.order.recipient.company&&(void 0!==this.order.recipient.company.vat&&null!=this.order.recipient.company.vat&&e[1].columns[0].table.body.push([{text:"VAT: "+this.order.recipient.company.vat.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}]),void 0!==this.order.recipient.company.reg&&null!=this.order.recipient.company.reg&&e[1].columns[0].table.body.push([{text:"REG: "+this.order.recipient.company.reg.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}])),this.order.products.map(t=>{e[2].table.body.push([{text:t.title.toUpperCase(),margin:[0,0,10,0],border:[!1,!1,!1,!1],fontSize:10},{text:t.quantity.toFixed(2),margin:[0,0,10,0],border:[!1,!1,!1,!1],fontSize:10,alignment:"right"},{text:["R",t.price.toFixed(2)].join(""),margin:[0,0,10,0],border:[!1,!1,!1,!1],fontSize:10,alignment:"right"},{text:["R",(t.price*t.quantity).toFixed(2)].join(""),border:[!1,!1,!1,!1],fontSize:10,alignment:"right"}])}),this.order.shipping.enabled&&e[1].columns.push({width:"48%",table:{body:[[{text:"SHIP TO",bold:!0,border:[!1,!1,!1,!0],fontSize:10}],[{text:[this.order.recipient.name.first," ",this.order.recipient.name.last].join("").toLocaleUpperCase(),bold:!0,border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.shipping.address.street.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.shipping.address.suburb.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.shipping.address.cityTown.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}],[{text:this.order.shipping.address.postalCode.toUpperCase(),border:[!1,!1,!1,!1],fontSize:10}]],widths:["*"]}}),_.a.createPdf({content:e}).open()})}))}get(){return Object(o.a)(this,void 0,void 0,(function*(){this.loading=!0;const t=yield this.service.get({orderId:this.orderId});t.ok?(this.order=new r.a(t.result),this.link=[window.location.origin,"/store/download/invoice?email=",this.order.email,"&orderId=",this.order.orderId].join("")):(this.toast.error(t.error.message),this.router.navigate(["/orders"])),this.loading=!1}))}ngOnInit(){this.buttons.hide("cart"),this.buttons.show("close"),this.buttons.hide("search"),this.buttons.hide("wishlist"),this.subscriptions.close=this.buttons.close.click.subscribe(t=>{this.router.navigate(["/orders"])}),this.subscriptions.loaded=this.config.loaded.subscribe(t=>{t&&(this.store=this.config.value.value,this.orderId=this.route.snapshot.queryParams.orderId,this.get())})}ngOnDestroy(){this.subscriptions.close.unsubscribe(),this.subscriptions.loaded.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(i.Kb(c.a),i.Kb(l.a),i.Kb(d.a),i.Kb(l.c),i.Kb(s.a),i.Kb(a.a),i.Kb(S.a))},t.\u0275cmp=i.Eb({type:t,selectors:[["orders-viewer-page"]],decls:44,vars:24,consts:[[1,"container"],["mat-stroked-button","",3,"click"],["lines","full",4,"ngFor","ngForOf"],[4,"ngIf"],["class","shipping",4,"ngIf"],[1,"payment"],["lines","full"],["width","40","height","40","draggable","false",3,"src","alt"],[1,"shipping"],["colspan","2"]],template:function(t,e){1&t&&(i.Qb(0,"mat-content"),i.Qb(1,"div",0),i.Qb(2,"button",1),i.Yb("click",(function(){return e.pdf()})),i.yc(3," Download PDF "),i.Pb(),i.Qb(4,"h2"),i.yc(5," Products "),i.Pb(),i.Qb(6,"mat-list"),i.xc(7,k,10,8,"mat-list-item",2),i.Pb(),i.xc(8,T,2,0,"h2",3),i.xc(9,A,25,6,"div",4),i.Qb(10,"h2"),i.yc(11," Payment "),i.Pb(),i.Qb(12,"div",5),i.Qb(13,"table"),i.Qb(14,"tr"),i.Qb(15,"th"),i.yc(16," Method "),i.Pb(),i.Qb(17,"td"),i.yc(18),i.Pb(),i.Pb(),i.Qb(19,"tr"),i.Qb(20,"th"),i.yc(21," Subtotal "),i.Pb(),i.Qb(22,"td"),i.yc(23),i.dc(24,"currency"),i.Pb(),i.Pb(),i.xc(25,j,6,4,"tr",3),i.Qb(26,"tr"),i.Qb(27,"th"),i.yc(28," Discount "),i.Pb(),i.Qb(29,"td"),i.yc(30),i.dc(31,"currency"),i.Pb(),i.Pb(),i.Qb(32,"tr"),i.Qb(33,"th"),i.yc(34," VAT @ 15% "),i.Pb(),i.Qb(35,"td"),i.yc(36),i.dc(37,"currency"),i.Pb(),i.Pb(),i.Qb(38,"tr"),i.Qb(39,"th"),i.yc(40," Total "),i.Pb(),i.Qb(41,"th"),i.yc(42),i.dc(43,"currency"),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb(),i.Pb()),2&t&&(i.zb(7),i.ic("ngForOf",e.order.products),i.zb(1),i.ic("ngIf",e.order.shipping.enabled),i.zb(1),i.ic("ngIf",e.order.shipping.enabled),i.zb(9),i.Cc(" ","bc"==e.order.payment.method?"Bitcoin":""," ","cc"==e.order.payment.method?"Credit Card":""," ","dc"==e.order.payment.method?"Debit Card":""," ","eft"==e.order.payment.method?"Instant EFT":""," "),i.zb(5),i.Ac(" ",i.fc(24,12,e.order.payment.subtotal,"R")," "),i.zb(2),i.ic("ngIf",e.order.shipping.enabled),i.zb(5),i.Ac(" -",i.fc(31,15,e.order.payment.discount,"R")," "),i.zb(6),i.Ac(" ",i.fc(37,18,e.order.payment.vat,"R")," "),i.zb(6),i.Ac(" ",i.fc(43,21,e.order.payment.total,"R")," "))},directives:[b.a,g.b,I.a,p.m,p.n,I.b],pipes:[p.d],styles:["mat-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{padding:0 16px!important;font-size:16px!important;margin-top:5px!important}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]{margin:5px 2.5px;border-radius:4px;background-color:#fff}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{height:56px;align-items:center;flex-direction:row}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:16px;border-radius:5px}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;margin-right:auto;flex-direction:column}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{height:16px;font-size:14px;font-weight:500;line-height:16px}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#2196f3;height:14px;font-size:12px;font-weight:500;line-height:14px}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#626262;font-weight:500!important}mat-content[_ngcontent-%COMP%]   mat-list[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:last-child{border-bottom:none}mat-content[_ngcontent-%COMP%]   .payment[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .shipping[_ngcontent-%COMP%]{margin:5px 2.5px;padding:8px 16px;border-radius:4px;background-color:#fff}mat-content[_ngcontent-%COMP%]   .payment[_ngcontent-%COMP%]   table[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .shipping[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{max-width:500px}mat-content[_ngcontent-%COMP%]   .payment[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .shipping[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:500}mat-content[_ngcontent-%COMP%]   .payment[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .payment[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .shipping[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], mat-content[_ngcontent-%COMP%]   .shipping[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{width:50%;text-align:left}"]}),t})();var F=n("FKr1"),U=n("H0Zp");const L=[{path:"",component:O},{path:"viewer",component:R}];let D=(()=>{class t{}return t.\u0275mod=i.Ib({type:t}),t.\u0275inj=i.Hb({factory:function(e){return new(e||t)},imports:[[p.c,I.c,F.n,g.c,U.a,l.g.forChild(L)]]}),t})()}}]);