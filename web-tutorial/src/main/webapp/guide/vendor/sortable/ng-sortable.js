!function(n){"use strict";"function"==typeof define&&define.amd?define(["angular","./sortable"],n):"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?(require("angular"),n(angular,require("./sortable")),module.exports="ng-sortable"):window.angular&&window.Sortable&&n(angular,Sortable)}(function(n, e){"use strict";var o="Sortable:ng-sortable";n.module("ng-sortable",[]).constant("ngSortableVersion","0.4.0").constant("ngSortableConfig",{}).directive("ngSortable",["$parse","ngSortableConfig",function(t, r){var l,i,a=function(n, e){var o=[].filter.call(n.childNodes,function(n){return 8===n.nodeType&&-1!==n.nodeValue.indexOf("ngRepeat:")})[0];if(!o)return function(){return null};o=o.nodeValue.match(/ngRepeat:\s*(?:\(.*?,\s*)?([^\s)]+)[\s)]+in\s+([^\s|]+)/);var r=t(o[2]);return function(){return r(e.$parent)||[]}};return{restrict:"AC",scope:{ngSortable:"=?"},link:function(t,u){function c(n,e){var o="on"+n.type.charAt(0).toUpperCase()+n.type.substr(1),t=b();p[o]&&p[o]({model:e||t[n.newIndex],models:t,oldIndex:n.oldIndex,newIndex:n.newIndex})}function d(r){var a=b();if(a){var u=r.oldIndex,c=r.newIndex;if(f!==r.from){var d=r.from[o]();l=d[u],r.clone?(l=n.copy(l),d.splice(e.utils.index(r.clone),0,d.splice(u,1)[0]),r.from.removeChild(r.clone)):d.splice(u,1),a.splice(c,0,l),r.from.insertBefore(r.item,i)}else a.splice(c,0,a.splice(u,1)[0]);t.$apply()}}var s,f=u[0],p=n.extend(t.ngSortable||{},r),g=[],b=a(f,t);f[o]=b,s=e.create(f,Object.keys(p).reduce(function(n,e){return n[e]=n[e]||p[e],n},{onStart:function(n){i=n.from===n.item.parentNode?n.item.nextSibling:n.clone.nextSibling,c(n),t.$apply()},onEnd:function(n){c(n,l),t.$apply()},onAdd:function(n){d(n),c(n,l),t.$apply()},onUpdate:function(n){d(n),c(n)},onRemove:function(n){c(n,l)},onSort:function(n){c(n)}})),u.on("$destroy",function(){n.forEach(g,function(n){n()}),s.destroy(),f[o]=null,f=null,g=null,s=null,i=null}),n.forEach(["sort","disabled","draggable","handle","animation","group","ghostClass","filter","onStart","onEnd","onAdd","onUpdate","onRemove","onSort"],function(n){g.push(t.$watch("ngSortable."+n,function(e){void 0!==e&&(p[n]=e,/^on[A-Z]/.test(n)||s.option(n,e))}))})}}}])});