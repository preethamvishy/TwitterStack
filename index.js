const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5555;

app.listen(PORT);
