const express=require('express');
const mysql=require('mysql2');
const cors=require("cors");
const bodyParser = require('body-parser');

const app=express();

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"rere",
    database:"collegest"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/get',(req,res)=>{
    const sqlIns="select * from keepr";
    db.query(sqlIns,(err,result)=>{
        console.log("ERROR",err);
        res.send(result);
    });
    
});

app.post("/api/post",(req,res)=>{
    const {id,item}=req.body;
    const sqlQuery="insert into keepr(id,item) values(?,?)";
    db.query(sqlQuery,[id,item],(error,result)=>{
        console.log("esql",error);
        res.send("got it");
    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    console.log("item are ",id);
    res.send(id)
    const sqlRem="delete from keepr where id= ?";
    db.query(sqlRem,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from keepr where id =?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:ide",(req,res)=>{
    const {ide}=req.params;
    const {id,item}=req.body;
    const sqlUpdate="update keepr set id=? , item=?  where id=?";
    db.query(sqlUpdate,[id,item,ide],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get('/',(req,res)=>{
    // const sqlIns="INSERT INTO keepr(id,qty,item,amount) values (1,50,'curtain',5000)";
    // db.query(sqlIns,(err,result)=>{
    //     console.log("ERROR",err);
    //});
    res.send("listening")
});

app.listen(3001,()=>{
    console.log('listening');
});