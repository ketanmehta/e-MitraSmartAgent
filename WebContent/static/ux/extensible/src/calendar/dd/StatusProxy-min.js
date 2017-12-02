/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.StatusProxy=function(a){Ext.apply(this,a);this.id=this.id||Ext.id();this.el=new Ext.Layer({dh:{id:this.id,cls:"ext-dd-drag-proxy x-dd-drag-proxy "+this.dropNotAllowed,cn:[{cls:"x-dd-drop-icon"},{cls:"ext-dd-ghost-ct",cn:[{cls:"x-dd-drag-ghost"},{cls:"ext-dd-msg"}]}]},shadow:!a||a.shadow!==false});this.ghost=Ext.get(this.el.dom.childNodes[1].childNodes[0]);this.message=Ext.get(this.el.dom.childNodes[1].childNodes[1]);this.dropStatus=this.dropNotAllowed};Ext.extend(Ext.ensible.cal.StatusProxy,Ext.dd.StatusProxy,{moveEventCls:"ext-cal-dd-move",addEventCls:"ext-cal-dd-add",update:function(a){if(typeof a=="string"){this.ghost.update(a)}else{this.ghost.update("");a.style.margin="0";this.ghost.dom.appendChild(a)}var b=this.ghost.dom.firstChild;if(b){Ext.fly(b).setStyle("float","none").setHeight("auto");Ext.getDom(b).id+="-ddproxy"}},updateMsg:function(a){this.message.update(a)}});