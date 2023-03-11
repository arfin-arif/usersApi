const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/v1/user.route');
const port = process.env.PORT || 5000
const app = express()

// middle ware
app.use(cors())
app.use(express.json());

app.use('/api/v1/users', userRoute)

app.get('/', async (req, res) => {
    res.send('Server is running')
});
app.all('*', (req, res) => {
    res.send('No Route Found')
})
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})