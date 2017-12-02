Ext.direct.PollingProvider=Ext.extend(Ext.direct.JsonProvider,{priority:3,interval:3000,constructor:function(a){Ext.direct.PollingProvider.superclass.constructor.call(this,a);this.addEvents("beforepoll","poll")},isConnected:function(){return !!this.pollTask},connect:function(){if(this.url&&!this.pollTask){this.pollTask=Ext.TaskMgr.start({run:function(){if(this.fireEvent("beforepoll",this)!==false){if(typeof this.url=="function"){this.url(this.baseParams)}else{Ext.Ajax.request({url:this.url,callback:this.onData,scope:this,params:this.baseParams})}}},interval:this.interval,scope:this});this.fireEvent("connect",this)}else{if(!this.url){throw"Error initializing PollingProvider, no url configured."}}},disconnect:function(){if(this.pollTask){Ext.TaskMgr.stop(this.pollTask);delete this.pollTask;this.fireEvent("disconnect",this)}},onData:function(d,h,g){if(h){var c=this.getEvents(g);for(var b=0,a=c.length;b<a;b++){var f=c[b];this.fireEvent("data",this,f)}}else{var f=new Ext.Direct.ExceptionEvent({data:f,code:Ext.Direct.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:g});this.fireEvent("data",this,f)}}});Ext.Direct.PROVIDERS.polling=Ext.direct.PollingProvider;