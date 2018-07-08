
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import twitter from './twitter';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5555;

app.get('/api/authorize', twitter.authorize);
app.get('/api/search/:query', twitter.search);
app.get('/api/user/:screenname', twitter.user);
app.get('/api/list/:screenname/:slug', twitter.list);
app.get('/api/favs/:screenname', twitter.favs);
app.get('/api/id/:id', twitter.fetchById);


app.listen(PORT);
