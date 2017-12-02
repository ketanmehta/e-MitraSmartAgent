Ext.chart.Chart=Ext.extend(Ext.FlashComponent,{refreshBuffer:100,chartStyle:{padding:10,animationEnabled:true,font:{name:"Tahoma",color:4473924,size:11},dataTip:{padding:5,border:{color:10075112,size:1},background:{color:14346230,alpha:0.9},font:{name:"Tahoma",color:1393291,size:10,bold:true}}},extraStyle:null,seriesStyles:null,disableCaching:Ext.isIE||Ext.isOpera,disableCacheParam:"_dc",initComponent:function(){Ext.chart.Chart.superclass.initComponent.call(this);if(!this.url){this.url=Ext.chart.Chart.CHART_URL}if(this.disableCaching){this.url=Ext.urlAppend(this.url,String.format("{0}={1}",this.disableCacheParam,new Date().getTime()))}this.addEvents("itemmouseover","itemmouseout","itemclick","itemdoubleclick","itemdragstart","itemdrag","itemdragend","beforerefresh","refresh");this.store=Ext.StoreMgr.lookup(this.store)},setStyle:function(a,b){this.swf.setStyle(a,Ext.encode(b))},setStyles:function(a){this.swf.setStyles(Ext.encode(a))},setSeriesStyles:function(b){this.seriesStyles=b;var a=[];Ext.each(b,function(c){a.push(Ext.encode(c))});this.swf.setSeriesStyles(a)},setCategoryNames:function(a){this.swf.setCategoryNames(a)},setLegendRenderer:function(c,b){var a=this;b=b||a;a.removeFnProxy(a.legendFnName);a.legendFnName=a.createFnProxy(function(d){return c.call(b,d)});a.swf.setLegendLabelFunction(a.legendFnName)},setTipRenderer:function(c,b){var a=this;b=b||a;a.removeFnProxy(a.tipFnName);a.tipFnName=a.createFnProxy(function(g,e,f){var d=a.store.getAt(e);return c.call(b,a,d,e,f)});a.swf.setDataTipFunction(a.tipFnName)},setSeries:function(a){this.series=a;this.refresh()},bindStore:function(a,b){if(!b&&this.store){if(a!==this.store&&this.store.autoDestroy){this.store.destroy()}else{this.store.un("datachanged",this.refresh,this);this.store.un("add",this.delayRefresh,this);this.store.un("remove",this.delayRefresh,this);this.store.un("update",this.delayRefresh,this);this.store.un("clear",this.refresh,this)}}if(a){a=Ext.StoreMgr.lookup(a);a.on({scope:this,datachanged:this.refresh,add:this.delayRefresh,remove:this.delayRefresh,update:this.delayRefresh,clear:this.refresh})}this.store=a;if(a&&!b){this.refresh()}},onSwfReady:function(b){Ext.chart.Chart.superclass.onSwfReady.call(this,b);var a;this.swf.setType(this.type);if(this.chartStyle){this.setStyles(Ext.apply({},this.extraStyle,this.chartStyle))}if(this.categoryNames){this.setCategoryNames(this.categoryNames)}if(this.tipRenderer){a=this.getFunctionRef(this.tipRenderer);this.setTipRenderer(a.fn,a.scope)}if(this.legendRenderer){a=this.getFunctionRef(this.legendRenderer);this.setLegendRenderer(a.fn,a.scope)}if(!b){this.bindStore(this.store,true)}this.refresh.defer(10,this)},delayRefresh:function(){if(!this.refreshTask){this.refreshTask=new Ext.util.DelayedTask(this.refresh,this)}this.refreshTask.delay(this.refreshBuffer)},refresh:function(){if(this.fireEvent("beforerefresh",this)!==false){var l=false;var h=[],c=this.store.data.items;for(var f=0,k=c.length;f<k;f++){h[f]=c[f].data}var e=[];var d=0;var m=null;var g=0;if(this.series){d=this.series.length;for(g=0;g<d;g++){m=this.series[g];var b={};for(var a in m){if(a=="style"&&m.style!==null){b.style=Ext.encode(m.style);l=true}else{b[a]=m[a]}}e.push(b)}}if(d>0){for(g=0;g<d;g++){m=e[g];if(!m.type){m.type=this.type}m.dataProvider=h}}else{e.push({type:this.type,dataProvider:h})}this.swf.setDataProvider(e);if(this.seriesStyles){this.setSeriesStyles(this.seriesStyles)}this.fireEvent("refresh",this)}},createFnProxy:function(a){var b="extFnProxy"+(++Ext.chart.Chart.PROXY_FN_ID);Ext.chart.Chart.proxyFunction[b]=a;return"Ext.chart.Chart.proxyFunction."+b},removeFnProxy:function(a){if(!Ext.isEmpty(a)){a=a.replace("Ext.chart.Chart.proxyFunction.","");delete Ext.chart.Chart.proxyFunction[a]}},getFunctionRef:function(a){if(Ext.isFunction(a)){return{fn:a,scope:this}}else{return{fn:a.fn,scope:a.scope||this}}},onDestroy:function(){if(this.refreshTask&&this.refreshTask.cancel){this.refreshTask.cancel()}Ext.chart.Chart.superclass.onDestroy.call(this);this.bindStore(null);this.removeFnProxy(this.tipFnName);this.removeFnProxy(this.legendFnName)}});Ext.reg("chart",Ext.chart.Chart);Ext.chart.Chart.PROXY_FN_ID=0;Ext.chart.Chart.proxyFunction={};Ext.chart.Chart.CHART_URL="http://yui.yahooapis.com/2.8.2/build/charts/assets/charts.swf";Ext.chart.PieChart=Ext.extend(Ext.chart.Chart,{type:"pie",onSwfReady:function(a){Ext.chart.PieChart.superclass.onSwfReady.call(this,a);this.setDataField(this.dataField);this.setCategoryField(this.categoryField)},setDataField:function(a){this.dataField=a;this.swf.setDataField(a)},setCategoryField:function(a){this.categoryField=a;this.swf.setCategoryField(a)}});Ext.reg("piechart",Ext.chart.PieChart);Ext.chart.CartesianChart=Ext.extend(Ext.chart.Chart,{onSwfReady:function(a){Ext.chart.CartesianChart.superclass.onSwfReady.call(this,a);this.labelFn=[];if(this.xField){this.setXField(this.xField)}if(this.yField){this.setYField(this.yField)}if(this.xAxis){this.setXAxis(this.xAxis)}if(this.xAxes){this.setXAxes(this.xAxes)}if(this.yAxis){this.setYAxis(this.yAxis)}if(this.yAxes){this.setYAxes(this.yAxes)}if(Ext.isDefined(this.constrainViewport)){this.swf.setConstrainViewport(this.constrainViewport)}},setXField:function(a){this.xField=a;this.swf.setHorizontalField(a)},setYField:function(a){this.yField=a;this.swf.setVerticalField(a)},setXAxis:function(a){this.xAxis=this.createAxis("xAxis",a);this.swf.setHorizontalAxis(this.xAxis)},setXAxes:function(c){var b;for(var a=0;a<c.length;a++){b=this.createAxis("xAxis"+a,c[a]);this.swf.setHorizontalAxis(b)}},setYAxis:function(a){this.yAxis=this.createAxis("yAxis",a);this.swf.setVerticalAxis(this.yAxis)},setYAxes:function(c){var b;for(var a=0;a<c.length;a++){b=this.createAxis("yAxis"+a,c[a]);this.swf.setVerticalAxis(b)}},createAxis:function(b,d){var e=Ext.apply({},d),c,a;if(this[b]){a=this[b].labelFunction;this.removeFnProxy(a);this.labelFn.remove(a)}if(e.labelRenderer){c=this.getFunctionRef(e.labelRenderer);e.labelFunction=this.createFnProxy(function(f){return c.fn.call(c.scope,f)});delete e.labelRenderer;this.labelFn.push(e.labelFunction)}if(b.indexOf("xAxis")>-1&&e.position=="left"){e.position="bottom"}return e},onDestroy:function(){Ext.chart.CartesianChart.superclass.onDestroy.call(this);Ext.each(this.labelFn,function(a){this.removeFnProxy(a)},this)}});Ext.reg("cartesianchart",Ext.chart.CartesianChart);Ext.chart.LineChart=Ext.extend(Ext.chart.CartesianChart,{type:"line"});Ext.reg("linechart",Ext.chart.LineChart);Ext.chart.ColumnChart=Ext.extend(Ext.chart.CartesianChart,{type:"column"});Ext.reg("columnchart",Ext.chart.ColumnChart);Ext.chart.StackedColumnChart=Ext.extend(Ext.chart.CartesianChart,{type:"stackcolumn"});Ext.reg("stackedcolumnchart",Ext.chart.StackedColumnChart);Ext.chart.BarChart=Ext.extend(Ext.chart.CartesianChart,{type:"bar"});Ext.reg("barchart",Ext.chart.BarChart);Ext.chart.StackedBarChart=Ext.extend(Ext.chart.CartesianChart,{type:"stackbar"});Ext.reg("stackedbarchart",Ext.chart.StackedBarChart);Ext.chart.Axis=function(a){Ext.apply(this,a)};Ext.chart.Axis.prototype={type:null,orientation:"horizontal",reverse:false,labelFunction:null,hideOverlappingLabels:true,labelSpacing:2};Ext.chart.NumericAxis=Ext.extend(Ext.chart.Axis,{type:"numeric",minimum:NaN,maximum:NaN,majorUnit:NaN,minorUnit:NaN,snapToUnits:true,alwaysShowZero:true,scale:"linear",roundMajorUnit:true,calculateByLabelSize:true,position:"left",adjustMaximumByMajorUnit:true,adjustMinimumByMajorUnit:true});Ext.chart.TimeAxis=Ext.extend(Ext.chart.Axis,{type:"time",minimum:null,maximum:null,majorUnit:NaN,majorTimeUnit:null,minorUnit:NaN,minorTimeUnit:null,snapToUnits:true,stackingEnabled:false,calculateByLabelSize:true});Ext.chart.CategoryAxis=Ext.extend(Ext.chart.Axis,{type:"category",categoryNames:null,calculateCategoryCount:false});Ext.chart.Series=function(a){Ext.apply(this,a)};Ext.chart.Series.prototype={type:null,displayName:null};Ext.chart.CartesianSeries=Ext.extend(Ext.chart.Series,{xField:null,yField:null,showInLegend:true,axis:"primary"});Ext.chart.ColumnSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"column"});Ext.chart.LineSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"line"});Ext.chart.BarSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"bar"});Ext.chart.PieSeries=Ext.extend(Ext.chart.Series,{type:"pie",dataField:null,categoryField:null});