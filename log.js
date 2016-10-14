  var sys = require('sys');

  const spawn = require('child_process').spawn;

  var filename = process.argv[2];

  if (!filename)
    return sys.puts("Usage: node watcher.js filename");

  // Look at http://nodejs.org/api.html#_child_processes for detail.
  var tail = spawn("tail", ["-f", filename]);
  sys.puts("start tailing");

  tail.addListener("output", function (data) {
    sys.puts(data);
  });

  // From nodejs.org/jsconf.pdf slide 56
  var http = require("http");
  http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type": "text/plain"});
    tail.stdout.on("data", function (data) {
      res.write(data);
    });

    tail.on('close', function(code) {
      console.log(code);
      res.end(code);
    });
  }).listen(8000);
