/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.MultiDayView=Ext.extend(Ext.ensible.cal.DayView,{dayCount:3,startDayIsStatic:false,moveNext:function(a){return this.moveDays(this.startDayIsStatic?7:this.dayCount,a)},movePrev:function(a){return this.moveDays(this.startDayIsStatic?-7:-this.dayCount,a)}});Ext.reg("extensible.multidayview",Ext.ensible.cal.MultiDayView);