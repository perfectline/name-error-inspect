if (typeof(Common) == "undefined")
  Common = {};

Common.Cleaner = {

  process: function() {
    this.clean($('a[href=#]'));
  },

  clean: function(selector) {

    $.each(selector, function(index, element) {

      element = jQuery(element);

      if (element.attr('href') == '#')
        element.attr('href', 'javascript:void(0);');
    });

  }

};