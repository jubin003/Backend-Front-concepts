import { useState } from "react";

const url= "http://localhost:3000/api/auth"

export function Register(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');

    const handleRegister = async()=>{
        try{
            const response =await fetch(`${url}/register`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,password})
            });
            const data = await response.json();
            console.log(data);
            console.log(response.ok)

            if(response.ok){
                setMessage(data.message)

            }else{
                if(data.errors){
                    setMessage(data.errors.join(', '))
                }else{
                    setMessage(data.message)
                }
                
            }

        }catch(error){
            setMessage('something went wrong');
        }
    }
    return(
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}

            ></input>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
            
            </input>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

            ></input>
            <button onClick={handleRegister}>Register</button>
            {message &&<p>{message}</p>}
        </div>
    )

}

export function Login(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState('');

    const handlelogin=async ()=>{

        try{
           const response = await fetch(`${url}/login`,{
            method:POST,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })

        const data= await response.json
        if(response.ok){
            localStorage.setItem('token',data.token)
            setMessage(data.message)

        }else{
            if(data.errors){
                setMessage(data.errors.join(', '))
            }else{
                setMessage(data.message)
            }
        } 
        }catch(error){
            setMessage('something went wrong')
        }
        
    }

    return(
        <div>
            <h1>Login Page</h1>
            <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}>

            </input>
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}>
            </input>

            <button onClick={handlelogin}>Login</button>

            {message &&<p>{message}</p>}
        </div>
    )
}