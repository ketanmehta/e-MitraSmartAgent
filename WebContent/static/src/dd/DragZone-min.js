Ext.dd.DragZone=Ext.extend(Ext.dd.DragSource,{constructor:function(b,a){Ext.dd.DragZone.superclass.constructor.call(this,b,a);if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)}},getDragData:function(a){return Ext.dd.Registry.getHandleFromEvent(a)},onInitDrag:function(a,b){this.proxy.update(this.dragData.ddel.cloneNode(true));this.onStartDrag(a,b);return true},afterRepair:function(){if(Ext.enableFx){Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9")}this.dragging=false},getRepairXY:function(a){return Ext.Element.fly(this.dragData.ddel).getXY()},destroy:function(){Ext.dd.DragZone.superclass.destroy.call(this);if(this.containerScroll){Ext.dd.ScrollManager.unregister(this.el)}}});