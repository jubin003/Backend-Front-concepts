import { useState } from "react";

const url = "http://localhost:3000/api/auth"

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: data.message || 'Registration successful!' });
                setName('');
                setEmail('');
                setPassword('');
            } else {
                const errMsg = data.errors ? data.errors.join(', ') : (data.message || 'Registration failed');
                setMessage({ type: 'error', text: errMsg });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-8 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                    Create Account
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Start your learning journey today</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                >
                    {isLoading ? 'Registering...' : 'Sign Up'}
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

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlelogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage({ type: 'success', text: 'Welcome back! You have logged in successfully.' });
            } else {
                const errMsg = data.errors ? data.errors.join(', ') : (data.message || 'Login failed');
                setMessage({ type: 'error', text: errMsg });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please check your credentials.' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-8 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl transition-all duration-300">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sign in to your learning dashboard</p>
            </div>
            
            <form onSubmit={handlelogin} className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                >
                    {isLoading ? 'Logging in...' : 'Sign In'}
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

export function Logout() {
    const [message, setMessage] = useState('');

    const handlelogout = () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                localStorage.clear();
                setMessage({ type: 'success', text: 'You have been successfully logged out.' });
            } else {
                setMessage({ type: 'info', text: 'You are not logged in.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong during logout.' });
        }
    }

    return (
        <div className="max-w-md mx-auto my-8 p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xl text-center transition-all duration-300">
            <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Logout
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to end your session?</p>
            <button 
                onClick={handlelogout}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all duration-200"
            >
                Confirm Logout
            </button>
            {message && (
                <div className={`mt-6 p-4 rounded-xl text-sm font-medium ${
                    message.type === 'success' 
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-100' 
                        : message.type === 'info'
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-100'
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-100'
                }`}>
                    {message.text}
                </div>
            )}
        </div>
    )
}