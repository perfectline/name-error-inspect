if (typeof(Common) == "undefined")
  Common = {};

Common.Form = {

  process: function(scope) {
    this.bind($('form', scope || document));
  },

  bind: function(selector) {

    $.each(selector, function() {

      var form    = $(this);
      var button  = $('.submit[data-form=%s]'.format(form.attr('id')));

      form.bind('ajax:complete', function() {
        form.data('form.disabled', false);
        button.removeClass('disabled');
      });

      form.bind('submit', function() {

        if (form.data('form.disabled'))
          return true;

        form.data('form.disabled', true);
        button.addClass('disabled');
      });

      button.bind('click', function() {
        form.trigger('submit');
      });

      form.bind('keypress', function(event) {
        if (event.keyCode == 13 && !$(event.target).is('textarea') && !$(event.target).hasClass('nosubmit')) {
          form.trigger('submit');
        }
      });

    });

  }

};
