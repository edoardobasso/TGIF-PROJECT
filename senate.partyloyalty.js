var allData= data.results[0].members;

var statistics= {
    "democrats": 0, 
    "republicans": 0,
    "independent": 0,
    "republican_votes_with_party_pct": 0,
    "independent_votes_with_party_pct": 0,
    "democrats_votes_with_party_pct": 0,
    "votes_percentage": 0,
    "total_reps": 0,
    "most_engaged": 0,
    "least_engaged":0,
    "pct_total_missed": 0,
    "pct_missed_republican": 0,
    "pct_missed_democrats": 0,
    "pct_missed_independent": 0,
    "nOfMissed_most_engaged": 0,
    "nOfMissed_least_engaged": 0,
    "total_votes": 0,
}


console.log(allData);
function numbdemo(array){
    var newAr= [];
    for(var d=0; d<array.length; d++){
    if(array[d].party=="D"){
        newAr.push(array[d])
        
    }
    }
    console.log(newAr.length)
}
var newArr= [];
numbdemo(allData);
function numbrep(array, party){
     return array.filter(person=>person.party===party).length;
    //newArr.push(numbrep(rep));

    
}


console.log(numbrep(allData, "D"));
console.log(numbrep(allData, "R"));
console.log(numbrep(allData, "ID"));


function percentage(array, party){
    var elmt = []
    array.forEach(member=>{
    if(member.party==party && member.votes_with_party_pct!== undefined){
            elmt.push(member.votes_with_party_pct);
        
}
})
    var result= elmt.reduce(function(a, b){return a+b});
    return result/elmt.length;
  }


function percentages(array){
    var elmt2 = []
        array.forEach(member=>{
        if(member.party=="R" && member.votes_with_party_pct!== undefined){
            elmt2.push(member.votes_with_party_pct);
         
         
        }
    
        })
        var result= elmt2.reduce(function(a, b){return a+b});
    console.log(result/elmt2.length);
    }
    percentages(allData)

    function percentages3(array){
        var elmt3= []
        array.forEach(member=>{
            if(member.party=="ID" && member.votes_with_party_pct!== undefined){
                elmt3.push(member.votes_with_party_pct);

            }
        })

        var result2= elmt3.reduce(function(a, b){return a+b});
        console.log(result2/elmt3.length);

}
   


percentages3(allData)


function missedVotes(array){
   var elmt4= [];
   array.forEach(member=>{
           if(member.votes_with_party_pct!==undefined){
            elmt4.push(member.votes_with_party_pct)
           }  
        })
          
        var percentage= (array.length);
        var result=elmt4.reduce((a, b)=> a + b, 0)/percentage
        return result;
        }

function least(array){
var elmt5=[];
array.forEach(member=>{
    if(member.votes_with_party_pct!==undefined){
        elmt5.push(member.votes_with_party_pct);
    }
})
var perc= elmt5.length * 0.10
elmt5=elmt5.sort(function(a, b){return b-a}).slice(0, perc);
var result=  Math.min(...elmt5)
return array.filter(member=>member.votes_with_party_pct>=result);
}
least(allData)
missedVotes(allData)

statistics.democrats=numbrep(allData, "D");
statistics.republicans=numbrep(allData, "R");
statistics.independent=numbrep(allData, "ID");
statistics.democrats_votes_with_party_pct=percentage(allData, "D").toFixed(2);
statistics.republican_votes_with_party_pct=percentage(allData, "R").toFixed(2);
statistics.independent_votes_with_party_pct=percentage(allData, "ID").toFixed(2);
statistics.votes_percentage=missedVotes(allData);
statistics.total_reps=numbrep(allData, "D") + numbrep(allData, "R") + numbrep(allData, "ID")
statistics.total_votes=((percentage(allData, "D") + percentage(allData, "R") + percentage(allData, "ID"))/3).toFixed(2)
function memberstable(){
    var table1= document.getElementById("table-glance");
    var tBodyy= document.getElementById("tbody2");
    var demoRow= document.getElementById("tablerowdemocrats");
    var totRow= document.getElementById("totalRow");
    totRow.insertCell().innerHTML=statistics.total_reps
    totRow.insertCell().innerHTML=statistics.total_votes
    demoRow.insertCell().innerHTML=statistics.democrats
    demoRow.insertCell().innerHTML=statistics.democrats_votes_with_party_pct
    var repRow= document.getElementById("tablerowrepublicans");
    repRow.insertCell().innerHTML=statistics.republicans
    repRow.insertCell().innerHTML=statistics.republican_votes_with_party_pct
    var indRow= document.getElementById("tablerowind");
    indRow.insertCell().innerHTML=statistics.independent
    indRow.insertCell().innerHTML=statistics.independent_votes_with_party_pct
    console.log(table1);
    console.log(tBodyy);
    
}
memberstable()
console.log(statistics)

function leastAttendace(allData){
    var table3=document.getElementById("tab");
    var body3=document.getElementById("tbo");
    least(allData).forEach((member, index)=>{
    var trow2= document.createElement("tr");
    var the= document.createElement("th");
     the.innerHTML= index+1;
    trow2.appendChild(the);
    if(member.middle_name!== null){
        var fullname2= member.first_name + " " + member.middle_name + " " + member.last_name;
        trow2.insertCell().innerHTML=fullname2.link(member.url);
      }else {
        var fullname2= member.first_name + " " + member.last_name;
        trow2.insertCell().innerHTML=fullname2.link(member.url);
      }
         if(member.total_votes!== null){
            trow2.insertCell().innerHTML= member.total_votes;
        }
        if(member.total_votes==null){
            trow2.insertCell().innerHTML=0;
        } 
        
    
    trow2.insertCell().innerHTML= member.votes_with_party_pct;
    body3.appendChild(trow2);
    
    })
    
    
}
leastAttendace(allData)

  function top3(array5){
    var elmt5=[];
    array5.forEach(member=>{
        if(member.missed_votes_pct!==undefined){
            elmt5.push(member.missed_votes_pct);

        }
    })
    var perc= elmt5.length * 0.10
    elmt5=elmt5.sort(function(a, b){return a-b}).slice(0, perc)
    var result=  Math.max(...elmt5)
    return array5.filter(member=>member.missed_votes_pct<=result);
    } 
    missedVotes(allData) 
    function mostAttendace(allData){
        var table3=document.getElementById("table_most");
        var body3=document.getElementById("tbody_most");
        top3(allData).forEach((member, index)=>{
        var trow5= document.createElement("tr");
        var thee= document.createElement("th");
         thee.innerHTML= index+1;
        trow5.appendChild(thee);
       body3.appendChild(trow5);
       if(member.middle_name!== null){
        var fullname2= member.first_name + " " + member.middle_name + " " + member.last_name;
        trow5.insertCell().innerHTML=fullname2.link(member.url);
      }else {
        var fullname2= member.first_name + " " + member.last_name;
        trow5.insertCell().innerHTML=fullname2.link(member.url);
      }
         if(member.missed_votes!== null){
            trow5.insertCell().innerHTML= member.total_votes;
        }
        if(member.missed_votes==null){
            trow5.insertCell().innerHTML=0;
        } 
        trow5.insertCell().innerHTML= member.votes_with_party_pct;    

    })
    
    table3.appendChild(body3)
    }
    mostAttendace(allData)
    missedVotes(allData)