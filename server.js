const express = require('express');
const usersApi = require('./routes/api/users'
)
const app = express();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));