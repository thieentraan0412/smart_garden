const express = require('express')
const db = require('./config/dbconfig')
const cors = require('cors');
const app = express()
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});


//Connect to database
db.connect();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./route/garden.route')(app)
require('./route/notification.route')(app)
require('./route/user.route')(app)

require('./route/record.route')(app, io)

require('./route/schedule.route')(app)
require('./route/static_record.route')(app)
require('./route/device.route')(app)
require('./route/garden_piece.route')(app)
require('./route/request.route')(app)
require('./route/Factory.route')(app)
require('./route/controlObserver.route')(app)

const { checkThreshold } = require('./controllers/checkThreshold')
const Observable = require('./controllers/Observer');
const { autoPump } = require('./controllers/autoPump');
Observable.subscribe(checkThreshold)
Observable.subscribe(autoPump)
const port = 3030

io.on('connection', (socket) => {
  socket.on('notify', (acc) => {
    socket.join(`notify-${acc}`)
  })

  socket.on('statis', (acc, id) => {
    socket.join(`statis-${acc}-${id}`)
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
