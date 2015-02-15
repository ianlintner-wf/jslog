var jslog = new Object();
jslog.callback_path = '/ajax/json/jslog';

jslog.log = function (message, severity, source) {
  jQuery.ajax({
    url : jslog.callback_path,
    dataType : 'json',
    async : true,
    type : 'POST',
    data : {severity : severity, message : message + ' ' + source},
    success : function (data) {

    },
    error : function () {
      console.log('jslog failed ajax logging call');
    }

  });
}

window.onerror = function (message, filename, linenumber) {
  jslog.log(message, 4, ' file: ' + filename + ' line number: ' + linenumber);
  return true;
}