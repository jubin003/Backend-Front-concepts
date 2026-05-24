import { useState } from "react";
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
                     const data = await response.json;
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
                    setMessage('Please Login first')
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
                <button onClick={handlecreate}>Create Task</button>
                {message && <p>{message}</p>}
            
        </div>
    )
}