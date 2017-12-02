(function(){var b="beforerequest",e="requestcomplete",d="requestexception",g=undefined,c="load",h="POST",a="GET",f=window;Ext.data.Connection=function(i){Ext.apply(this,i);this.addEvents(b,e,d);Ext.data.Connection.superclass.constructor.call(this)};Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,disableCachingParam:"_dc",request:function(m){var r=this;if(r.fireEvent(b,r,m)){if(m.el){if(!Ext.isEmpty(m.indicatorText)){r.indicatorText='<div class="loading-indicator">'+m.indicatorText+"</div>"}if(r.indicatorText){Ext.getDom(m.el).innerHTML=r.indicatorText}m.success=(Ext.isFunction(m.success)?m.success:function(){}).createInterceptor(function(o){Ext.getDom(m.el).innerHTML=o.responseText})}var k=m.params,j=m.url||r.url,i,n={success:r.handleResponse,failure:r.handleFailure,scope:r,argument:{options:m},timeout:Ext.num(m.timeout,r.timeout)},l,s;if(Ext.isFunction(k)){k=k.call(m.scope||f,m)}k=Ext.urlEncode(r.extraParams,Ext.isObject(k)?Ext.urlEncode(k):k);if(Ext.isFunction(j)){j=j.call(m.scope||f,m)}if((l=Ext.getDom(m.form))){j=j||l.action;if(m.isUpload||(/multipart\/form-data/i.test(l.getAttribute("enctype")))){return r.doFormUpload.call(r,m,k,j)}s=Ext.lib.Ajax.serializeForm(l);k=k?(k+"&"+s):s}i=m.method||r.method||((k||m.xmlData||m.jsonData)?h:a);if(i===a&&(r.disableCaching&&m.disableCaching!==false)||m.disableCaching===true){var q=m.disableCachingParam||r.disableCachingParam;j=Ext.urlAppend(j,q+"="+(new Date().getTime()))}m.headers=Ext.applyIf(m.headers||{},r.defaultHeaders||{});if(m.autoAbort===true||r.autoAbort){r.abort()}if((i==a||m.xmlData||m.jsonData)&&k){j=Ext.urlAppend(j,k);k=""}return(r.transId=Ext.lib.Ajax.request(i,j,n,k,m))}else{return m.callback?m.callback.apply(m.scope,[m,g,g]):null}},isLoading:function(i){return i?Ext.lib.Ajax.isCallInProgress(i):!!this.transId},abort:function(i){if(i||this.isLoading()){Ext.lib.Ajax.abort(i||this.transId)}},handleResponse:function(i){this.transId=false;var j=i.argument.options;i.argument=j?j.argument:null;this.fireEvent(e,this,i,j);if(j.success){j.success.call(j.scope,i,j)}if(j.callback){j.callback.call(j.scope,j,true,i)}},handleFailure:function(i,k){this.transId=false;var j=i.argument.options;i.argument=j?j.argument:null;this.fireEvent(d,this,i,j,k);if(j.failure){j.failure.call(j.scope,i,j)}if(j.callback){j.callback.call(j.scope,j,false,i)}},doFormUpload:function(p,i,j){var k=Ext.id(),u=document,q=u.createElement("iframe"),l=Ext.getDom(p.form),t=[],s,n="multipart/form-data",m={target:l.target,method:l.method,encoding:l.encoding,enctype:l.enctype,action:l.action};Ext.fly(q).set({id:k,name:k,cls:"x-hidden",src:Ext.SSL_SECURE_URL});u.body.appendChild(q);if(Ext.isIE){document.frames[k].name=k}Ext.fly(l).set({target:k,method:h,enctype:n,encoding:n,action:j||m.action});Ext.iterate(Ext.urlDecode(i,false),function(w,o){s=u.createElement("input");Ext.fly(s).set({type:"hidden",value:o,name:w});l.appendChild(s);t.push(s)});function r(){var w=this,v={responseText:"",responseXML:null,argument:p.argument},z,y;try{z=q.contentWindow.document||q.contentDocument||f.frames[k].document;if(z){if(z.body){if(/textarea/i.test((y=z.body.firstChild||{}).tagName)){v.responseText=y.value}else{v.responseText=z.body.innerHTML}}v.responseXML=z.XMLDocument||z}}catch(x){}Ext.EventManager.removeListener(q,c,r,w);w.fireEvent(e,w,v,p);function o(C,B,A){if(Ext.isFunction(C)){C.apply(B,A)}}o(p.success,p.scope,[v,p]);o(p.callback,p.scope,[p,true,v]);if(!w.debugUploads){setTimeout(function(){Ext.removeNode(q)},100)}}Ext.EventManager.on(q,c,r,this);l.submit();Ext.fly(l).set(m);Ext.each(t,function(o){Ext.removeNode(o)})}})})();Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(a){return Ext.lib.Ajax.serializeForm(a)}});