
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import twitter from './twitter/twitter';
import buffer from './buffer/buffer';

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5555;

app.get('/api/authorize', twitter.authorize);
app.get('/api/search/:query/:max?', twitter.search);
app.get('/api/user/:screenname/tweets/:max?', twitter.user);
// app.get('/api/user/:screenname/info', twitter.userInfo);
app.get('/api/list/:screenname/:slug/:max?', twitter.list);
app.get('/api/favs/:screenname/:max?', twitter.favs);
app.get('/api/id/:id', twitter.id);

app.get('/api/buffer/profiles', buffer.profiles);
app.get('/api/buffer/profile/:id', buffer.profile);
app.get('/api/buffer/pending/:id', buffer.pendingUpdates);
app.post('/api/buffer/create/', buffer.createUpdates);
app.get('/api/buffer/shuffle/:id', buffer.shuffleUpdates);

app.get('/graphql/buffer/profiles/', buffer.graphProfiles);

app.listen(PORT);