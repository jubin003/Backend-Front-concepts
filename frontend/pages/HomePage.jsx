import { use, useState } from "react";
const url ="http://localhost:3000/api/task"

export function CreateTask(){
    const [name,setName]=useState('');
    const [content,setContent]= useState('')
    const [priority,setPriority]=useState(0);
    const [message,setMessage]=useState('');
    
    const handlecreate=async()=>{
        try{    
                const token = localStorage.getItem('token')
                if(token){
                    const response = await fetch(`${url}/create`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':`Bearer ${token}`
                    },
                    body:JSON.stringify({name,content,priority})
                 })
                     const data = await response.json();
                    if(response.ok){
                        setMessage('post created successfully')
                    }else{
                        if(data.errors){
                            setMessage(data.errors.join(', '))
                        }else{
                            setMessage(data.message)
                        }
                    }
                }else{
                    window.location.href='/login'
                }
            
            }catch(error){
                    setMessage('something went wrong')
            }
                  
    }

    return(
        <div>
            
                
            
        </div>
    )
}

export function DeleteTask(){
    const [id,setId]=useState(0);
    const [message,setMessage]=useState('');

    const handleDelete= async ()=>{
        try{
        
            const token = localStorage.getItem('token')
                if(token){
                        const response = await fetch(`${url}/${id}`,{
                        method:'DELETE',
                        headers:{
                            'Content-Type':'application/json',
                            'authorization':`Bearer ${token}`
                        },
                        body:JSON.stringify({id})
                    })
                    const data = await response.json();
                    if(response.ok){
                            setMessage(data.message)
                    }
                }else{
                    window.location.href='/login'
                }
        }catch(error){
                setMessage('something went wrong')
        }
    }

    

    return(
        <div>
            <input
                type='number'
                placeholder="id"
                value={id}
                onChange={(e)=>setId(e.target.value)}>

            </input>
            <button onClick={handleDelete}>Delete</button>
            {message && <p>{message}</p>}
        </div>
        )
}

export function UpdateTask(){
    const [name,setName]= useState('');
    const [content,setContent]=useState('');
    const [priority,setPriority]=useState(0);
    const [message,setMessage]=useState('');

    const handleupdate=async()=>{
        try{
            const token = localStorage.getItem('token');
            if(token){
                const response = await fetch(`${url}/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json',
                        'authorizarion': `Bearer ${token}`
                    },
                    body:JSON.stringify({name,content,priority})
                });
                const data = response.json();
                if(response.ok){
                    setMessage(data.message);
                }else{
                    if(data.error){
                        setMessage(data.errors.join(', '))
                    }else{
                        setMessage(data.message);
                    }
                }
            }else{
                setMessage('no token');
            }
        }catch(error){
            setMessage('something went wrong')
        }
    }

    return(
        <div>
            <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}>

                </input>
                <input
                    type="text"
                    placeholder="content"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}>
                </input>
                <input
                    type="text"
                    placeholder="prioty"
                    value={priority}
                    onChange={(e)=>setPriority(Number(e.target.value))}>
                </input>
                <button onClick={handleupdate}>Update Task</button>
                {message && <p>{message}</p>}
        </div>
    )
}

export function GetAllTask(){
    const [tasks,setTasks]=useState([])
    const [message,setMessage]=useState('');

    const handlegetalltask= async()=>{

        try{
            const token = localStorage.getItem('token');
            if(token){
                const response = await fetch(`${url}/all`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':`Bearer ${token}`
                    }
                });

                const data = response.json();
                if (response.ok){
                    
                    setMessage(data.message)
                }else{
                    if(data.errors){
                        setMessage(data.errors.join(', '));
                    }else{
                        setMessage(data.message)
                    }
                }


            }else{
                setMessage('no token');
            }

        }catch(error){
            setMessage('something went wrong')
        }


    }
    return (
        <div>
            <button onClick={handlegetalltask}></button>
            {message && <p>{message}</p>}
            {tasks.map(task=>{
                <div >
                    <h3>{task.name}</h3><br></br>
                    <p>{task.content}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            })}
        </div>
    )
}
