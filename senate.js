function getData(){
  fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
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
getinfos(array)
activate(array)
filter2(array)
dropdown(array)

}
//var dataArray2 = data.results[0].members;
 var getinfos= function(array){
 var  table2= document.getElementById("senate-data");
 var  body3= document.getElementById("body3");
 
array.forEach(member => {
    var trow2= document.createElement("tr");
trow2.insertCell().innerHTML=member.first_name + " " + member.last_name;
trow2.insertCell().innerHTML=member.party;
trow2.insertCell().innerHTML=member.state;
trow2.insertCell().innerHTML=member.seniority;
trow2.insertCell().innerHTML=member.votes_with_party_pct;
body3.appendChild(trow2);
});


table2.appendChild(body3);
 }
 



//getinfos(dataArray2);

function activate(array){
    Array.from( document.querySelectorAll('input[name="party"]'))
     .forEach(element=>element.addEventListener("change",()=>filter(array))) 
    
    }
    activate(array)
    
    
    function filter(array){
      document.getElementById("body3").innerHTML= "" 
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
          getinfos(array)
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
    dropdown()
    
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
      
       //filter2(dataArray2)

       var data_proPublica= document.querySelector("senate-data")
       
    