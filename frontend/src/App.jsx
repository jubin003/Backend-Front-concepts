// App.jsx
import { Routes, Route } from 'react-router-dom'

import { Register, Login ,Logout} from '../pages/LoginPage.jsx'
import { CreateTask ,DeleteTask,GetAllTask,UpdateTask} from '../pages/HomePage.jsx'

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/create' element={<CreateTask />} />
                <Route path='/logout' element={<Logout></Logout>}/>
                <Route path='/delete' element={<DeleteTask></DeleteTask>}/>
                <Route path='/all' element={<GetAllTask></GetAllTask>}/>
                <Route path='update' element={<UpdateTask></UpdateTask>}></Route>
            </Routes>
        </div>
    )
}