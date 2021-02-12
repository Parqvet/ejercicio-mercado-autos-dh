const express = require('express');
const methodOverride = require('method-override');

const app = express();

// settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// agregar method-override
app.use(methodOverride('_method'));

// router
const indexRouter = require('./routes/index.router');
const autosRouter = require('./routes/autos.router');
const adminRouter = require('./routes/admin.router');

// routes
app.use('/', indexRouter);
app.use('/autos', autosRouter);
app.use('/admin', adminRouter);

// static files
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));