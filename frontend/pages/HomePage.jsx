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
export function GetAllTask() {
    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState('')
    const [editId, setEditId] = useState(null)      
    const [editName, setEditName] = useState('')
    const [editContent, setEditContent] = useState('')
    const [editPriority, setEditPriority] = useState(0)

    const handleGetAllTask = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await fetch(`${url}/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setTasks(data)
                } else {
                    setMessage(data.message)
                }
            } else {
                setMessage('no token')
            }
        } catch (error) {
            setMessage('something went wrong')
        }
    }

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            })
            const data = await response.json()
            if (response.ok) {
                setTasks(tasks.filter(task => task._id !== id)) 
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage('something went wrong')
        }
    }

    const handleEdit = (task) => {
        setEditId(task._id)          
        setEditName(task.name)        
        setEditContent(task.content)
        setEditPriority(task.priority)
    }

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: editName, content: editContent, priority: editPriority })
            })
            const data = await response.json()
            if (response.ok) {

                setTasks(tasks.map(task =>
                    task._id === id
                        ? { ...task, name: editName, content: editContent, priority: editPriority }
                        : task
                ))
                setEditId(null)  
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            setMessage('something went wrong')
        }
    }

    return (
        <div>
            <button onClick={handleGetAllTask}>Show Tasks</button>
            {message && <p>{message}</p>}

            {tasks.map(task => (
                <div key={task._id}>
                    {editId === task._id ? (

                        <div>
                            <input
                                type='text'
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                            <input
                                type='text'
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <input
                                type='number'
                                value={editPriority}
                                onChange={(e) => setEditPriority(Number(e.target.value))}
                            />
                            <button onClick={() => handleUpdate(task._id)}>Save</button>
                            <button onClick={() => setEditId(null)}>Cancel</button>
                        </div>
                    ) : (

                        <div>
                            <h3>{task.name}</h3>
                            <p>{task.content}</p>
                            <p>Priority: {task.priority}</p>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}