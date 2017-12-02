function error(message){
	Ext.getCmp('mainWindow').getEl().unmask();
	unmaskBody();
	Ext.Msg.show({
				title : 'Error',
				msg : message,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.ERROR
			});
}

function info(mssg) {
	Ext.getCmp('mainWindow').getEl().unmask();
	unmaskBody();
	Ext.Msg.show({
				title : 'Message',
				msg : mssg,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO
			});
}

function success(mssg, win) {
	unmaskBody();
	Ext.Msg.show({
				title : 'Success',
				msg : mssg,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO,
				fn : function(btn) {
					if(win != null)
						win.destroy();
				}
			});
}

Array.prototype.contains = function(value) {
	return this.indexOf(value) != -1;
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}


Ext.override(Ext.form.TextField, {
	width : 200,
});

const maskMessages = [
	"Please wait...",
	"Please wait... Your request is being processed...",
	"Please wait... This might take a few seconds...",
	"Please wait... This might take a few more seconds...",
	"Please wait... This is taking longer than usual...",
	"Please wait... Almost done :) ...",
]

var maskCounter = 0;
var maskTimer = 8000;
var timerId;
function maskBody(){
	maskBodyInternal();
	timerId = setInterval(maskBodyInternal, maskTimer);
}

function maskBodyInternal(){
	Ext.getCmp('mainWindow').getEl().mask(maskMessages[getMaskCounter()], 'x-mask-loading');
}
function unmaskBody(){
	maskCounter = 0;
	clearInterval(timerId);
	Ext.getCmp('mainWindow').getEl().unmask();
}

function getMaskCounter(){
	maskCounter++;
	if(maskCounter == maskMessages.length){
		maskCounter = 0;
	}
	return maskCounter;
}
