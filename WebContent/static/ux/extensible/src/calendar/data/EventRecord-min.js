/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.EventRecord=Ext.extend(Ext.data.Record,{fields:new Ext.util.MixedCollection(false,function(a){return a.name})});Ext.ensible.cal.EventRecord.reconfigure=function(){var e=Ext.ensible.cal,f=e.EventMappings,d=e.EventRecord.prototype,b=[];for(prop in f){if(f.hasOwnProperty(prop)){b.push(f[prop])}}d.fields.clear();for(var c=0,a=b.length;c<a;c++){d.fields.add(new Ext.data.Field(b[c]))}return e.EventRecord};Ext.ensible.cal.EventRecord.reconfigure();