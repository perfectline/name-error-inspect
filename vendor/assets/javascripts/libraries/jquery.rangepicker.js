(function(jQuery) {
  var RangePicker = function(inputs, options) {

    this.inputs   = inputs;
    this.options  = jQuery.extend(true, {
      dateFormat: "yyyy-MM-dd",
      appendTo:   "body",
      closeOnSelect: false,
      calendar:   {
        start: {
          changeMonth:      true,
          changeYear:       true,
          defaultDate:      null,
          firstDay:         Date.CultureInfo.firstDayOfWeek,
          dayNames:         Date.CultureInfo.dayNames,
          dayNamesShort:    Date.CultureInfo.shortestDayNames,
          dayNamesMin:      Date.CultureInfo.abbreviatedDayNames,
          monthNames:       Date.CultureInfo.monthNames,
          monthNamesShort:  Date.CultureInfo.abbreviatedMonthNames
        },
        stop:   {
          changeMonth:      true,
          changeYear:       true,
          defaultDate:      null,
          firstDay:         Date.CultureInfo.firstDayOfWeek,
          dayNames:         Date.CultureInfo.dayNames,
          dayNamesShort:    Date.CultureInfo.shortestDayNames,
          dayNamesMin:      Date.CultureInfo.abbreviatedDayNames,
          monthNames:       Date.CultureInfo.monthNames,
          monthNamesShort:  Date.CultureInfo.abbreviatedMonthNames
        }
      },
      position: {
        x:      null,
        y:      null
      },
      attach: {
        element:    this.inputs.eq(0),
        anchor:     'bottomLeft', // bottomLeft, bottomRight, bottom, topLeft, top, topRight
        offsetTop:  0,
        offsetLeft: 0
      },
      callbacks: {
        beforeOpen:   function() {},
        afterOpen:    function() {},
        beforeClose:  function() {},
        afterClose:   function() {},
        beforeCancel: function() {},
        afterCancel:  function() {},
        onSelect:     function() {}
      }
    }, options);

    this.html = {
      container:  null,
      widget:     null,
      calendars:  null,
      rangeStart: null,
      rangeStop:  null,
      buttons: {
        close:  null
      }
    };

    this.html.container   = jQuery('<div></div>').addClass("ui-rangepicker-container");
    this.html.widget      = jQuery('<div></div>').addClass("ui-rangepicker ui-widget ui-helper-clearfix ui-widget-content ui-corner-all");
    this.html.calendars   = jQuery('<div></div>').addClass("range-pickers ui-corner-all ui-helper-clearfix");
    this.html.rangeStart  = jQuery('<div></div>').addClass("range-start");
    this.html.rangeStop   = jQuery('<div></div>').addClass("range-stop");

    this.html.buttons.close   = jQuery('<button>Close</button>').addClass("done-button ui-state-default ui-corner-all");

    this.html.container.append(
            this.html.widget.append(
                    this.html.calendars
                            .append(this.html.rangeStart.datepicker(this.options.calendar.start))
                            .append(this.html.rangeStop.datepicker(this.options.calendar.stop))
                    )
                    .append(this.html.buttons.close)
            );

    this.html.container.hide();
    this.html.container.data("open", false);
    this.html.container.appendTo(this.options.appendTo);
    
    this.bindEvents();
  };

  RangePicker.prototype = {

    bindEvents: function() {
      this.inputs.bind("click.rangepicker", jQuery.proxy(this.open, this));
      this.html.buttons.close.bind("click.rangepicker", jQuery.proxy(this.close, this));
      
      this.html.container.bind("beforeOpen.rangepicker",    jQuery.proxy(this.options.callbacks.beforeOpen, this));
      this.html.container.bind("afterOpen.rangepicker",     jQuery.proxy(this.options.callbacks.afterOpen, this));
      this.html.container.bind("beforeClose.rangepicker",   jQuery.proxy(this.options.callbacks.beforeClose, this));
      this.html.container.bind("afterClose.rangepicker",    jQuery.proxy(this.options.callbacks.afterClose, this));
      this.html.container.bind("onSelect.rangepicker",      jQuery.proxy(this.options.callbacks.onSelect, true));

      this.html.rangeStart.datepicker("option", "onSelect", jQuery.proxy(function() {
        this.html.rangeStart.data("clicked", true);
        this.select();
      }, this));

      this.html.rangeStop.datepicker("option", "onSelect", jQuery.proxy(function() {
        this.html.rangeStop.data("clicked", true);
        this.select();
      }, this));

      // prevent clicks on the container from bubbling to document body
      this.html.container.click(jQuery.proxy(function(event){
        event.stopPropagation();
        event.preventDefault();
      }, this));

      // close the container on document body clicks
      jQuery(document.body).click(jQuery.proxy(function(event){
        this.close();
      }, this));
    },

    getCalendarStart: function(formatted, format) {
      var date = this.html.rangeStart.datepicker("getDate");
      return (formatted ? this.formatDate(date, format) : date);
    },

    getCalendarEnd: function(formatted, format) {
      var date = this.html.rangeStop.datepicker("getDate");
      return formatted ? this.formatDate(date, format) : date;
    },

    getInputStart: function(formatted, format) {
      var date = Date.parse(this.inputs.eq(0).val());
      return formatted ? this.formatDate(date, format) : date;
    },

    getInputEnd: function(formatted, format) {
      var date = Date.parse(this.inputs.eq(1).val());
      return formatted ? this.formatDate(date, format) : date;
    },

    formatDate: function(date, format) {
      return date == null ? null : date.toString(format ? format : this.options.dateFormat);
    },

    setInputValues: function() {
      this.inputs.eq(0).val(this.getCalendarStart(true));
      this.inputs.eq(1).val(this.getCalendarEnd(true));
    },

    setCalendarValues: function() {
      this.html.rangeStart.datepicker("setDate", this.getInputStart());
      this.html.rangeStop.datepicker("setDate", this.getInputEnd());
    },

    setPosition: function() {
      if(this.options.position.x != null && this.options.position.y != null){

        this.html.container.css("left", this.options.position.x);
        this.html.container.css("top", this.options.position.y);

      }else{

        var anchor    = jQuery(this.options.attach.element);
        var offset    = jQuery(this.options.attach.element).offset();
        var fromLeft  = this.options.attach.offsetLeft + offset.left;
        var fromTop   = this.options.attach.offsetTop + offset.top;

        switch(this.options.attach.anchor){
          case 'bottomLeft':
            fromTop += anchor.outerHeight(true);
            break;
          case 'bottom':
            fromTop   += anchor.outerHeight(true);
            fromLeft  += (anchor.outerWidth(true) / 2);
            break;
          case 'bottomRight':
            fromTop   += anchor.outerHeight(true);
            fromLeft  += anchor.outerWidth(true);
            break;
          case 'topLeft':
            break;
          case 'top':
            fromLeft += (anchor.outerWidth(true) / 2);
            break;
          case 'topRight':
            fromLeft += anchor.outerWidth(true);
            break;
        }

        this.html.container.css("left", fromLeft);
        this.html.container.css("top", fromTop);
      }
    },

    reset: function() {
      this.html.rangeStart.data("clicked", false);
      this.html.rangeStop.data("clicked", false);
    },

    select: function() {
      this.setInputValues();
      this.options.callbacks.onSelect.call(this);

      if(this.options.closeOnSelect && this.html.rangeStart.data("clicked") && this.html.rangeStop.data("clicked"))
        this.close();
    },

    open: function() {
      if (!this.html.container.data("open")) {
        this.html.container.trigger("beforeOpen");
        this.setCalendarValues();
        this.setPosition();
        this.html.container.show();
        this.html.container.data("open", true);
        this.html.container.trigger("afterOpen");
      }
      return false;
    },

    close: function() {
      if (this.html.container.data("open")) {
        this.html.container.trigger("beforeClose");
        this.html.container.hide();
        this.reset();
        this.html.container.data("open", false);
        this.html.container.trigger("afterClose");
      }
      return false;
    }

  };

  RangePicker.getInstance = function(inputs, options) {

    if (inputs.length != 2) {
      throw "DatePicker requires two input fields"
    }

    var instance = jQuery.data(inputs.get(0), "rangepicker_instance");

    if (typeof(instance) == "undefined") {
      instance = new RangePicker(inputs, options);
      jQuery.data(inputs.get(0), "rangepicker_instance", instance);
    }

    return instance;
  };

  jQuery.fn.rangepicker = function(options) {
    return RangePicker.getInstance(this, options);
  };
})(jQuery);