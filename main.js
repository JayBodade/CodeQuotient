
const express = require("express");
const path = require("path");
const fs=require("fs");

const session=require('express-session');

const app=express();

const host="localhost";
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/public", express.static(__dirname + '/public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.set('view engine','ejs');

app.post('/logout',function(req,res)
{
    req.session.destroy(err => {
        if(err) {
             console.log(err)
         }else{
             res.redirect('/login');
         }
    });
   
});


app.get('/',function(req,res)
{
    // console.log(path);
    console.log("i am here");
    fs.readFile('./public/html/login.html','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("wrong");
            return;
        }
        
        else
        {
            
            res.send(data);
        }
    })
    
})

app.post('/addTodo',function(req,res)
{
    if(req.body.task==="")
    {
        fs.readFile('./database.json','utf-8',function(err,data)
        {
            if(err)
            {
                console.log("error while reading database file");
                return;
            }
            else
            {

                let obj=JSON.parse(data);
                let todo=obj.todo;
                let username=req.session.username;
                let array=todo.filter(function(element)
                {
                    if(element.task.username===username)
                    {
                        return element;
                    }
                });

                res.render('index.ejs',{todos:array,name1:req.session.name});
                

                
            }
        })
    
        return;
    }
    console.log(req.body);
    let todo={
        task:{
            data:req.body.task,
            id:Date.now(),
            username:req.session.username
        }
    }
  
    
    addTodoDatabase(todo,res,req);
     

});

function addTodoDatabase(task,res,req)
{
    if(task.task.data===undefined)
    {
        // alert("enter valid task");
        return;
    }
    fs.readFile('./database.json','utf-8',function(err,data){
        if(err)
        {
            console.log("something is wrong");
            return;
        }
        else
        {
            let obj=JSON.parse(data);
           let todo=obj.todo;
            obj.todo.push(task);
            let jsondata=JSON.stringify(obj);
            fs.writeFile('./database.json',jsondata,"utf-8",function(err){

                if(err)
                {
                    console.log("something went wrong");
                    return;
                }
                else
                {
                    console.log("success");
                    let username=req.session.username;
                    let array=todo.filter(function(element)
                    {
                        if(element.task.username === username)
                        {
                            return element;
                        }
                    })
                    // console.log(array);

                    res.render('index.ejs',{todos:array,name1:req.session.name});
                }

            });

            
        }

    });

}

app.post('/delTodo',function(req,res)
{
    // console.log();
    // console.log(req.body.id);
    let taskId=parseInt(req.body.delete);
    console.log(taskId);
     fs.readFile('./database.json','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("something went wrong bro");
            return;
        }
        else
        {
            let obj=JSON.parse(data);
            let todo=obj.todo;
            
            todo.forEach(function(element,index)
            {
                
            //    console.log(taskId,element.task.id);
               if(taskId === element.task.id)
               {
                   console.log(index);
                    todo.splice(index,1);
                    console.log("delete complete");
                        
               }
            })

            fs.writeFile('./database.json',JSON.stringify(obj),"utf-8",function(err)
            {
                if(err)
                {
                    console.log("you are wrong");
                }
                else
                {
                    console.log("complete");
                  
                    let username=req.session.username;
                    let array=todo.filter(function(element)
                    {
                        if(element.task.username === username)
                        {
                            return element;
                        }
                    })
                    // console.log(array);

                    res.render('index.ejs',{todos:array,createdBy:username,name1:req.session.name});
                    
                }
            })

            
        }
        
        
    })
});


app.post("/sendToUpdate",function(req,res)
{
    console.log(req.body);
    req.session.deleteReqId=req.body.idToUpdate
    res.sendFile(__dirname+"/public/html/updateTodo.html");
})

app.post('/updateTodo',function(req,res)
{
    console.log(req.body);
    let updatedText=req.body.data;
    let updateId=parseInt(req.session.deleteReqId);
    console.log(updateId,updatedText);

    // console.log(updatedText);
    fs.readFile('./database.json','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("something went wrong");
            return;
        }
        else
        {
            let obj=JSON.parse(data);
            let todo=obj.todo;

            todo.forEach(function(element,index)
            {
                if(element.task.id === updateId)
                {
                    console.log(todo[index].task.data);
                    console.log(index);
                    todo[index].task.data=updatedText;
                    // todo[index].id=updateId;
                }
            })

            fs.writeFile('./database.json',JSON.stringify(obj),function(err)
            {
                if(err)
                {
                    console.log("data not updated due to error");
                }
                else
                {
                    console.log("update success");

                    let username=req.session.username;
                    let array=todo.filter(function(element){

                        // console.log(element.task.username);
                        if(username === element.task.username)
                        {
                            return element;
                        }
                           
                    });
            
                    // console.log(array);
            
                 
                    
                  
                    res.render('index.ejs',{todos:array,name1:req.session.name});


                }
            })

        }

       
    })
});

app.get('/index',function(req,res)
{

    console.log(req.session.isLoggedIn);
    if(req.session.isLoggedIn === true)
    {
        res.sendFile(__dirname+'/public/html/index.html');
    }
    else
    {
        res.redirect('/login');
    }

});

app.get('/getAllTodod',getAllTodod);

function getAllTodod(req,res)
{

    fs.readFile('./database.json','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("error while reading database file");
            return;
        }
        else
        {
            res.send(data);
        }
    })

}

app.get('/getUserName',function(req,res)
{ 
    fs.readFile("./database.json",'utf-8',function(err,data)
    {
        if(err)
        {
            console.log("wrong");
            return;
        }
        
        let obj=JSON.parse(data);
        let todo=obj.todo;
      
        // console.log(element.);
        let username=req.session.username;
        console.log(username);
        let array=todo.filter(function(element){

            console.log(element.task.username);
            if(username === element.task.username)
            {
                return element;
            }
               
        });

        // console.log(array);

     
        
      
        res.render('index.ejs',{todos:array,name1:req.session.name});
        // return;

    });
  
  
});

app.route('/login').get(function(req,res)
{
    if(req.session.isLoggedIn===true)
    {
        return;
    }
    else
    {
        
        res.sendFile(__dirname+"/public/html/login.html");

    }
  
}).post(function(req,res)
{
   
    let username=req.body.username;

    let password=req.body.password;
    // console.log(username);
    // console.log(password);
    fs.readFile('./Credentials.json','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("error in reading database");
            return;
        }
        else
        {
            let obj=JSON.parse(data);
           
            let info=obj.credentials;
            let count=0;
            info.forEach(function(element)
            {
                
                if(element.username === username && element.pass===password)
                {
                    
                    count++;
                    req.session.isLoggedIn=true;
                    req.session.name=element.name1;
                    req.session.username=element.username; 
                
                }

            });
            if(count==0)
            {
                  res.sendFile(__dirname+"/public/html/login.html");
            }
            else
            {
                fs.readFile("./database.json",'utf-8',function(err,data)
                    {
                        if(err)
                        {
                            console.log("wrong");
                            return;
                        }
                        
                        let obj=JSON.parse(data);
                        let todo=obj.todo;
                      
                        // console.log(element.);
                        let username=req.session.username;
                        console.log(username);
                        let array=todo.filter(function(element){

                            console.log(element.task.username);
                            if(username === element.task.username)
                            {
                                return element;
                            }
                               
                        });

                        // console.log(array);

                     
                        
                      
                        res.render('index.ejs',{todos:array,name1:req.session.name});
                        // return;

                    });
            }

          
           

          
        }
    })
})
app.route('/signup').post(function(req,res)
{
   const userInfo={

     name1:req.body.name,
     username:req.body.username,
     pass:req.body.password


   }
  fs.readFile('./Credentials.json','utf-8',function(err,data)
  {
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        let obj=JSON.parse(data);
        let info=obj.credentials;
       let count=0;
        info.forEach(function(element)
        {
            if(element.username === userInfo.username)
            {
                count++;
            }
        })

        if(count >= 1)
        {
            console.log("same usrnae or pass");
            res.sendFile(__dirname+"/public/html/signup.html");
        }
        else
        {
            saveUser(userInfo)
            
            res.redirect('/login');
        }


    }
    
  })
 
 
  
}).get(function(req,res)
{
    res.sendFile(__dirname+"/public/html/signup.html");
})


function saveUser(userInfo,callback)
{
    fs.readFile('./Credentials.json','utf-8',function(err,data)
    {
        if(err)
        {
            console.log("Went wrong");
            callback(null);
            return;
        }
        else
        {
            let obj=JSON.parse(data);

            obj.credentials.push(userInfo);

            fs.writeFile('./Credentials.json',JSON.stringify(obj),function(err)
            {
                if(err)
                {
                    console.log("data no inserted");
                    location.reload();
                    return;
                }
                else{
                    console.log("inserted");
                    
                }
            })

            
        }
    })
}

 

const port=80;


app.listen(port,host,function()
{
    console.log(`Listening at http://${host}:${port}/`);
})