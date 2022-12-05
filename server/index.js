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
    const sqlIns="select * from ourbbdata";
    db.query(sqlIns,(err,result)=>{
        console.log("ERROR",err);
        res.send(result);
    });
    
});

app.post("/api/post",(req,res)=>{
    const {sno,qty,item,amount}=req.body;
    const sqlQuery="insert into ourbbdata(sno,qty,item,amount) values(?,?,?,?)";
    db.query(sqlQuery,[sno,qty,item,amount],(error,result)=>{
        console.log("esql",error);
        res.send("got it");
    });
});

app.delete("/api/remove/:sno",(req,res)=>{
    const {sno}=req.params;
    console.log("item are ",sno);
    res.send(sno)
    const sqlRem="delete from ourbbdata where sno= ?";
    db.query(sqlRem,sno,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from ourbbdata where sno =?";
    db.query(sqlGet,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {sno,qty,item,amount}=req.body;
    const sqlUpdate="update ourbbdata set sno=? , qty=? , item=? , amount=? where sno=?";
    db.query(sqlUpdate,[sno,qty,item,amount,id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get('/',(req,res)=>{
    // const sqlIns="INSERT INTO ourbbdata(sno,qty,item,amount) values (1,50,'curtain',5000)";
    // db.query(sqlIns,(err,result)=>{
    //     console.log("ERROR",err);
    //});
    res.send("listening")
});

app.listen(3001,()=>{
    console.log('listening');
});