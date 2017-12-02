/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.CalendarRecord=Ext.extend(Ext.data.Record,{fields:new Ext.util.MixedCollection(false,function(a){return a.name})});Ext.ensible.cal.CalendarRecord.reconfigure=function(){var e=Ext.ensible.cal,f=e.CalendarMappings,d=e.CalendarRecord.prototype,b=[];for(prop in f){if(f.hasOwnProperty(prop)){b.push(f[prop])}}d.fields.clear();for(var c=0,a=b.length;c<a;c++){d.fields.add(new Ext.data.Field(b[c]))}return e.CalendarRecord};Ext.ensible.cal.CalendarRecord.reconfigure();