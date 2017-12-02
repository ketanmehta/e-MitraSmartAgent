Ext.data.HttpProxy=function(a){Ext.data.HttpProxy.superclass.constructor.call(this,a);this.conn=a;this.conn.url=null;this.useAjax=!a||!a.events;var c=Ext.data.Api.actions;this.activeRequest={};for(var b in c){this.activeRequest[c[b]]=undefined}};Ext.extend(Ext.data.HttpProxy,Ext.data.DataProxy,{getConnection:function(){return this.useAjax?Ext.Ajax:this.conn},setUrl:function(a,b){this.conn.url=a;if(b===true){this.url=a;this.api=null;Ext.data.Api.prepare(this)}},doRequest:function(f,d,h,c,b,e,a){var g={method:(this.api[f])?this.api[f]["method"]:undefined,request:{callback:b,scope:e,arg:a},reader:c,callback:this.createCallback(f,d),scope:this};if(h.jsonData){g.jsonData=h.jsonData}else{if(h.xmlData){g.xmlData=h.xmlData}else{g.params=h||{}}}this.conn.url=this.buildUrl(f,d);if(this.useAjax){Ext.applyIf(g,this.conn);if(f==Ext.data.Api.actions.read&&this.activeRequest[f]){Ext.Ajax.abort(this.activeRequest[f])}this.activeRequest[f]=Ext.Ajax.request(g)}else{this.conn.request(g)}this.conn.url=null},createCallback:function(b,a){return function(e,d,c){this.activeRequest[b]=undefined;if(!d){if(b===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,e,c)}this.fireEvent("exception",this,"response",b,e,c);e.request.callback.call(e.request.scope,null,e.request.arg,false);return}if(b===Ext.data.Api.actions.read){this.onRead(b,e,c)}else{this.onWrite(b,e,c,a)}}},onRead:function(d,g,b){var a;try{a=g.reader.read(b)}catch(f){this.fireEvent("loadexception",this,g,b,f);this.fireEvent("exception",this,"response",d,g,b,f);g.request.callback.call(g.request.scope,null,g.request.arg,false);return}if(a.success===false){this.fireEvent("loadexception",this,g,b);var c=g.reader.readResponse(d,b);this.fireEvent("exception",this,"remote",d,g,c,null)}else{this.fireEvent("load",this,g,g.request.arg)}g.request.callback.call(g.request.scope,a,g.request.arg,a.success)},onWrite:function(f,h,c,b){var a=h.reader;var d;try{d=a.readResponse(f,c)}catch(g){this.fireEvent("exception",this,"response",f,h,c,g);h.request.callback.call(h.request.scope,null,h.request.arg,false);return}if(d.success===true){this.fireEvent("write",this,f,d.data,d,b,h.request.arg)}else{this.fireEvent("exception",this,"remote",f,h,d,b)}h.request.callback.call(h.request.scope,d.data,d,d.success)},destroy:function(){if(!this.useAjax){this.conn.abort()}else{if(this.activeRequest){var b=Ext.data.Api.actions;for(var a in b){if(this.activeRequest[b[a]]){Ext.Ajax.abort(this.activeRequest[b[a]])}}}}Ext.data.HttpProxy.superclass.destroy.call(this)}});