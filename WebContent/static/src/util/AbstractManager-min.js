Ext.AbstractManager=Ext.extend(Object,{typeName:"type",constructor:function(a){Ext.apply(this,a||{});this.all=new Ext.util.MixedCollection();this.types={}},get:function(a){return this.all.get(a)},register:function(a){this.all.add(a)},unregister:function(a){this.all.remove(a)},registerType:function(b,a){this.types[b]=a;a[this.typeName]=b},isRegistered:function(a){return this.types[a]!==undefined},create:function(a,d){var b=a[this.typeName]||a.type||d,c=this.types[b];if(c==undefined){throw new Error(String.format("The '{0}' type has not been registered with this manager",b))}return new c(a)},onAvailable:function(d,c,b){var a=this.all;a.on("add",function(e,f){if(f.id==d){c.call(b||f,f);a.un("add",c,b)}})}});