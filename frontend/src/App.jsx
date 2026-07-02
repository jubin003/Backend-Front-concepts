// App.jsx
import { Routes, Route ,Link} from 'react-router-dom'

import { Register, Login ,Logout} from '../pages/LoginPage.jsx'
import { CreateTask ,GetAllTask} from '../pages/HomePage.jsx'

import {Gaspp} from '../pages/gsap.jsx';

export default function App() {
    return (
        <div>
            

            <nav>
                <Link to='/register'>Register</Link> |
                <Link to='/login'>Login</Link> |
                <Link to='/logout'>Logout</Link> |
                <Link to='/all'>All Tasks</Link> |
                <Link to='/create'>Create Task</Link> |
                <Link to='/gasp'>Box</Link>

            </nav>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<CreateTask />} />
                <Route path='/logout' element={<Logout></Logout>}/>
                <Route path='/all' element={<GetAllTask></GetAllTask>}/>
                <Route path='/gsap' element={<Gaspp></Gaspp>}/>

            </Routes>
        </div>
    )
}