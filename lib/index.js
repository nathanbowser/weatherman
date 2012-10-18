var net = require('net')
  , es = require('event-stream')

module.exports = function (city) {
  var connection = net.connect('23', 'rainmaker.wunderground.com', function () {
    connection.write('\n' + city + '\n')

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
}
