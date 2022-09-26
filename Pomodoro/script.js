let minute = document.getElementById("mm");
let second = document.getElementById('ss');
let sminute = document.getElementById("sessionminute");
let ssecond = document.getElementById("sessionsecond");
let sincrement = document.getElementById("sincrement");
let sdecrement = document.getElementById("sdecrement");
let bmin=document.getElementById("breakminute");
let bincrement=document.getElementById("bincrement");
let bdecrement=document.getElementById('bdecrement');

let reset=document.getElementById("reset");
let start=document.getElementById("start");
// let stop=document.getElementById("stop");

let cyclecount=document.getElementById("cycle");


let aminsecond = 0;

let breakminute=0;
let count=0;
let currentTime=0;
    
sincrement.addEventListener('click',function()
{
    
        aminsecond=(aminsecond+1)%60;
        if(aminsecond<10)
        {
            sminute.innerText='0'+ aminsecond;
        }
        else
        {
            sminute.innerText = aminsecond;
        }
    
});

sdecrement.addEventListener('click',function()
{

    if(aminsecond==0)
    {
        return;
    }
     aminsecond = aminsecond-1;
    
    if(aminsecond<10)
    {
        sminute.innerText='0'+aminsecond;
    }
    else
    {
        sminute.innerText = aminsecond;
    }

});

bincrement.addEventListener('click',function()
{
    breakminute=(breakminute+1)%60;
    if(breakminute<10)
    {
        bmin.innerText='0'+breakminute;
    }
    else
    {
        bmin.innerText=breakminute;
    }
});

bdecrement.addEventListener('click',function()
{
    if(breakminute==0)
    {
        return;
    }
    breakminute=breakminute-1;
    if(breakminute<10)
    {

        bmin.innerText='0'+breakminute;
    }
    else
    {
        bmin.innerText=breakminute;
    }

});

reset.addEventListener('click',function(){

    aminsecond = 0;
   count=0;
    breakminute=0;
    currentTime=0;
    sminute.innerText="00";
    ssecond.innerText="00";
    bmin.innerText="00";
    isRunning=false;
    minute.innerText="00";
    second.innerText="00";
    clearInterval(interval);
    // clearInterval(breakTime);
    start.innerText="Start";
    updatetime();
    
});

let sec=0;
let isRunning=false;



function updateBtn()
{
    if(isRunning)
    {
        start.innerText="Pause";
        return;
    }

    start.innerText="Start";
}






let  interval=0;

start.addEventListener('click',function()
{

    
   if(sminute.innerText=="00" && bmin.innerText=="00")
   {
     alert("Please Enter the Session time and Break time");

     return;
   }
   if(sminute.innerText=="00")
   {
    alert("Please Enter the Session Time");

    return;
   }

   if(bmin.innerText=="00")
   {
    alert("Please Enter the Break Time");
    return;
   }
   
    isRunning =! isRunning;
    updateBtn();
    if(isRunning){
       
    interval=setInterval(function()
    {   

        currentTime++;
        updatetime();
        check();

       
    },1000);
}
else
{
    console.log("heelo world else " )
    clearInterval(interval);
}

});

function updatetime()
{
    
    second.innerText=parseInt(currentTime%60);
    if(second.innerText<10)
    {
        second.innerText='0'+parseInt(currentTime%60);
    }

    minute.innerText=parseInt(currentTime/60);
    if(minute.innerText<10)
    {
        minute.innerText='0'+parseInt(currentTime/60);
    }


}

let breakTime=0;

function check()
{

    
    if(sminute.innerText === minute.innerText)
    {
        console.log(sminute.innerText,minute.innerText);
     currentTime=0;
     clearInterval(interval);

     breakTime=setInterval(function()
     {

        currentTime++;
        updatetime();

        if(bmin.innerText === minute.innerText)
        {
            count++;
            clearInterval(breakTime);
            currentTime=0;
            isRunning=false;
            updatetime();
            cyclecount.innerText=count;
             start.click();
        }

     },1000);



    }
}




