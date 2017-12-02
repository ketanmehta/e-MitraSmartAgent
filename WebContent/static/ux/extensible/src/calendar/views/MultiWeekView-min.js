/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.MultiWeekView=Ext.extend(Ext.ensible.cal.MonthView,{weekCount:2,moveNext:function(){return this.moveWeeks(this.weekCount,true)},movePrev:function(){return this.moveWeeks(-this.weekCount,true)}});Ext.reg("extensible.multiweekview",Ext.ensible.cal.MultiWeekView);