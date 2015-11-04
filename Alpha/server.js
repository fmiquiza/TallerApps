var express= require('express');
var app= express();

var mongojs=require('mongojs');

var db= mongojs('ListContacto',['ListContacto']);

var bodyParser= require('body-parser');

app.use(express.static(__dirname+"/publico"))
app.use(bodyParser.json());

app.get('/contactlist', function(req,res){
console.log("Resivido el metodo de Mostrar")

db.ListContacto.find(function (err,docs){
    console.log(docs);
    res.json(docs);
});
});

app.post('/contactlist',function(req,res){
    console.log(req.body);
    db.ListContacto.insert(req.body,function(err,doc){
        res.json(doc);
})
});

app.delete('/contactlist/:id',function(req,res){
    var id= req.params.id;
    console.log(id);
    db.ListContacto.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
});

}),
    

app.get('/contactlist/:id',function(req,res){
var id= req.params.id;
console.log(id);
db.ListContacto.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
});
});


app.put('/contactlist/:id',function(req,res){
var id= req.params.id;
    console.log(req.body.nombre);
    db.ListContacto.findAndModify({query:{_id:mongojs.ObjectId(id)}, update:{$set:{nombre:req.body.nombre,email:req.body.email, numero:req.body.numero}}, new: true},function(err,doc){
        res.json(doc);
    
    });
                                  
})

app.listen(3000);
console.log("Iniciar servidor con el puerto 3000");