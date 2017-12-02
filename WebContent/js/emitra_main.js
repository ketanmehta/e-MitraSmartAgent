
Ext.ns("eMitra.SmartAgent");
eMitra.SmartAgent.Utils = {
		encrypt : function(input){
			var returnString = [];
			for(var i=0; i<input.length; i++){
				returnString[i] = input[i].charCodeAt(0);
			}
			return returnString.join('#');
		},
		decrypt : function(input){
			var returnString = "";
			var input = input.split("#");
			for(var i=0; i<input.length; i++){
				returnString += String.fromCharCode(Number(input[i]));
			}
			return returnString;
		}
}

eMitra.SmartAgent.ChatBot = {
	separator : ' : ',
	sender : '<b>You</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
	init	: function(){		

		var win = new Ext.Window({
			title	: "eMitra Smart Agent 24x7 Service - An initiative by Govt. of Rajasthan",
			width	: 700,
			height	: 500,
			layout	: "fit",
			iconCls : 'application',
			id :      'mainWindow',
			border	: false,
			items	: {xtype:"chatclient"}
		});
		win.show();
		eMitra.SmartAgent.ChatBot.sendMessage('Hi', true);
	},
	sendMessage : function(message, skipUpdation){
		var that = this;
		if(message.search('exit') != -1){
			var button = Ext.getCmp('sendButton');
			if(button){
				button.sendTranscript = true;
				button.setText('Send Transcript');
				Ext.getCmp('chatArea').setDisabled(true);
				Ext.getCmp('messageArea').setDisabled(true);
				return ;
			}
		}
		maskBody();
		var msg = message.substr(message.lastIndexOf(":") + 1).trim();
		Ext.Ajax.request({
			url : applicationContext + '/eMitraAgent',
			method : 'POST',
			params : {
				query : eMitra.SmartAgent.Utils.encrypt(msg)
			},
			success : function(response, request) {
				unmaskBody();
				new Audio('static/notification.wav').play();
				that.updateMessage(eMitra.SmartAgent.Utils.decrypt(response.responseText));
				var chatArea = Ext.getCmp('chatArea');
				if(chatArea){
					var d = chatArea.el.dom;
					d.scrollTop = d.scrollHeight - d.offsetHeight;
				}
			},
			failure : function(response, request) {
				unmaskBody();
			}
		});
		this.updateMessage(message, skipUpdation);
	},
	updateMessage : function(message, skipUpdation){
		if(skipUpdation){
			return ;
		}
		var chatArea = Ext.getCmp('chatArea');
		if(chatArea){
			var currentValue = chatArea.getValue();
			chatArea.setValue(currentValue + " <hr/> \n" + message);
			var d = chatArea.el.dom;
			d.scrollTop = d.scrollHeight - d.offsetHeight;
		}
	},
	sendTranscript : function(){
		var that = this;
		Ext.MessageBox.prompt('eMitra Agent - Send transcript on mail', 'Please enter your mail address:', function(btn, text){
		    if (btn == 'ok'){
		    	var recipientMail = text;
		    	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(recipientMail)){  
		    		maskBody();
		    		Ext.Ajax.request({
		    			url : applicationContext + '/eMitraSendTranscript',
		    			method : 'POST',
		    			params : {
		    				recipientMail : recipientMail,
		    				bodyContent : Ext.getCmp('chatArea').getValue()
		    			},
		    			success : function(response, request) {
		    				unmaskBody();
		    				success('Mail sent successfully!');
		    			},
		    			failure : function(response, request) {
		    				unmaskBody();
		    			}
		    		});
		    	}
		    	else{
		    		error('Please enter valid email id');
		    	}
		    }
		});
	}
}

Ext.onReady(eMitra.SmartAgent.ChatBot.init,eMitra.SmartAgent.ChatBot);



/**
 * @class eMitra.SmartAgent.ChatClient
 * @extends Ext.Panel
 * Description
 */
eMitra.SmartAgent.ChatClient = Ext.extend(Ext.Panel, {
	username	: eMitra.SmartAgent.ChatBot.sender,
	avatar		: "http://www.gravatar.com/avatar/ketanmehta",
	size		: 30,
	layout		: "fit",
	border		: false,
	
    initComponent: function() {
        this.items = [this.createChat()];
        eMitra.SmartAgent.ChatClient.superclass.initComponent.apply(this, arguments);
    },
	onMessage	: function(message){
		if(message.updateList){
			this.updateList(message.users);
		}else{
			this.addMessage(message);
		}
	},
	addMessage	: function(message){
		var body = this.content.body;
		
		this.content.add({
			xtype	: "box",
			cls		: "chat-user-msg clearfix",
			html	: '<img src="'+this.avatar.replace("{HASH}",eMitra.SmartAgent.MD5.encode(message.email))+'?s='+this.size+'" />'+Ext.util.Format.stripTags(message.message)
		});
		this.content.doLayout();
		body.scrollTo('top',body.dom.scrollHeight);
	},
	sendMessage	: function(textarea,event){
		if(event.getKey() === event.ENTER){
			var val = this.area.getValue();
			if(val){
				eMitra.SmartAgent.ChatBot.sendMessage(this.username + eMitra.SmartAgent.ChatBot.separator + val);
				this.area.setValue("");
			}
		}
	},
	updateList : function(users){
		this.usersList.removeAll();
		for(var i=0,len=users.length;i<len;i++){
			var user = users[i];
			this.usersList.add({
				xtype	: "container",
				cls		: "clearfix chat-user-list-item",
				html	: '<img src="'+this.avatar.replace("{HASH}",eMitra.SmartAgent.MD5.encode(user.email))+'?s=20" style="float:left;margin-right:5px;" />'+Ext.util.Format.stripTags(user.username)
			});
		}
		this.usersList.doLayout();
	},
	
	onDisconnect	: function(){
		Ext.Msg.alert("You have been disconnected!");
	},
	
	createChat	: function(){
		return {
			layout	: "border",
			border	: false,
			items 	: [this.createUsers(),this.createMessage(),this.createCenter()]
		}
	},
	
	createUsers	: function(){
		this.usersList = new Ext.Panel({
			region	: "east",
			layout	: "auto",
			autoScroll:true,
			width	: 125,
			padding	: 5,
			cls		: "chat-user-list",
			collapsible : false,
			items : [
				{
					xtype : 'displayfield',
					html : '<img style="vertical-align: middle;" src="images/favicon.ico"></img><span style="color:green"> &nbsp;<u>eMitra Agent</u></span>'
				}
			]
		});
		return this.usersList;
	},
	
	createMessage	: function(){
		this.area = new Ext.form.TextField({
			id : 'messageArea',
			width : 620,
			height : 48,
			emptyText : 'Type your query...',
			listeners	: {
				scope		: this,
				specialkey	: this.sendMessage
			}
		});
		return {
			region	: "south",
			layout	: "fit",
			height	: 50,
			collapseMode: "mini",
			items	: [
					{
						xtype : 'compositefield',
						items : [
							this.area,
							{
								xtype : 'button',
								style : 'margin-top:12px;',
								id : 'sendButton',
								text : 'Send',
								sendTranscript : false,
								handler : function(){
									if(!this.sendTranscript){
										var areaField = Ext.getCmp('messageArea');
										if(areaField && areaField.getValue() != "" && areaField.getValue().length > 0){
											eMitra.SmartAgent.ChatBot.sendMessage(areaField.getValue());
											areaField.setValue("");
										}
										else{
											error('Please enter response to continue.');
											return ;
										}
									}
									else{
										eMitra.SmartAgent.ChatBot.sendTranscript();
									}
								}
							}
						]
					}
				]
		}
	},
	
	createCenter	: function(){
		this.content = new Ext.Panel({
			region	: "center",
			cls		: "chat-main",
			items : [
				{
					xtype : 'displayfield',
					autoScroll:true,
					style : 'margin-left : 3px;',
					id : 'chatArea',
					width : 550,
					readOnly : true,
					height : 410,
					border : false,
				}
			]
		});
		return this.content;
	}
});

Ext.reg('chatclient', eMitra.SmartAgent.ChatClient);


Ext.ns("eMitra.SmartAgent");

eMitra.SmartAgent.MD5 = {
	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Copyright (C) Paul Johnston 1999 - 2000.
	 * Updated by Greg Holt 2000 - 2001.
	 * See http://pajhome.org.uk/site/legal.html for details.
	 */
	encode	: function(text){
		var hex_chr = "0123456789abcdef";
		function rhex(num){
		  str = "";
		  for(j = 0; j <= 3; j++)
		    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
		           hex_chr.charAt((num >> (j * 8)) & 0x0F);
		  return str;
		}

		/*
		 * Convert a string to a sequence of 16-word blocks, stored as an array.
		 * Append padding bits and the length, as described in the MD5 standard.
		 */
		function str2blks_MD5(str)
		{
		  nblk = ((str.length + 8) >> 6) + 1;
		  blks = new Array(nblk * 16);
		  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
		  for(i = 0; i < str.length; i++)
		    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
		  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
		  blks[nblk * 16 - 2] = str.length * 8;
		  return blks;
		}

		/*
		 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
		 * to work around bugs in some JS interpreters.
		 */
		function add(x, y)
		{
		  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		  return (msw << 16) | (lsw & 0xFFFF);
		}

		/*
		 * Bitwise rotate a 32-bit number to the left
		 */
		function rol(num, cnt)
		{
		  return (num << cnt) | (num >>> (32 - cnt));
		}

		/*
		 * These functions implement the basic operation for each round of the
		 * algorithm.
		 */
		function cmn(q, a, b, x, s, t)
		{
		  return add(rol(add(add(a, q), add(x, t)), s), b);
		}
		function ff(a, b, c, d, x, s, t)
		{
		  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		function gg(a, b, c, d, x, s, t)
		{
		  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		function hh(a, b, c, d, x, s, t)
		{
		  return cmn(b ^ c ^ d, a, b, x, s, t);
		}
		function ii(a, b, c, d, x, s, t)
		{
		  return cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		/*
		 * Take a string and return the hex representation of its MD5.
		 */
		function calcMD5(str)
		{
		  x = str2blks_MD5(str);
		  a =  1732584193;
		  b = -271733879;
		  c = -1732584194;
		  d =  271733878;

		  for(i = 0; i < x.length; i += 16)
		  {
		    olda = a;
		    oldb = b;
		    oldc = c;
		    oldd = d;

		    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
		    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
		    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
		    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		    c = ff(c, d, a, b, x[i+10], 17, -42063);
		    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
		    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		    d = ff(d, a, b, c, x[i+13], 12, -40341101);
		    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
		    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

		    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		    c = gg(c, d, a, b, x[i+11], 14,  643717713);
		    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
		    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
		    c = gg(c, d, a, b, x[i+15], 14, -660478335);
		    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
		    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
		    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
		    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
		    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		    b = gg(b, c, d, a, x[i+12], 20, -1926607734);

		    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
		    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
		    b = hh(b, c, d, a, x[i+14], 23, -35309556);
		    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
		    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
		    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
		    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
		    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
		    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
		    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		    d = hh(d, a, b, c, x[i+12], 11, -421815835);
		    c = hh(c, d, a, b, x[i+15], 16,  530742520);
		    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

		    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
		    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
		    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		    c = ii(c, d, a, b, x[i+10], 15, -1051523);
		    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		    d = ii(d, a, b, c, x[i+15], 10, -30611744);
		    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
		    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
		    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
		    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

		    a = add(a, olda);
		    b = add(b, oldb);
		    c = add(c, oldc);
		    d = add(d, oldd);
		  }
		  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
		}
		
		return calcMD5(text);
	}
}