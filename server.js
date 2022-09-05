//requre == import in java, importing express module
const express = require('express')

//creating an instance of express
const app = express()

//allows frontend to server static files
app.use(express.static('public'))

//sets the port to listen on
app.listen(3500, () => {
    console.log('Server is listening on port 3500');
})