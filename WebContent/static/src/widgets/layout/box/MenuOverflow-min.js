Ext.layout.boxOverflow.Menu=Ext.extend(Ext.layout.boxOverflow.None,{afterCls:"x-strip-right",noItemsMenuText:'<div class="x-toolbar-no-items">(None)</div>',constructor:function(a){Ext.layout.boxOverflow.Menu.superclass.constructor.apply(this,arguments);this.menuItems=[]},createInnerElements:function(){if(!this.afterCt){this.afterCt=this.layout.innerCt.insertSibling({cls:this.afterCls},"before")}},clearOverflow:function(a,f){var e=f.width+(this.afterCt?this.afterCt.getWidth():0),b=this.menuItems;this.hideTrigger();for(var c=0,d=b.length;c<d;c++){b.pop().component.show()}return{targetSize:{height:f.height,width:e}}},showTrigger:function(){this.createMenu();this.menuTrigger.show()},hideTrigger:function(){if(this.menuTrigger!=undefined){this.menuTrigger.hide()}},beforeMenuShow:function(g){var b=this.menuItems,a=b.length,f,e;var c=function(i,h){return i.isXType("buttongroup")&&!(h instanceof Ext.Toolbar.Separator)};this.clearMenu();g.removeAll();for(var d=0;d<a;d++){f=b[d].component;if(e&&(c(f,e)||c(e,f))){g.add("-")}this.addComponentToMenu(g,f);e=f}if(g.items.length<1){g.add(this.noItemsMenuText)}},createMenuConfig:function(c,a){var b=Ext.apply({},c.initialConfig),d=c.toggleGroup;Ext.copyTo(b,c,["iconCls","icon","itemId","disabled","handler","scope","menu"]);Ext.apply(b,{text:c.overflowText||c.text,hideOnClick:a});if(d||c.enableToggle){Ext.apply(b,{group:d,checked:c.pressed,listeners:{checkchange:function(f,e){c.toggle(e)}}})}delete b.ownerCt;delete b.xtype;delete b.id;return b},addComponentToMenu:function(b,a){if(a instanceof Ext.Toolbar.Separator){b.add("-")}else{if(Ext.isFunction(a.isXType)){if(a.isXType("splitbutton")){b.add(this.createMenuConfig(a,true))}else{if(a.isXType("button")){b.add(this.createMenuConfig(a,!a.menu))}else{if(a.isXType("buttongroup")){a.items.each(function(c){this.addComponentToMenu(b,c)},this)}}}}}},clearMenu:function(){var a=this.moreMenu;if(a&&a.items){a.items.each(function(b){delete b.menu})}},createMenu:function(){if(!this.menuTrigger){this.createInnerElements();this.menu=new Ext.menu.Menu({ownerCt:this.layout.container,listeners:{scope:this,beforeshow:this.beforeMenuShow}});this.menuTrigger=new Ext.Button({iconCls:"x-toolbar-more-icon",cls:"x-toolbar-more",menu:this.menu,renderTo:this.afterCt})}},destroy:function(){Ext.destroy(this.menu,this.menuTrigger)}});Ext.layout.boxOverflow.menu=Ext.layout.boxOverflow.Menu;Ext.layout.boxOverflow.HorizontalMenu=Ext.extend(Ext.layout.boxOverflow.Menu,{constructor:function(){Ext.layout.boxOverflow.HorizontalMenu.superclass.constructor.apply(this,arguments);var c=this,b=c.layout,a=b.calculateChildBoxes;b.calculateChildBoxes=function(d,h){var k=a.apply(b,arguments),j=k.meta,e=c.menuItems;var i=0;for(var f=0,g=e.length;f<g;f++){i+=e[f].width}j.minimumWidth+=i;j.tooNarrow=j.minimumWidth>h.width;return k}},handleOverflow:function(d,g){this.showTrigger();var j=g.width-this.afterCt.getWidth(),k=d.boxes,e=0,q=false;for(var n=0,c=k.length;n<c;n++){e+=k[n].width}var a=j-e,f=0;for(var n=0,c=this.menuItems.length;n<c;n++){var m=this.menuItems[n],l=m.component,b=m.width;if(b<a){l.show();a-=b;f++;q=true}else{break}}if(q){this.menuItems=this.menuItems.slice(f)}else{for(var h=k.length-1;h>=0;h--){var p=k[h].component,o=k[h].left+k[h].width;if(o>=j){this.menuItems.unshift({component:p,width:k[h].width});p.hide()}else{break}}}if(this.menuItems.length==0){this.hideTrigger()}return{targetSize:{height:g.height,width:j},recalculate:q}}});Ext.layout.boxOverflow.menu.hbox=Ext.layout.boxOverflow.HorizontalMenu;