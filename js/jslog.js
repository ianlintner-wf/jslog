var jslog = new Object();
jslog.callback_path = '/ajax/json/jslog';

jslog.log = function (message, severity, source, sendBrowserDebug) {
  var currentLocation = '';
  var browserDebugData = null;
  if (typeof(window) == "object") {
    currentLocation = window.location.href;
  }

  if(sendBrowserDebug) {
    browserDebugData = this.getBrowserDebug();
  }

  jQuery.ajax({
    url : jslog.callback_path,
    dataType : 'json',
    async : true,
    type : 'POST',
    data : {severity : severity, message : message + ' ' + source, location : currentLocation, browser_debug: browserDebugData},
    success : function (data) {
      if (jslogConsole) {
        if (typeof console == "object") {
          console.log(message);
        }
      }
    },
    error : function () {
      if (jslogConsole) {
        if (typeof console == "object") {
          console.log('jslog failed ajax logging call!');
        }
      }
    }
  });
  return true;
};

jslog.getBrowserDebug = function () {
  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = '' + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1) {
      fullVersion = nAgt.substring(verOffset + 8);
    }
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else {
    if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else {
      if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
      }
      // In Safari, the true version is after "Safari" or after "Version"
      else {
        if ((verOffset = nAgt.indexOf("Safari")) != -1) {
          browserName = "Safari";
          fullVersion = nAgt.substring(verOffset + 7);
          if ((verOffset = nAgt.indexOf("Version")) != -1) {
            fullVersion = nAgt.substring(verOffset + 8);
          }
        }
        // In Firefox, the true version is after "Firefox"
        else {
          if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
          }
          // In most other browsers, "name/version" is at the end of userAgent
          else {
            if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
              (verOffset = nAgt.lastIndexOf('/'))) {
              browserName = nAgt.substring(nameOffset, verOffset);
              fullVersion = nAgt.substring(verOffset + 1);
              if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
              }
            }
          }
        }
      }
    }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) != -1) {
    fullVersion = fullVersion.substring(0, ix);
  }
  if ((ix = fullVersion.indexOf(" ")) != -1) {
    fullVersion = fullVersion.substring(0, ix);
  }

  majorVersion = parseInt('' + fullVersion, 10);
  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }
  var debug = new Object();
  debug.BrowserName = browserName;
  debug.FullVersion = fullVersion;
  debug.MajorVersion = majorVersion;
  debug.appName = navigator.appName;
  debug.userAgent = navigator.userAgent;

  debug.viewPort = new Object();
  debug.viewPort.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  debug.viewPort.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return debug;
};

if (jslogWindowOnError) {
  window.onerror = function (message, filename, linenumber) {
    jslog.log(message, 3, ' file: ' + filename + ' line number: ' + linenumber, jslogBrowserDebugData);
    if (jslogConsole) {
      if (typeof console == "object") {
        console.log(message);
      }
    }
    if (jslogContinue) {
      return true;
    }
    else {
      return false;
    }
  };
}



