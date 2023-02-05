import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Image from './components/Image';

const App = () => {
    const [mode, setMode] = useState('');


    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setMode('dark')
        } else {
            document.documentElement.classList.remove('dark');
            setMode('light')
        }
    }, [])


    const changeMode = () => {
        if (mode === 'dark') {
            document.documentElement.classList.remove('dark');
            localStorage.theme = "light";
            setMode('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = "dark";
            setMode('dark');
        }
    }


    return (
        <BrowserRouter>
        <div className="h-screen bg-slate-100 dark:bg-slate-800 text-center">
            <Navbar changeMode={changeMode} mode={mode} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/image" element={<Image />} />
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;
