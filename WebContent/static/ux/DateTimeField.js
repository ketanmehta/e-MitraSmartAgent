/*
 * DateTime field extension
 * @author    Teddy A Jasin - 2009
 *
 * note:
 * extended from Ext.form.DateField
 * format of datetimefield will take combination of dateFormat + ' ' + timeFormat (ie:'d-m-Y G:i A')
 *
 * usage:
 * new Ext.ux.form.DateTimeField({fieldLabel: 'My Date',dateFormat:'d-m-Y',timeFormat:'G:i A'});
 * or
 * {xtype:'datetimefield',fieldLabel: 'My Date',dateFormat:'d-m-Y',timeFormat:'G:i A'}
 *
 * fixes:
 * 15/04/09 - fix for bug date selection on grayed (non current month date) always set to '0:00'
 */
Ext.ns('Ext.ux.form');

Ext.DateTimePicker = Ext.extend(Ext.DatePicker, {

     timeFormat:'g:i A'
    ,timeLabel:'<span style="font-family:Arial;	font-size:12px;">Time</span>'
    ,timeWidth:100

    ,initComponent:function() {
        Ext.DateTimePicker.superclass.initComponent.call(this);
        this.id = Ext.id();
    }

    ,onRender: function(container,pos){

        Ext.DateTimePicker.superclass.onRender.apply(this,arguments);

        var tableComp = Ext.get(Ext.DomQuery.selectNode('table tbody',container.dom));

        var tfEl = Ext.DomHelper.insertBefore(tableComp.first(),{tag:'tr',
            children:[{tag:'td',cls:'x-date-bottom',html:this.timeLabel},{tag:'td',cls:'x-date-bottom ux-timefield', colspan:'2'}]},true);

        this.tf.render(tableComp.child('td.ux-timefield'));

        if (this.getEl().parent('div.x-layer')){
            var zindex = this.getEl().parent('div.x-layer').getStyle('z-index');
            if(this.tf.list)
                this.tf.list.setStyle('z-index',this.getEl().parent('div.x-layer').getStyle('z-index')+ 1000);
        }
    }

    ,setValue : function(value){
        var old = this.value;
        if (!this.tf){
            var timeConfig = Ext.apply({}, {
                 id:this.id + '-time'
                ,format:this.timeFormat || Ext.form.TimeField.prototype.format
                ,width:this.timeWidth
                ,fieldLabel:this.timeLabel
                ,selectOnFocus:true
                ,lazyInit: false
            }, this.timeConfig);
            this.tf = new Ext.form.TimeField(timeConfig);
            this.tf.ownerCt = this;
            delete(this.timeFormat);
            this.tf.setValue(value);
        }

        this.value = this.getDateTime(value);

    }

    ,getDateTime: function(value){
        if (this.tf){
            var dt = new Date();
            var timevalue = this.tf.getValue();
            value = Date.parseDate(value.format(this.dateFormat) + ' ' +timevalue,this.format);
        }
        return value;
    }

    ,selectToday : function(){
        if(this.todayBtn && !this.todayBtn.disabled){
            this.value=this.getDateTime(new Date());
            this.fireEvent("select", this, this.value);
        }
    }
});
Ext.reg('datetimepickerfield', Ext.DateTimePicker);

Ext.menu.DateTimeMenu = function(config){
    Ext.menu.DateTimeMenu.superclass.constructor.call(this, config);
}

Ext.extend(Ext.menu.DateTimeMenu,  Ext.menu.DateMenu , {
   
	initComponent : function(){
        this.on('beforeshow', this.onBeforeShow, this);
        if(this.strict = (Ext.isIE7 && Ext.isStrict)){
            this.on('show', this.onShow, this, {single: true, delay: 20});
        }
        Ext.apply(this, {
            plain: true,
            showSeparator: false,
            items: this.picker = new Ext.DateTimePicker(Ext.applyIf({
                internalRender: this.strict || !Ext.isIE,
                ctCls: 'x-menu-date-item',
                id: this.pickerId
            }, this.initialConfig))
        });
        this.picker.purgeListeners();
        Ext.menu.DateMenu.superclass.initComponent.call(this);
        this.relayEvents(this.picker, ['select']);
        this.on('show', this.picker.focus, this.picker);
        this.on('select', this.menuHide, this);
        if(this.handler){
            this.on('select', this.handler, this.scope || this);
        }
    },

    beforeDestroy : function() {
        this.picker.destroy();
    },
	
	hide : function(d){
        if (this.picker.tf.innerList){
            if ((Ext.EventObject.within(this.picker.tf.innerList)) || (Ext.get(Ext.EventObject.getTarget())==this.picker.tf.innerList))
                return false;
        }
        if(this.el && this.isVisible()){
            this.fireEvent("beforehide", this);
            if(this.activeItem){
                this.activeItem.deactivate();
                this.activeItem = null;
            }
            this.el.hide();
            this.hidden = true;
            this.fireEvent("hide", this);
        }
        if(d === true && this.parentMenu){
            this.parentMenu.hide(true);
        }
    }
});

Ext.ux.form.DateTimeField = Ext.extend(Ext.form.DateField, {

    dateFormat: 'd-m-Y'
    ,timeFormat: 'H:i',
    defaultAutoCreate : {tag: "input", type: "text", size: "20", autocomplete: "off"}

    ,initComponent:function() {
        Ext.ux.form.DateTimeField.superclass.initComponent.call(this);
        this.format = this.dateFormat + ' ' + this.timeFormat;
    }

    ,getValue : function(){
        return this.parseDate(Ext.form.DateField.superclass.getValue.call(this)) || '';
    }

	,getRawValue : function(){
        return Ext.form.DateField.superclass.getRawValue.call(this) || '';
    }

    ,onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.DateTimeMenu();
        }
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.ddMatch,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            timeFormat: this.timeFormat,
            dateFormat: this.dateFormat,
            showToday : this.showToday,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.on(Ext.apply({}, this.menuListeners, {
            scope:this
        }));
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");

		this.menu.picker.on("select", this.onSelect, this);
    }
});
Ext.reg('datetimefield', Ext.ux.form.DateTimeField);