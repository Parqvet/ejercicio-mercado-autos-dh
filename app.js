const express = require('express');
const app = express();

// settings
app.set('port', 3000);

// middlewares

// routes

app.listen(app.get('port'), () => console.log('Server on port', app.get('port')));