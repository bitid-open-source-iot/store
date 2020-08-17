function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,i){for(var t=0;t<i.length;t++){var n=i[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,i,t){return i&&_defineProperties(e.prototype,i),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{ZntH:function(e,i,t){"use strict";t.d(i,"a",(function(){return f}));var n=t("AytR"),a=t("fXoL"),l=t("WF9o"),o=t("FKr1"),r=t("ofXK"),c=t("Xa2L"),s=t("NFeN"),d=["image"];function p(e,i){1&e&&a.Qb(0,"mat-spinner",6),2&e&&a.oc("diameter",40)}function u(e,i){1&e&&(a.Vb(0,"mat-icon"),a.Bc(1," attach_file "),a.Ub())}var f=function(){var e=function(){function e(i){_classCallCheck(this,e),this.localstorage=i,this.error=new a.o,this.valid=new a.o,this.result=new a.o,this.filesToUpload=[]}return _createClass(e,[{key:"open",value:function(e){document.getElementById("fileUploaderInput").click()}},{key:"fileChangeEvent",value:function(e){var i=this;this.filesToUpload=e.target.files,this.filesToUpload.length>0&&this.makeFileRequest(n.a.drive+"/drive/files/upload",[],this.filesToUpload).then((function(e){i.file=n.a.drive+"/drive/files/get?fileId="+e.fileId+"&token="+e.token,i.result.emit(i.file)}),(function(e){i.error.emit(e)}))}},{key:"makeFileRequest",value:function(e,i,t){var a=this;return new Promise((function(l,o){for(var r=new FormData,c=new XMLHttpRequest,s=0;s<t.length;s++)r.append("uploads[]",t[s],t[s].name);c.onreadystatechange=function(e){4==c.readyState&&(200==c.status?l(JSON.parse(c.response)):o(c.response))},i="?email="+a.localstorage.get("email")+"&appId="+n.a.appId,c.open("POST",e+i,!0),c.setRequestHeader("Authorization",a.localstorage.get("token")),c.send(r)}))}},{key:"ngOnInit",value:function(){var e=this;this.imageElement=this.imageElement.nativeElement,void 0!==this.imageElement.src&&""!=this.imageElement.src||(this.imageElement.style.display="none"),this.imageElement.onload=function(i){e.valid.emit(!0),e.invalid=!1,e.loading=!1,i.target.style.display="block"},this.imageElement.onerror=function(i){-1==i.target.src.indexOf("null")&&(delete e.file,e.valid.emit(!1),e.invalid=!0,e.loading=!1)}}},{key:"ngOnChanges",value:function(e){e.file?(this.file=e.file.currentValue,void 0!==this.file&&""!=this.file?(this.valid.emit(!0),this.invalid=!1,this.loading=!0):(this.valid.emit(!1),this.invalid=!0)):(this.valid.emit(!1),this.invalid=!0),e.accept&&(this.accept=e.accept.currentValue),e.disabled&&(this.disabled=e.disabled.currentValue)}}]),e}();return e.\u0275fac=function(i){return new(i||e)(a.Pb(l.a))},e.\u0275cmp=a.Jb({type:e,selectors:[["app-file-upload"]],viewQuery:function(e,i){var t;1&e&&a.yc(d,!0),2&e&&a.rc(t=a.ec())&&(i.imageElement=t.first)},inputs:{file:"file",accept:"accept",required:"required",disabled:"disabled"},outputs:{error:"error",valid:"valid",result:"result"},features:[a.Ab],decls:6,vars:7,consts:[["matRipple","",1,"file-upload-container",3,"matRippleDisabled","click"],["id","fileUploaderInput","type","file",3,"accept","change"],["draggable","false",3,"src"],["image",""],[3,"diameter",4,"ngIf"],[4,"ngIf"],[3,"diameter"]],template:function(e,i){1&e&&(a.Vb(0,"div",0),a.dc("click",(function(e){return!i.disabled&&i.open(e)})),a.Vb(1,"input",1),a.dc("change",(function(e){return i.fileChangeEvent(e)})),a.Ub(),a.Qb(2,"img",2,3),a.Ac(4,p,1,1,"mat-spinner",4),a.Ac(5,u,2,0,"mat-icon",5),a.Ub()),2&e&&(a.Fb("invalid",i.invalid),a.oc("matRippleDisabled",i.disabled),a.Cb(1),a.oc("accept",i.accept),a.Cb(1),a.oc("src",i.file,a.vc),a.Cb(2),a.oc("ngIf",i.loading),a.Cb(1),a.oc("ngIf",!i.file&&!i.loading))},directives:[o.o,r.l,c.c,s.a],styles:[".file-upload-container[_ngcontent-%COMP%]{width:150px;height:150px;cursor:pointer;border:1px solid #bdbdbd;overflow:hidden;margin-top:15px;text-align:center;border-radius:5px;vertical-align:middle;background-color:#eee}.file-upload-container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{display:none}.file-upload-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:150px;max-height:150px}.file-upload-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#3f51b5;width:48px;height:48px;font-size:48px;margin-top:51px}.invalid[_ngcontent-%COMP%]{border:1px solid #f44336}.invalid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#f44336}mat-spinner[_ngcontent-%COMP%]{margin:55px!important}"]}),e}()}}]);