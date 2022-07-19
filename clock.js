var inc = 1000;
//updated
clock();
showAlarm();
alarmBuzz();
let date= new Date;
let datePlaceHolder=document.querySelector('input[type="date"]');
  datePlaceHolder.setAttribute("value",`${date.getFullYear()}-${(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):date.getMonth()+1}-${(date.getDate())<10?('0'+(date.getDate())):date.getDate()}`)
  datePlaceHolder.setAttribute("min",`${date.getFullYear()}-${(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):date.getMonth()+1}-${(date.getDate())<10?('0'+(date.getDate())):date.getDate()}`)

function clock() {
  const date = new Date();
  const year= date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const monthname = month[date.getMonth()];
  const hour = hours * 30+minutes*0.5;
  const minute = minutes * 6;
  const second = seconds * 6;
  document.getElementById('year').innerHTML=`<h4 style=''>${year}</h4>`
  document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
  document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
  document.querySelector('.second').style.transform = `rotate(${second}deg)`
  document.getElementById("date").innerHTML=`<h3>${monthname}</h3><h1 style="font-size: 60px">${date.getDate()}</h1><h4>${day[date.getDay()]}</h4>`
  document.getElementById('digital_clock').innerHTML=`<h1>${(hours)<10?('0'+(hours)):hours}:${(minutes)<10?('0'+(minutes)):minutes}:${(seconds)<10?('0'+(seconds)):seconds}</h1>`
  
}

document.getElementById("submit").addEventListener("click",function(e) {
  e.preventDefault();
  
  let alarmTitle=document.getElementById("title").value
  let alarmHour= document.getElementById("timeH").value;
  let alarmMinute= document.getElementById("timeM").value;
  let alarmDate= document.getElementById("dateInput").value;
  let reason= document.getElementById("reason").value;
  let Obj={
     title: alarmTitle,
     hour: alarmHour,
     minute: alarmMinute,
     date: alarmDate,
     reason: reason
   }
  let alarm = localStorage.getItem("alarm");
   if (alarm==null||alarm=='[]'){
    alarmObj=[];
   } else{
    alarmObj=JSON.parse(alarm);
   }
   if(alarmHour==""||alarmMinute==""||alarmDate==""){}else{
     let flag;
     if (alarm==null||alarm=='[]'){
      alarmObj.push(Obj);
      localStorage.setItem("alarm",JSON.stringify(alarmObj));
      showAlarm();
      Alert("success","Your Alarm Is Added.");
      reset()
     }
     else{

       alarmObj.forEach(element=>{if(element.hour==alarmHour&&element.minute==alarmMinute&&element.date==alarmDate){flag=1}else{
         flag=0;
         Alert("danger","Alarm With Same Date And Time Already Exist")
        }})
        if(flag==0){
          
          alarmObj.push(Obj);
          localStorage.setItem("alarm",JSON.stringify(alarmObj));
          showAlarm(); 
          Alert("success","Your Alarm Is Added."); 
          reset()     
        }
      }
      }
})
function showAlarm() {
  alarm=localStorage.getItem("alarm");
  if (alarm==null){
    alarmObj=[];
  }else{
    alarmObj=JSON.parse(alarm);
  }
  html=``;
  alarmObj.forEach((element,index) => {
    html+=`<div class="card my-2 mx-2" style="width:inherit;">
    <div class="card-body"><div><div>
      <h4 class="card-title text-center">${element.title==""?"Alarm":element.title}</h4>
      <h5 class="card-subtitle mb-2 text-muted"><span>Time: ${element.hour}:${element.minute}  </span> <span style="float: right;">  Date: ${element.date}</span></h5>
      <p class="card-text my-1">${element.reason}</p></div>
      <div id="a${index}" style='display:flex; justify-content: space-between;'><button id class="btn btn-primary" id='${index}' onclick='deleteAlarm(this.id)'>Delete</button></div></div>
      
    </div>
    
  </div>`
  });
  if(html==''){
    document.getElementById('alarmDisplay').innerHTML="<div style='font-size: 20px; text-align: center'>No Alarm Set Yet!!!!!</div>"}else{
    document.getElementById('alarmDisplay').innerHTML= html;
  }
}
function Alert(type,msg) {
  alertbox=document.getElementById('alert');
  alertbox.style.visibility="visible";
  alertbox.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>${type.toUpperCase()}: </strong> ${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>` 
setTimeout(() => {
  alertbox.style.visibility="hidden";
}, 3000); 
}
function reset() {
  let date= new Date; 
  document.getElementById("title").value="";
  document.getElementById("timeH").value="";
  document.getElementById("timeM").value="";
  document.getElementById("dateInput").value=`${date.getFullYear()}-${(date.getMonth()+1)<10?('0'+(date.getMonth()+1)):date.getMonth()+1}-${(date.getDate())<10?('0'+(date.getDate())):date.getDate()}`;
  document.getElementById("reason").value="";
}
function deleteAlarm(index,alertSignal) {
  alarm=localStorage.getItem("alarm");
  alarmObj=JSON.parse(alarm);
  alarmObj.splice(index,1);
  localStorage.setItem('alarm',JSON.stringify(alarmObj));
  showAlarm();
    Alert("success","Your Alarm Is Deleted")
  
}
function alarmBuzz() {
  alarm=localStorage.getItem("alarm");
  if (alarm==null||alarm=='[]'){
    alarmObj=[];
  }else{
    alarmObj=JSON.parse(alarm);
  }
  let date= new Date();
  alarmObj.forEach((element,index)=>{
    let alarmdate= new Date(element.date+'T'+element.hour+':'+element.minute);
    if(alarmdate.getMinutes()==date.getMinutes()){
      if(alarmdate.getHours()==date.getHours())
        {
          if(alarmdate.getDate()==date.getDate()){
            if(alarmdate.getMonth()==date.getMonth()){
              if(alarmdate.getFullYear()==date.getFullYear()){
                if(date.getSeconds()==0){
                  console.log("buzz")
                  let display=document.getElementById(`a${index}`).innerHTML
                  display+="<img src='/bell.png' style=' height:40px; width:40px; '>";
                  document.getElementById(`a${index}`).innerHTML=display;
                 
                  startAlarm();
                  StopButton();

                }

            }}
          }
        }
    }
  }
)
}
function StopButton() {
  var div=`<div class="overlay stopBtn" ></div>
  <div class="stopButton stopBtn"><button type="button" onclick='StopAlarm()' class="btn btn-primary" style="height: 20%; width: 20%; opacity:1;">Stop Alarm</button></div>`
  let inner= document.querySelector('body').innerHTML;
  inner=div+inner;
  document.querySelector('body').innerHTML=inner;
}
function startAlarm() {
  let body = document.querySelector("body");
  let snd=document.createElement('audio');
  snd.setAttribute("src","/alarm.mp3")
  snd.setAttribute("id","audio")
  snd.setAttribute("autoplay","");
  snd.setAttribute("loop","");
  body.appendChild(snd);
 
}
function StopAlarm() {
  let snd=document.getElementById('audio');
  let stop=document.getElementsByClassName('stopBtn');
  let arr=Array.from(stop);
  arr.forEach(element=>{
    element.remove();
  })
  snd.remove();
  
}
setInterval(clock, inc);
setInterval(alarmBuzz,inc)
