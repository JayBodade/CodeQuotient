let text=document.getElementById("text-area");
let table=document.getElementById('table1');
let usre=document.getElementById("username");
// let logoutbtn=document.getElementById('logout');



getAllTodoFromDB();


// logoutbtn.addEventListener('click',function()
// {
//     console.log("here");
//     let request=new XMLHttpRequest();

//     request.open('POST',"http://localhost:80/logout");

//     request.send();

//     request.addEventListener('load',function()
//     {
//         console.log("logout request sent");
//     })
  
// })




function getUserName()
{
    let request=new XMLHttpRequest();

    request.open('GET',"http://localhost:80/getUserName");
    request.send();

    request.addEventListener('load',function()
    {
        let response=request.responseText;
        usre.innerText=response;
    })
}

getUserName();

text.addEventListener("keypress",function(event)
{
    
    if(event.key==="Enter")
    {
        if(text.value===undefined)
       {
         alert("pls enter a vail value");
         return;
       }
       console.log(text.value);
       addTodoData(text.value);
       text.value="";
      
    }
})

function addTodoData(text)
{
    if(text===undefined)
    {
        return;
    }
    let idforfun=Date.now();
    let request=new XMLHttpRequest();

    request.open("POST","http://localhost:80/addTodo");
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify({task:{
                                 data : text,
                                 id:idforfun
                                    }}
                                  ));

    request.addEventListener('load',function()
    {
        console.log("success");
    })

    let newRow=document.createElement('tr');
    let tdText=document.createElement('td');
    let tdCheck=document.createElement('td');
    let tddel=document.createElement('td');
    let tdedit=document.createElement('td');

    let data=document.createElement('h4');
    data.innerText=text;
    let checkBox=document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    let deleteBtn=document.createElement('button');
    let editBtn=document.createElement('button');
   deleteBtn.innerText="delete";
   editBtn.innerText="edit";
    tdText.appendChild(data);
    tdCheck.appendChild(checkBox);
    tddel.appendChild(deleteBtn);
    tdedit.appendChild(editBtn);

    newRow.appendChild(tdText);
    newRow.appendChild(tdCheck);
    newRow.appendChild(tddel);
    newRow.appendChild(tdedit);

    table.appendChild(newRow);

    
 
    deleteBtn.addEventListener('click',function()
    {
        table.removeChild(newRow);
        // console.log("here1")
        let request=new XMLHttpRequest();
        request.open("DELETE","http://localhost:80/delTodo");
        // console.log("here1");
        request.setRequestHeader("Content-Type", "application/json");
        // console.log("here1");
        request.send(JSON.stringify({id:idforfun}));
        // console.log("here1");
        request.addEventListener('load',function()
        {
            console.log("delete request send Success");
        })


    })
    checkBox.addEventListener('change',function()
    {
        data.style.textDecoration="line-through";
    })

    editBtn.addEventListener('click',function()
    {
        var updateData = prompt("Change the task");
        // console.log(updateData);
       data.innerText=updateData;

       let request=new XMLHttpRequest();
       request.open("POST","http://localhost:80/updateTodo");
       request.setRequestHeader("Content-Type", "application/json");
       request.send(JSON.stringify({data:updateData,id:idforfun}));

       request.addEventListener('load',function()
       {
        console.log("update request sent");
       })

       
        

    })


}



function getAllTodoFromDB()
{

    let request=new XMLHttpRequest();

    request.open("GET","http://localhost:80/getAllTodod");
    request.send();

    request.addEventListener('load',function()
    {
        let response=JSON.parse(request.responseText);
        
        let todo=response.todo;
        todo.forEach(function(element)
        {

            let newRow=document.createElement('tr');
            let tdText=document.createElement('td');
            let tdCheck=document.createElement('td');
            let tddel=document.createElement('td');
            let tdedit=document.createElement('td');
        
            let idforfun=element.task.id;
           
            let data=document.createElement('h4');
            data.innerText=element.task.data;
            let checkBox=document.createElement('input');
            checkBox.setAttribute('type','checkbox');
            let deleteBtn=document.createElement('button');
            let editBtn=document.createElement('button');
           deleteBtn.innerText="delete";
           editBtn.innerText="edit";
            tdText.appendChild(data);
            tdCheck.appendChild(checkBox);
            tddel.appendChild(deleteBtn);
            tdedit.appendChild(editBtn);
        
            newRow.appendChild(tdText);
            newRow.appendChild(tdCheck);
            newRow.appendChild(tddel);
            newRow.appendChild(tdedit);
        
            table.appendChild(newRow);

            deleteBtn.addEventListener('click',function()
          {
            table.removeChild(newRow);
           
            let request=new XMLHttpRequest();
            request.open("DELETE","http://localhost:80/delTodo");
            // console.log("here1");
            request.setRequestHeader("Content-Type", "application/json");
            // console.log("here1");
            request.send(JSON.stringify({id:idforfun}));
            // console.log("here1");
            request.addEventListener('load',function()
            {
                console.log("delete request send Success");
            })


        })

            checkBox.addEventListener('change',function()
                {
                    data.style.textDecoration="line-through";
            })


            editBtn.addEventListener('click',function()
            {
                var updateData = prompt("Change the task");
                // console.log(updateData);
                console.log(idforfun);
               data.innerText=updateData;
        
               let request=new XMLHttpRequest();
               request.open("POST","http://localhost:80/updateTodo");
               request.setRequestHeader("Content-Type", "application/json");
               request.send(JSON.stringify({data:updateData , id:element.task.id}));
        
               request.addEventListener('load',function()
               {
                console.log("update request sent");
               })

              
               
        
                
        
            })
            
           
        })
       
       
    })
}