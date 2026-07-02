import { useState } from "react";
const url = "http://localhost:3000/api/task"

export function CreateTask() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState(0); // 0: Low, 1: Medium, 2: High
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const handlecreate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {    
            const token = localStorage.getItem('token')
            if (token) {
                const response = await fetch(`${url}/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, content, priority })
                });
                const data = await response.json();
                if (response.ok) {
                    setMessage({ type: 'success', text: 'Task created successfully!' });
                    setName('');
                    setContent('');
                    setPriority(0);
                } else {
                    const errMsg = data.errors ? data.errors.join(', ') : (data.message || 'Failed to create task');
                    setMessage({ type: 'error', text: errMsg });
                }
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please check your connection.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto my-6 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                    Create New Task
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Add items to your roadmap</p>
            </div>

            <form onSubmit={handlecreate} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Task Name</label>
                    <input
                        type="text"
                        placeholder="Implement UI redesign"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        placeholder="Add some details about the task..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Priority Level</label>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { value: 0, label: 'Low', color: 'border-green-300 text-green-700 dark:text-green-400 focus:ring-green-500 bg-green-50/10' },
                            { value: 1, label: 'Medium', color: 'border-yellow-300 text-yellow-700 dark:text-yellow-400 focus:ring-yellow-500 bg-yellow-50/10' },
                            { value: 2, label: 'High', color: 'border-red-300 text-red-700 dark:text-red-400 focus:ring-red-500 bg-red-50/10' }
                        ].map((p) => (
                            <button
                                key={p.value}
                                type="button"
                                onClick={() => setPriority(p.value)}
                                className={`py-3 px-4 rounded-xl border font-medium text-sm transition-all duration-200 flex items-center justify-center ${
                                    priority === p.value 
                                        ? 'bg-purple-600 border-purple-600 text-white dark:text-white shadow-md shadow-purple-500/20'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                >
                    {isLoading ? 'Creating...' : 'Create Task'}
                </button>
            </form>

            {message && (
                <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${
                    message.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/50' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50'
                }`}>
                    {message.text}
                </div>
            )}
        </div>
    )
}

export function GetAllTask() {
    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [editId, setEditId] = useState(null)      
    const [editName, setEditName] = useState('')
    const [editContent, setEditContent] = useState('')
    const [editPriority, setEditPriority] = useState(0)

    const handleGetAllTask = async () => {
        setIsLoading(true);
        setMessage('');
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
                    if (data.length === 0) {
                        setMessage({ type: 'info', text: 'No tasks found. Try creating one!' });
                    }
                } else {
                    setMessage({ type: 'error', text: data.message || 'Failed to fetch tasks' })
                }
            } else {
                setMessage({ type: 'error', text: 'You must be logged in to view tasks.' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Could not load tasks.' })
        } finally {
            setIsLoading(false);
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
                setMessage({ type: 'error', text: data.message || 'Failed to delete task' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Could not delete task.' })
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
                setMessage({ type: 'error', text: data.message || 'Failed to update task' })
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Could not update task.' })
        }
    }

    const getPriorityBadge = (p) => {
        switch (p) {
            case 2:
                return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/40">High</span>;
            case 1:
                return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/40">Medium</span>;
            default:
                return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/40">Low</span>;
        }
    }

    return (
        <div className="max-w-4xl mx-auto my-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                        Roadmap Tasks
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your coding tasks</p>
                </div>
                <button 
                    onClick={handleGetAllTask}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
                >
                    {isLoading ? 'Loading...' : 'Show Tasks'}
                </button>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                    message.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/50' 
                        : message.type === 'info'
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map(task => (
                    <div 
                        key={task._id}
                        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        {editId === task._id ? (
                            <div className="space-y-4 w-full">
                                <div>
                                    <label className="block text-xs font-semibold mb-1 text-gray-500">Edit Name</label>
                                    <input
                                        type='text'
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1 text-gray-500">Edit Description</label>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        rows={2}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1 text-gray-500 font-sans">Priority</label>
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => setEditPriority(val)}
                                                className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium transition-all duration-200 ${
                                                    editPriority === val 
                                                        ? 'bg-purple-600 border-purple-600 text-white'
                                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                }`}
                                            >
                                                {val === 0 ? 'Low' : val === 1 ? 'Medium' : 'High'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button 
                                        onClick={() => handleUpdate(task._id)}
                                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold active:scale-[0.98] transition-all duration-200"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditId(null)}
                                        className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-xs font-bold active:scale-[0.98] transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-extrabold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{task.name}</h3>
                                        {getPriorityBadge(task.priority)}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">{task.content}</p>
                                </div>
                                
                                <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                                    <button 
                                        onClick={() => handleEdit(task)}
                                        className="flex-1 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300 active:scale-[0.98] transition-all duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(task._id)}
                                        className="flex-1 py-2 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-xs font-bold active:scale-[0.98] transition-all duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}