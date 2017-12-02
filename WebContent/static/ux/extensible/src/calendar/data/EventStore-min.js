/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.EventStore=Ext.extend(Ext.data.Store,{constructor:function(a){this.deferLoad=a.autoLoad;a.autoLoad=false;Ext.ensible.cal.EventStore.superclass.constructor.apply(this,arguments)},load:function(a){Ext.ensible.log("store load");if(a.params){delete this.initialParams}if(this.initialParams){a=Ext.isObject(a)?a:{};a.params=a.params||{};Ext.apply(a.params,this.initialParams);delete this.initialParams}Ext.ensible.cal.EventStore.superclass.load.call(this,a)}});Ext.reg("extensible.eventstore",Ext.ensible.cal.EventStore);