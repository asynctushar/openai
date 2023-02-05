import { Button, Drawer } from 'antd';
import { CloseOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ changeMode, mode }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="h-24 border-b bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 flex justify-between items-center px-2 sm:px-12 lg:px-32 md:px-16">
            <span className="text-xl font-semibold font-mono text-gray-800 dark:text-zinc-200">OpenAI</span>
            <div className="flex gap-4 items-center justify-evenly font-medium text-gray-700 dark:text-zinc-200">
                <NavLink to="/" className="hidden md:inline-block">{({ isActive }) => <span className={`${isActive ? " border-b-2 border-gray-500 dark:border-zinc-300" : ""} p-1`}>Home</span>}</NavLink>
                <NavLink to="/image" className="hidden md:inline-block">{({ isActive }) => <span className={`${isActive ? " border-b-2 border-gray-500 dark:border-zinc-300" : ""} p-1`}>Image</span>}</NavLink>


                <Button onClick={changeMode} className="text-gray-800 dark:text-zinc-100 font-medium hidden md:inline-block ml-2"> Dark Mode: {mode === 'dark' ? "ON" : "OFF"}</Button>
                <Button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} icon={menuOpen ? <MenuUnfoldOutlined
                    className="!block text-gray-700 dark:text-gray-200" /> : <MenuFoldOutlined className="!block text-gray-700 dark:text-gray-200" />} size="large" />
            </div>
            <Drawer open={menuOpen} closeIcon={<CloseOutlined className="dark:text-gray-200" />} extra={
                <Button onClick={changeMode} className="font-medium dark:text-gray-200"> Dark Mode: {mode === 'dark' ? "ON" : "OFF"}</Button>
            }
                onClose={() => setMenuOpen(!menuOpen)}
                width={window.innerWidth < 500 ? "100%" : 375}
                className="dark:bg-slate-700">
                <div className="flex flex-col items-center gap-5 dark:text-zinc-100 text-lg font-medium text-zinc-800">

                    <NavLink
                        onClick={(e) => {
                            e.preventDefault();
                            setMenuOpen(false);
                            navigate('/')
                        }}
                        to="/" >{({ isActive }) => <span onClick={() => setMenuOpen(!menuOpen)} className={`${isActive ? " border-b-2 border-gray-500 dark:border-zinc-300" : ""} p-1`}>Home</span>}</NavLink>

                    <NavLink
                        onClick={(e) => {
                            e.preventDefault();
                            setMenuOpen(false);
                            navigate('/image')
                        }}
                        to="/image" >{({ isActive }) => <span className={`${isActive ? " border-b-2 border-gray-500 dark:border-zinc-300" : ""} p-1`}>Image</span>}</NavLink>
                </div>
            </Drawer>

        </div >
    )
}
export default Navbar;