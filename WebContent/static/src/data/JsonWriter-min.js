Ext.data.JsonWriter=Ext.extend(Ext.data.DataWriter,{encode:true,encodeDelete:false,constructor:function(a){Ext.data.JsonWriter.superclass.constructor.call(this,a)},render:function(c,d,b){if(this.encode===true){Ext.apply(c,d);c[this.meta.root]=Ext.encode(b)}else{var a=Ext.apply({},d);a[this.meta.root]=b;c.jsonData=a}},createRecord:function(a){return this.toHash(a)},updateRecord:function(a){return this.toHash(a)},destroyRecord:function(b){if(this.encodeDelete){var a={};a[this.meta.idProperty]=b.id;return a}else{return b.id}}});