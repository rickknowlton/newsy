const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bluebird = require('bluebird');

const PORT = process.env.PORT || 3001;
mongoose.Promise = bluebird;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}else{
    app.use(express.static(__dirname + '/client/public'));
}

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
});

const articleController = require('./server/controllers/article-controller')
const router = express.Router();

router.get('/api/saved', articleController.find);
router.post('/api/saved', articleController.insert);
router.delete('/api/saved/:id', articleController.delete); 
router.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(router);

const db = process.env.MONGODB_URI || 'mongodb://localhost/newsy';
mongoose.connect(db,
    (err)=>{
    if (err) throw err;
    console.log('connection is successful')
})

app.listen(PORT, ()=>{
    console.log('http://localhost:'+PORT);
})


