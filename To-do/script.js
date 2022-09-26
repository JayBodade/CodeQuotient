const button=document.getElementById('btn');
const text=document.getElementById('input1');

const table=document.getElementById('table1');

button.addEventListener('click',addRow);




function addRow()
{
   if(!text.value)
   {
    text.style.color="red";
    return ;
   }
   
    let tr=document.createElement("tr");
    let txt=document.createElement('td');
    let tdcheckbox=document.createElement("td");
    let tdbuttton=document.createElement('td');
    let tdEdit=document.createElement('td');
    let checkbox=document.createElement('input');
    let del=document.createElement('button');
    let edit=document.createElement('button');
    let task=document.createElement('input');
    edit.innerText="Edit";
    // txt.appendChild(task);
    del.addEventListener('click',function ()
    {
        table.removeChild(tr);
    });


    checkbox.setAttribute("type","checkbox");
    txt.innerText=text.value;
    del.innerText="Delete";

    checkbox.addEventListener("change",function()
    {
        if(this.checked)
        {
            txt.style.textDecoration="line-through";
        }
        else
        {
            txt.style.textDecoration="None";
        }
    });

    edit.addEventListener('click',function()
    {
        if(edit.innerText=="Edit")
        {
            edit.innerText="Save";
            let a = txt.innerText;
             console.log(a);
            txt.innerText="";
            txt.appendChild(task);
        }
        else
        {
             edit.innerText="Edit";
             txt.innerText=task.value;
             console.log(task.innerText);
            //  txt.removeChild(task);
            txt.setAttribute('readonly','readonly');
        }


    });

    tdcheckbox.appendChild(checkbox);
    tdbuttton.appendChild(del);
    tdEdit.appendChild(edit);
    tr.appendChild(txt);
    tr.appendChild(tdcheckbox);
    tr.appendChild(tdbuttton);
    tr.appendChild(tdEdit);
    table.appendChild(tr);
    
   


}




