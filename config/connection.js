const express = require('express');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.static(path.join(__dirname, 'public')));

app.use(require(''))

app.listen(PORT, () => {
    console.log('server is listening on' + PORT);
});