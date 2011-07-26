if (typeof(Common) == "undefined")
  Common = {};

Common.Button = {

  process: function() {
    this.bind($('button'));
  },

  bind: function(selector) {

    $.each(selector, function(index, element) {

      var source = $(element);
      var target = $('<a/>').addClass(source.attr('class'));

      target.addClass(source.attr('class'));
      target.html(source.html());
      target.attr('href', 'javascript:void(0);');

      if (source.hasClass('submit')) {

        if (source.attr('data-form'))
          target.attr('data-form', source.attr('data-form'));
        else
          target.attr('data-form', source.parents('form').attr('id'));

      }

      source.replaceWith(target);

    });

  }

};