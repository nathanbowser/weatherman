var net = require('net')
  , es = require('event-stream')

var connection = net.connect('23', 'rainmaker.wunderground.com', function () {
  connection.write('\n' + process.argv[1] + '\n')

  var c = 0
  var f = es.mapSync(function (line) {
    if (c++ === 1) { return line }
  })

  connection.pipe(f).pipe(process.stdout)

  connection.on('end', function () {
    console.log()
    process.exit(0)
  })

  connection.write('X\n')
})
