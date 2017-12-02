Ext.form.ComboBox=Ext.extend(Ext.form.TriggerField,{defaultAutoCreate:{tag:"input",type:"text",size:"24",autocomplete:"off"},listClass:"",selectedClass:"x-combo-selected",listEmptyText:"",triggerClass:"x-form-arrow-trigger",shadow:"sides",listAlign:"tl-bl?",maxHeight:300,minHeight:90,triggerAction:"query",minChars:4,autoSelect:true,typeAhead:false,queryDelay:500,pageSize:0,selectOnFocus:false,queryParam:"query",loadingText:"Loading...",resizable:false,handleHeight:8,allQuery:"",mode:"remote",minListWidth:70,forceSelection:false,typeAheadDelay:250,lazyInit:true,clearFilterOnReset:true,submitValue:undefined,initComponent:function(){Ext.form.ComboBox.superclass.initComponent.call(this);this.addEvents("expand","collapse","beforeselect","select","beforequery");if(this.transform){var c=Ext.getDom(this.transform);if(!this.hiddenName){this.hiddenName=c.name}if(!this.store){this.mode="local";var h=[],e=c.options;for(var b=0,a=e.length;b<a;b++){var g=e[b],f=(g.hasAttribute?g.hasAttribute("value"):g.getAttributeNode("value").specified)?g.value:g.text;if(g.selected&&Ext.isEmpty(this.value,true)){this.value=f}h.push([f,g.text])}this.store=new Ext.data.ArrayStore({idIndex:0,fields:["value","text"],data:h,autoDestroy:true});this.valueField="value";this.displayField="text"}c.name=Ext.id();if(!this.lazyRender){this.target=true;this.el=Ext.DomHelper.insertBefore(c,this.autoCreate||this.defaultAutoCreate);this.render(this.el.parentNode,c)}Ext.removeNode(c)}else{if(this.store){this.store=Ext.StoreMgr.lookup(this.store);if(this.store.autoCreated){this.displayField=this.valueField="field1";if(!this.store.expandData){this.displayField="field2"}this.mode="local"}}}this.selectedIndex=-1;if(this.mode=="local"){if(!Ext.isDefined(this.initialConfig.queryDelay)){this.queryDelay=10}if(!Ext.isDefined(this.initialConfig.minChars)){this.minChars=0}}},onRender:function(b,a){if(this.hiddenName&&!Ext.isDefined(this.submitValue)){this.submitValue=false}Ext.form.ComboBox.superclass.onRender.call(this,b,a);if(this.hiddenName){this.hiddenField=this.el.insertSibling({tag:"input",type:"hidden",name:this.hiddenName,id:(this.hiddenId||Ext.id())},"before",true)}if(Ext.isGecko){this.el.dom.setAttribute("autocomplete","off")}if(!this.lazyInit){this.initList()}else{this.on("focus",this.initList,this,{single:true})}},initValue:function(){Ext.form.ComboBox.superclass.initValue.call(this);if(this.hiddenField){this.hiddenField.value=Ext.value(Ext.isDefined(this.hiddenValue)?this.hiddenValue:this.value,"")}},getParentZIndex:function(){var a;if(this.ownerCt){this.findParentBy(function(b){a=parseInt(b.getPositionEl().getStyle("z-index"),10);return !!a})}return a},getZIndex:function(b){b=b||Ext.getDom(this.getListParent()||Ext.getBody());var a=parseInt(Ext.fly(b).getStyle("z-index"),10);if(!a){a=this.getParentZIndex()}return(a||12000)+5},initList:function(){if(!this.list){var a="x-combo-list",c=Ext.getDom(this.getListParent()||Ext.getBody());this.list=new Ext.Layer({parentEl:c,shadow:this.shadow,cls:[a,this.listClass].join(" "),constrain:false,zindex:this.getZIndex(c)});var b=this.listWidth||Math.max(this.wrap.getWidth(),this.minListWidth);this.list.setSize(b,0);this.list.swallowEvent("mousewheel");this.assetHeight=0;if(this.syncFont!==false){this.list.setStyle("font-size",this.el.getStyle("font-size"))}if(this.title){this.header=this.list.createChild({cls:a+"-hd",html:this.title});this.assetHeight+=this.header.getHeight()}this.innerList=this.list.createChild({cls:a+"-inner"});this.mon(this.innerList,"mouseover",this.onViewOver,this);this.mon(this.innerList,"mousemove",this.onViewMove,this);this.innerList.setWidth(b-this.list.getFrameWidth("lr"));if(this.pageSize){this.footer=this.list.createChild({cls:a+"-ft"});this.pageTb=new Ext.PagingToolbar({store:this.store,pageSize:this.pageSize,renderTo:this.footer});this.assetHeight+=this.footer.getHeight()}if(!this.tpl){this.tpl='<tpl for="."><div class="'+a+'-item">{'+this.displayField+"}</div></tpl>"}this.view=new Ext.DataView({applyTo:this.innerList,tpl:this.tpl,singleSelect:true,selectedClass:this.selectedClass,itemSelector:this.itemSelector||"."+a+"-item",emptyText:this.listEmptyText,deferEmptyText:false});this.mon(this.view,{containerclick:this.onViewClick,click:this.onViewClick,scope:this});this.bindStore(this.store,true);if(this.resizable){this.resizer=new Ext.Resizable(this.list,{pinned:true,handles:"se"});this.mon(this.resizer,"resize",function(f,d,e){this.maxHeight=e-this.handleHeight-this.list.getFrameWidth("tb")-this.assetHeight;this.listWidth=d;this.innerList.setWidth(d-this.list.getFrameWidth("lr"));this.restrictHeight()},this);this[this.pageSize?"footer":"innerList"].setStyle("margin-bottom",this.handleHeight+"px")}}},getListParent:function(){return document.body},getStore:function(){return this.store},bindStore:function(a,b){if(this.store&&!b){if(this.store!==a&&this.store.autoDestroy){this.store.destroy()}else{this.store.un("beforeload",this.onBeforeLoad,this);this.store.un("load",this.onLoad,this);this.store.un("exception",this.collapse,this)}if(!a){this.store=null;if(this.view){this.view.bindStore(null)}if(this.pageTb){this.pageTb.bindStore(null)}}}if(a){if(!b){this.lastQuery=null;if(this.pageTb){this.pageTb.bindStore(a)}}this.store=Ext.StoreMgr.lookup(a);this.store.on({scope:this,beforeload:this.onBeforeLoad,load:this.onLoad,exception:this.collapse});if(this.view){this.view.bindStore(a)}}},reset:function(){if(this.clearFilterOnReset&&this.mode=="local"){this.store.clearFilter()}Ext.form.ComboBox.superclass.reset.call(this)},initEvents:function(){Ext.form.ComboBox.superclass.initEvents.call(this);this.keyNav=new Ext.KeyNav(this.el,{up:function(a){this.inKeyMode=true;this.selectPrev()},down:function(a){if(!this.isExpanded()){this.onTriggerClick()}else{this.inKeyMode=true;this.selectNext()}},enter:function(a){this.onViewClick()},esc:function(a){this.collapse()},tab:function(a){if(this.forceSelection===true){this.collapse()}else{this.onViewClick(false)}return true},scope:this,doRelay:function(c,b,a){if(a=="down"||this.scope.isExpanded()){var d=Ext.KeyNav.prototype.doRelay.apply(this,arguments);if((((Ext.isIE9&&Ext.isStrict)||Ext.isIE10p)||!Ext.isIE)&&Ext.EventManager.useKeydown){this.scope.fireKey(c)}return d}return true},forceKeyDown:true,defaultEventAction:"stopEvent"});this.queryDelay=Math.max(this.queryDelay||10,this.mode=="local"?10:250);this.dqTask=new Ext.util.DelayedTask(this.initQuery,this);if(this.typeAhead){this.taTask=new Ext.util.DelayedTask(this.onTypeAhead,this)}if(!this.enableKeyEvents){this.mon(this.el,"keyup",this.onKeyUp,this)}},onDestroy:function(){if(this.dqTask){this.dqTask.cancel();this.dqTask=null}this.bindStore(null);Ext.destroy(this.resizer,this.view,this.pageTb,this.list);Ext.destroyMembers(this,"hiddenField");Ext.form.ComboBox.superclass.onDestroy.call(this)},fireKey:function(a){if(!this.isExpanded()){Ext.form.ComboBox.superclass.fireKey.call(this,a)}},onResize:function(a,b){Ext.form.ComboBox.superclass.onResize.apply(this,arguments);if(!isNaN(a)&&this.isVisible()&&this.list){this.doResize(a)}else{this.bufferSize=a}},doResize:function(a){if(!Ext.isDefined(this.listWidth)){var b=Math.max(a,this.minListWidth);this.list.setWidth(b);this.innerList.setWidth(b-this.list.getFrameWidth("lr"))}},onEnable:function(){Ext.form.ComboBox.superclass.onEnable.apply(this,arguments);if(this.hiddenField){this.hiddenField.disabled=false}},onDisable:function(){Ext.form.ComboBox.superclass.onDisable.apply(this,arguments);if(this.hiddenField){this.hiddenField.disabled=true}},onBeforeLoad:function(){if(!this.hasFocus){return}this.innerList.update(this.loadingText?'<div class="loading-indicator">'+this.loadingText+"</div>":"");this.restrictHeight();this.selectedIndex=-1},onLoad:function(){if(!this.hasFocus){return}if(this.store.getCount()>0||this.listEmptyText){this.expand();this.restrictHeight();if(this.lastQuery==this.allQuery){if(this.editable){this.el.dom.select()}if(this.autoSelect!==false&&!this.selectByValue(this.value,true)){this.select(0,true)}}else{if(this.autoSelect!==false){this.selectNext()}if(this.typeAhead&&this.lastKey!=Ext.EventObject.BACKSPACE&&this.lastKey!=Ext.EventObject.DELETE){this.taTask.delay(this.typeAheadDelay)}}}else{this.collapse()}},onTypeAhead:function(){if(this.store.getCount()>0){var b=this.store.getAt(0);var c=b.data[this.displayField];var a=c.length;var d=this.getRawValue().length;if(d!=a){this.setRawValue(c);this.selectText(d,c.length)}}},assertValue:function(){var b=this.getRawValue(),a;if(this.valueField&&Ext.isDefined(this.value)){a=this.findRecord(this.valueField,this.value)}if(!a||a.get(this.displayField)!=b){a=this.findRecord(this.displayField,b)}if(!a&&this.forceSelection){if(b.length>0&&b!=this.emptyText){this.el.dom.value=Ext.value(this.lastSelectionText,"");this.applyEmptyText()}else{this.clearValue()}}else{if(a&&this.valueField){if(this.value==b){return}b=a.get(this.valueField||this.displayField)}this.setValue(b)}},onSelect:function(a,b){if(this.fireEvent("beforeselect",this,a,b)!==false){this.setValue(a.data[this.valueField||this.displayField]);this.collapse();this.fireEvent("select",this,a,b)}},getName:function(){var a=this.hiddenField;return a&&a.name?a.name:this.hiddenName||Ext.form.ComboBox.superclass.getName.call(this)},getValue:function(){if(this.valueField){return Ext.isDefined(this.value)?this.value:""}else{return Ext.form.ComboBox.superclass.getValue.call(this)}},clearValue:function(){if(this.hiddenField){this.hiddenField.value=""}this.setRawValue("");this.lastSelectionText="";this.applyEmptyText();this.value=""},setValue:function(a){var c=a;if(this.valueField){var b=this.findRecord(this.valueField,a);if(b){c=b.data[this.displayField]}else{if(Ext.isDefined(this.valueNotFoundText)){c=this.valueNotFoundText}}}this.lastSelectionText=c;if(this.hiddenField){this.hiddenField.value=Ext.value(a,"")}Ext.form.ComboBox.superclass.setValue.call(this,c);this.value=a;return this},findRecord:function(c,b){var a;if(this.store.getCount()>0){this.store.each(function(d){if(d.data[c]==b){a=d;return false}})}return a},onViewMove:function(b,a){this.inKeyMode=false},onViewOver:function(d,b){if(this.inKeyMode){return}var c=this.view.findItemFromChild(b);if(c){var a=this.view.indexOf(c);this.select(a,false)}},onViewClick:function(b){var a=this.view.getSelectedIndexes()[0],c=this.store,d=c.getAt(a);if(d){this.onSelect(d,a)}else{this.collapse()}if(b!==false){this.el.focus()}},restrictHeight:function(){this.innerList.dom.style.height="";var b=this.innerList.dom,e=this.list.getFrameWidth("tb")+(this.resizable?this.handleHeight:0)+this.assetHeight,c=Math.max(b.clientHeight,b.offsetHeight,b.scrollHeight),a=this.getPosition()[1]-Ext.getBody().getScroll().top,f=Ext.lib.Dom.getViewHeight()-a-this.getSize().height,d=Math.max(a,f,this.minHeight||0)-this.list.shadowOffset-e-5;c=Math.min(c,d,this.maxHeight);this.innerList.setHeight(c);this.list.beginUpdate();this.list.setHeight(c+e);this.list.alignTo.apply(this.list,[this.el].concat(this.listAlign));this.list.endUpdate()},isExpanded:function(){return this.list&&this.list.isVisible()},selectByValue:function(a,c){if(!Ext.isEmpty(a,true)){var b=this.findRecord(this.valueField||this.displayField,a);if(b){this.select(this.store.indexOf(b),c);return true}}return false},select:function(a,c){this.selectedIndex=a;this.view.select(a);if(c!==false){var b=this.view.getNode(a);if(b){this.innerList.scrollChildIntoView(b,false)}}},selectNext:function(){var a=this.store.getCount();if(a>0){if(this.selectedIndex==-1){this.select(0)}else{if(this.selectedIndex<a-1){this.select(this.selectedIndex+1)}}}},selectPrev:function(){var a=this.store.getCount();if(a>0){if(this.selectedIndex==-1){this.select(0)}else{if(this.selectedIndex!==0){this.select(this.selectedIndex-1)}}}},onKeyUp:function(b){var a=b.getKey();if(this.editable!==false&&this.readOnly!==true&&(a==b.BACKSPACE||!b.isSpecialKey())){this.lastKey=a;this.dqTask.delay(this.queryDelay)}Ext.form.ComboBox.superclass.onKeyUp.call(this,b)},validateBlur:function(){return !this.list||!this.list.isVisible()},initQuery:function(){this.doQuery(this.getRawValue())},beforeBlur:function(){this.assertValue()},postBlur:function(){Ext.form.ComboBox.superclass.postBlur.call(this);this.collapse();this.inKeyMode=false},doQuery:function(c,b){c=Ext.isEmpty(c)?"":c;var a={query:c,forceAll:b,combo:this,cancel:false};if(this.fireEvent("beforequery",a)===false||a.cancel){return false}c=a.query;b=a.forceAll;if(b===true||(c.length>=this.minChars)){if(this.lastQuery!==c){this.lastQuery=c;if(this.mode=="local"){this.selectedIndex=-1;if(b){this.store.clearFilter()}else{this.store.filter(this.displayField,c)}this.onLoad()}else{this.store.baseParams[this.queryParam]=c;this.store.load({params:this.getParams(c)});this.expand()}}else{this.selectedIndex=-1;this.onLoad()}}},getParams:function(a){var b={},c=this.store.paramNames;if(this.pageSize){b[c.start]=0;b[c.limit]=this.pageSize}return b},collapse:function(){if(!this.isExpanded()){return}this.list.hide();Ext.getDoc().un("mousewheel",this.collapseIf,this);Ext.getDoc().un("mousedown",this.collapseIf,this);this.fireEvent("collapse",this)},collapseIf:function(a){if(!this.isDestroyed&&!a.within(this.wrap)&&!a.within(this.list)){this.collapse()}},expand:function(){if(this.isExpanded()||!this.hasFocus){return}if(this.title||this.pageSize){this.assetHeight=0;if(this.title){this.assetHeight+=this.header.getHeight()}if(this.pageSize){this.assetHeight+=this.footer.getHeight()}}if(this.bufferSize){this.doResize(this.bufferSize);delete this.bufferSize}this.list.alignTo.apply(this.list,[this.el].concat(this.listAlign));this.list.setZIndex(this.getZIndex());this.list.show();if(Ext.isGecko2){this.innerList.setOverflow("auto")}this.mon(Ext.getDoc(),{scope:this,mousewheel:this.collapseIf,mousedown:this.collapseIf});this.fireEvent("expand",this)},onTriggerClick:function(){if(this.readOnly||this.disabled){return}if(this.isExpanded()){this.collapse();this.el.focus()}else{this.onFocus({});if(this.triggerAction=="all"){this.doQuery(this.allQuery,true)}else{this.doQuery(this.getRawValue())}this.el.focus()}}});Ext.reg("combo",Ext.form.ComboBox);