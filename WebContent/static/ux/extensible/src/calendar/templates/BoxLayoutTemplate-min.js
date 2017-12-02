/*!
 * Extensible 1.0.2
 * Copyright(c) 2010-2012 Extensible, LLC
 * licensing@ext.ensible.com
 * http://ext.ensible.com
 */
Ext.ensible.cal.BoxLayoutTemplate=function(a){Ext.apply(this,a);var b=this.showWeekLinks?'<div id="{weekLinkId}" class="ext-cal-week-link">{weekNum}</div>':"";Ext.ensible.cal.BoxLayoutTemplate.superclass.constructor.call(this,'<tpl for="weeks">','<div id="{[this.id]}-wk-{[xindex-1]}" class="ext-cal-wk-ct" style="top:{[this.getRowTop(xindex, xcount)]}%; height:{[this.getRowHeight(xcount)]}%;">',b,'<table class="ext-cal-bg-tbl" cellpadding="0" cellspacing="0">',"<tbody>","<tr>",'<tpl for=".">','<td id="{[this.id]}-day-{date:date("Ymd")}" class="{cellCls}">&#160;</td>',"</tpl>","</tr>","</tbody>","</table>",'<table class="ext-cal-evt-tbl" cellpadding="0" cellspacing="0">',"<tbody>","<tr>",'<tpl for=".">','<td id="{[this.id]}-ev-day-{date:date("Ymd")}" class="{titleCls}"><div>{title}</div></td>',"</tpl>","</tr>","</tbody>","</table>","</div>","</tpl>",{getRowTop:function(c,d){return((c-1)*(100/d))},getRowHeight:function(c){return 100/c}})};Ext.extend(Ext.ensible.cal.BoxLayoutTemplate,Ext.XTemplate,{firstWeekDateFormat:"D j",otherWeeksDateFormat:"j",singleDayDateFormat:"l, F j, Y",multiDayFirstDayFormat:"M j, Y",multiDayMonthStartFormat:"M j",applyTemplate:function(m){Ext.apply(this,m);var j=0,t="",f=true,u=false,h=false,s=false,a=false,l=false,e=m.weekendCls,n=m.prevMonthCls,r=m.nextMonthCls,b=m.todayCls,g=[[]],q=new Date().clearTime(),k=this.viewStart.clone(),c=this.startDate.getMonth();for(;j<this.weekCount||this.weekCount==-1;j++){if(k>this.viewEnd){break}g[j]=[];for(var p=0;p<this.dayCount;p++){u=k.getTime()===q.getTime();h=f||(k.getDate()==1);s=(k.getMonth()<c)&&this.weekCount==-1;a=(k.getMonth()>c)&&this.weekCount==-1;l=k.getDay()%6===0;if(k.getDay()==1){g[j].weekNum=this.showWeekNumbers?k.format("W"):"&#160;";g[j].weekLinkId="ext-cal-week-"+k.format("Ymd")}if(h){if(u){t=this.getTodayText()}else{t=k.format(this.dayCount==1?this.singleDayDateFormat:(f?this.multiDayFirstDayFormat:this.multiDayMonthStartFormat))}}else{var i=(j==0&&this.showHeader!==true)?this.firstWeekDateFormat:this.otherWeeksDateFormat;t=u?this.getTodayText():k.format(i)}g[j].push({title:t,date:k.clone(),titleCls:"ext-cal-dtitle "+(u?" ext-cal-dtitle-today":"")+(j==0?" ext-cal-dtitle-first":"")+(s?" ext-cal-dtitle-prev":"")+(a?" ext-cal-dtitle-next":""),cellCls:"ext-cal-day "+(u?" "+b:"")+(p==0?" ext-cal-day-first":"")+(s?" "+n:"")+(a?" "+r:"")+(l&&e?" "+e:"")});k=k.add(Date.DAY,1);f=false}}return Ext.ensible.cal.BoxLayoutTemplate.superclass.applyTemplate.call(this,{weeks:g})},getTodayText:function(){var b=Ext.ensible.Date.use24HourTime?"G:i ":"g:ia ",c=this.showTodayText!==false?this.todayText:"",a=this.showTime!==false?' <span id="'+this.id+'-clock" class="ext-cal-dtitle-time" aria-live="off">'+new Date().format(b)+"</span>":"",d=c.length>0||a.length>0?" &#8212; ":"";if(this.dayCount==1){return new Date().format(this.singleDayDateFormat)+d+c+a}fmt=this.weekCount==1?this.firstWeekDateFormat:this.otherWeeksDateFormat;return c.length>0?c+a:new Date().format(fmt)+a}});Ext.ensible.cal.BoxLayoutTemplate.prototype.apply=Ext.ensible.cal.BoxLayoutTemplate.prototype.applyTemplate;