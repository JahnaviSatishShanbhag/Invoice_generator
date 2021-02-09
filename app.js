let express = require('express');
let app = express();
let cors = require('cors');
let ejs=require('ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs');

let MongoClient = require('mongodb').MongoClient;
const { Db } = require('mongodb');
let url = "mongodb://127.0.0.1:27017/consumers";

MongoClient.connect(url, (error, db) => {
    if (error) {
        throw error;
    }
    else {
        console.log("Database connected!");
    }
    db.close();
});

app.get('/getData', (req, res) => {
    MongoClient.connect(url, (error, db) => {
        if (error) {
            res.send('Unable to connect to the server');
        }
        else {
            var db = db.db('consumers');
            var collection = db.collection('customerTable');
            collection.find().toArray((err, docs) => {
                console.log(docs);
                res.render('index',{
                    title:'Invoice generartion',
                    information:docs
                });
            });
        }

    });
});

app.post('/postData',(req,res)=>
{
    let {name} = req.body;
    let {company} = req.body;
    let {number_of_items} = req.body;
    let {items}=req.body;
    MongoClient.connect(url,(error,db)=>
    {
        if (error)
        {
            throw error;
        }
        else
        {
            var db = db.db('consumers');
            var postData={name: name, company: company,number_of_items:number_of_items,items:items};
            db.collection('customerTable').insertOne(postData,(err,collection)=>
            {
                if (err)
                {
                    throw err;
                }
                else
                {
                    console.log('Inserted');
                    res.send(collection);
                }
            });
        }
    })
});

app.listen(5500, () => {
    console.log('Listening to the port 5500')
});