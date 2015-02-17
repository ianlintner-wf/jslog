casper.test.comment('Starting Testing');
casper.test.begin('JSLog Test', function (test) {

  casper.start('http://drupal.loc/');
  casper.then(function() {
    var jsLogExists = casper.evaluate(function(){
      return (typeof jslog === 'object');
    });
    this.test.assert(jsLogExists);
  });
  casper.then(function() {
    var jsLogLogs = casper.evaluate(function(){
      try {
        jslog.log('Test',1,'test');
        return true;
      }
      catch(exception) {
        return false;
      }
    });
    this.test.assert(jsLogLogs);
  });

  casper.run(function() {
    this.test.done();
    casper.test.comment('Ending Testing');
  });
});

