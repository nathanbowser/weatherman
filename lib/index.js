var net = require('net')
  , es = require('event-stream')
  , tube = require('picture-tube')()
  , request = require('request')

module.exports = function (city) {
  if (city.match(/phl/i)) {
    console.log('BRACE YOURSELF, SANDY IS COMING!')
    tube.pipe(process.stdout)
    request('http://www.delawareliberal.net/wp-content/uploads/2012/10/Frankenstorm.png').pipe(tube)
  } else {
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
}
