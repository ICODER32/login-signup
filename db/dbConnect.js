const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log('DB Connection Successful');
}).catch((err) => {
    console.log(err)
})