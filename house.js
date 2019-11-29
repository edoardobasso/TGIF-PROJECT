function getData(){
  fetch('https://api.propublica.org/congress/v1/116/house/members.json', {
      method: "GET",
      headers : {
          'X-API-Key':'AG1DeEfebXbp0em45vOTPsZG8hDgr7dlWQxjwZYf'
      }
  })
  .then(function(response){
      if(response.ok){
          return response.json();
      }
      throw new Error(response.statusText);
  })
  .then(function(json){
      data = json
      console.log(data)
      callback(data.results[0].members)
      
  })
  .catch(function(error){
      console.log("Request denied " + error.message )
  })
 
  };
getData()
function callback(array){
//setTimeout( ()=> { document.querySelector('#loading').className+=' '+'hide-loading'})
setTimeout(()=> {document.querySelector('#loader').style.display="none"})

getinfos(array)
activate(array)
filter2(array)
dropdown(array)


}
 
//var dataArray2 = data.results[0].members;
 var getinfos= function(array){
   console.log(array)
 var  table2= document.getElementById("house-data");
 var  body2= document.getElementById("tbody2");
 
for(var j=0; j<array.length; j++){
  var trow2= document.createElement("tr");
  //console.log(array[j])
  if(array[j].middle_name!== null){
    var fullname2= array[j].first_name + " " + array[j].middle_name + " " + array[j].last_name;
    trow2.insertCell().innerHTML=fullname2.link(array[j].url);
  }else{
    var fullname2= array[j].first_name + " " + array[j].last_name;
    trow2.insertCell().innerHTML=fullname2.link(array[j].url);
    
}
trow2.insertCell().innerHTML=array[j].party;
trow2.insertCell().innerHTML=array[j].state;
trow2.insertCell().innerHTML=array[j].seniority;
trow2.insertCell().innerHTML=array[j].votes_with_party_pct;
body2.appendChild(trow2);


}
table2.appendChild(body2);
 }

  var tablee= document.getElementById("tbody2");  
  tbody2.appendChild(loading);





function activate(array){
Array.from( document.querySelectorAll('input[name="party"]'))
 .forEach(element=>element.addEventListener("change",()=>filter(array))) 

}
activate()

  function filter(array){
    document.getElementById("tbody2").innerHTML= "" 
    var state_select= document.getElementById("states");
    var array_filter=[];
    var checks=Array.from( document.querySelectorAll('input[name="party"]:checked')).map(function(myInput){
     return myInput.value
      }) 
  
  if(checks.length==0 && state_select== "All States"){
    getinfos(array);
  }
  if(checks.length>0 && state_select== "All States"){
    for(var z=0; z<array.length; z++){
      if(checks.includes(array[z].party)){
        array_filter.push(array[z])
   }
   }
    getinfos(array_filter)
  }
  if(checks.length== 0 && state_select!==  "All States"){
  var result= array.filter(members=> members.state === state_select.value)
    getinfos(result)
  }
  if(checks.length>0 && state_select!== "All States"){
    var result2= array.filter(members=> members.state === state_select.value && checks.includes(members.party))
        getinfos(result2)
  }
  }



function dropdown(array){
( document.getElementById("states"))
.addEventListener("change",()=>filter(array))

}

function filter2(array){
  var stat;
  var state_array=[] 
  var select= document.getElementById("states")
  array.forEach(x => {
   state_array.push(x.state);
    stat= [...new Set(state_array)]
  })
  stat.forEach(y=> {
  var elm2= document.createElement("option");
    elm2.innerHTML= y
    select.appendChild(elm2)
  })
};
function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsById('tbody2')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}


   