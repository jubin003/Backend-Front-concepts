// App.jsx
import { Routes, Route, NavLink } from 'react-router-dom'
import { Register, Login, Logout } from '../pages/LoginPage.jsx'
import { CreateTask, GetAllTask } from '../pages/HomePage.jsx'
import { Gaspp } from '../pages/gsap.jsx'

export default function App() {
    const navLinkClass = ({ isActive }) => 
        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            isActive 
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans flex flex-col">
            {/* Header Navigation */}
            <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                            ReactLearn
                        </span>
                        <span className="text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-semibold">
                            GSAP & Tailwind
                        </span>
                    </div>

                    <nav className="flex items-center flex-wrap gap-2">
                        <NavLink to='/register' className={navLinkClass}>Register</NavLink>
                        <NavLink to='/login' className={navLinkClass}>Login</NavLink>
                        <NavLink to='/all' className={navLinkClass}>Tasks</NavLink>
                        <NavLink to='/create' className={navLinkClass}>New Task</NavLink>
                        <NavLink to='/gsap' className={navLinkClass}>GSAP Sandbox</NavLink>
                        <NavLink to='/logout' className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300">Logout</NavLink>
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
                <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 shadow-sm backdrop-blur-sm transition-colors duration-300">
                    <Routes>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/create' element={<CreateTask />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/all' element={<GetAllTask />} />
                        <Route path='/gsap' element={<Gaspp />} />
                        <Route path='/' element={
                            <div className="text-center py-12">
                                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome to your Learning Space!</h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                                    This workspace is configured with Tailwind CSS v4 and GSAP. Explore the links above to test components, manage tasks, and see interactive animations.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <NavLink to="/gsap" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-lg shadow-purple-500/20 transition-all duration-300">
                                        Open GSAP Sandbox
                                    </NavLink>
                                    <NavLink to="/all" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl font-medium transition-all duration-300">
                                        View Tasks
                                    </NavLink>
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} React-Learn Dashboard. Built with React, Tailwind, and GSAP.</p>
            </footer>
        </div>
    )
}