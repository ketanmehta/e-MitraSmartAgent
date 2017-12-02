/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.CalendarListMenu=Ext.extend(Ext.menu.Menu,{hideOnClick:true,ignoreParentClicks:true,cls:"x-calendar-list-menu",displayOnlyThisCalendarText:"Display only this calendar",enableScrolling:false,initComponent:function(){this.addEvents("showcalendar","hidecalendar","radiocalendar","colorchange");Ext.apply(this,{items:[{text:this.displayOnlyThisCalendarText,iconCls:"extensible-cal-icon-cal-show",handler:this.handleRadioCalendarClick.createDelegate(this)},"-",{xtype:"extensible.calendarcolorpalette",handler:this.handleColorSelect.createDelegate(this)}]});Ext.ensible.cal.CalendarListMenu.superclass.initComponent.call(this)},afterRender:function(){Ext.ensible.cal.CalendarListMenu.superclass.afterRender.call(this);this.palette=this.findByType("extensible.calendarcolorpalette")[0];if(this.colorId){this.palette.select(this.colorId,true)}},handleRadioCalendarClick:function(b,a){this.fireEvent("radiocalendar",this,this.calendarId)},handleColorSelect:function(b,a){this.fireEvent("colorchange",this,this.calendarId,a,this.colorId);this.colorId=a;this.menuHide()},setCalendar:function(b,a){this.calendarId=b;this.colorId=a;if(this.rendered){this.palette.select(a,true)}return this},menuHide:function(){if(this.hideOnClick){this.hide(true)}}});Ext.reg("extensible.calendarlistmenu",Ext.ensible.cal.CalendarListMenu);