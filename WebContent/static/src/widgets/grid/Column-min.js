Ext.grid.Column=Ext.extend(Ext.util.Observable,{isColumn:true,constructor:function(b){Ext.apply(this,b);if(Ext.isString(this.renderer)){this.renderer=Ext.util.Format[this.renderer]}else{if(Ext.isObject(this.renderer)){this.scope=this.renderer.scope;this.renderer=this.renderer.fn}}if(!this.scope){this.scope=this}var a=this.editor;delete this.editor;this.setEditor(a);this.addEvents("click","contextmenu","dblclick","mousedown");Ext.grid.Column.superclass.constructor.call(this)},processEvent:function(b,d,c,f,a){return this.fireEvent(b,this,c,f,d)},destroy:function(){if(this.setEditor){this.setEditor(null)}this.purgeListeners()},renderer:function(a){return a},getEditor:function(a){return this.editable!==false?this.editor:null},setEditor:function(b){var a=this.editor;if(a){if(a.gridEditor){a.gridEditor.destroy();delete a.gridEditor}else{a.destroy()}}this.editor=null;if(b){if(!b.isXType){b=Ext.create(b,"textfield")}this.editor=b}},getCellEditor:function(b){var a=this.getEditor(b);if(a){if(!a.startEdit){if(!a.gridEditor){a.gridEditor=new Ext.grid.GridEditor(a)}a=a.gridEditor}}return a}});Ext.grid.BooleanColumn=Ext.extend(Ext.grid.Column,{trueText:"true",falseText:"false",undefinedText:"&#160;",constructor:function(a){Ext.grid.BooleanColumn.superclass.constructor.call(this,a);var c=this.trueText,d=this.falseText,b=this.undefinedText;this.renderer=function(e){if(e===undefined){return b}if(!e||e==="false"){return d}return c}}});Ext.grid.NumberColumn=Ext.extend(Ext.grid.Column,{format:"0,000.00",constructor:function(a){Ext.grid.NumberColumn.superclass.constructor.call(this,a);this.renderer=Ext.util.Format.numberRenderer(this.format)}});Ext.grid.DateColumn=Ext.extend(Ext.grid.Column,{format:"m/d/Y",constructor:function(a){Ext.grid.DateColumn.superclass.constructor.call(this,a);this.renderer=Ext.util.Format.dateRenderer(this.format)}});Ext.grid.TemplateColumn=Ext.extend(Ext.grid.Column,{constructor:function(a){Ext.grid.TemplateColumn.superclass.constructor.call(this,a);var b=(!Ext.isPrimitive(this.tpl)&&this.tpl.compile)?this.tpl:new Ext.XTemplate(this.tpl);this.renderer=function(d,e,c){return b.apply(c.data)};this.tpl=b}});Ext.grid.ActionColumn=Ext.extend(Ext.grid.Column,{header:"&#160;",actionIdRe:/x-action-col-(\d+)/,altText:"",constructor:function(b){var f=this,c=b.items||(f.items=[f]),a=c.length,d,e;Ext.grid.ActionColumn.superclass.constructor.call(f,b);f.renderer=function(g,h){g=Ext.isFunction(b.renderer)?b.renderer.apply(this,arguments)||"":"";h.css+=" x-action-col-cell";for(d=0;d<a;d++){e=c[d];g+='<img alt="'+(e.altText||f.altText)+'" src="'+(e.icon||Ext.BLANK_IMAGE_URL)+'" class="x-action-col-icon x-action-col-'+String(d)+" "+(e.iconCls||"")+" "+(Ext.isFunction(e.getClass)?e.getClass.apply(e.scope||this.scope||this,arguments):"")+'"'+((e.tooltip)?' ext:qtip="'+e.tooltip+'"':"")+" />"}return g}},destroy:function(){delete this.items;delete this.renderer;return Ext.grid.ActionColumn.superclass.destroy.apply(this,arguments)},processEvent:function(c,h,d,i,b){var a=h.getTarget().className.match(this.actionIdRe),g,f;if(a&&(g=this.items[parseInt(a[1],10)])){if(c=="click"){(f=g.handler||this.handler)&&f.call(g.scope||this.scope||this,d,i,b,g,h)}else{if((c=="mousedown")&&(g.stopSelection!==false)){return false}}}return Ext.grid.ActionColumn.superclass.processEvent.apply(this,arguments)}});Ext.grid.Column.types={gridcolumn:Ext.grid.Column,booleancolumn:Ext.grid.BooleanColumn,numbercolumn:Ext.grid.NumberColumn,datecolumn:Ext.grid.DateColumn,templatecolumn:Ext.grid.TemplateColumn,actioncolumn:Ext.grid.ActionColumn};