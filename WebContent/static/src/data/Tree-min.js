Ext.data.Tree=Ext.extend(Ext.util.Observable,{constructor:function(a){this.nodeHash={};this.root=null;if(a){this.setRootNode(a)}this.addEvents("append","remove","move","insert","beforeappend","beforeremove","beforemove","beforeinsert");Ext.data.Tree.superclass.constructor.call(this)},pathSeparator:"/",proxyNodeEvent:function(){return this.fireEvent.apply(this,arguments)},getRootNode:function(){return this.root},setRootNode:function(a){this.root=a;a.ownerTree=this;a.isRoot=true;this.registerNode(a);return a},getNodeById:function(a){return this.nodeHash[a]},registerNode:function(a){this.nodeHash[a.id]=a},unregisterNode:function(a){delete this.nodeHash[a.id]},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]"}});Ext.data.Node=Ext.extend(Ext.util.Observable,{constructor:function(a){this.attributes=a||{};this.leaf=this.attributes.leaf;this.id=this.attributes.id;if(!this.id){this.id=Ext.id(null,"xnode-");this.attributes.id=this.id}this.childNodes=[];this.parentNode=null;this.firstChild=null;this.lastChild=null;this.previousSibling=null;this.nextSibling=null;this.addEvents({append:true,remove:true,move:true,insert:true,beforeappend:true,beforeremove:true,beforemove:true,beforeinsert:true});this.listeners=this.attributes.listeners;Ext.data.Node.superclass.constructor.call(this)},fireEvent:function(b){if(Ext.data.Node.superclass.fireEvent.apply(this,arguments)===false){return false}var a=this.getOwnerTree();if(a){if(a.proxyNodeEvent.apply(a,arguments)===false){return false}}return true},isLeaf:function(){return this.leaf===true},setFirstChild:function(a){this.firstChild=a},setLastChild:function(a){this.lastChild=a},isLast:function(){return(!this.parentNode?true:this.parentNode.lastChild==this)},isFirst:function(){return(!this.parentNode?true:this.parentNode.firstChild==this)},hasChildNodes:function(){return !this.isLeaf()&&this.childNodes.length>0},isExpandable:function(){return this.attributes.expandable||this.hasChildNodes()},appendChild:function(e){var f=false;if(Ext.isArray(e)){f=e}else{if(arguments.length>1){f=arguments}}if(f){for(var d=0,a=f.length;d<a;d++){this.appendChild(f[d])}}else{if(this.fireEvent("beforeappend",this.ownerTree,this,e)===false){return false}var b=this.childNodes.length;var c=e.parentNode;if(c){if(e.fireEvent("beforemove",e.getOwnerTree(),e,c,this,b)===false){return false}c.removeChild(e)}b=this.childNodes.length;if(b===0){this.setFirstChild(e)}this.childNodes.push(e);e.parentNode=this;var g=this.childNodes[b-1];if(g){e.previousSibling=g;g.nextSibling=e}else{e.previousSibling=null}e.nextSibling=null;this.setLastChild(e);e.setOwnerTree(this.getOwnerTree());this.fireEvent("append",this.ownerTree,this,e,b);if(c){e.fireEvent("move",this.ownerTree,e,c,this,b)}return e}},removeChild:function(c,b){var a=this.childNodes.indexOf(c);if(a==-1){return false}if(this.fireEvent("beforeremove",this.ownerTree,this,c)===false){return false}this.childNodes.splice(a,1);if(c.previousSibling){c.previousSibling.nextSibling=c.nextSibling}if(c.nextSibling){c.nextSibling.previousSibling=c.previousSibling}if(this.firstChild==c){this.setFirstChild(c.nextSibling)}if(this.lastChild==c){this.setLastChild(c.previousSibling)}this.fireEvent("remove",this.ownerTree,this,c);if(b){c.destroy(true)}else{c.clear()}return c},clear:function(a){this.setOwnerTree(null,a);this.parentNode=this.previousSibling=this.nextSibling=null;if(a){this.firstChild=this.lastChild=null}},destroy:function(a){if(a===true){this.purgeListeners();this.clear(true);Ext.each(this.childNodes,function(b){b.destroy(true)});this.childNodes=null}else{this.remove(true)}},insertBefore:function(d,a){if(!a){return this.appendChild(d)}if(d==a){return false}if(this.fireEvent("beforeinsert",this.ownerTree,this,d,a)===false){return false}var b=this.childNodes.indexOf(a);var c=d.parentNode;var e=b;if(c==this&&this.childNodes.indexOf(d)<b){e--}if(c){if(d.fireEvent("beforemove",d.getOwnerTree(),d,c,this,b,a)===false){return false}c.removeChild(d)}if(e===0){this.setFirstChild(d)}this.childNodes.splice(e,0,d);d.parentNode=this;var f=this.childNodes[e-1];if(f){d.previousSibling=f;f.nextSibling=d}else{d.previousSibling=null}d.nextSibling=a;a.previousSibling=d;d.setOwnerTree(this.getOwnerTree());this.fireEvent("insert",this.ownerTree,this,d,a);if(c){d.fireEvent("move",this.ownerTree,d,c,this,e,a)}return d},remove:function(a){if(this.parentNode){this.parentNode.removeChild(this,a)}return this},removeAll:function(a){var c=this.childNodes,b;while((b=c[0])){this.removeChild(b,a)}return this},item:function(a){return this.childNodes[a]},replaceChild:function(a,c){var b=c?c.nextSibling:null;this.removeChild(c);this.insertBefore(a,b);return c},indexOf:function(a){return this.childNodes.indexOf(a)},getOwnerTree:function(){if(!this.ownerTree){var a=this;while(a){if(a.ownerTree){this.ownerTree=a.ownerTree;break}a=a.parentNode}}return this.ownerTree},getDepth:function(){var b=0;var a=this;while(a.parentNode){++b;a=a.parentNode}return b},setOwnerTree:function(a,b){if(a!=this.ownerTree){if(this.ownerTree){this.ownerTree.unregisterNode(this)}this.ownerTree=a;if(b!==true){Ext.each(this.childNodes,function(c){c.setOwnerTree(a)})}if(a){a.registerNode(this)}}},setId:function(b){if(b!==this.id){var a=this.ownerTree;if(a){a.unregisterNode(this)}this.id=this.attributes.id=b;if(a){a.registerNode(this)}this.onIdChange(b)}},onIdChange:Ext.emptyFn,getPath:function(c){c=c||"id";var e=this.parentNode;var a=[this.attributes[c]];while(e){a.unshift(e.attributes[c]);e=e.parentNode}var d=this.getOwnerTree().pathSeparator;return d+a.join(d)},bubble:function(c,b,a){var d=this;while(d){if(c.apply(b||d,a||[d])===false){break}d=d.parentNode}},cascade:function(f,e,b){if(f.apply(e||this,b||[this])!==false){var d=this.childNodes;for(var c=0,a=d.length;c<a;c++){d[c].cascade(f,e,b)}}},eachChild:function(f,e,b){var d=this.childNodes;for(var c=0,a=d.length;c<a;c++){if(f.apply(e||d[c],b||[d[c]])===false){break}}},findChild:function(b,c,a){return this.findChildBy(function(){return this.attributes[b]==c},null,a)},findChildBy:function(g,f,b){var e=this.childNodes,a=e.length,d=0,h,c;for(;d<a;d++){h=e[d];if(g.call(f||h,h)===true){return h}else{if(b){c=h.findChildBy(g,f,b);if(c!=null){return c}}}}return null},sort:function(e,d){var c=this.childNodes;var a=c.length;if(a>0){var f=d?function(){e.apply(d,arguments)}:e;c.sort(f);for(var b=0;b<a;b++){var g=c[b];g.previousSibling=c[b-1];g.nextSibling=c[b+1];if(b===0){this.setFirstChild(g)}if(b==a-1){this.setLastChild(g)}}}},contains:function(a){return a.isAncestor(this)},isAncestor:function(a){var b=this.parentNode;while(b){if(b==a){return true}b=b.parentNode}return false},toString:function(){return"[Node"+(this.id?" "+this.id:"")+"]"}});