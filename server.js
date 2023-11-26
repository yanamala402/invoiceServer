var express = require('express');
var cors = require('cors');
var mongodb=require('mongodb');

var app=express();
var client=mongodb.MongoClient;

app.use(cors({origin:'*'}));
app.use(express.json());



app.get('/data',(req,res)=>{
    client.connect("mongodb+srv://heros:dE5AWrRzyjqHdhWy@cluster0.gh1z6o0.mongodb.net/pavankumar?retryWrites=true&w=majority")
    .then((conn)=>{
        var db=conn.db('pavankumar');
        db.collection('noimage').find().toArray()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})


//post api
app.post('/postData',(req,res)=>{
    client.connect("mongodb+srv://heros:dE5AWrRzyjqHdhWy@cluster0.gh1z6o0.mongodb.net/pavankumar?retryWrites=true&w=majority")
    .then((conn)=>{
        var db=conn.db('pavankumar');
        db.collection('noimage').insertOne({"date":req.body.date,"DCNO":req.body.DCNO,"SLNO":req.body.SLNO,"GPNO":req.body.GPNO,"Material":req.body.Material,"Order":req.body.Order,"Vechile":req.body.Vechile,"Gross":req.body.Gross,"Tare":req.body.Tare,"Net":req.body.Net,"Rate":req.body.Rate,"Amount":req.body.Amount,"In":req.body.In,"Out":req.body.Out})
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})

app.use(express.static("../build"))