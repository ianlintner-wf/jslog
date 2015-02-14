(function ($) {
  window.onerror = function (message, filename, linenumber) {
    if(Drupal.settings.jslog_handle_error) {
      var jslog_callback = Drupal.settings.jslog_callback;
      //async
      $.ajax({
        url : jslog_callback,
        dataType : 'json',
        async : true,
        type : 'POST',
        data : {severity : 4, message : message + ' ' + filename + ' ' + linenumber},
        success : function (data) {
          remoteData = data;
        },
        error : function () {

        }
      });
      return true;
    }
    else {
      return false;
    }
  }
})(jQuery);