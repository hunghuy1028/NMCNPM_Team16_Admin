const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin123:admin123@cluster0-zdvf1.mongodb.net/movie?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true 
}).then (
    () => {
        console.log("DB connected!");
    },
    err => {
        console.log(err);
        console.log("DB failed to connect!");
    }
);

module.exports = mongoose;