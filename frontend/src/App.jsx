// App.jsx
import { Routes, Route } from 'react-router-dom'

import { Register, Login } from '../components/auth.jsx'
import { CreateTask } from '../components/task.jsx'

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<CreateTask />} />
            </Routes>
        </div>
    )
}