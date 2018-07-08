
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import twitter from './twitter';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5555;

app.get('/api/authorize', twitter.authorize);
app.get('/api/search/:query/:max?', twitter.search);
app.get('/api/user/:screenname/:max?', twitter.user);
app.get('/api/list/:screenname/:slug/:max?', twitter.list);
app.get('/api/favs/:screenname/:max?', twitter.favs);
app.get('/api/id/:id', twitter.id);


app.listen(PORT);
