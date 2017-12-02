/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.DayHeaderTemplate=function(a){Ext.apply(this,a);this.allDayTpl=new Ext.ensible.cal.BoxLayoutTemplate(a);this.allDayTpl.compile();Ext.ensible.cal.DayHeaderTemplate.superclass.constructor.call(this,'<div class="ext-cal-hd-ct">','<table class="ext-cal-hd-days-tbl" cellspacing="0" cellpadding="0">',"<tbody>","<tr>",'<td class="ext-cal-gutter"></td>','<td class="ext-cal-hd-days-td"><div class="ext-cal-hd-ad-inner">{allDayTpl}</div></td>','<td class="ext-cal-gutter-rt"></td>',"</tr>","</tbody>","</table>","</div>")};Ext.extend(Ext.ensible.cal.DayHeaderTemplate,Ext.XTemplate,{applyTemplate:function(a){return Ext.ensible.cal.DayHeaderTemplate.superclass.applyTemplate.call(this,{allDayTpl:this.allDayTpl.apply(a)})}});Ext.ensible.cal.DayHeaderTemplate.prototype.apply=Ext.ensible.cal.DayHeaderTemplate.prototype.applyTemplate;