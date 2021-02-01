const express = require('express');
const app = express();

// settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middlewares

// router
const indexRouter = require('./routes/index.router');

// routes
app.use('/', indexRouter);

// static files
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));