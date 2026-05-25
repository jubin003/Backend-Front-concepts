// App.jsx
import { Routes, Route } from 'react-router-dom'

import { Register, Login ,Logout} from '../components/auth.jsx'
import { CreateTask ,DeleteTask} from '../pages/HomePage.jsx'

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<CreateTask />} />
                <Route path='/logout' element={<Logout></Logout>}/>
                <Route path='/delete' element={<DeleteTask></DeleteTask>}/>
            </Routes>
        </div>
    )
}