"use strict";(self.webpackChunkironman=self.webpackChunkironman||[]).push([[524],{524:(J,u,e)=>{e.r(u),e.d(u,{IronmanModule:()=>j});var r=e(6895),l=e(3393),y=e(2524),x=e(7579),C=e(9841),c=e(4004),Z=e(4671),I=e(4482),U=e(5403);function m(t,i=Z.y){return t=t??B,(0,I.e)((o,s)=>{let a,f=!0;o.subscribe((0,U.x)(s,v=>{const h=i(v);(f||!t(a,h))&&(f=!1,a=h,s.next(v))}))})}function B(t,i){return t===i}var L=e(2722),n=e(8274),O=e(3768),S=e(1234);function A(t,i){if(1&t&&(n.TgZ(0,"ul")(1,"li",4)(2,"span",5),n._uU(3),n.qZA(),n.TgZ(4,"span",6),n._uU(5),n.qZA(),n.TgZ(6,"a",7),n._uU(7),n.qZA(),n.TgZ(8,"span",8),n._uU(9),n.qZA()()()),2&t){const o=i.$implicit;n.xp6(3),n.Oqu(o.year),n.xp6(2),n.Oqu(o.category),n.xp6(1),n.Q6J("href",o.topicUrl,n.LSH),n.xp6(1),n.hij(" ",o.topic," "),n.xp6(2),n.Oqu(o.author)}}function T(t,i){if(1&t&&(n.ynx(0),n.TgZ(1,"p",2),n._uU(2),n.qZA(),n.YNc(3,A,10,5,"ul",3),n.BQk()),2&t){const o=i.ngIf;n.xp6(2),n.hij("\u5171 ",o.length," \u7b46"),n.xp6(1),n.Q6J("ngForOf",o)}}let g=(()=>{class t{constructor(o,s){this.activatedRoute=o,this.ironmanStoreService=s,this.onDestroy$=new x.x,this.year$=this.activatedRoute.params.pipe((0,c.U)(a=>a.year||""),m()),this.key$=this.activatedRoute.queryParams.pipe((0,c.U)(a=>a.key?decodeURI(a.key):""),m())}ngOnInit(){(0,C.a)([this.year$,this.key$]).pipe((0,L.R)(this.onDestroy$)).subscribe(([o,s])=>{this.ironmanStoreService.filterQuery(s,o)})}ngOnDestroy(){this.onDestroy$.next(!1),this.onDestroy$.complete()}}return t.\u0275fac=function(o){return new(o||t)(n.Y36(l.gz),n.Y36(O.C))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-list"]],decls:6,vars:3,consts:[[1,""],[4,"ngIf"],[1,"text-right"],[4,"ngFor","ngForOf"],[1,"leading-loose","mb-2","align-top"],[1,"inline-block","align-top"],[1,"relative","top-1","inline-block","align-top","mx-2","w-24","rounded","bg-neutral-200","text-center","text-xs","leading-loose","dark:bg-neutral-500"],["target","_blank",1,"inline-block","align-top","hover:text-blue-500","mr-2",3,"href"],[1,"inline-block","align-top","text-neutral-400"]],template:function(o,s){1&o&&(n.TgZ(0,"div",0),n._uU(1," \u9435\u4eba\u8cfd\u6b77\u5c46\u4e3b\u984c\u641c\u5c0b "),n._UZ(2,"app-search"),n.TgZ(3,"div"),n.YNc(4,T,4,2,"ng-container",1),n.ALo(5,"async"),n.qZA()()),2&o&&(n.xp6(4),n.Q6J("ngIf",n.lcZ(5,1,s.ironmanStoreService.getIronmanList$)))},dependencies:[r.sg,r.O5,S.g,r.Ov],styles:["[_nghost-%COMP%]{width:100%;padding-left:4vw;padding-right:4vw}"]}),t})();const $=[{path:"",component:y.n},{path:"list",component:g},{path:"list/:year",component:g}];let R=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[l.Bz.forChild($),l.Bz]}),t})();var p=e(433),d=e(2216),F=e(8712),M=e(3396),D=e(2687);let j=(()=>{class t{constructor(o){o.addIconPacks(D.mRB,M.NCV,F.vnX)}}return t.\u0275fac=function(o){return new(o||t)(n.LFG(d.by))},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[r.ez,p.u5,p.UX,R,d.uH]}),t})()}}]);