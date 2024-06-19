 
        let todoForm=document.getElementById('to-do-form');
        let filter=document.getElementById('filterDate');
        let clearFilters=document.getElementById('clearFilters');

        let tasks=JSON.parse(localStorage.getItem("todo")) || [];

        todoForm.addEventListener("submit",(e)=>{
            e.preventDefault();
            let date=new Date(todoForm.elements['date'].value);
            let note=todoForm.elements['todo'].value;
            let remarks=todoForm.elements['remarks'].value;
            let obj={date,note,remarks}; 
            tasks.push(obj); 
            localStorage.setItem("todo",JSON.stringify(tasks));            
            document.getElementById('success-alert').style.display='block';  
            setTimeout(()=>{
                document.getElementById('success-alert').style.display='none';  
            },3000);
            todoForm.elements['date'].value='';
            todoForm.elements['todo'].value='';
            todoForm.elements['remarks'].value='';
            LoadTasks(tasks);          
        });

        filter.addEventListener("change",(e)=>{
            e.preventDefault();
            let filterDate=new Date(e.target.value).toLocaleDateString();
            let filteredData=tasks.filter((data)=>{
                let date=new Date(data.date);
                if(date.toLocaleDateString()==filterDate){
                    return true;
                }
            });
            LoadTasks(filteredData);  
        });
        clearFilters.addEventListener("click",()=>{
            LoadTasks(tasks); 
            filter.value=''; 
        });
        function UpdateTable(obj,index){
            let tbody=document.getElementById('todo-note-body');
            let tr=document.createElement('tr');
            let date=new Date(obj.date);
            tr.innerHTML=`
            <td class="text-center">${index+1}</td>
            <td>${date.toLocaleDateString()}</td>
            <td>${obj.note}</td>
            <td>${obj.remarks || ""}</td>
            <td class="text-center"><a href="javascript:void(0);" class="btn btn-outline-danger" Onclick="RemoveTasks(${index});"><i class="bi bi-trash3"></i></a></td>`;
            tbody.appendChild(tr);
        }
        
        function LoadTasks(tasks) {             
                    
            if(tasks.length>0){
                document.getElementById('todo-note-table').style.display="";
                document.getElementById('todo-note-body').innerHTML='';
                tasks.forEach((element,index)=> { 
                    UpdateTable(element,index);
                });
            }else{
                document.getElementById('todo-note-table').style.display="none";
            }

        }
        function RemoveTasks(i){ 
            tasks.splice(i,1);
            localStorage.setItem("todo",JSON.stringify(tasks)); 
            LoadTasks(tasks);
        }
        document.addEventListener('DOMContentLoaded',()=>{
            LoadTasks(tasks);
        }); 