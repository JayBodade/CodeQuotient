let language=document.getElementById("dropdown");
let program=document.getElementById("input");
let compile=document.getElementById("runbtn");
let container=document.querySelector(".output");
let outputscreen=document.createElement("p");



let result;
compile.addEventListener('click',function()
{
  

//   let langs={
//   Python:0,
//   'C++':77,
//   C:7,
//   Javascript:4,
//   Java:8
// }

let body={
  code:program.value,
  langId:language.value
}
console.log(language.value);

  console.log(body.code);
  console.log(body.langId);

  let request=new XMLHttpRequest();

   request.open("POST","https://codequotient.com/api/executeCode");
   request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify(body));

  request.addEventListener("load",function()
  {
     result=JSON.parse(request.responseText);
    console.log(result.codeId);

  });
  let sec=0;
  let id=setInterval(function()
  {
    sec++;
    if(sec>10)
    {
      getData();
      clearInterval(id);
    }
  },1000)




 function getData()
 {
   
 console.log("hi");
  clearTimeout(id);
  let getrequest=new XMLHttpRequest();
 
  let code = result.codeId;
  // getrequest.open("GET","https://codequotient.com/api/codeResult/"+result.codeId);
    getrequest.open("GET", "https://codequotient.com/api/codeResult/"+code);
  // getrequest.setRequestHeader("Content-Type","application/json");

   getrequest.send();
   let data;
   let response;
  getrequest.addEventListener("load",function()
  {
     response=JSON.parse(getrequest.responseText);
      data=JSON.parse(response.data);
      console.log(response);
      
        
  
      if(data.output==="")
      {
       
        outputscreen.innerText=data.errors;
        outputscreen.style.color="red"
        outputscreen.style.fontSize="15px";
        console.log(outputscreen.value);
        
        
      }
      else
      {
       
        outputscreen.innerText=data.output;
        outputscreen.style.color="white";
        outputscreen.style.fontSize="18px";
        outputscreen.style.marginTop="-2px";
        outputscreen.style.marginLeft="10px";
        console.log(outputscreen.value);
        
        
      }
      container.appendChild(outputscreen);
   
  }); 

  // container.removeChild(outputscreen); 
 
 }
 




});
