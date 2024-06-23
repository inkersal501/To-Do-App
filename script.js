let todoForm=document.getElementById('to-do-form');

let tasks=JSON.parse(localStorage.getItem("todo")) || [];

todoForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let date=new Date(todoForm.elements['date'].value).toLocaleDateString("en-IN",);
    let note=todoForm.elements['todo'].value;
    let remarks=todoForm.elements['remarks'].value;
    let obj={date,note,remarks}; 
    tasks.push(obj); 
    localStorage.setItem("todo",JSON.stringify(tasks));
    document.getElementById('success-alert').style.display='block';  
    setTimeout(()=>{
        document.getElementById('success-alert').style.display='none';  
    },1000);
    todoForm.elements['date'].value='';
    todoForm.elements['todo'].value='';
    todoForm.elements['remarks'].value='';
    LoadTasks(tasks);
});

function filterData(filterDate,tasks){             
    let filteredData=tasks.filter((data)=>{
        if(data.date==filterDate){
            return true;
        }
    });
    return filteredData;
}          

function LoadTasks(tasks) {             
            
    if(tasks.length>0){

        document.getElementById('todo-note-body').innerHTML='';
        let set = new Set();                
        tasks.forEach(element => {
            set.add(element.date);
        });
        let arr=[];
        for (const i of set) {
            arr.push(i);
        }
        arr.sort((a,b) =>{
            const dateA = new Date(a.split('/').reverse().join('-'));
            const dateB = new Date(b.split('/').reverse().join('-'));
            return dateA - dateB;
        });
        let newArr=[...arr];
        let obj={};
        // console.log(newArr);
        arr.forEach(element => {
            obj[element]=filterData(element,tasks);
            LoadHTMLDOM(element,obj[element]); 
        });
        // console.log(obj);               
    }else{
        document.getElementById('todo-note-body').innerHTML=`
        <h4 class="text-center p-4 mt-5 mb-3 text-secondary">0 Lists to Display</h4>
        `;
    }

}
function LoadHTMLDOM(id,data){

    // console.log(id,data);
    let AccordionId=id.split("/").join("");
    let tbody=document.getElementById('todo-note-body');
    let AccordionItem=document.createElement('div');
    AccordionItem.className="accordion-item"; 

    let ul=`<ul style="list-style-type:none;" class="text-white">`;            
    data.forEach(element => { 
        ul += `<li class="animate__animated animate__fadeInUp mt-2 mb-2">
        <i class="bi bi-lightning-charge-fill mx-2 text-white"></i>
        <span>${element.note}</span>
        <span class="mx-2"><small>${element.remarks || ""}</small></span>
        </li>`;              
    });  
    ul +=`<ul>`;   
    AccordionItem.innerHTML=` 
        
    <h2 class="accordion-header">
    <button class="accordion-button collapsed text-white" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${AccordionId}" aria-expanded="false" aria-controls="flush-collapse${AccordionId}">
        ${id}
    </button>
    </h2>
    <div id="flush-collapse${AccordionId}" class="accordion-collapse collapse" data-bs-parent="#todo-note-body">
        <div class="accordion-body" id="accordion-body-${AccordionId}">
            ${ul}
        </div>
    </div>`;
    tbody.appendChild(AccordionItem);   
}

document.addEventListener('DOMContentLoaded',()=>{
    LoadTasks(tasks);
});
var tooltipSpan = document.getElementById('tooltip-span');

window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';
};