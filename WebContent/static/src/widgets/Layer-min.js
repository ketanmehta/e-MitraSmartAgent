(function(){Ext.Layer=function(d,c){d=d||{};var e=Ext.DomHelper,g=d.parentEl,f=g?Ext.getDom(g):document.body;if(c){this.dom=Ext.getDom(c)}if(!this.dom){var h=d.dh||{tag:"div",cls:"x-layer"};this.dom=e.append(f,h)}if(d.cls){this.addClass(d.cls)}this.constrain=d.constrain!==false;this.setVisibilityMode(Ext.Element.VISIBILITY);if(d.id){this.id=this.dom.id=d.id}else{this.id=Ext.id(this.dom)}this.zindex=d.zindex||this.getZIndex();this.position("absolute",this.zindex);if(d.shadow){this.shadowOffset=d.shadowOffset||4;this.shadow=new Ext.Shadow({offset:this.shadowOffset,mode:d.shadow})}else{this.shadowOffset=0}this.useShim=d.shim!==false&&Ext.useShims;this.useDisplay=d.useDisplay;this.hide()};var a=Ext.Element.prototype;var b=[];Ext.extend(Ext.Layer,Ext.Element,{getZIndex:function(){return this.zindex||parseInt((this.getShim()||this).getStyle("z-index"),10)||11000},getShim:function(){if(!this.useShim){return null}if(this.shim){return this.shim}var d=b.shift();if(!d){d=this.createShim();d.enableDisplayMode("block");d.dom.style.display="none";d.dom.style.visibility="visible"}var c=this.dom.parentNode;if(d.dom.parentNode!=c){c.insertBefore(d.dom,this.dom)}d.setStyle("z-index",this.getZIndex()-2);this.shim=d;return d},hideShim:function(){if(this.shim){this.shim.setDisplayed(false);b.push(this.shim);delete this.shim}},disableShadow:function(){if(this.shadow){this.shadowDisabled=true;this.shadow.hide();this.lastShadowOffset=this.shadowOffset;this.shadowOffset=0}},enableShadow:function(c){if(this.shadow){this.shadowDisabled=false;if(Ext.isDefined(this.lastShadowOffset)){this.shadowOffset=this.lastShadowOffset;delete this.lastShadowOffset}if(c){this.sync(true)}}},sync:function(d){var m=this.shadow;if(!this.updating&&this.isVisible()&&(m||this.useShim)){var g=this.getShim(),k=this.getWidth(),i=this.getHeight(),e=this.getLeft(true),n=this.getTop(true);if(m&&!this.shadowDisabled){if(d&&!m.isVisible()){m.show(this)}else{m.realign(e,n,k,i)}if(g){if(d){g.show()}var j=m.el.getXY(),f=g.dom.style,c=m.el.getSize();f.left=(j[0])+"px";f.top=(j[1])+"px";f.width=(c.width)+"px";f.height=(c.height)+"px"}}else{if(g){if(d){g.show()}g.setSize(k,i);g.setLeftTop(e,n)}}}},destroy:function(){this.hideShim();if(this.shadow){this.shadow.hide()}this.removeAllListeners();Ext.removeNode(this.dom);delete this.dom},remove:function(){this.destroy()},beginUpdate:function(){this.updating=true},endUpdate:function(){this.updating=false;this.sync(true)},hideUnders:function(c){if(this.shadow){this.shadow.hide()}this.hideShim()},constrainXY:function(){if(this.constrain){var i=Ext.lib.Dom.getViewWidth(),d=Ext.lib.Dom.getViewHeight();var n=Ext.getDoc().getScroll();var m=this.getXY();var j=m[0],g=m[1];var c=this.shadowOffset;var k=this.dom.offsetWidth+c,e=this.dom.offsetHeight+c;var f=false;if((j+k)>i+n.left){j=i-k-c;f=true}if((g+e)>d+n.top){g=d-e-c;f=true}if(j<n.left){j=n.left;f=true}if(g<n.top){g=n.top;f=true}if(f){if(this.avoidY){var l=this.avoidY;if(g<=l&&(g+e)>=l){g=l-e-5}}m=[j,g];this.storeXY(m);a.setXY.call(this,m);this.sync()}}return this},getConstrainOffset:function(){return this.shadowOffset},isVisible:function(){return this.visible},showAction:function(){this.visible=true;if(this.useDisplay===true){this.setDisplayed("")}else{if(this.lastXY){a.setXY.call(this,this.lastXY)}else{if(this.lastLT){a.setLeftTop.call(this,this.lastLT[0],this.lastLT[1])}}}},hideAction:function(){this.visible=false;if(this.useDisplay===true){this.setDisplayed(false)}else{this.setLeftTop(-10000,-10000)}},setVisible:function(h,g,j,k,i){if(h){this.showAction()}if(g&&h){var f=function(){this.sync(true);if(k){k()}}.createDelegate(this);a.setVisible.call(this,true,true,j,f,i)}else{if(!h){this.hideUnders(true)}var f=k;if(g){f=function(){this.hideAction();if(k){k()}}.createDelegate(this)}a.setVisible.call(this,h,g,j,f,i);if(h){this.sync(true)}else{if(!g){this.hideAction()}}}return this},storeXY:function(c){delete this.lastLT;this.lastXY=c},storeLeftTop:function(d,c){delete this.lastXY;this.lastLT=[d,c]},beforeFx:function(){this.beforeAction();return Ext.Layer.superclass.beforeFx.apply(this,arguments)},afterFx:function(){Ext.Layer.superclass.afterFx.apply(this,arguments);this.sync(this.isVisible())},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide()}},setLeft:function(c){this.storeLeftTop(c,this.getTop(true));a.setLeft.apply(this,arguments);this.sync();return this},setTop:function(c){this.storeLeftTop(this.getLeft(true),c);a.setTop.apply(this,arguments);this.sync();return this},setLeftTop:function(d,c){this.storeLeftTop(d,c);a.setLeftTop.apply(this,arguments);this.sync();return this},setXY:function(i,g,j,k,h){this.fixDisplay();this.beforeAction();this.storeXY(i);var f=this.createCB(k);a.setXY.call(this,i,g,j,f,h);if(!g){f()}return this},createCB:function(e){var d=this;return function(){d.constrainXY();d.sync(true);if(e){e()}}},setX:function(f,g,i,j,h){this.setXY([f,this.getY()],g,i,j,h);return this},setY:function(j,f,h,i,g){this.setXY([this.getX(),j],f,h,i,g);return this},setSize:function(i,j,g,l,m,k){this.beforeAction();var f=this.createCB(m);a.setSize.call(this,i,j,g,l,f,k);if(!g){f()}return this},setWidth:function(h,g,j,k,i){this.beforeAction();var f=this.createCB(k);a.setWidth.call(this,h,g,j,f,i);if(!g){f()}return this},setHeight:function(i,g,k,l,j){this.beforeAction();var f=this.createCB(l);a.setHeight.call(this,i,g,k,f,j);if(!g){f()}return this},setBounds:function(n,l,o,g,m,j,k,i){this.beforeAction();var f=this.createCB(k);if(!m){this.storeXY([n,l]);a.setXY.call(this,[n,l]);a.setSize.call(this,o,g,m,j,f,i);f()}else{a.setBounds.call(this,n,l,o,g,m,j,f,i)}return this},setZIndex:function(c){this.zindex=c;this.setStyle("z-index",c+2);if(this.shadow){this.shadow.setZIndex(c+1)}if(this.shim){this.shim.setStyle("z-index",c)}return this}})})();